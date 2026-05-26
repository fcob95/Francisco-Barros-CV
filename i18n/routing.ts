import { defineRouting } from "next-intl/routing";

/**
 * Single source of truth for locale routing.
 *
 * Decisions (ADR / PLAN §F3):
 * - locales `es` + `en`; `es` is the default.
 * - `localePrefix: 'as-needed'` → ES served at the root (`/`, `/about`, ...),
 *   EN served under `/en` (`/en`, `/en/about`, ...).
 * - Path slugs stay in English for ALL locales (DESIGN_BRIEF §2), so no
 *   `pathnames` map is needed: the segment is identical across locales.
 */
export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "as-needed",
});

export type AppLocale = (typeof routing.locales)[number];
