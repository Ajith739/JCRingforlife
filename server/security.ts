import {
  randomBytes,
  scryptSync,
  timingSafeEqual,
  createHash,
} from "node:crypto";
import session from "express-session";
import { db } from "./db";
export const hashPassword = (password: string) => {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
};
export function verifyPassword(password: string, stored: string) {
  const [salt, hex] = stored.split(":");
  if (!salt || !hex) return false;
  const actual = scryptSync(password, salt, 64);
  const expected = Buffer.from(hex, "hex");
  return expected.length === actual.length && timingSafeEqual(actual, expected);
}
export const tokenHash = (token: string) =>
  createHash("sha256").update(token).digest("hex");
export class SQLiteSessionStore extends session.Store {
  get(sid: string, cb: (err: any, value?: session.SessionData | null) => void) {
    try {
      const r = db
        .prepare("SELECT data FROM sessions WHERE sid=? AND expires>?")
        .get(sid, Date.now()) as { data: string } | undefined;
      cb(null, r ? JSON.parse(r.data) : null);
    } catch (e) {
      cb(e);
    }
  }
  set(sid: string, value: session.SessionData, cb?: (err?: any) => void) {
    try {
      const expires = value.cookie.expires
        ? new Date(value.cookie.expires).getTime()
        : Date.now() + 8 * 3600000;
      db.prepare("DELETE FROM sessions WHERE expires < ?").run(Date.now());
      db.prepare(
        "INSERT INTO sessions(sid,data,expires) VALUES(?,?,?) ON CONFLICT(sid) DO UPDATE SET data=excluded.data,expires=excluded.expires",
      ).run(sid, JSON.stringify(value), expires);
      cb?.();
    } catch (e) {
      cb?.(e);
    }
  }
  destroy(sid: string, cb?: (err?: any) => void) {
    try {
      db.prepare("DELETE FROM sessions WHERE sid=?").run(sid);
      cb?.();
    } catch (e) {
      cb?.(e);
    }
  }
}
