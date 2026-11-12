import { z } from "zod";
import { randomUUID } from "node:crypto";
import { audit, demo, list, put, transaction } from "./db.js";
const short = z.string().trim().min(1).max(200);
const schema = z.object({
    requestId: z.uuid(),
    details: z.object({
        first_name: short,
        last_name: short,
        email: z.email(),
        phone_code: z.string().max(8),
        phone: z.string().min(6).max(40),
        referral_source: short,
        address: short,
        city: short,
        state: short,
        zip_code: short,
        country: short,
    }),
    rings: z
        .array(z.object({
        ring_color: z.enum(["midnight", "silver", "rose"]),
        ring_size: z.coerce.number().int().min(6).max(13),
        quantity: z.coerce.number().int().min(1).max(100),
    }))
        .min(1)
        .max(10),
});
export function createReservation(req, res, next) {
    try {
        const body = schema.parse(req.body);
        const row = transaction(() => {
            const existing = list("preorders").find((p) => p.requestId === body.requestId);
            if (existing)
                return existing;
            const product = list("products").find((p) => p.sku === (process.env.PREORDER_PRODUCT_SKU || "AION-FOUNDER") &&
                p.status === "active");
            if (!product)
                throw Object.assign(new Error("Reservations are not available yet. Please contact the store."), { status: 503 });
            const finish = {
                midnight: "Midnight",
                silver: "Silver",
                rose: "Rose Gold",
            };
            const variants = list("variants");
            const items = body.rings.map((r) => {
                const variant = variants.find((v) => v.productId === product.id &&
                    v.finish === finish[r.ring_color] &&
                    v.size === r.ring_size &&
                    v.status === "available");
                if (!variant)
                    throw Object.assign(new Error(`The selected ${finish[r.ring_color]} size ${r.ring_size} is not available for reservation.`), { status: 422 });
                return {
                    variantId: variant.id,
                    name: product.name,
                    finish: variant.finish,
                    size: variant.size,
                    quantity: r.quantity,
                    price: variant.price === "" ? product.price : variant.price,
                };
            });
            const d = body.details;
            let customer = list("customers").find((c) => c.email.toLowerCase() === d.email.toLowerCase());
            if (!customer)
                customer = put("customers", {
                    name: `${d.first_name} ${d.last_name}`,
                    email: d.email.toLowerCase(),
                    phone: `+${d.phone_code} ${d.phone}`,
                    country: d.country,
                    address: [d.address, d.city, d.state, d.zip_code, d.country].join(", "),
                    status: "active",
                    notes: "",
                });
            const id = `PRE-${randomUUID().slice(0, 8).toUpperCase()}`;
            const preorder = put("preorders", {
                id,
                requestId: body.requestId,
                customerId: customer.id,
                items,
                total: Math.round(items.reduce((s, i) => s + i.price * i.quantity, 0) * 100) / 100,
                paymentStatus: "pending",
                status: "reserved",
                shipping: {
                    address: d.address,
                    city: d.city,
                    state: d.state,
                    postalCode: d.zip_code,
                    country: d.country,
                    tracking: "",
                },
                notes: `Storefront reservation. Referral: ${d.referral_source}`,
                timeline: [
                    {
                        at: new Date().toISOString(),
                        actor: "Storefront",
                        text: "Unpaid reservation received from storefront",
                    },
                ],
            });
            audit("Storefront", "Received reservation", id);
            return preorder;
        });
        res.status(201).json({ id: row.id, demo, emailSent: false });
    }
    catch (e) {
        next(e);
    }
}
