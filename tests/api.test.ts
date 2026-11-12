import { beforeAll, afterAll, describe, it, expect } from "vitest";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { Server } from "node:http";
const temp = mkdtempSync(join(tmpdir(), "aion-api-"));
process.env.DATABASE_PATH = join(temp, "test.sqlite");
process.env.ADMIN_DEMO = "true";
process.env.NODE_ENV = "test";
let server: Server,
  base: string,
  cookie = "",
  csrf = "";
let dbModule: typeof import("../server/db");
async function request(
  path: string,
  method = "GET",
  body?: any,
  secure = true,
) {
  const res = await fetch(base + path, {
    method,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie,
      ...(secure ? { "X-CSRF-Token": csrf } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const setCookie = res.headers.get("set-cookie");
  if (setCookie) cookie = setCookie.split(";")[0];
  return { status: res.status, data: await res.json() };
}
beforeAll(async () => {
  const { app } = await import("../server/app");
  dbModule = await import("../server/db");
  server = app.listen(0, "127.0.0.1");
  await new Promise<void>((resolve) => server.once("listening", resolve));
  base = `http://127.0.0.1:${(server.address() as any).port}/api`;
  const s = await request("/auth/session");
  csrf = s.data.csrf;
});
afterAll(async () => {
  await new Promise<void>((resolve) => server.close(() => resolve()));
  dbModule.db.close();
  rmSync(temp, { recursive: true, force: true });
});
describe("Admin API lifecycle", () => {
  it("protects data and rejects mutations without CSRF", async () => {
    expect((await request("/admin/data/products")).status).toBe(401);
    expect((await request("/auth/demo", "POST", {}, false)).status).toBe(403);
  });
  it("creates a development session in an isolated database", async () => {
    expect((await request("/auth/demo", "POST", {})).status).toBe(200);
    csrf = (await request("/auth/session")).data.csrf;
    expect((await request("/admin/data/variants")).data).toHaveLength(24);
  });
  it("creates and updates products and rejects duplicate SKUs", async () => {
    const product = {
      name: "Test ring",
      sku: "TEST-RING",
      price: 129,
      category: "Smart rings",
      status: "draft",
      image: "",
      description: "",
    };
    const result = await request("/admin/data/products", "POST", product);
    expect(result.status).toBe(201);
    expect(
      (await request("/admin/data/products", "POST", product)).status,
    ).toBe(400);
    expect(
      (
        await request(`/admin/data/products/${result.data.id}`, "PUT", {
          ...product,
          name: "Updated ring",
        })
      ).data.name,
    ).toBe("Updated ring");
    expect(
      (await request(`/admin/data/products/${result.data.id}`, "DELETE"))
        .status,
    ).toBe(200);
  });
  it("rejects impossible stock adjustments and records valid changes", async () => {
    const variant = (await request("/admin/data/variants")).data[0];
    const before = variant.stock;
    expect(
      (
        await request("/admin/inventory/adjust", "POST", {
          variantId: variant.id,
          delta: -before - 1,
          reason: "Invalid removal",
        })
      ).status,
    ).toBe(400);
    expect(
      (
        await request("/admin/inventory/adjust", "POST", {
          variantId: variant.id,
          delta: 5,
          reason: "Cycle count correction",
        })
      ).status,
    ).toBe(200);
    const v = (await request("/admin/data/variants")).data.find(
      (v: any) => v.id === variant.id,
    );
    expect(v.stock).toBe(before + 5);
    expect((await request("/admin/data/inventory")).data[0].reason).toBe(
      "Cycle count correction",
    );
  });
  it("creates orders with pending payment and enforces valid transitions", async () => {
    const variants = (await request("/admin/data/variants")).data;
    const result = await request("/admin/orders/create", "POST", {
      kind: "orders",
      customerId: "customer-0",
      variantId: variants[0].id,
      quantity: 1,
      notes: "API test",
    });
    expect(result.status).toBe(201);
    expect(result.data.paymentStatus).toBe("pending");
    const path = `/admin/orders/orders/${result.data.id}/action`;
    expect(
      (
        await request(path, "POST", {
          action: "transition",
          status: "delivered",
        })
      ).status,
    ).toBe(400);
    expect(
      (
        await request(path, "POST", {
          action: "transition",
          status: "confirmed",
        })
      ).data.status,
    ).toBe("confirmed");
    expect((await request(path, "POST", { action: "refund" })).status).toBe(
      503,
    );
  });
  it("locks authenticated API access until reauthentication", async () => {
    expect((await request("/auth/lock", "POST", {})).status).toBe(200);
    expect((await request("/admin/data/products")).status).toBe(423);
    expect((await request("/auth/unlock", "POST", {})).status).toBe(200);
  });
  it("rejects reset requests without a service and invalid tokens", async () => {
    expect(
      (
        await request("/auth/forgot-password", "POST", {
          email: "customer@example.test",
        })
      ).status,
    ).toBe(503);
    expect(
      (
        await request("/auth/reset-password", "POST", {
          token: "a".repeat(64),
          password: "LongSecurePass42",
        })
      ).status,
    ).toBe(400);
  });
  it("connects a storefront reservation to admin records without collecting payment", async () => {
    const requestId = crypto.randomUUID();
    const payload = {
      requestId,
      details: {
        first_name: "Integration",
        last_name: "Customer",
        email: "reservation@example.test",
        phone_code: "91",
        phone: "1234567890",
        referral_source: "Self",
        address: "Test address",
        city: "Test city",
        state: "Test state",
        zip_code: "000000",
        country: "India",
      },
      rings: [{ ring_color: "silver", ring_size: 8, quantity: 2 }],
    };
    const result = await request("/storefront/reservations", "POST", payload);
    expect(result.status).toBe(201);
    expect(result.data.emailSent).toBe(false);
    const duplicate = await request(
      "/storefront/reservations",
      "POST",
      payload,
    );
    expect(duplicate.data.id).toBe(result.data.id);
    const stored = (await request("/admin/data/preorders")).data.find(
      (r: any) => r.id === result.data.id,
    );
    expect(stored.paymentStatus).toBe("pending");
    expect(stored.items[0].size).toBe(8);
    expect(stored.total).toBe(298);
  });
  it("enforces real account roles, single-use reset tokens and revoked sessions", async () => {
    const { hashPassword, tokenHash } = await import("../server/security");
    const userId = crypto.randomUUID();
    dbModule.db
      .prepare(
        "INSERT INTO users(id,email,name,password,role) VALUES(?,?,?,?,?)",
      )
      .run(
        userId,
        "viewer@example.test",
        "Test viewer",
        hashPassword("OriginalTestPassword42"),
        "viewer",
      );
    await request("/auth/logout", "POST", {});
    csrf = (await request("/auth/session")).data.csrf;
    expect(
      (
        await request("/auth/login", "POST", {
          email: "viewer@example.test",
          password: "OriginalTestPassword42",
        })
      ).status,
    ).toBe(200);
    csrf = (await request("/auth/session")).data.csrf;
    expect((await request("/admin/data/products")).status).toBe(200);
    expect(
      (await request("/admin/data/products", "POST", { name: "Unauthorized" }))
        .status,
    ).toBe(403);
    expect((await request("/admin/data/staff")).status).toBe(403);
    const expired = "expired-" + crypto.randomUUID() + crypto.randomUUID();
    dbModule.db
      .prepare("INSERT INTO tokens VALUES(?,?,?,?)")
      .run(tokenHash(expired), userId, "reset", Date.now() - 1000);
    expect(
      (
        await request("/auth/reset-password", "POST", {
          token: expired,
          password: "ChangedTestPassword42",
        })
      ).status,
    ).toBe(400);
    const token = crypto.randomUUID() + crypto.randomUUID();
    dbModule.db
      .prepare("INSERT INTO tokens VALUES(?,?,?,?)")
      .run(tokenHash(token), userId, "reset", Date.now() + 60000);
    expect(
      (
        await request("/auth/reset-password", "POST", {
          token,
          password: "ChangedTestPassword42",
        })
      ).status,
    ).toBe(200);
    expect((await request("/admin/data/products")).status).toBe(401);
    csrf = (await request("/auth/session")).data.csrf;
    expect(
      (
        await request("/auth/reset-password", "POST", {
          token,
          password: "ChangedTestPassword42",
        })
      ).status,
    ).toBe(400);
    expect(
      (
        await request("/auth/login", "POST", {
          email: "viewer@example.test",
          password: "ChangedTestPassword42",
        })
      ).status,
    ).toBe(200);
    csrf = (await request("/auth/session")).data.csrf;
    await request("/auth/logout", "POST", {});
    csrf = (await request("/auth/session")).data.csrf;
    await request("/auth/demo", "POST", {});
    csrf = (await request("/auth/session")).data.csrf;
  });
  it("destroys the session on logout", async () => {
    expect((await request("/auth/logout", "POST", {})).status).toBe(200);
    expect((await request("/admin/data/orders")).status).toBe(401);
  });
});
