import type { MetadataRoute } from "next";

import { getProjects } from "@/lib/content";
import { absoluteUrl, languageAlternates } from "@/lib/seo/site";

/**
 * XML sitemap. Emits one entry per logical route (NOT per locale): each entry
 * carries `alternates.languages` (es / en) so search engines learn the locale
 * variants from a single canonical row. The `url` is the default-locale (ES)
 * absolute URL; `as-needed` prefixing is handled by the URL helpers.
 *
 * Coverage:
 *   - static routes: /, /about, /projects, /experience, /contact, /privacy
 *   - dynamic: /projects/[slug] for every project slug
 */

const STATIC_PATHS = [
  "/",
  "/about",
  "/projects",
  "/experience",
  "/contact",
  "/privacy",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: absoluteUrl(path, "es"),
    lastModified: now,
    changeFrequency: path === "/" ? "monthly" : "yearly",
    priority: path === "/" ? 1 : 0.7,
    alternates: { languages: languageAlternates(path) },
  }));

  const projectEntries: MetadataRoute.Sitemap = projects.map((p) => {
    const path = `/projects/${p.slug}`;
    return {
      url: absoluteUrl(path, "es"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
      alternates: { languages: languageAlternates(path) },
    };
  });

  return [...staticEntries, ...projectEntries];
}
