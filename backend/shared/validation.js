import { z } from "zod";
const text = z.string().trim().min(1).max(200);
const optional = z.string().max(5000).default("");
const status = z.enum(["draft", "active", "archived"]);
const image = z
    .string()
    .max(1000)
    .refine((v) => v === "" || v.startsWith("/assets/") || /^https:\/\//.test(v), "Use a local asset or HTTPS image URL")
    .default("");
export const productSchema = z.object({
    name: text,
    sku: text,
    price: z.coerce.number().min(0).max(1000000),
    category: text,
    status,
    description: optional,
    image,
});
export const variantSchema = z.object({
    productId: text,
    finish: z.enum(["Midnight", "Silver", "Rose Gold"]),
    size: z.coerce.number().int().min(6).max(13),
    sku: text,
    stock: z.coerce.number().int().min(0).max(1000000),
    threshold: z.coerce.number().int().min(0).max(100000).default(10),
    price: z
        .union([z.literal(""), z.coerce.number().min(0).max(1000000)])
        .default(""),
    status: z.enum(["available", "unavailable"]).default("available"),
    image,
});
export const customerSchema = z.object({
    name: text,
    email: z.email(),
    phone: z.string().max(40).default(""),
    country: z.string().max(100).default(""),
    address: optional,
    status: z.enum(["active", "inactive"]).default("active"),
    notes: optional,
});
export const couponSchema = z
    .object({
    code: z
        .string()
        .trim()
        .min(3)
        .max(40)
        .transform((v) => v.toUpperCase()),
    type: z.enum(["percentage", "fixed"]),
    amount: z.coerce.number().positive().max(100000),
    limit: z.coerce.number().int().positive(),
    start: z.iso.date(),
    end: z.iso.date(),
    status: z.enum(["active", "inactive"]),
})
    .refine((v) => v.end >= v.start, "End date must follow start date")
    .refine((v) => v.type !== "percentage" || v.amount <= 100, "Percentage cannot exceed 100");
export const contentSchema = z.object({
    title: text,
    type: z.enum(["banner", "faq", "product"]),
    body: optional,
    url: z
        .string()
        .max(1000)
        .refine((v) => !v || v.startsWith("/") || v.startsWith("https://"), "Use a relative or HTTPS URL")
        .default(""),
    status: z.enum(["draft", "published"]),
});
export const supportSchema = z.object({
    subject: text,
    customerId: text,
    priority: z.enum(["low", "normal", "high"]),
    status: z.enum(["open", "in_progress", "resolved"]),
    notes: optional,
});
export const returnSchema = z.object({
    orderId: text,
    reason: text,
    type: z.enum(["return", "replacement"]),
    status: z.enum(["requested", "approved", "received", "closed", "rejected"]),
    notes: optional,
});
export const passwordSchema = z
    .string()
    .min(12, "Use at least 12 characters")
    .max(200)
    .regex(/[A-Z]/, "Include an uppercase letter")
    .regex(/[a-z]/, "Include a lowercase letter")
    .regex(/[0-9]/, "Include a number");
export const settingsSchema = z.object({
    storeName: text,
    email: z.union([z.email(), z.literal("")]),
    currency: z.enum(["USD", "INR", "EUR", "GBP"]),
    shippingRate: z.coerce.number().min(0).max(10000),
    lowStockThreshold: z.coerce.number().int().min(0).max(10000),
    notifications: z.boolean(),
    shippingOrigin: z.string().max(300).default(""),
});
export { orderTransitions, preorderTransitions, canTransition, } from "./workflows.js";
