import { finishes, images } from "../src/admin/types";
import { list, put, transaction, audit, db } from "./db";
if (list("products").some((p) => p.sku === "AION-FOUNDER")) {
  console.log("Founder catalog already exists; no records changed.");
} else
  transaction(() => {
    const product = put("products", {
      name: "Aion Smart Ring",
      sku: "AION-FOUNDER",
      price: 149,
      category: "Smart rings",
      status: "draft",
      description:
        "Founder Edition smart ring. Review price and availability before activating.",
      image: images.Midnight,
    });
    finishes.forEach((finish, i) =>
      Array.from({ length: 8 }, (_, n) =>
        put("variants", {
          productId: product.id,
          finish,
          size: n + 6,
          sku: `AION-${["MD", "SL", "RG"][i]}-${n + 6}`,
          stock: 0,
          threshold: 10,
          price: "",
          status: "available",
          image: images[finish],
        }),
      ),
    );
    audit(
      "Catalog setup",
      "Created draft founder product and 24 zero-stock variants",
      product.id,
    );
    console.log(
      "Draft product and 24 zero-stock variants created. Review and activate the product in /admin/products before opening reservations.",
    );
  });
db.close();
