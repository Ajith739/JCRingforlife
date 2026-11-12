import { list, put, demo } from "./db.js";
import { images, finishes } from "../../shared/types.js";
export function seedDemo() {
    if (!demo || list("products").length)
        return;
    const now = Date.now();
    const date = (days) => new Date(now - days * 86400000).toISOString();
    put("products", {
        id: "ring-founder",
        name: "Aion Smart Ring",
        sku: "AION-FOUNDER",
        category: "Smart rings",
        price: 149,
        status: "active",
        description: "Founder Edition. Titanium design. Three finishes, one healthier you.",
        image: images.Midnight,
    });
    put("products", {
        id: "sizing-kit",
        name: "Aion Sizing Kit",
        sku: "AION-SIZING",
        category: "Accessories",
        price: 0,
        status: "active",
        description: "Find your perfect fit before your ring arrives.",
        image: images.Silver,
    });
    finishes.forEach((finish, f) => Array.from({ length: 8 }, (_, i) => put("variants", {
        id: `variant-${f}-${i + 6}`,
        productId: "ring-founder",
        finish,
        size: i + 6,
        sku: `AION-${["MD", "SL", "RG"][f]}-${i + 6}`,
        stock: (i * 13 + f * 19) % 85,
        threshold: 10,
        price: "",
        status: "available",
        image: images[finish],
    })));
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
    names.forEach((name, i) => put("customers", {
        id: `customer-${i}`,
        name,
        email: `customer${i + 1}@example.test`,
        phone: "",
        country: ["India", "United States", "Singapore", "United Kingdom"][i % 4],
        address: "Development address — not a real customer",
        status: "active",
        notes: "Synthetic development record",
        createdAt: date(40 + i),
    }));
    for (let i = 0; i < 92; i++) {
        const f = i % 3, size = 6 + (i % 8), customerId = `customer-${i % 12}`, isPre = i % 4 === 0;
        const state = isPre
            ? ["reserved", "sizing", "confirmed", "converted", "cancelled"][i % 5]
            : [
                "confirmed",
                "processing",
                "shipped",
                "delivered",
                "delivered",
                "pending",
                "cancelled",
            ][i % 7];
        put(isPre ? "preorders" : "orders", {
            id: `${isPre ? "PRE" : "AION"}-${1048 + i}`,
            customerId,
            items: [
                {
                    variantId: `variant-${f}-${size}`,
                    name: "Aion Smart Ring",
                    finish: finishes[f],
                    size,
                    quantity: 1 + (i % 10 === 0 ? 1 : 0),
                    price: 149,
                },
            ],
            total: 149 * (1 + (i % 10 === 0 ? 1 : 0)),
            paymentStatus: i % 9 === 0 ? "pending" : "paid",
            status: state,
            shipping: {
                address: "Development shipping address",
                city: "Sample city",
                country: "India",
                tracking: "",
            },
            notes: "",
            timeline: [
                {
                    at: date(i % 31),
                    text: "Development order created",
                    actor: "Development seed",
                },
            ],
            createdAt: date(i % 31),
        });
    }
    put("coupons", {
        code: "FOUNDER15",
        type: "percentage",
        amount: 15,
        limit: 100,
        used: 0,
        start: new Date(now - 86400000).toISOString().slice(0, 10),
        end: new Date(now + 30 * 86400000).toISOString().slice(0, 10),
        status: "active",
    });
    put("content", {
        title: "Meet your everyday wellness companion",
        type: "banner",
        body: "Aion Smart Ring · Founder Edition",
        url: "/preorder",
        status: "draft",
    });
    put("support", {
        subject: "Help choosing the right ring size",
        customerId: "customer-0",
        priority: "normal",
        status: "open",
        notes: "Synthetic support ticket.",
    });
    put("returns", {
        orderId: "AION-1051",
        reason: "Size exchange",
        type: "replacement",
        status: "requested",
        notes: "Synthetic replacement request.",
    });
    put("audit", {
        actor: "Development seed",
        action: "Initialized isolated development dataset",
        target: "demo database",
        status: "recorded",
    });
}
