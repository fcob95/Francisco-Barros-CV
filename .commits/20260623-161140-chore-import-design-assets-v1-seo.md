# Commit 20260623-161140

**Type**: chore
**Scope**: design-assets
**Triviality**: trivial
**Validated by user**: yes (delivered design package; read-only zone)

## Summary
chore(design-assets): import v1 services/blog/seo sections

## What changed
- Imported the newly delivered v1 design source: `services/`, `blog/`, `seo/` folders.
- Added `_preview/Services.jsx` and updated the preview harness (`_preview/App.jsx`, `_preview/Header.jsx`, `preview.html`) to render/navigate the new Services section.
- Updated `design-assets/v1/README.md` documenting the SEO/services/blog additions.

## Files modified
- `design-assets/v1/services/{Services.tsx,services.data.ts,README.md}`: new Services section asset.
- `design-assets/v1/blog/{BlogIndex.tsx,_template.mdx,posts/*.mdx,README.md}`: blog scaffold (no real content).
- `design-assets/v1/seo/{site.config.ts,metadata.ts,JsonLd.tsx,sitemap.ts,robots.ts,static/*,README.md}`: SEO handoff package.
- `design-assets/v1/_preview/{App.jsx,Header.jsx,Services.jsx}`, `preview.html`, `README.md`: preview harness updates.

## Implementation notes
Pure source-of-record import into the read-only `design-assets/` zone. Nothing in `app/` or
`components/` imports these files (the contract is port-by-value, never reference), so this commit has
zero effect on the built application — it only versions the delivered design package. The `seo/` and
`blog/` folders are NOT ported wholesale: `seo/` is reconciled into the existing `lib/seo/` (see the
companion feat commit), and `blog/` is deferred (empty scaffold, no real content).

## Tests
None (no app code changed; quartet unaffected).

## Risks / Notes
None.
