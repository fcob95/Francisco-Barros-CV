import { defineConfig, devices } from "@playwright/test";

// E2E contra el dev server local. Requiere navegadores instalados una vez:
//   pnpm exec playwright install
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    // next-intl `localePrefix: 'as-needed'` negotiates the root `/` locale from
    // Accept-Language. Pin Spanish so `/` deterministically serves ES (a real
    // Spanish visitor); `/en` is still asserted explicitly in the specs.
    locale: "es-CL",
    extraHTTPHeaders: { "Accept-Language": "es-CL,es;q=0.9" },
    // Pin light scheme so `defaultTheme="system"` resolves deterministically
    // (the toggle's accessible name depends on the resolved theme).
    colorScheme: "light",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    // En CI: build de producción + `next start` (representativo del bundle real).
    // En local: dev server para iteración rápida.
    command: process.env.CI ? "pnpm run build && pnpm run start" : "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
