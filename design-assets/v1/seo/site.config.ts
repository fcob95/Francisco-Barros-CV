/**
 * seo/site.config.ts
 *
 * Single source of truth for everything SEO-related. Import this everywhere
 * (metadata builders, JSON-LD, sitemap, robots, OG routes). Change a value here
 * and it propagates across the whole site.
 *
 * Positioning (per brief): PRIMARY focus = applied AI for business
 * (automation, reporting, integrations, RAG, AI consulting). DIFFERENTIATOR =
 * pricing & revenue analytics.
 */

export const SITE = {
  /** Canonical origin — NO trailing slash. */
  url: "https://www.franciscobarroscruz.com",

  /** Default + supported locales. Data is bilingual; ES is the indexed default. */
  defaultLocale: "es" as const,
  locales: ["es", "en"] as const,

  /** Brand / person. */
  name: "Francisco Barros Cruz",
  shortName: "Francisco Barros",
  jobTitle: {
    es: "Consultor en IA aplicada a negocio · Pricing & Revenue Analytics",
    en: "Applied AI for Business Consultant · Pricing & Revenue Analytics",
  },

  /** Used as <title> suffix: "Page Title — Francisco Barros". */
  titleSuffix: "Francisco Barros",

  /** Default share image (served from /public). Replace placeholder before launch. */
  ogImage: {
    // Static fallback file; the dynamic route /og?locale=xx is preferred when available.
    path: "/og/default.png",
    width: 1200,
    height: 630,
  },

  /** Geographic targeting. */
  areaServed: {
    // Primary remote-first; named regions help local intent.
    regions: ["CL", "Latam", "ES"],
    label: {
      es: "Latinoamérica y remoto global",
      en: "Latin America and global remote",
    },
  },

  /** Contact + social profiles (sameAs for JSON-LD). */
  email: "fcobarros1995@gmail.com",
  socials: {
    linkedin: "https://linkedin.com/in/fcobarroscruz",
    github: "https://github.com/fcobarros",
  },

  /**
   * Target keywords. Order = rough priority. Used in meta keywords (low weight)
   * and — more importantly — as a checklist for natural use in headings & copy.
   */
  keywords: [
    "automatización con IA",
    "integración de IA",
    "consultoría en inteligencia artificial",
    "sistemas RAG",
    "reportería automatizada",
    "consultor IA Chile",
    "IA aplicada a negocio",
    "agentes de IA",
    "Claude para empresas",
    "pricing analytics",
    "revenue analytics",
    "automatización de procesos",
    "Power BI",
    "consultoría de datos",
  ],

  /** Twitter/X handle for twitter:site (optional — leave empty if none). */
  twitterHandle: "",

  /** Organization founding / locale info. */
  locality: {
    city: "Santiago",
    region: "Región Metropolitana",
    country: "CL",
  },
} as const;

export type Locale = (typeof SITE.locales)[number];

/** Absolute URL helper. `abs("/about")` → "https://…/about". */
export function abs(path = "/"): string {
  if (path.startsWith("http")) return path;
  return SITE.url + (path.startsWith("/") ? path : `/${path}`);
}

/** Locale-prefixed path helper. `localePath("en", "/about")` → "/en/about". */
export function localePath(locale: Locale, path = "/"): string {
  const clean = path === "/" ? "" : path;
  return locale === SITE.defaultLocale ? path : `/${locale}${clean}`;
}
