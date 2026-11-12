import { randomUUID } from "node:crypto";
import { z } from "zod";
import { get, list, put, transaction, audit } from "./db.js";
import { allocate, recover } from "../../shared/split.js";
export const beneficiarySchema = z.object({
  name: z.string().min(2),
  type: z.enum(["manufacturer", "distributor", "franchise"]),
  email: z.email(),
  businessName: z.string().max(120).optional(),
  territory: z.string().max(120).optional(),
  phone: z.string().max(40).optional(),
  providerAccountRef: z.string().max(120).optional(),
  onboardingStatus: z
    .enum(["not_started", "pending", "verified"])
    .default("not_started"),
  active: z.boolean().default(true),
});
export const ruleSchema = z.object({
  name: z.string().min(2),
  mode: z.enum(["fixed", "percentage"]),
  productId: z.string().optional(),
  franchiseId: z.string().optional(),
  effectiveAt: z.iso.datetime(),
  active: z.boolean(),
  shares: z
    .array(
      z.object({
        beneficiaryId: z.string().min(1),
        label: z.string().min(1),
        value: z.number().int().nonnegative(),
      }),
    )
    .min(2),
});
export function saveRule(input, actor, id) {
  const valid = ruleSchema.parse(input);
  allocate(
    valid.mode === "fixed"
      ? valid.shares.reduce((n, s) => n + s.value, 0)
      : 10000,
    valid,
  );
  if (valid.productId && !get("products", valid.productId))
    throw new Error("Product does not exist.");
  if (
    valid.franchiseId &&
    get("beneficiaries", valid.franchiseId)?.type !== "franchise"
  )
    throw new Error("Franchise does not exist.");
  for (const share of valid.shares) {
    const beneficiary = get("beneficiaries", share.beneficiaryId);
    if (!beneficiary || !beneficiary.active)
      throw new Error("Select an active beneficiary for every share.");
    if (valid.active && beneficiary.onboardingStatus !== "verified")
      throw new Error("Active rules require verified beneficiary onboarding.");
  }
  const current = id ? get("split_rules", id) : undefined;
  if (id && !current) throw new Error("Rule not found.");
  if (
    valid.active &&
    list("split_rules").some(
      (r) =>
        r.id !== id &&
        r.active &&
        r.productId === valid.productId &&
        r.franchiseId === valid.franchiseId,
    )
  )
    throw new Error(
      "An active rule already covers this product and franchise.",
    );
  return transaction(() => {
    const version = (current?.version || 0) + 1;
    const row = put("split_rules", {
      ...valid,
      id: id || randomUUID(),
      version,
    });
    put("split_rule_versions", {
      ruleId: row.id,
      version,
      configuration: valid,
      actor,
    });
    audit(actor, "Saved split rule version " + version, row.id);
    return row;
  });
}
export function recordCapturedPayment(
  orderId,
  providerReference,
  amountMinor,
  currency,
  actor,
) {
  if (!providerReference) throw new Error("Provider reference required.");
  if (!Number.isSafeInteger(amountMinor) || amountMinor <= 0)
    throw new Error("Invalid payment amount.");
  if (
    list("customer_payments").some(
      (p) => p.providerReference === providerReference,
    )
  )
    return list("customer_payments").find(
      (p) => p.providerReference === providerReference,
    );
  const order = get("orders", orderId);
  if (!order) throw new Error("Order not found.");
  const rules = list("split_rules")
    .filter(
      (r) =>
        r.active &&
        (!r.productId || r.productId === order.productId) &&
        (!r.franchiseId || r.franchiseId === order.franchiseId) &&
        r.effectiveAt <= new Date().toISOString(),
    )
    .sort(
      (a, b) =>
        Number(!!b.franchiseId) - Number(!!a.franchiseId) ||
        Number(!!b.productId) - Number(!!a.productId),
    );
  const rule = rules[0];
  if (!rule) throw new Error("No applicable split rule.");
  if (rule.franchiseId && !order.franchiseId)
    throw new Error("Franchise attribution required.");
  const allocations = allocate(amountMinor, rule);
  return transaction(() => {
    const payment = put("customer_payments", {
      orderId,
      providerReference,
      amountMinor,
      currency,
      status: "captured",
      ruleId: rule.id,
      ruleVersion: rule.version,
      source: "provider_verified",
    });
    for (const a of allocations)
      put("payment_allocations", {
        paymentId: payment.id,
        ruleId: rule.id,
        ruleVersion: rule.version,
        ...a,
        status: "pending_settlement",
      });
    audit(actor, "Recorded provider-confirmed payment", payment.id);
    return payment;
  });
}
export function requestRefund(paymentId, amountMinor, reason, actor) {
  const payment = get("customer_payments", paymentId);
  if (!payment) throw new Error("Payment not found.");
  const previous = list("refunds")
    .filter(
      (r) =>
        r.paymentId === paymentId &&
        r.status !== "rejected" &&
        r.status !== "failed",
    )
    .reduce((n, r) => n + r.amountMinor, 0);
  if (
    !Number.isSafeInteger(amountMinor) ||
    amountMinor <= 0 ||
    previous + amountMinor > payment.amountMinor
  )
    throw new Error("Refund exceeds refundable balance.");
  const allocations = list("payment_allocations").filter(
    (a) => a.paymentId === paymentId,
  );
  const targets = recover(allocations, amountMinor, payment.amountMinor);
  return transaction(() => {
    const row = put("refunds", {
      paymentId,
      orderId: payment.orderId,
      amountMinor,
      reason,
      status: "requested",
      providerStatus: "not_initiated",
      recoveryStatus: "pending",
      targets,
    });
    audit(actor, "Requested refund", row.id);
    return row;
  });
}
export { list };
