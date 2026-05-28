# Commit 20260528-133243

**Type**: chore
**Scope**: public/images
**Triviality**: non-trivial
**Validated by user**: yes

## Summary

chore: remove orphan image assets left by the old generic content

## What changed

- Deleted 6 tracked SVGs that referenced the old generic projects/experience
  (replaced when content was rewritten to the real projects), plus the untracked
  `avatar_base.svg` (superseded by the real `avatar.jpeg`).

## Files modified

- `public/images/projects/{commercial-ai-copilot,pricing-intelligence-engine,
real-estate-portfolio-tracker,revenue-analytics-platform}.svg`: deleted.
- `public/images/experience/{independiente,retail-regional}.svg`: deleted.
- `public/images/avatar_base.svg`: deleted (was untracked).

## Implementation notes

Confirmed zero references before deleting: grep across app/, components/, content/,
lib/, messages/ for each filename returned nothing. `public/images/` now holds only
`avatar.jpeg`.

## Tests

- `pnpm build` green (44 pages) after removal — no broken imports/paths.

## Risks / Notes

- Deferred SEO nit (not fixed here): CreativeWork JSON-LD `image` uses
  `project.heroImage.src` (lib/seo/jsonld.ts:48), which points to non-existent
  `/images/projects/<slug>.svg`. heroImage is NOT rendered visibly (sections draw
  the per-slug ProjectVisual SVG), so users see no broken image — but the structured
  data image URL 404s for crawlers. Fix later: point it at the per-project OG route.
