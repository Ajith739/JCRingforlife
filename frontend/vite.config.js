import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL(".", import.meta.url));
export default defineConfig({
  root,
  envDir: "..",
  plugins: [react()],
  resolve: { alias: { "@": root + "src" } },
  build: { outDir: "../dist/frontend", emptyOutDir: true },
  server: {
    port: 5173,
    host: true,
    fs: { allow: [".."] },
    proxy: { "/api": "http://127.0.0.1:3001" },
  },
  preview: { port: 5173, host: true },
});
