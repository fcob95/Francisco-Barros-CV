import { routing } from "@/i18n/routing";
import type { Locale } from "@/lib/content";

/**
 * SEO URL primitives. Single place that knows how to turn a logical path +
 * locale into an absolute URL respecting `localePrefix: 'as-needed'` (ES at the
 * root, EN under `/en`). Everything SEO-facing (metadata alternates, sitemap,
 * robots, JSON-LD, OG) builds on these so the prefixing rule lives in one spot.
 */

/**
 * Site origin, no trailing slash. Sourced from `NEXT_PUBLIC_SITE_URL` (set in
 * `.env.local`; placeholder `https://franciscobarros.cl`). Falls back to the
 * placeholder so metadata/sitemap never emit a relative or empty base during a
 * build that lacks the env (e.g. CI without secrets).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://franciscobarros.cl"
).replace(/\/$/, "");

/** Normalize a logical path to a leading-slash, no-trailing-slash form. "" → "/". */
function normalizePath(path: string): string {
  if (!path || path === "/") return "/";
  const withLead = path.startsWith("/") ? path : `/${path}`;
  return withLead.length > 1 ? withLead.replace(/\/$/, "") : withLead;
}

/**
 * Locale-prefixed pathname for a logical path. ES (default) gets no prefix; EN
 * is served under `/en`. Mirrors `localePrefix: 'as-needed'`.
 *   pathname("/projects", "es") → "/projects"
 *   pathname("/projects", "en") → "/en/projects"
 *   pathname("/", "en")         → "/en"
 */
export function pathname(path: string, locale: Locale): string {
  const p = normalizePath(path);
  if (locale === routing.defaultLocale) return p;
  return p === "/" ? `/${locale}` : `/${locale}${p}`;
}

/** Absolute URL for a logical path in a given locale. */
export function absoluteUrl(path: string, locale: Locale): string {
  return `${SITE_URL}${pathname(path, locale)}`;
}

/**
 * hreflang `languages` map for a logical path: one entry per locale plus an
 * `x-default` pointing at the default locale (ES). Values are absolute URLs,
 * which is what Next.js `alternates.languages` expects.
 */
export function languageAlternates(path: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const locale of routing.locales) {
    map[locale] = absoluteUrl(path, locale);
  }
  map["x-default"] = absoluteUrl(path, routing.defaultLocale);
  return map;
}
