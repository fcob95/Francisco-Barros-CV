/**
 * seo/sitemap.ts
 *
 * Next.js App Router native sitemap. Place a re-export at `app/sitemap.ts`:
 *
 *   export { default } from "@/design-assets/v1/seo/sitemap";
 *
 * Next will serve it at /sitemap.xml automatically, with hreflang alternates.
 *
 * NOTE: project + blog routes are listed via async getters you wire to your data
 * source. The static routes are always present.
 */

import type { MetadataRoute } from "next";
import { SITE, abs, localePath, type Locale } from "./site.config";

/** Static routes (path WITHOUT locale prefix) + change cadence + priority. */
const STATIC_ROUTES: Array<{ path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }> = [
  { path: "/",            changeFrequency: "monthly", priority: 1.0 },
  { path: "/servicios",   changeFrequency: "monthly", priority: 0.9 },
  { path: "/proyectos",   changeFrequency: "weekly",  priority: 0.8 },
  { path: "/about",       changeFrequency: "yearly",  priority: 0.7 },
  { path: "/experiencia", changeFrequency: "yearly",  priority: 0.6 },
  { path: "/contacto",    changeFrequency: "yearly",  priority: 0.6 },
  { path: "/blog",        changeFrequency: "weekly",  priority: 0.5 },
  { path: "/privacy",     changeFrequency: "yearly",  priority: 0.2 },
];

/** Build the hreflang alternates object for a path. */
function languagesFor(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const loc of SITE.locales) languages[loc] = abs(localePath(loc as Locale, path));
  return languages;
}

/**
 * If you have dynamic content, pass async getters when you call buildSitemap().
 * For the zero-config case, the default export below covers static routes only.
 */
export async function buildSitemap(opts?: {
  projectSlugs?: () => Promise<string[]>;
  blogSlugs?: () => Promise<string[]>;
}): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: abs(r.path),
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
    alternates: { languages: languagesFor(r.path) },
  }));

  if (opts?.projectSlugs) {
    const slugs = await opts.projectSlugs();
    for (const slug of slugs) {
      const path = `/proyectos/${slug}`;
      entries.push({
        url: abs(path),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages: languagesFor(path) },
      });
    }
  }

  if (opts?.blogSlugs) {
    const slugs = await opts.blogSlugs();
    for (const slug of slugs) {
      const path = `/blog/${slug}`;
      entries.push({
        url: abs(path),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages: languagesFor(path) },
      });
    }
  }

  return entries;
}

/** Default export: static-only sitemap. Swap for buildSitemap({...}) when wired. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return buildSitemap();
}
