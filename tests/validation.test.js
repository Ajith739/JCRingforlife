import { describe, it, expect } from "vitest";
import { routeStatus } from "../backend/api/src/routes.js";
import { canTransition, productSchema, variantSchema, couponSchema, passwordSchema, } from "../backend/shared/validation.js";
describe("Commerce invariants", () => {
    it("keeps reservation and fulfillment transitions distinct", () => {
        expect(canTransition("preorders", "reserved", "shipped")).toBe(false);
        expect(canTransition("preorders", "confirmed", "converted")).toBe(true);
        expect(canTransition("orders", "processing", "shipped")).toBe(true);
        expect(canTransition("orders", "delivered", "pending")).toBe(false);
        expect(canTransition("orders", "cancelled", "shipped")).toBe(false);
    });
    it("rejects negative prices and stock", () => {
        expect(productSchema.safeParse({
            name: "Ring",
            sku: "AION",
            price: -1,
            category: "Rings",
            status: "active",
        }).success).toBe(false);
        expect(variantSchema.safeParse({
            productId: "ring",
            finish: "Midnight",
            size: 6,
            sku: "MD6",
            stock: -1,
        }).success).toBe(false);
    });
    it("accepts only ring sizes 6–13 and supported finishes", () => {
        for (const size of [5, 14, 6.5])
            expect(variantSchema.safeParse({
                productId: "ring",
                finish: "Silver",
                size,
                sku: "SL6",
                stock: 0,
            }).success).toBe(false);
        expect(variantSchema.safeParse({
            productId: "ring",
            finish: "Silver",
            size: 6,
            sku: "SL6",
            stock: 0,
        }).success).toBe(true);
    });
    it("rejects percentages above 100 and reversed coupon dates", () => {
        const coupon = {
            code: "SAVE",
            type: "percentage",
            amount: 101,
            limit: 10,
            start: "2026-11-01",
            end: "2026-11-30",
            status: "active",
        };
        expect(couponSchema.safeParse(coupon).success).toBe(false);
        expect(couponSchema.safeParse({ ...coupon, amount: 10, end: "2026-10-01" })
            .success).toBe(false);
    });
    it("requires strong passwords", () => {
        expect(passwordSchema.safeParse("short").success).toBe(false);
        expect(passwordSchema.safeParse("LongSecurePass42").success).toBe(true);
    });
});
it("returns the correct server status for utility and unknown routes", () => {
    expect(routeStatus("/404")).toBe(404);
    expect(routeStatus("/403")).toBe(403);
    expect(routeStatus("/500")).toBe(500);
    expect(routeStatus("/maintenance")).toBe(503);
    expect(routeStatus("/admin/unrelated")).toBe(404);
    expect(routeStatus("/admin/reports/sales")).toBe(200);
    expect(routeStatus("/preorder")).toBe(200);
});
it("preserves an empty variant override instead of coercing it to a free price", () => {
    const v = variantSchema.parse({
        productId: "ring",
        finish: "Silver",
        size: 8,
        sku: "SL8",
        stock: 0,
        price: "",
    });
    expect(v.price).toBe("");
});
