import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  root: path.resolve(import.meta.dirname, "client"),

  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  server: {
    host: "127.0.0.1",
    strictPort: true,
    hmr: {
      host: "127.0.0.1",
    },
    fs: {
      strict: true,
      allow: [path.resolve(import.meta.dirname, "client"), path.resolve(import.meta.dirname, "shared")],
      deny: [".env", ".env.*", "*.pem", "*.key"],
    },
  },
  
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
});
