import "dotenv/config";
import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { randomUUID } from "node:crypto";
import type { Entity, RecordData } from "../src/admin/types";
export const demo =
  process.env.NODE_ENV !== "production" && process.env.ADMIN_DEMO === "true";
const configuredPath = process.env.DATABASE_PATH || ".data/aion.sqlite";
const dbPath = resolve(
  demo
    ? configuredPath.replace(/(\.sqlite)?$/, ".demo.sqlite")
    : configuredPath,
);
mkdirSync(dirname(dbPath), { recursive: true, mode: 0o700 });
export const db = new DatabaseSync(dbPath);
db.exec(`PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON;
CREATE TABLE IF NOT EXISTS records (id TEXT PRIMARY KEY,entity TEXT NOT NULL,data TEXT NOT NULL);
CREATE INDEX IF NOT EXISTS records_entity ON records(entity);
CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY,email TEXT UNIQUE NOT NULL,name TEXT NOT NULL,password TEXT NOT NULL,role TEXT NOT NULL DEFAULT 'admin',active INTEGER NOT NULL DEFAULT 1,verified INTEGER NOT NULL DEFAULT 1,session_version INTEGER NOT NULL DEFAULT 0);
CREATE TABLE IF NOT EXISTS sessions (sid TEXT PRIMARY KEY,data TEXT NOT NULL,expires INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS tokens (hash TEXT PRIMARY KEY,user_id TEXT NOT NULL,kind TEXT NOT NULL,expires INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY CHECK(id=1),data TEXT NOT NULL);`);
export const entities: Entity[] = [
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
export const list = (entity: string): RecordData[] =>
  (
    db
      .prepare("SELECT data FROM records WHERE entity=? ORDER BY rowid DESC")
      .all(entity) as { data: string }[]
  ).map((r) => JSON.parse(r.data));
export const get = (entity: string, id: string): RecordData | undefined => {
  const r = db
    .prepare("SELECT data FROM records WHERE entity=? AND id=?")
    .get(entity, id) as { data: string } | undefined;
  return r ? JSON.parse(r.data) : undefined;
};
export const put = (entity: string, data: Record<string, any>) => {
  const row = {
    ...data,
    id: data.id || randomUUID(),
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as RecordData;
  db.prepare(
    "INSERT INTO records(id,entity,data) VALUES(?,?,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data",
  ).run(row.id, entity, JSON.stringify(row));
  return row;
};
export const remove = (entity: string, id: string) =>
  db.prepare("DELETE FROM records WHERE entity=? AND id=?").run(entity, id);
export function transaction<T>(fn: () => T): T {
  db.exec("BEGIN IMMEDIATE");
  try {
    const r = fn();
    db.exec("COMMIT");
    return r;
  } catch (e) {
    db.exec("ROLLBACK");
    throw e;
  }
}
export const audit = (actor: string, action: string, target: string) =>
  put("audit", { actor, action, target, status: "recorded" });
export function settings() {
  const r = db.prepare("SELECT data FROM settings WHERE id=1").get() as
    { data: string } | undefined;
  return r
    ? JSON.parse(r.data)
    : {
        storeName: "Aion Rings",
        email: "",
        currency: "USD",
        shippingRate: 0,
        lowStockThreshold: 10,
        notifications: true,
      };
}
export function saveSettings(value: unknown) {
  db.prepare(
    "INSERT INTO settings(id,data) VALUES(1,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data",
  ).run(JSON.stringify(value));
}
