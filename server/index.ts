import { app } from "./app";
import { routeStatus } from "./routes";
import express from "express";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
const dist = resolve("dist");
if (existsSync(resolve(dist, "index.html"))) {
  app.use(express.static(dist));
  app.get("/{*path}", (req, res) => {
    res
      .status(routeStatus(req.path))
      .type("html")
      .send(readFileSync(resolve(dist, "index.html")));
  });
}
const port = Number(process.env.PORT || 3001);
app.listen(port, "127.0.0.1", () =>
  console.log(`Aion admin API listening at http://localhost:${port}`),
);
