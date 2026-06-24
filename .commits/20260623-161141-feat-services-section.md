# Commit 20260623-161141

**Type**: feat
**Scope**: services
**Triviality**: non-trivial
**Validated by user**: yes (Fase 1 checkpoint reviewed; nav position confirmed "after Projects")

## Summary
feat(services): add /services section + ProfessionalService JSON-LD

## What changed
- New `/services` route (English slug, uniform across locales) rendering the 5-service catalog with
  indexable copy per service (keyword `<h3>` + paragraph + what's-included list).
- Typed content layer: `ServiceSchema` (Zod, isomorphic to Sanity) + `content/services.ts` (bilingual,
  ported by value) + `getServices()` access function.
- Presentational + container split (Services.tsx as a Server Component, Services.container.tsx wires
  data/i18n) mirroring the About section.
- Nav entry "Services/Servicios" added to the Header (after Projects).
- i18n: new `services` namespace + `nav.services` in es/en with parity. CTA reuses `cta.contact`.
- SEO reconciled into the existing `lib/seo`: `/services` added to the sitemap; `servicesJsonLd`
  (ProfessionalService + Offer→Service with `#slug` deep links) emitted on the page.

## Files modified
- `lib/content/schemas.ts`: added `ServiceSchema` + `Service` type.
- `content/services.ts`: new — 5-service catalog, ported verbatim from the asset.
- `lib/content/index.ts`: `getServices()` + `Service` re-export.
- `lib/content/index.test.ts`: tests for `getServices` (count, schema, non-empty es/en, unique slugs).
- `components/sections/services/Services.tsx` + `Services.container.tsx`: new section (presentational
  Server Component + Server container).
- `app/[locale]/services/page.tsx`: new route (generateMetadata + JsonLd + sr-only h1 + container).
- `components/sections/header/Header.tsx`: nav item `{ href: "/services", key: "services" }`.
- `app/sitemap.ts`: `/services` added to STATIC_PATHS.
- `lib/seo/jsonld.ts`: `servicesJsonLd` builder.
- `messages/{es,en}.json`: `nav.services` + `services` namespace.
- `e2e/pages.spec.ts`: `/services` e2e (h1, 5 h3 headings, CTA → /contact).
- `PROGRESS.md`: Fase 1 state + decision 15 (SEO reconcile, blog deferred).

## Implementation notes
- Asset was `"use client"` only to receive an `onContact` callback; replaced with a locale-aware
  `<Link href="/contact">` so the presentational stays a Server Component (default). Sticker-shadow
  visual preserved (`// DESIGN-DEVIATION` comment in the file).
- The design `seo/` and `blog/` folders were intentionally NOT ported (reconcile-not-port; blog
  deferred). See PROGRESS decision 15.
- Service `slug`s kept as authored (`automatizacion-ia`, …) — they double as section anchor ids and
  JSON-LD `#slug` fragments, so they must match across component, sitemap intent and structured data.
- Services' numbered label is localized (`06 / Servicios` / `06 / Services`) per the i18n rule, a minor
  divergence from sibling sections that still hardcode English labels (pre-existing deferred nit).

## Tests
- `pnpm typecheck` ✓ · `pnpm lint` ✓ · `pnpm test` ✓ 60/60 (3 new) · `pnpm build` ✓ (/es/services +
  /en/services prerendered, 119 kB First Load).
- e2e against the production build ✓ 12/12 (new /services spec included). NOTE: local `pnpm dev` e2e is
  flaky (Turbopack on-demand compile + parallel workers → 5s timeouts); the prod-build path is the
  canonical signal and is green.

## Risks / Notes
- Service copy is placeholder-grounded in the real CV (no invented client names/metrics) but should get
  a final human copy pass before launch.
