# Static SEO fallbacks

These are **plain-file fallbacks** for the case where the production stack is
NOT Next.js (e.g. a static export, Vite, or a plain HTML host). If you ARE using
Next.js App Router, ignore this folder and use `../sitemap.ts` + `../robots.ts`
instead — they generate these automatically with hreflang and stay in sync.

## Before using these statically

1. Confirm the canonical domain (currently `https://www.franciscobarroscruz.com`).
2. Update `<lastmod>` dates in `sitemap.xml`.
3. Add/remove `<url>` entries to match real routes (project + blog slugs).
4. Host both files at the site **root**: `/sitemap.xml` and `/robots.txt`.
5. Submit the sitemap in Google Search Console.
