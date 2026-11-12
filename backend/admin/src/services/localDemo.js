import { finishes, images, } from "../../../shared/types.js";
import { canTransition } from "../../../shared/workflows.js";
import { productSchema, variantSchema, customerSchema, couponSchema, contentSchema, supportSchema, returnSchema, settingsSchema, } from "../../../shared/validation.js";
const dataKey = "aion-local-demo-data-v1";
const sessionKey = "aion-local-demo-session-v1";
const rememberKey = "aion-local-demo-remember-v1";
export const demoEmail = "admin@aionrings.demo";
export const demoPassword = "AionDemo2026!";
const demoUser = {
    id: "local-demo-admin",
    name: "JCRingforlife Admin",
    email: demoEmail,
    role: "admin",
    demo: true,
};
const now = () => new Date().toISOString();
const daysAgo = (days) => new Date(Date.now() - days * 86400000).toISOString();
const collections = [
    "products",
    "variants",
    "orders",
    "preorders",
    "customers",
    "inventory",
    "coupons",
    "content",
    "support",
    "returns",
    "staff",
    "audit",
];
const defaultSettings = {
    storeName: "JCRingforlife",
    email: "",
    currency: "USD",
    shippingRate: 0,
    lowStockThreshold: 10,
    notifications: true,
    shippingOrigin: "",
};
function seed() {
    const records = Object.fromEntries(collections.map((name) => [name, []]));
    const add = (entity, row) => records[entity].unshift({
        id: row.id || crypto.randomUUID(),
        createdAt: row.createdAt || now(),
        updatedAt: now(),
        ...row,
    });
    add("products", {
        id: "ring-founder",
        name: "Aion Smart Ring",
        sku: "AION-FOUNDER",
        category: "Smart rings",
        price: 149,
        status: "active",
        description: "Founder Edition smart ring.",
        image: images.Midnight,
    });
    add("products", {
        id: "sizing-kit",
        name: "Aion Sizing Kit",
        sku: "AION-SIZING",
        category: "Accessories",
        price: 0,
        status: "active",
        description: "Find your perfect fit.",
        image: images.Silver,
    });
    finishes.forEach((finish, finishIndex) => {
        for (let size = 6; size <= 13; size++)
            add("variants", {
                id: `variant-${finishIndex}-${size}`,
                productId: "ring-founder",
                finish,
                size,
                sku: `AION-${["MD", "SL", "RG"][finishIndex]}-${size}`,
                stock: (size * 13 + finishIndex * 19) % 85,
                threshold: 10,
                price: "",
                status: "available",
                image: images[finish],
            });
    });
    const names = [
        "Aarav Mehta",
        "Emma Wilson",
        "Sofia Chen",
        "Oliver James",
        "Priya Sharma",
        "Noah Williams",
        "Isabella Rossi",
        "Arjun Patel",
        "Mia Thompson",
        "Lucas Martin",
        "Amelia Brown",
        "Liam Taylor",
    ];
    names.forEach((name, i) => add("customers", {
        id: `customer-${i}`,
        name,
        email: `customer${i + 1}@example.test`,
        phone: "",
        country: ["India", "United States", "Singapore", "United Kingdom"][i % 4],
        address: "Demo address",
        status: "active",
        notes: "Synthetic demo record",
        createdAt: daysAgo(40 + i),
    }));
    for (let i = 0; i < 92; i++) {
        const finishIndex = i % 3, size = 6 + (i % 8), preorder = i % 4 === 0;
        add(preorder ? "preorders" : "orders", {
            id: `${preorder ? "PRE" : "AION"}-${1048 + i}`,
            customerId: `customer-${i % 12}`,
            items: [
                {
                    variantId: `variant-${finishIndex}-${size}`,
                    name: "Aion Smart Ring",
                    finish: finishes[finishIndex],
                    size,
                    quantity: 1,
                    price: 149,
                },
            ],
            total: 149,
            paymentStatus: i % 9 === 0 ? "pending" : "paid",
            status: preorder
                ? ["reserved", "sizing", "confirmed", "converted", "cancelled"][i % 5]
                : [
                    "confirmed",
                    "processing",
                    "shipped",
                    "delivered",
                    "delivered",
                    "pending",
                    "cancelled",
                ][i % 7],
            shipping: {
                address: "Demo shipping address",
                city: "Sample city",
                country: "India",
                tracking: "",
            },
            notes: "",
            timeline: [
                {
                    at: daysAgo(i % 31),
                    actor: "Demo seed",
                    text: "Synthetic order created",
                },
            ],
            createdAt: daysAgo(i % 31),
        });
    }
    add("coupons", {
        code: "FOUNDER15",
        type: "percentage",
        amount: 15,
        limit: 100,
        used: 0,
        start: daysAgo(1).slice(0, 10),
        end: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
        status: "active",
    });
    add("content", {
        title: "Meet your wellness companion",
        type: "banner",
        body: "Aion Smart Ring · Founder Edition",
        url: "/preorder",
        status: "draft",
    });
    add("support", {
        subject: "Help choosing the right ring size",
        customerId: "customer-0",
        priority: "normal",
        status: "open",
        notes: "Synthetic support request",
    });
    add("returns", {
        orderId: "AION-1051",
        reason: "Size exchange",
        type: "replacement",
        status: "requested",
        notes: "Synthetic replacement request",
    });
    add("staff", {
        id: demoUser.id,
        name: demoUser.name,
        email: demoEmail,
        role: "admin",
        status: "active",
    });
    add("audit", {
        actor: "Demo seed",
        action: "Initialized browser sample data",
        target: "Local demo",
        status: "recorded",
    });
    return { records, settings: defaultSettings };
}
function read() {
    const saved = localStorage.getItem(dataKey);
    if (saved)
        try {
            return JSON.parse(saved);
        }
        catch {
            localStorage.removeItem(dataKey);
        }
    const fresh = seed();
    localStorage.setItem(dataKey, JSON.stringify(fresh));
    return fresh;
}
function write(data) {
    localStorage.setItem(dataKey, JSON.stringify(data));
}
function user() {
    const saved = sessionStorage.getItem(sessionKey) || localStorage.getItem(rememberKey);
    return saved ? demoUser : null;
}
function ensureUser() {
    if (!user())
        throw new Error("Sign in to the local demo first.");
    if (sessionStorage.getItem(`${sessionKey}-locked`) === "true")
        throw new Error("Your demo session is locked.");
}
function audit(data, action, target) {
    data.records.audit.unshift({
        id: crypto.randomUUID(),
        createdAt: now(),
        actor: demoEmail,
        action,
        target,
        status: "recorded",
    });
}
function json(options) {
    return options.body ? JSON.parse(String(options.body)) : {};
}
function saveRecord(data, entity, value, old) {
    const row = {
        ...old,
        ...value,
        id: old?.id || crypto.randomUUID(),
        createdAt: old?.createdAt || now(),
        updatedAt: now(),
    };
    if (old)
        data.records[entity] = data.records[entity].map((r) => r.id === old.id ? row : r);
    else
        data.records[entity].unshift(row);
    audit(data, `${old ? "Updated" : "Created"} ${entity}`, row.id);
    write(data);
    return row;
}
function lookup(data, entity, id) {
    return data.records[entity].find((r) => r.id === id);
}
const schemas = {
    products: productSchema,
    variants: variantSchema,
    customers: customerSchema,
    coupons: couponSchema,
    content: contentSchema,
    support: supportSchema,
    returns: returnSchema,
};
const unavailable = (feature) => {
    throw new Error(`${feature} is unavailable in the browser demo.`);
};
export async function localRequest(path, options = {}) {
    const method = (options.method || "GET").toUpperCase(), body = json(options);
    if (path === "/auth/session")
        return {
            user: user(),
            locked: sessionStorage.getItem(`${sessionKey}-locked`) === "true",
            csrf: "local-demo",
            demoAvailable: true,
            integrations: { payments: false, email: false, shipping: false },
        };
    if (path === "/auth/login" || path === "/auth/demo") {
        if (path === "/auth/login" &&
            (body.email?.toLowerCase() !== demoEmail ||
                body.password !== demoPassword))
            throw new Error("Demo email or password is incorrect.");
        sessionStorage.setItem(sessionKey, "1");
        if (body.remember)
            localStorage.setItem(rememberKey, "1");
        sessionStorage.removeItem(`${sessionKey}-locked`);
        read();
        return { ok: true };
    }
    if (path === "/auth/logout") {
        sessionStorage.removeItem(sessionKey);
        sessionStorage.removeItem(`${sessionKey}-locked`);
        localStorage.removeItem(rememberKey);
        return { ok: true };
    }
    if (path === "/auth/lock") {
        ensureUser();
        sessionStorage.setItem(`${sessionKey}-locked`, "true");
        return { ok: true };
    }
    if (path === "/auth/unlock") {
        if (!user())
            throw new Error("Sign in first.");
        if (body.password && body.password !== demoPassword)
            throw new Error("Demo password is incorrect.");
        sessionStorage.removeItem(`${sessionKey}-locked`);
        return { ok: true };
    }
    if (path.startsWith("/auth/"))
        return unavailable("Email, password reset, and account management");
    if (path === "/storefront/reservations" && method === "POST") {
        const data = read(), existing = data.records.preorders.find((p) => p.requestId === body.requestId);
        if (existing)
            return { id: existing.id, demo: true, emailSent: false };
        const details = body.details || {};
        if (!details.first_name ||
            !details.last_name ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email || ""))
            throw new Error("Enter valid reservation contact details.");
        const product = data.records.products.find((p) => p.sku === "AION-FOUNDER" && p.status === "active");
        if (!product)
            throw new Error("The demo ring is unavailable.");
        const items = (body.rings || []).map((ring) => {
            const finish = { midnight: "Midnight", silver: "Silver", rose: "Rose Gold" }[ring.ring_color];
            const variant = data.records.variants.find((v) => v.productId === product.id &&
                v.finish === finish &&
                v.size === Number(ring.ring_size));
            if (!variant)
                throw new Error("Selected ring variant is unavailable.");
            return {
                variantId: variant.id,
                name: product.name,
                finish,
                size: variant.size,
                quantity: Number(ring.quantity),
                price: variant.price === "" ? product.price : variant.price,
            };
        });
        if (!items.length)
            throw new Error("Select a ring before reserving.");
        let customer = data.records.customers.find((c) => c.email.toLowerCase() === details.email.toLowerCase());
        if (!customer)
            customer = saveRecord(data, "customers", {
                name: `${details.first_name} ${details.last_name}`,
                email: details.email.toLowerCase(),
                phone: `${details.phone_code} ${details.phone}`,
                country: details.country,
                address: details.address,
                status: "active",
                notes: "Browser demo reservation",
            });
        const id = `PRE-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
        saveRecord(data, "preorders", {
            id,
            requestId: body.requestId,
            customerId: customer.id,
            items,
            total: items.reduce((s, item) => s + item.price * item.quantity, 0),
            paymentStatus: "pending",
            status: "reserved",
            shipping: {
                address: details.address,
                city: details.city,
                country: details.country,
                tracking: "",
            },
            notes: "Browser demo reservation",
            timeline: [
                {
                    at: now(),
                    actor: "Storefront demo",
                    text: "Unpaid demo reservation received",
                },
            ],
        });
        return { id, demo: true, emailSent: false };
    }
    ensureUser();
    const data = read();
    if (path === "/admin/settings") {
        if (method === "GET")
            return data.settings;
        data.settings = settingsSchema.parse(body);
        audit(data, "Updated store settings", "settings");
        write(data);
        return data.settings;
    }
    if (path === "/admin/profile" && method === "PUT") {
        demoUser.name = String(body.name || "JCRingforlife Admin");
        audit(data, "Updated profile", demoUser.id);
        write(data);
        return demoUser;
    }
    if (path.startsWith("/admin/staff"))
        return unavailable("Staff invitations");
    if (path === "/admin/inventory/adjust" && method === "POST") {
        const variant = lookup(data, "variants", body.variantId);
        const delta = Number(body.delta);
        if (!variant ||
            !Number.isInteger(delta) ||
            !delta ||
            variant.stock + delta < 0 ||
            String(body.reason || "").trim().length < 3)
            throw new Error("Enter a valid adjustment and reason. Stock cannot be negative.");
        const before = variant.stock;
        variant.stock += delta;
        variant.updatedAt = now();
        saveRecord(data, "inventory", {
            variantId: variant.id,
            sku: variant.sku,
            delta,
            before,
            after: variant.stock,
            reason: body.reason,
            actor: demoEmail,
        });
        return { stock: variant.stock };
    }
    if (path === "/admin/orders/create" && method === "POST") {
        const kind = body.kind === "preorders" ? "preorders" : "orders";
        const customer = lookup(data, "customers", body.customerId), variant = lookup(data, "variants", body.variantId), product = variant && lookup(data, "products", variant.productId);
        if (!customer ||
            !variant ||
            !product ||
            !Number.isInteger(Number(body.quantity)) ||
            Number(body.quantity) < 1)
            throw new Error("Select an existing customer, ring variant, and quantity.");
        const id = `${kind === "orders" ? "AION" : "PRE"}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`, price = variant.price === "" ? product.price : variant.price;
        return saveRecord(data, kind, {
            id,
            customerId: customer.id,
            items: [
                {
                    variantId: variant.id,
                    name: product.name,
                    finish: variant.finish,
                    size: variant.size,
                    quantity: Number(body.quantity),
                    price,
                },
            ],
            total: price * Number(body.quantity),
            paymentStatus: "pending",
            status: kind === "orders" ? "pending" : "reserved",
            shipping: {
                address: customer.address || "",
                country: customer.country || "",
                tracking: "",
            },
            notes: body.notes || "",
            timeline: [
                {
                    at: now(),
                    actor: demoEmail,
                    text: "Manual demo record created; payment not collected",
                },
            ],
        });
    }
    const action = path.match(/^\/admin\/orders\/(orders|preorders)\/([^/]+)\/action$/);
    if (action && method === "POST") {
        const kind = action[1], order = lookup(data, kind, action[2]);
        if (!order)
            throw new Error("Order not found.");
        if (body.action === "refund")
            return unavailable("Refund processing");
        let text = "";
        if (body.action === "transition") {
            if (!canTransition(kind, order.status, body.status))
                throw new Error("This status transition is not allowed.");
            if (body.status === "shipped") {
                if (!order.shipping?.tracking)
                    throw new Error("Add tracking before shipping.");
                if (order.paymentStatus !== "paid")
                    throw new Error("Only paid orders can be shipped.");
                for (const item of order.items) {
                    const variant = lookup(data, "variants", item.variantId);
                    if (!variant || variant.stock < item.quantity)
                        throw new Error("Not enough stock to ship this order.");
                    const before = variant.stock;
                    variant.stock -= item.quantity;
                    saveRecord(data, "inventory", {
                        variantId: variant.id,
                        sku: variant.sku,
                        delta: -item.quantity,
                        before,
                        after: variant.stock,
                        reason: `Shipped ${order.id}`,
                        actor: demoEmail,
                    });
                }
            }
            if (body.status === "converted") {
                const convertedId = `AION-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
                saveRecord(data, "orders", {
                    ...order,
                    id: convertedId,
                    status: "confirmed",
                    preorderId: order.id,
                    createdAt: now(),
                });
                order.convertedOrderId = convertedId;
            }
            text = `Status changed from ${order.status} to ${body.status}`;
            order.status = body.status;
        }
        else if (body.action === "notes") {
            order.notes = body.notes || "";
            text = "Updated internal notes";
        }
        else if (body.action === "shipping") {
            order.shipping = { ...order.shipping, tracking: body.tracking || "" };
            text = "Updated shipment tracking";
        }
        else
            throw new Error("Unknown order action.");
        order.timeline = [
            ...(order.timeline || []),
            { at: now(), actor: demoEmail, text },
        ];
        return saveRecord(data, kind, order, order);
    }
    const match = path.match(/^\/admin\/data\/([a-z]+)(?:\/([^/]+))?$/);
    if (!match)
        throw new Error("This demo action is unavailable.");
    const entity = match[1], id = match[2];
    if (!collections.includes(entity))
        throw new Error("Resource not found.");
    if (method === "GET")
        return [...data.records[entity]];
    if (entity === "audit" ||
        entity === "orders" ||
        entity === "preorders" ||
        entity === "inventory" ||
        entity === "staff")
        throw new Error("Use the dedicated demo workflow for this resource.");
    const old = id ? lookup(data, entity, id) : undefined;
    if (id && !old)
        throw new Error("Record not found.");
    if (method === "DELETE") {
        if (!["products", "variants", "coupons", "content"].includes(entity))
            throw new Error("This record must be retained.");
        if (entity === "products" &&
            data.records.variants.some((v) => v.productId === id))
            throw new Error("Archive products with variants instead.");
        data.records[entity] = data.records[entity].filter((r) => r.id !== id);
        audit(data, `Deleted ${entity}`, id);
        write(data);
        return { ok: true };
    }
    if (method === "POST" || method === "PUT") {
        const value = schemas[entity]?.parse(body) || body;
        if (entity === "products" &&
            data.records.products.some((r) => r.sku === value.sku && r.id !== id))
            throw new Error("Product SKU already exists.");
        if (entity === "variants") {
            if (!lookup(data, "products", value.productId))
                throw new Error("Select an existing product.");
            if (data.records.variants.some((r) => r.id !== id &&
                (r.sku === value.sku ||
                    (r.productId === value.productId &&
                        r.finish === value.finish &&
                        r.size === value.size))))
                throw new Error("Variant SKU or finish/size already exists.");
            if (old && old.stock !== value.stock)
                throw new Error("Use Inventory to adjust stock.");
        }
        if (entity === "coupons" &&
            data.records.coupons.some((r) => r.code === value.code && r.id !== id))
            throw new Error("Coupon code already exists.");
        if (entity === "support" && !lookup(data, "customers", value.customerId))
            throw new Error("Select an existing customer.");
        if (entity === "returns" && !lookup(data, "orders", value.orderId))
            throw new Error("Select an existing order.");
        return saveRecord(data, entity, value, old);
    }
    throw new Error("This demo action is unavailable.");
}
export function isLocalDemo() {
    return import.meta.env.DEV && import.meta.env.VITE_ADMIN_DATA_MODE !== "api";
}
