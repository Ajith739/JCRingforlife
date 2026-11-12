import { createInterface } from "node:readline/promises";
import { randomUUID } from "node:crypto";
import { db, demo } from "./db";
import { hashPassword } from "./security";
import { passwordSchema } from "./validation";
if (demo) throw new Error("Disable ADMIN_DEMO to create a real administrator");
const rl = createInterface({ input: process.stdin, output: process.stdout });
const email = (process.env.ADMIN_EMAIL || (await rl.question("Admin email: ")))
  .trim()
  .toLowerCase();
const name = process.env.ADMIN_NAME || (await rl.question("Display name: "));
// Password is accepted through a non-echoing stdin prompt; never stored in source.
rl.close();
async function passwordPrompt() {
  process.stdout.write(
    "Password (12+ characters, uppercase, lowercase, number): ",
  );
  process.stdin.setRawMode?.(true);
  process.stdin.resume();
  let value = "";
  return new Promise<string>((resolve) => {
    const onData = (chunk: Buffer) => {
      for (const char of chunk.toString()) {
        if (char === "\u0003") {
          process.exit(130);
        }
        if (char === "\r" || char === "\n") {
          process.stdin.setRawMode?.(false);
          process.stdin.pause();
          process.stdin.off("data", onData);
          process.stdout.write("\n");
          resolve(value);
          return;
        }
        if (char === "\u007f") {
          value = value.slice(0, -1);
        } else value += char;
      }
    };
    process.stdin.on("data", onData);
  });
}
const password = passwordSchema.parse(
  process.env.ADMIN_PASSWORD || (await passwordPrompt()),
);
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !name.trim())
  throw new Error("Valid email and name are required");
db.prepare(
  "INSERT INTO users(id,email,name,password,role) VALUES(?,?,?,?,?)",
).run(randomUUID(), email, name, hashPassword(password), "admin");
console.log("Administrator created. Sign in at /login.");
db.close();
