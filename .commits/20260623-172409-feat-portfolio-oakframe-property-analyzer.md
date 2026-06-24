# Commit 20260623-172409

**Type**: feat
**Scope**: content/projects
**Triviality**: non-trivial
**Validated by user**: yes (content provided by Francisco; year 2026 + 3 featured confirmed; visuals reviewed)

## Summary
feat(projects): add Oakframe + Property Analyzer, retire real-estate-chile, screenshot hero

## What changed
- Added two real portfolio projects (typed, bilingual ES/EN, Zod-validated):
  - `oakframe` — full-stack AI-native furniture e-commerce (multi-cloud, RAG, PCI SAQ-A, agentic
    orchestration). Side project, featured.
  - `property-analyzer` — BI/data-viz dashboard over 6,000+ Chilean-market properties (Opportunity
    Score, dynamic filters, self-contained HTML). Framed as BI, NOT a scraper; only aggregate/
    district-level data, nothing sensitive.
- Removed `real-estate-chile` (replaced by Property Analyzer per Francisco). No dangling references.
- Hybrid project hero: cards keep the geometric SVG (design decision #8 consistency); the detail page
  renders a REAL screenshot via the new `heroIsScreenshot` flag + `next/image`. The other 8 projects
  keep the editorial SVG fallback.
- Captured the two hero screenshots (cookie banners dismissed) into `public/images/projects/`.
- `projects.intro` made count-agnostic (es/en) so it can't go stale.
- Portfolio is now 9 projects, 3 featured (Trustonic, Cocha, Oakframe).

## Files modified
- `lib/content/schemas.ts`: optional `heroIsScreenshot` on ProjectDetailSchema.
- `components/sections/projects-list/ProjectVisual.tsx`: card compositions — `property-analyzer`→map
  (reused from the retired slug), `oakframe`→frame.
- `components/sections/project-detail/{types.ts,ProjectDetail.container.tsx,ProjectDetail.tsx}`:
  `screenshot` view field + `<Image>` hero render (else the SVG fallback).
- `content/projects/oakframe.ts`, `content/projects/property-analyzer.ts`: new project content.
- `content/projects/real-estate-chile.ts`: DELETED.
- `lib/content/index.ts`: seed swap (remove real-estate-chile; add the two new, in display order).
- `lib/content/{index.test.ts,schemas.test.ts}`: updated counts (9 projects, 3 featured incl. oakframe).
- `lib/analytics/posthog.test.ts`: stale fixture slug → `property-analyzer`.
- `messages/{es,en}.json`: count-agnostic `projects.intro`.
- `e2e/pages.spec.ts`: +2 specs (each new detail renders its screenshot hero + h1).
- `public/images/projects/{oakframe,property-analyzer}.png`: hero screenshots (2160×1215).
- `PROGRESS.md`: Fase 2 state.

## Implementation notes
- `heroIsScreenshot` is an explicit opt-in rather than sniffing the file extension — boring/obvious, and
  the 8 legacy heroImage paths point at non-existent SVGs, so a blanket "render heroImage" would 404.
- For the two new projects `heroImage.src` points at the real PNG, so JSON-LD/OG get a real image too
  (the legacy SVG hero paths were dangling — pre-existing, out of scope here).
- Screenshots captured headless at viewport 1440×810 @1.5 DPR; consent banners dismissed before capture
  so the OG/hero image is clean.
- Project content drawn verbatim from Francisco's brief; no invented metrics. `year` (2026) was the only
  field not supplied — confirmed by Francisco.

## Tests
- typecheck ✅ · lint ✅ · build ✅ · Vitest 60/60 ✅ · e2e 14/14 ✅ (prod build). Visually verified the
  two detail pages render the screenshot hero in the 16:7 frame.

## Risks / Notes
- 3 featured cards now span 2 columns each; the /projects grid layout at all breakpoints is verified in
  the Fase 3 responsive audit.
- Copy is open to a wording pass by Francisco at any time.
