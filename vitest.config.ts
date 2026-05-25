import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  // Aísla Vitest del postcss.config.mjs del proyecto: Vite rechaza el plugin
  // como string ("@tailwindcss/postcss") que Next.js sí acepta. Los tests
  // jsdom no necesitan Tailwind/PostCSS, así que un config inline vacío basta.
  css: { postcss: { plugins: [] } },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.test.{ts,tsx}"],
    exclude: ["e2e/**", "node_modules/**", "design-assets/**", ".next/**"],
  },
  resolve: {
    alias: { "@": resolve(__dirname, ".") },
  },
});
