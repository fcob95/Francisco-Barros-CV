# seo/

SEO infrastructure for the production site. **Framework-aware: built for Next.js
App Router** (the stack named in the root README). All of it is Next.js-native —
no third-party SEO plugin needed.

> **Important context:** the live site does not exist yet. This is a *handoff
> package*. These files are the SEO layer Claude Code wires when it builds the
> Next.js app. `preview.html` is a review artifact — its `<head>` now contains a
> **static demonstration** of the home-page output (real `<title>`, OG, hreflang,
> JSON-LD) so you can validate the markup today, but the production tags are
> *generated* by the files below, not hand-maintained.

## Files

| File | Role | Wire-up |
| --- | --- | --- |
| `site.config.ts` | Single source of truth: domain, locales, keywords, socials, geo | imported by everything |
| `metadata.ts` | Per-page `Metadata` builders (title/description/OG/Twitter/canonical/hreflang) | `export const metadata = pageMetadata("home","es")` in each `page.tsx` |
| `JsonLd.tsx` | Person + ProfessionalService + Service + WebSite + Breadcrumb schemas | `<SiteJsonLd/>` in `layout.tsx`, `<ServicesJsonLd/>` on `/servicios` |
| `sitemap.ts` | Native sitemap w/ hreflang alternates | `export { default } from "…/seo/sitemap"` at `app/sitemap.ts` |
| `robots.ts` | Native robots.txt (auto-references sitemap) | `export { default } from "…/seo/robots"` at `app/robots.ts` |
| `static/` | Plain `sitemap.xml` + `robots.txt` fallbacks for non-Next hosts | host at site root |

## Title & description lengths (hand-checked)

| Page | Title (chars) | Description (chars) |
| --- | --- | --- |
| home | 50 | 156 |
| services | 41 | 148 |
| projects | 41 | 158 |
| about | 50 | 156 |
| experience | 42 | 150 |
| contact | 54 | 159 |

All titles ≤ 60, descriptions 148-160. Keywords woven naturally, not stuffed.

## Validate

- **Rich Results / JSON-LD:** copy the `<script type="application/ld+json">` block
  from `preview.html` (or your built page) into
  https://search.google.com/test/rich-results and https://validator.schema.org
- **OG / social preview:** https://www.opengraph.xyz (paste the deployed URL)
- **hreflang:** check each page exposes `es`, `en`, `x-default` alternates.

## OG image

`../extras/OGImage.tsx` is the 1200×630 template. Wire it as a dynamic route
`app/og/route.tsx` using `next/og` `ImageResponse` (see `extras/README.md`). Until
then, `site.config.ts → ogImage.path` points at a static `/og/default.png` you
must export and drop in `/public/og/`. **← manual task, see checklist.**
