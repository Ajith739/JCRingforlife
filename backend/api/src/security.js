import { randomBytes, scryptSync, timingSafeEqual, createHash, } from "node:crypto";
import session from "express-session";
import { db } from "./db.js";
export const hashPassword = (password) => {
    const salt = randomBytes(16).toString("hex");
    return `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
};
export function verifyPassword(password, stored) {
    const [salt, hex] = stored.split(":");
    if (!salt || !hex)
        return false;
    const actual = scryptSync(password, salt, 64);
    const expected = Buffer.from(hex, "hex");
    return expected.length === actual.length && timingSafeEqual(actual, expected);
}
export const tokenHash = (token) => createHash("sha256").update(token).digest("hex");
export class SQLiteSessionStore extends session.Store {
    get(sid, cb) {
        try {
            const r = db
                .prepare("SELECT data FROM sessions WHERE sid=? AND expires>?")
                .get(sid, Date.now());
            cb(null, r ? JSON.parse(r.data) : null);
        }
        catch (e) {
            cb(e);
        }
    }
    set(sid, value, cb) {
        try {
            const expires = value.cookie.expires
                ? new Date(value.cookie.expires).getTime()
                : Date.now() + 8 * 3600000;
            db.prepare("DELETE FROM sessions WHERE expires < ?").run(Date.now());
            db.prepare("INSERT INTO sessions(sid,data,expires) VALUES(?,?,?) ON CONFLICT(sid) DO UPDATE SET data=excluded.data,expires=excluded.expires").run(sid, JSON.stringify(value), expires);
            cb?.();
        }
        catch (e) {
            cb?.(e);
        }
    }
    destroy(sid, cb) {
        try {
            db.prepare("DELETE FROM sessions WHERE sid=?").run(sid);
            cb?.();
        }
        catch (e) {
            cb?.(e);
        }
    }
}
