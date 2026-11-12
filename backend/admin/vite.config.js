import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  envDir: "../..",
  plugins: [react()],
  publicDir: false,
  build: {
    outDir: "../../dist/admin",
    assetsDir: "admin-assets",
    emptyOutDir: true,
  },
  server: {
    port: 5174,
    fs: { allow: ["../.."] },
    proxy: {
      "/api": "http://127.0.0.1:3001",
      "/assets": "http://localhost:5173",
    },
  },
});
