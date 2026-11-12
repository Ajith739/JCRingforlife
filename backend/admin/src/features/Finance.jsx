import "./finance.css";
import { useEffect, useState } from "react";
import { api, localMode } from "../services/api.js";
import { allocate } from "../../../shared/split.js";
import { PageHeader, Panel } from "../components/UI.jsx";
import { useSession } from "../services/api.js";
import FinanceViews from "./FinanceViews.jsx";
const demoKey = "jc-finance-demo-v1";
const demoSeed = {
  beneficiaries: [
    {
      id: "manufacturer-demo",
      name: "Illustrative manufacturer",
      type: "manufacturer",
      email: "manufacturer@example.test",
      active: true,
      onboardingStatus: "not_started",
    },
    {
      id: "donnedoc-demo",
      name: "DoneDoc",
      type: "distributor",
      email: "distributor@example.test",
      active: true,
      onboardingStatus: "not_started",
    },
    {
      id: "franchise-demo",
      name: "Illustrative franchise owner",
      type: "franchise",
      email: "franchise@example.test",
      active: true,
      onboardingStatus: "not_started",
    },
  ],
  rules: [],
  refunds: [],
  payments: [],
  allocations: [],
  settlements: [],
};
const emptyRule = () => ({
  id: "",
  name: "",
  version: 0,
  mode: "percentage",
  effectiveAt: new Date().toISOString(),
  active: false,
  shares: [
    { beneficiaryId: "manufacturer-demo", label: "Manufacturer", value: 7000 },
    { beneficiaryId: "donnedoc-demo", label: "DoneDoc", value: 3000 },
  ],
});
export default function Finance({ kind }) {
  const session = useSession();
  const admin = session.data?.user?.role === "admin";
  const [data, setData] = useState(demoSeed);
  const [rule, setRule] = useState(emptyRule);
  const [amount, setAmount] = useState(10000);
  const [editingBeneficiary, setEditingBeneficiary] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(true);
  async function refresh() {
    try {
      if (localMode) {
        const raw = localStorage.getItem(demoKey);
        setData(raw ? { ...demoSeed, ...JSON.parse(raw) } : demoSeed);
      } else {
        const [
          beneficiaries,
          rules,
          refunds,
          payments,
          allocations,
          settlements,
        ] = await Promise.all([
          api("/admin/finance/beneficiaries"),
          api("/admin/finance/split_rules"),
          api("/admin/finance/refunds"),
          api("/admin/finance/customer_payments"),
          api("/admin/finance/payment_allocations"),
          api("/admin/finance/settlements"),
        ]);
        setData({
          beneficiaries,
          rules,
          refunds,
          payments,
          allocations,
          settlements,
        });
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    refresh();
  }, []);
  const persist = (next) => {
    setData(next);
    localStorage.setItem(demoKey, JSON.stringify(next));
  };
  const preview = () => {
    try {
      return allocate(amount, rule);
    } catch (e) {
      return e.message;
    }
  };
  async function save() {
    setError("");
    setNotice("");
    if (!admin) {
      setError("Administrator access required.");
      return;
    }
    try {
      const result = preview();
      if (typeof result === "string") throw new Error(result);
      if (!rule.name.trim()) throw new Error("Enter a rule name.");
      if (
        rule.active &&
        data.rules.some(
          (r) =>
            r.active &&
            r.id !== rule.id &&
            r.productId === rule.productId &&
            r.franchiseId === rule.franchiseId,
        )
      )
        throw new Error("An active rule already covers this scope.");
      for (const share of rule.shares) {
        const b = data.beneficiaries.find(
          (b) => b.id === share.beneficiaryId && b.active,
        );
        if (!b) throw new Error("Select active beneficiaries.");
        if (rule.active && b.onboardingStatus !== "verified")
          throw new Error(
            "Active rules require verified beneficiary onboarding.",
          );
      }
      const saved = {
        ...rule,
        id: rule.id || crypto.randomUUID(),
        version: rule.version + 1,
      };
      if (localMode)
        persist({
          ...data,
          rules: [...data.rules.filter((r) => r.id !== saved.id), saved],
        });
      else
        await api(`/admin/finance/split-rules${rule.id ? "/" + rule.id : ""}`, {
          method: rule.id ? "PUT" : "POST",
          body: JSON.stringify({ ...rule, shares: rule.shares }),
        });
      setNotice("Rule saved. Historical versions are retained in API mode.");
      if (!localMode) refresh();
      setRule(emptyRule());
    } catch (e) {
      setError(e.message);
    }
  }
  async function addBeneficiary(form) {
    setError("");
    try {
      if (!admin) throw new Error("Administrator access required.");
      const row = {
        id: editingBeneficiary?.id || crypto.randomUUID(),
        name: String(form.get("name") || "").trim(),
        email: String(form.get("email") || "").trim(),
        type: String(form.get("type")),
        businessName: String(form.get("businessName") || "").trim(),
        territory: String(form.get("territory") || "").trim(),
        phone: String(form.get("phone") || "").trim(),
        active: editingBeneficiary?.active ?? true,
        onboardingStatus: editingBeneficiary?.onboardingStatus || "not_started",
      };
      if (!row.name || !row.email)
        throw new Error("Name and email are required.");
      if (localMode)
        persist({
          ...data,
          beneficiaries: [
            ...data.beneficiaries.filter((b) => b.id !== row.id),
            row,
          ],
        });
      else {
        await api(
          `/admin/finance/beneficiaries${editingBeneficiary ? "/" + row.id : ""}`,
          {
            method: editingBeneficiary ? "PUT" : "POST",
            body: JSON.stringify(row),
          },
        );
        refresh();
      }
      setEditingBeneficiary(null);
      setNotice("Beneficiary saved with onboarding pending.");
    } catch (e) {
      setError(e.message);
    }
  }
  const money = (n) =>
    (n / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
  return (
    <>
      <PageHeader
        title={
          kind === "transactions"
            ? "Transactions"
            : kind === "reports"
              ? "Financial reports"
              : kind === "manufacturers"
                ? "Manufacturers"
                : kind === "distributors"
                  ? "Distributors"
                  : kind === "splits"
                    ? "Split configuration"
                    : kind === "beneficiaries"
                      ? "Beneficiaries"
                      : kind === "refunds"
                        ? "Refunds"
                        : kind === "settlements"
                          ? "Settlements"
                          : kind === "partners"
                            ? "Partners"
                            : "Payment overview"
        }
        subtitle="JCRingforlife finance · DEMO / TEST DATA"
      />
      {loading ? <p>Loading finance records…</p> : null}
      <p className="ad-finance-note">
        No payment provider is connected. Allocations are calculations only; no
        money is transferred or refunded. Tax, shipping, discounts and
        processing fees are excluded from the preview amount you enter.
      </p>
      {error && (
        <p role="alert" className="ad-finance-error">
          {error}
        </p>
      )}
      {notice && <p role="status">{notice}</p>}
      {kind === "splits" && (
        <Panel className="ad-finance-panel">
          <h2>Configure payment split</h2>
          <div className="ad-finance-grid">
            <label>
              Rule name
              <input
                value={rule.name}
                onChange={(e) => setRule({ ...rule, name: e.target.value })}
                placeholder="Standard Aion ring distribution"
              />
            </label>
            <label>
              Distributable amount (USD)
              <input
                type="number"
                min="0"
                step="0.01"
                value={(amount / 100).toFixed(2)}
                onChange={(e) =>
                  setAmount(Math.round(Number(e.target.value) * 100))
                }
              />
            </label>
            <label>
              Method
              <select
                value={rule.mode}
                onChange={(e) => setRule({ ...rule, mode: e.target.value })}
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed amount</option>
              </select>
            </label>
            <label>
              Effective from
              <input
                type="datetime-local"
                value={rule.effectiveAt.slice(0, 16)}
                onChange={(e) =>
                  setRule({
                    ...rule,
                    effectiveAt: new Date(e.target.value).toISOString(),
                  })
                }
              />
            </label>
            <label>
              Product ID (optional)
              <input
                value={rule.productId || ""}
                onChange={(e) =>
                  setRule({ ...rule, productId: e.target.value || undefined })
                }
              />
            </label>
            <label>
              Franchise ID (optional)
              <input
                value={rule.franchiseId || ""}
                onChange={(e) =>
                  setRule({ ...rule, franchiseId: e.target.value || undefined })
                }
              />
            </label>
          </div>
          <h3>Beneficiary shares</h3>
          {rule.shares.map((share, i) => (
            <div className="ad-finance-share" key={i}>
              <select
                aria-label={"Beneficiary " + (i + 1)}
                value={share.beneficiaryId}
                onChange={(e) =>
                  setRule({
                    ...rule,
                    shares: rule.shares.map((s, j) =>
                      j === i
                        ? {
                            ...s,
                            beneficiaryId: e.target.value,
                            label:
                              data.beneficiaries.find(
                                (b) => b.id === e.target.value,
                              )?.name || "",
                          }
                        : s,
                    ),
                  })
                }
              >
                {data.beneficiaries.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} · {b.type}
                  </option>
                ))}
              </select>
              <input
                aria-label={"Share " + (i + 1)}
                type="number"
                min="0"
                step={rule.mode === "percentage" ? "0.01" : "0.01"}
                value={share.value / 100}
                onChange={(e) =>
                  setRule({
                    ...rule,
                    shares: rule.shares.map((s, j) =>
                      j === i
                        ? {
                            ...s,
                            value: Math.round(Number(e.target.value) * 100),
                          }
                        : s,
                    ),
                  })
                }
              />
              <span>{rule.mode === "percentage" ? "%" : "USD"}</span>
              <button
                type="button"
                onClick={() =>
                  setRule({
                    ...rule,
                    shares: rule.shares.filter((_, j) => j !== i),
                  })
                }
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setRule({
                ...rule,
                shares: [
                  ...rule.shares,
                  {
                    beneficiaryId: data.beneficiaries[0]?.id || "",
                    label: data.beneficiaries[0]?.name || "",
                    value: 0,
                  },
                ],
              })
            }
          >
            Add beneficiary
          </button>
          <label className="ad-finance-active">
            <input
              type="checkbox"
              checked={rule.active}
              onChange={(e) => setRule({ ...rule, active: e.target.checked })}
            />{" "}
            Active rule
          </label>
          <h3>Distribution preview</h3>
          {typeof preview() === "string" ? (
            <p role="alert">{preview()}</p>
          ) : (
            <table>
              <tbody>
                {preview().map((a) => (
                  <tr key={a.beneficiaryId}>
                    <td>{a.label}</td>
                    <td>{money(a.amountMinor)}</td>
                  </tr>
                ))}
                <tr>
                  <th>Total allocated</th>
                  <th>
                    {money(preview().reduce((n, a) => n + a.amountMinor, 0))}
                  </th>
                </tr>
                <tr>
                  <th>Unallocated</th>
                  <th>
                    {money(
                      amount - preview().reduce((n, a) => n + a.amountMinor, 0),
                    )}
                  </th>
                </tr>
              </tbody>
            </table>
          )}
          <button
            className="ad-btn ad-primary"
            onClick={save}
            disabled={!admin}
          >
            Save rule
          </button>
          <button className="ad-btn" onClick={() => setRule(emptyRule())}>
            Cancel
          </button>
          <h3>Saved rules</h3>
          {data.rules.length ? (
            data.rules.map((r) => (
              <p key={r.id}>
                <button onClick={() => setRule(r)}>
                  {r.name} · v{r.version} · {r.active ? "Active" : "Inactive"}
                </button>
              </p>
            ))
          ) : (
            <p>No rules configured.</p>
          )}
        </Panel>
      )}
      {["beneficiaries", "partners", "manufacturers", "distributors"].includes(
        kind,
      ) && (
        <Panel className="ad-finance-panel">
          <h2>Beneficiary directory</h2>
          <form
            key={editingBeneficiary?.id || "new"}
            onSubmit={(e) => {
              e.preventDefault();
              addBeneficiary(new FormData(e.currentTarget));
              e.currentTarget.reset();
            }}
            className="ad-finance-grid"
          >
            <label>
              Name
              <input
                name="name"
                defaultValue={editingBeneficiary?.name || ""}
                required
              />
            </label>
            <label>
              Email
              <input
                name="email"
                type="email"
                defaultValue={editingBeneficiary?.email || ""}
                required
              />
            </label>
            <label>
              Type
              <select
                name="type"
                defaultValue={
                  editingBeneficiary?.type ||
                  (kind === "partners"
                    ? "franchise"
                    : kind === "distributors"
                      ? "distributor"
                      : "manufacturer")
                }
              >
                <option value="manufacturer">Manufacturer</option>
                <option value="distributor">Distributor</option>
                <option value="franchise">Franchise owner</option>
              </select>
            </label>
            <label>
              Business name
              <input
                name="businessName"
                defaultValue={editingBeneficiary?.businessName || ""}
              />
            </label>
            <label>
              Territory
              <input
                name="territory"
                defaultValue={editingBeneficiary?.territory || ""}
              />
            </label>
            <label>
              Phone
              <input
                name="phone"
                defaultValue={editingBeneficiary?.phone || ""}
              />
            </label>
            <button className="ad-btn ad-primary" disabled={!admin}>
              {editingBeneficiary ? "Save beneficiary" : "Add beneficiary"}
            </button>
            {editingBeneficiary && (
              <button
                type="button"
                className="ad-btn"
                onClick={() => setEditingBeneficiary(null)}
              >
                Cancel
              </button>
            )}
          </form>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Onboarding</th>
                <th>Email</th>
                <th>Territory</th>
                <th>Account</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.beneficiaries
                .filter((b) =>
                  kind === "partners"
                    ? b.type === "franchise"
                    : kind === "manufacturers"
                      ? b.type === "manufacturer"
                      : kind === "distributors"
                        ? b.type === "distributor"
                        : true,
                )
                .map((b) => (
                  <tr key={b.id}>
                    <td>{b.name}</td>
                    <td>{b.type}</td>
                    <td>{b.onboardingStatus}</td>
                    <td>{b.email}</td>
                    <td>{b.territory || "—"}</td>
                    <td>{b.active ? "Active" : "Inactive"}</td>
                    <td>
                      <button
                        className="ad-btn"
                        onClick={() => setEditingBeneficiary(b)}
                        disabled={!admin}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Panel>
      )}
      <FinanceViews kind={kind} data={data} />
    </>
  );
}
