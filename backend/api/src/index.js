import { app } from "./app.js";
import { routeStatus } from "./routes.js";
import express from "express";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
const storefront = resolve("dist/frontend");
const admin = resolve("dist/admin");
if (existsSync(resolve(storefront, "index.html"))) {
  app.use(express.static(storefront, { index: false }));
  app.use(express.static(admin, { index: false }));
  app.get("/{*path}", (req, res) => {
    const adminRoute =
      req.path === "/admin" ||
      req.path.startsWith("/admin/") ||
      /^\/(login|forgot-password|reset-password|verify-email|lock-screen|logout|coming-soon|maintenance|403|404|500)$/.test(
        req.path,
      );
    const html = resolve(adminRoute ? admin : storefront, "index.html");
    if (!existsSync(html))
      return res.status(503).send("Application build unavailable");
    res.status(routeStatus(req.path)).type("html").send(readFileSync(html));
  });
}
const port = Number(process.env.PORT || 3001);
app.listen(port, "127.0.0.1", () =>
  console.log(`JCRingforlife API listening at http://localhost:${port}`),
);
