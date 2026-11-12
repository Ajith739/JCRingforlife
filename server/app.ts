import "dotenv/config";
import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import session from "express-session";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { randomBytes, randomUUID } from "node:crypto";
import { z } from "zod";
import {
  db,
  demo,
  list,
  get,
  put,
  remove,
  entities,
  transaction,
  audit,
  settings,
  saveSettings,
} from "./db";
import {
  SQLiteSessionStore,
  verifyPassword,
  hashPassword,
  tokenHash,
} from "./security";
import {
  productSchema,
  variantSchema,
  customerSchema,
  couponSchema,
  contentSchema,
  supportSchema,
  returnSchema,
  passwordSchema,
  settingsSchema,
  canTransition,
} from "./validation";
import { seedDemo } from "./seed";
import { createReservation } from "./reservations";
import type { User, Entity } from "../src/admin/types";
declare module "express-session" {
  interface SessionData {
    user?: User;
    csrf?: string;
    locked?: boolean;
    version?: number;
    verifiedAt?: number;
  }
}
type DbUser = {
  id: string;
  email: string;
  name: string;
  password: string;
  role: User["role"];
  active: number;
  session_version: number;
};
const production = process.env.NODE_ENV === "production";
if (
  production &&
  (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32)
)
  throw new Error(
    "SESSION_SECRET must contain at least 32 characters in production",
  );
export const app = express();
app.disable("x-powered-by");
if (production) app.set("trust proxy", 1);
app.use(
  helmet({
    contentSecurityPolicy: production
      ? {
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: [
              "'self'",
              "'unsafe-inline'",
              "https://fonts.googleapis.com",
            ],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"],
            frameAncestors: ["'none'"],
          },
        }
      : false,
  }),
);
app.use(express.json({ limit: "300kb" }));
app.use(
  "/api",
  session({
    name: "aion.sid",
    secret: process.env.SESSION_SECRET || randomBytes(48).toString("hex"),
    store: new SQLiteSessionStore(),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "strict",
      secure: production,
      maxAge: 8 * 3600000,
    },
  }),
);
app.use(
  "/api",
  rateLimit({
    windowMs: 60000,
    limit: 500,
    standardHeaders: "draft-8",
    legacyHeaders: false,
  }),
);
app.use("/api", (req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.session.user && !req.session.user.demo) {
    const u = db
      .prepare("SELECT active,session_version FROM users WHERE id=?")
      .get(req.session.user.id) as
      { active: number; session_version: number } | undefined;
    if (!u || !u.active || u.session_version !== req.session.version) {
      req.session.destroy(() => {});
      res
        .status(401)
        .json({ error: "Your session has expired. Sign in again." });
      return;
    }
  }
  if (!["GET", "HEAD", "OPTIONS"].includes(req.method)) {
    const origin = req.headers.origin;
    const expected = process.env.APP_ORIGIN || "http://localhost:5173";
    if (
      origin &&
      origin !== expected &&
      !(
        !production &&
        /^http:\/\/(localhost|127\.0\.0\.1):(5173|3001)$/.test(origin)
      )
    ) {
      res.status(403).json({ error: "Origin is not allowed" });
      return;
    }
    if (!req.session.csrf || req.headers["x-csrf-token"] !== req.session.csrf) {
      res
        .status(403)
        .json({ error: "Security token expired. Refresh and try again." });
      return;
    }
  }
  next();
});
const asyncRoute =
  (fn: (req: Request, res: Response) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res)).catch(next);
const auth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.user) {
    res.status(401).json({ error: "Sign in to continue" });
    return;
  }
  if (req.session.locked) {
    res.status(423).json({ error: "Your session is locked" });
    return;
  }
  next();
};
const write = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user?.role === "viewer") {
    res.status(403).json({ error: "Your role has read-only access" });
    return;
  }
  next();
};
const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user?.role !== "admin") {
    res.status(403).json({ error: "Administrator permission required" });
    return;
  }
  next();
};
const loginLimit = rateLimit({
  windowMs: 15 * 60000,
  limit: 20,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});
const publicUser = (u: DbUser): User => ({
  id: u.id,
  email: u.email,
  name: u.name,
  role: u.role,
});
const regenerate = (req: Request) =>
  new Promise<void>((resolve, reject) =>
    req.session.regenerate((e) => (e ? reject(e) : resolve())),
  );
const fail = (message: string, status = 400) =>
  Object.assign(new Error(message), { status });
app.get("/api/auth/session", (req, res) => {
  req.session.csrf ||= randomBytes(32).toString("hex");
  res.json({
    user: req.session.user || null,
    locked: !!req.session.locked,
    csrf: req.session.csrf,
    demoAvailable: demo,
    integrations: {
      payments: false,
      email: !!process.env.EMAIL_WEBHOOK_URL,
      shipping: false,
    },
  });
});
app.post(
  "/api/auth/demo",
  loginLimit,
  asyncRoute(async (req, res) => {
    if (!demo) throw fail("Development preview is disabled", 404);
    await regenerate(req);
    req.session.user = {
      id: "development-admin",
      name: "Aion Admin",
      email: "admin@example.test",
      role: "admin",
      demo: true,
    };
    req.session.csrf = randomBytes(32).toString("hex");
    res.json({ ok: true });
  }),
);
app.post(
  "/api/auth/login",
  loginLimit,
  asyncRoute(async (req, res) => {
    const data = z
      .object({
        email: z.email(),
        password: z.string().min(1).max(200),
        remember: z.boolean().optional(),
      })
      .parse(req.body);
    const u = db
      .prepare("SELECT * FROM users WHERE email=? COLLATE NOCASE")
      .get(data.email) as DbUser | undefined;
    const dummy = "00000000000000000000000000000000:" + "0".repeat(128);
    if (!verifyPassword(data.password, u?.password || dummy) || !u?.active)
      throw fail("Email or password is incorrect", 401);
    await regenerate(req);
    req.session.user = publicUser(u);
    req.session.version = u.session_version;
    req.session.csrf = randomBytes(32).toString("hex");
    if (data.remember) req.session.cookie.maxAge = 7 * 86400000;
    audit(u.email, "Signed in", "session");
    res.json({ ok: true });
  }),
);
app.post("/api/auth/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("aion.sid");
    res.json({ ok: true });
  });
});
app.post("/api/auth/lock", auth, (req, res) => {
  req.session.locked = true;
  res.json({ ok: true });
});
app.post(
  "/api/auth/unlock",
  loginLimit,
  asyncRoute(async (req, res) => {
    if (!req.session.user) throw fail("Sign in to continue", 401);
    if (req.session.user.demo && demo) {
      req.session.locked = false;
      res.json({ ok: true });
      return;
    }
    const password = z.string().min(1).max(200).parse(req.body.password);
    const u = db
      .prepare("SELECT * FROM users WHERE id=?")
      .get(req.session.user.id) as DbUser | undefined;
    if (!u || !verifyPassword(password, u.password))
      throw fail("Password is incorrect", 401);
    req.session.locked = false;
    res.json({ ok: true });
  }),
);
async function sendEmail(to: string, subject: string, url: string) {
  if (!process.env.EMAIL_WEBHOOK_URL) return false;
  const result = await fetch(process.env.EMAIL_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.EMAIL_WEBHOOK_TOKEN || ""}`,
    },
    body: JSON.stringify({ to, subject, url }),
    signal: AbortSignal.timeout(10000),
  });
  if (!result.ok) throw fail("Email delivery is temporarily unavailable", 503);
  return true;
}
app.post(
  "/api/auth/forgot-password",
  loginLimit,
  asyncRoute(async (req, res) => {
    const { email } = z.object({ email: z.email() }).parse(req.body);
    if (!process.env.EMAIL_WEBHOOK_URL)
      throw fail(
        "Password reset email is not configured. Contact your administrator.",
        503,
      );
    const u = db
      .prepare("SELECT * FROM users WHERE email=? COLLATE NOCASE AND active=1")
      .get(email) as DbUser | undefined;
    if (u) {
      const token = randomBytes(32).toString("hex");
      db.prepare("DELETE FROM tokens WHERE user_id=? AND kind=?").run(
        u.id,
        "reset",
      );
      db.prepare("INSERT INTO tokens VALUES(?,?,?,?)").run(
        tokenHash(token),
        u.id,
        "reset",
        Date.now() + 30 * 60000,
      );
      await sendEmail(
        u.email,
        "Reset your Aion admin password",
        `${process.env.APP_ORIGIN || "http://localhost:5173"}/reset-password?token=${token}`,
      );
    }
    res.json({
      message:
        "If an account exists, a reset link has been sent. It expires in 30 minutes.",
    });
  }),
);
app.post(
  "/api/auth/verification-request",
  loginLimit,
  asyncRoute(async (req, res) => {
    const { email } = z.object({ email: z.email() }).parse(req.body);
    if (!process.env.EMAIL_WEBHOOK_URL)
      throw fail(
        "Verification email is not configured. Contact your administrator.",
        503,
      );
    const u = db
      .prepare("SELECT * FROM users WHERE email=? COLLATE NOCASE AND active=1")
      .get(email) as DbUser | undefined;
    if (u) {
      const token = randomBytes(32).toString("hex");
      db.prepare("DELETE FROM tokens WHERE user_id=? AND kind=?").run(
        u.id,
        "verify",
      );
      db.prepare("INSERT INTO tokens VALUES(?,?,?,?)").run(
        tokenHash(token),
        u.id,
        "verify",
        Date.now() + 30 * 60000,
      );
      await sendEmail(
        u.email,
        "Verify your Aion admin email",
        `${process.env.APP_ORIGIN || "http://localhost:5173"}/verify-email?token=${token}`,
      );
    }
    res.json({
      message:
        "If an account exists, a verification link has been sent. It expires in 30 minutes.",
    });
  }),
);
app.post(
  "/api/auth/reset-password",
  loginLimit,
  asyncRoute(async (req, res) => {
    const { token, password } = z
      .object({ token: z.string().min(32).max(200), password: passwordSchema })
      .parse(req.body);
    transaction(() => {
      const t = db
        .prepare("SELECT * FROM tokens WHERE hash=? AND kind=? AND expires>?")
        .get(tokenHash(token), "reset", Date.now()) as
        { user_id: string } | undefined;
      if (!t) throw fail("This reset link has expired or is invalid");
      db.prepare(
        "UPDATE users SET password=?,verified=1,session_version=session_version+1 WHERE id=?",
      ).run(hashPassword(password), t.user_id);
      db.prepare("DELETE FROM tokens WHERE user_id=?").run(t.user_id);
      audit(t.user_id, "Reset password", "account");
    });
    res.json({ message: "Password updated. You can now sign in." });
  }),
);
app.post("/api/auth/verify-email", loginLimit, (req, res, next) => {
  try {
    const token = z.string().min(32).max(200).parse(req.body.token);
    transaction(() => {
      const t = db
        .prepare("SELECT * FROM tokens WHERE hash=? AND kind=? AND expires>?")
        .get(tokenHash(token), "verify", Date.now()) as
        { user_id: string } | undefined;
      if (!t) throw fail("Verification link is invalid or expired");
      db.prepare("UPDATE users SET verified=1 WHERE id=?").run(t.user_id);
      db.prepare("DELETE FROM tokens WHERE hash=?").run(tokenHash(token));
    });
    res.json({ message: "Your email has been verified." });
  } catch (e) {
    next(e);
  }
});
app.post("/api/auth/change-password", auth, write, (req, res, next) => {
  try {
    if (req.session.user?.demo)
      throw fail(
        "Password changes are unavailable for the development account",
      );
    const data = z
      .object({ current: z.string().min(1).max(200), password: passwordSchema })
      .parse(req.body);
    const u = db
      .prepare("SELECT * FROM users WHERE id=?")
      .get(req.session.user!.id) as DbUser;
    if (!verifyPassword(data.current, u.password))
      throw fail("Current password is incorrect");
    db.prepare(
      "UPDATE users SET password=?,verified=1,session_version=session_version+1 WHERE id=?",
    ).run(hashPassword(data.password), u.id);
    req.session.version = u.session_version + 1;
    audit(u.email, "Changed password", "account");
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});
app.post(
  "/api/storefront/reservations",
  rateLimit({
    windowMs: 15 * 60000,
    limit: 10,
    standardHeaders: "draft-8",
    legacyHeaders: false,
  }),
  createReservation,
);
app.use("/api/admin", auth);
app.get("/api/admin/settings", (_req, res) => res.json(settings()));
app.put("/api/admin/settings", write, admin, (req, res, next) => {
  try {
    const data = settingsSchema.parse(req.body);
    saveSettings(data);
    audit(req.session.user!.email, "Updated store settings", "settings");
    res.json(data);
  } catch (e) {
    next(e);
  }
});
app.put("/api/admin/profile", write, (req, res, next) => {
  try {
    const { name } = z
      .object({ name: z.string().trim().min(1).max(100) })
      .parse(req.body);
    if (!req.session.user!.demo)
      db.prepare("UPDATE users SET name=? WHERE id=?").run(
        name,
        req.session.user!.id,
      );
    req.session.user!.name = name;
    res.json(req.session.user);
  } catch (e) {
    next(e);
  }
});
const schemas: Partial<Record<Entity, z.ZodType>> = {
  products: productSchema,
  variants: variantSchema,
  customers: customerSchema,
  coupons: couponSchema,
  content: contentSchema,
  support: supportSchema,
  returns: returnSchema,
};
function checkEntity(entity: string): asserts entity is Entity {
  if (!entities.includes(entity as Entity))
    throw fail("Resource not found", 404);
}
function ensureWriteRole(req: Request, entity: Entity) {
  const role = req.session.user!.role;
  if (["staff", "audit"].includes(entity) && role !== "admin")
    throw fail("Administrator permission required", 403);
  if (
    role === "support" &&
    !["customers", "support", "returns"].includes(entity)
  )
    throw fail("Your role cannot modify this resource", 403);
}
function validateReferences(entity: Entity, data: any, id?: string) {
  if (
    entity === "products" &&
    list(entity).some((r) => r.sku === data.sku && r.id !== id)
  )
    throw fail("Product SKU already exists");
  if (entity === "variants") {
    if (!get("products", data.productId))
      throw fail("Select an existing product");
    if (
      list(entity).some(
        (r) =>
          r.id !== id &&
          (r.sku === data.sku ||
            (r.productId === data.productId &&
              r.finish === data.finish &&
              r.size === data.size)),
      )
    )
      throw fail("Variant SKU or finish/size combination already exists");
  }
  if (
    entity === "coupons" &&
    list(entity).some((r) => r.code === data.code && r.id !== id)
  )
    throw fail("Coupon code already exists");
  if (entity === "support" && !get("customers", data.customerId))
    throw fail("Select an existing customer");
  if (entity === "returns" && !get("orders", data.orderId))
    throw fail("Select an existing order");
}
app.get("/api/admin/data/:entity", (req, res, next) => {
  try {
    const entity = String(req.params.entity);
    checkEntity(entity);
    if (entity === "staff") {
      if (req.session.user!.role !== "admin")
        throw fail("Administrator permission required", 403);
      const users = db
        .prepare("SELECT id,name,email,role,active FROM users")
        .all();
      res.json(
        demo
          ? [
              {
                id: "development-admin",
                name: "Aion Admin",
                email: "admin@example.test",
                role: "admin",
                status: "active",
                createdAt: new Date().toISOString(),
              },
              ...users.map((u: any) => ({
                ...u,
                status: u.active ? "active" : "inactive",
              })),
            ]
          : users.map((u: any) => ({
              ...u,
              status: u.active ? "active" : "inactive",
            })),
      );
      return;
    }
    if (entity === "audit" && req.session.user!.role !== "admin")
      throw fail("Administrator permission required", 403);
    res.json(list(entity));
  } catch (e) {
    next(e);
  }
});
app.post("/api/admin/data/:entity", write, (req, res, next) => {
  try {
    const entity = String(req.params.entity);
    checkEntity(entity);
    ensureWriteRole(req, entity);
    const schema = schemas[entity];
    if (!schema)
      throw fail("Use the dedicated workflow for this resource", 405);
    const data = schema.parse(req.body) as any;
    const row = transaction(() => {
      validateReferences(entity, data);
      const r = put(entity, entity === "coupons" ? { ...data, used: 0 } : data);
      audit(req.session.user!.email, `Created ${entity}`, r.id);
      return r;
    });
    res.status(201).json(row);
  } catch (e) {
    next(e);
  }
});
app.put("/api/admin/data/:entity/:id", write, (req, res, next) => {
  try {
    const entity = String(req.params.entity),
      id = String(req.params.id);
    checkEntity(entity);
    ensureWriteRole(req, entity);
    const old = get(entity, id);
    if (!old) throw fail("Record not found", 404);
    const schema = schemas[entity];
    if (!schema)
      throw fail("Use the dedicated workflow for this resource", 405);
    const data = schema.parse(req.body) as any;
    const row = transaction(() => {
      validateReferences(entity, data, id);
      if (entity === "variants" && data.stock !== old.stock)
        throw fail("Use stock adjustment to change inventory");
      const r = put(entity, { ...old, ...data });
      audit(req.session.user!.email, `Updated ${entity}`, id);
      return r;
    });
    res.json(row);
  } catch (e) {
    next(e);
  }
});
app.delete("/api/admin/data/:entity/:id", write, (req, res, next) => {
  try {
    const entity = String(req.params.entity),
      id = String(req.params.id);
    checkEntity(entity);
    ensureWriteRole(req, entity);
    if (!["products", "variants", "coupons", "content"].includes(entity))
      throw fail("This record must be retained for audit purposes", 405);
    transaction(() => {
      if (!get(entity, id)) throw fail("Record not found", 404);
      if (
        entity === "products" &&
        list("variants").some((v) => v.productId === id)
      )
        throw fail("Archive products with variants instead of deleting them");
      if (
        entity === "variants" &&
        [...list("orders"), ...list("preorders")].some((o) =>
          o.items.some((i: any) => i.variantId === id),
        )
      )
        throw fail("Variants referenced by an order cannot be deleted");
      remove(entity, id);
      audit(req.session.user!.email, `Deleted ${entity}`, id);
    });
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});
app.post("/api/admin/inventory/adjust", write, (req, res, next) => {
  try {
    ensureWriteRole(req, "variants");
    const { variantId, delta, reason } = z
      .object({
        variantId: z.string(),
        delta: z
          .number()
          .int()
          .min(-100000)
          .max(100000)
          .refine((v) => v !== 0),
        reason: z.string().trim().min(3).max(500),
      })
      .parse(req.body);
    const result = transaction(() => {
      const v = get("variants", variantId);
      if (!v) throw fail("Variant not found", 404);
      const stock = v.stock + delta;
      if (stock < 0) throw fail("Stock cannot fall below zero");
      put("variants", { ...v, stock });
      put("inventory", {
        variantId,
        sku: v.sku,
        delta,
        before: v.stock,
        after: stock,
        reason,
        actor: req.session.user!.email,
      });
      audit(
        req.session.user!.email,
        `Adjusted stock by ${delta}: ${reason}`,
        v.sku,
      );
      return { stock };
    });
    res.json(result);
  } catch (e) {
    next(e);
  }
});
app.post("/api/admin/orders/create", write, (req, res, next) => {
  try {
    ensureWriteRole(req, "orders");
    const data = z
      .object({
        kind: z.enum(["orders", "preorders"]),
        customerId: z.string(),
        variantId: z.string(),
        quantity: z.coerce.number().int().min(1).max(1000),
        notes: z.string().max(5000).default(""),
      })
      .parse(req.body);
    const row = transaction(() => {
      const v = get("variants", data.variantId),
        c = get("customers", data.customerId);
      if (!v || !c) throw fail("Choose an existing customer and variant");
      const p = get("products", v.productId);
      if (!p || p.status !== "active" || v.status !== "available")
        throw fail("This product or variant is unavailable");
      const price = v.price === "" ? p.price : v.price;
      const id = `${data.kind === "orders" ? "AION" : "PRE"}-${randomUUID().slice(0, 8).toUpperCase()}`;
      const r = put(data.kind, {
        id,
        customerId: c.id,
        items: [
          {
            variantId: v.id,
            name: p.name,
            finish: v.finish,
            size: v.size,
            quantity: data.quantity,
            price,
          },
        ],
        total: price * data.quantity,
        paymentStatus: "pending",
        status: data.kind === "orders" ? "pending" : "reserved",
        shipping: {
          address: c.address || "",
          country: c.country || "",
          tracking: "",
        },
        notes: data.notes,
        timeline: [
          {
            at: new Date().toISOString(),
            actor: req.session.user!.email,
            text: "Manual record created; payment not collected",
          },
        ],
      });
      audit(req.session.user!.email, `Created manual ${data.kind}`, id);
      return r;
    });
    res.status(201).json(row);
  } catch (e) {
    next(e);
  }
});
app.post("/api/admin/orders/:kind/:id/action", write, (req, res, next) => {
  try {
    const kind = z.enum(["orders", "preorders"]).parse(req.params.kind),
      id = String(req.params.id);
    ensureWriteRole(req, kind);
    const { action, status, notes, tracking } = z
      .object({
        action: z.enum(["transition", "notes", "shipping", "refund"]),
        status: z.string().optional(),
        notes: z.string().max(5000).optional(),
        tracking: z.string().max(200).optional(),
      })
      .parse(req.body);
    if (action === "refund")
      throw fail(
        "Refund provider is not connected. No payment was refunded.",
        503,
      );
    const row = transaction(() => {
      const o = get(kind, id);
      if (!o) throw fail("Order not found", 404);
      let text = "";
      if (action === "transition") {
        if (!status || !canTransition(kind, o.status, status))
          throw fail("This status transition is not permitted");
        if (status === "shipped") {
          if (o.paymentStatus !== "paid")
            throw fail("Only paid orders can be shipped");
          if (!o.shipping?.tracking)
            throw fail("Add shipment tracking before shipping");
          for (const item of o.items) {
            const v = get("variants", item.variantId);
            if (!v || v.stock < item.quantity)
              throw fail("Insufficient variant stock");
            put("variants", { ...v, stock: v.stock - item.quantity });
            put("inventory", {
              variantId: v.id,
              sku: v.sku,
              delta: -item.quantity,
              before: v.stock,
              after: v.stock - item.quantity,
              reason: `Shipped ${id}`,
              actor: req.session.user!.email,
            });
          }
        }
        if (status === "converted") {
          const convertedId = `AION-${randomUUID().slice(0, 8).toUpperCase()}`;
          put("orders", {
            ...o,
            id: convertedId,
            status: "confirmed",
            preorderId: o.id,
            createdAt: new Date().toISOString(),
          });
          o.convertedOrderId = convertedId;
        }
        text = `Status changed from ${o.status} to ${status}`;
        o.status = status;
      } else if (action === "notes") {
        o.notes = notes || "";
        text = "Updated internal notes";
      } else {
        o.shipping = { ...o.shipping, tracking: tracking || "" };
        text = "Updated shipment tracking";
      }
      o.timeline = [
        ...(o.timeline || []),
        { at: new Date().toISOString(), actor: req.session.user!.email, text },
      ];
      const updated = put(kind, o);
      audit(req.session.user!.email, text, id);
      return updated;
    });
    res.json(row);
  } catch (e) {
    next(e);
  }
});
app.post(
  "/api/admin/staff",
  write,
  admin,
  asyncRoute(async (req, res) => {
    const d = z
      .object({
        name: z.string().min(1).max(100),
        email: z.email(),
        role: z.enum(["admin", "manager", "support", "viewer"]),
      })
      .parse(req.body);
    if (demo)
      throw fail(
        "Staff invitations require a configured email service and the production database",
        503,
      );
    if (!process.env.EMAIL_WEBHOOK_URL)
      throw fail("Configure transactional email before inviting staff", 503);
    const id = randomUUID(),
      token = randomBytes(32).toString("hex");
    transaction(() => {
      if (
        db
          .prepare("SELECT id FROM users WHERE email=? COLLATE NOCASE")
          .get(d.email)
      )
        throw fail("This email already has an account");
      db.prepare(
        "INSERT INTO users(id,email,name,password,role,verified) VALUES(?,?,?,?,?,0)",
      ).run(
        id,
        d.email.toLowerCase(),
        d.name,
        hashPassword(randomBytes(48).toString("hex")),
        d.role,
      );
      db.prepare("INSERT INTO tokens VALUES(?,?,?,?)").run(
        tokenHash(token),
        id,
        "reset",
        Date.now() + 30 * 60000,
      );
    });
    await sendEmail(
      d.email,
      "Set up your Aion admin account",
      `${process.env.APP_ORIGIN}/reset-password?token=${token}`,
    );
    audit(req.session.user!.email, "Invited staff", d.email);
    res.status(201).json({ ok: true });
  }),
);
app.put("/api/admin/staff/:id", write, admin, (req, res, next) => {
  try {
    const d = z
      .object({
        role: z.enum(["admin", "manager", "support", "viewer"]),
        status: z.enum(["active", "inactive"]),
      })
      .parse(req.body);
    if (req.params.id === req.session.user!.id)
      throw fail("You cannot change your own role or disable your own account");
    const result = db
      .prepare(
        "UPDATE users SET role=?,active=?,session_version=session_version+1 WHERE id=?",
      )
      .run(d.role, d.status === "active" ? 1 : 0, String(req.params.id));
    if (!result.changes) throw fail("Staff account not found", 404);
    audit(
      req.session.user!.email,
      "Updated staff access",
      String(req.params.id),
    );
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});
app.use("/api", (_req, res) =>
  res.status(404).json({ error: "API endpoint not found" }),
);
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof z.ZodError) {
    res.status(422).json({
      error: err.issues
        .map((i) => `${i.path.join(".") || "Form"}: ${i.message}`)
        .join("; "),
    });
    return;
  }
  const status = err.status || 500;
  if (status === 500) console.error("Admin API error:", err.message);
  res.status(status).json({
    error: status === 500 ? "An unexpected server error occurred" : err.message,
  });
});
seedDemo();
