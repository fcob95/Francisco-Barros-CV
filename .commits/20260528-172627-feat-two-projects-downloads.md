# Commit 20260528-172627

**Type**: feat
**Scope**: content / project-detail / projects-list
**Triviality**: non-trivial
**Validated by user**: yes

## Summary

feat: add two portfolio projects + downloadable-material capability

## What changed

- New reusable capability: `downloads[]` on ProjectDetail — `ProjectDownloadSchema`
  (file path under /public + bilingual label + summary), resolved in the container,
  rendered as a "Descargas/Downloads" block in the detail with a `document_download`
  analytics event per file. New i18n key `section.downloads` (ES/EN).
- New project `ai-orchestrated-portfolio` ("this site + its AI orchestrator") and
  `ai-learning-guides` ("study guides: MCP, Agent SDK & Skills" with 3 downloadable
  PDFs + author-written summaries). Portfolio now has 8 projects.
- Visual fixes: ProjectVisual fallback for unknown slugs is now a neutral `frame`
  (was the "stack" comp, which leaked another project's "-60%" text); added bespoke
  `agents` (orchestrator) and `docs` (study guides) compositions; ProjectDetail hero
  fallback now shows the correct kind (CASE STUDY vs SIDE PROJECT), not hardcoded.

## Files modified

- `lib/content/schemas.ts`: `ProjectDownloadSchema` + optional `downloads` on detail.
- `components/sections/project-detail/{types.ts,ProjectDetail.container.tsx,ProjectDetail.tsx}`:
  downloads view/copy + render block + hero kind fix.
- `components/sections/projects-list/ProjectVisual.tsx`: neutral fallback + agents/docs comps.
- `lib/content/index.ts`: import + register the 2 projects (display order).
- `messages/{es,en}.json`: `section.downloads`.
- `content/projects/{ai-orchestrated-portfolio,ai-learning-guides}.ts`: new (created).
- `public/downloads/{MCP,SDK,SKILLS}.pdf`: study-guide assets (new).
- `lib/content/{schemas,index}.test.ts`, `e2e/pages.spec.ts`: project count 6→8 +
  a download-link e2e.

## Implementation notes

- Study PDFs reviewed before exposing (extracted text via pdftotext): technically
  sound, strong "not official docs" disclaimers, fictitious examples (no private/
  client data), proper attribution. Safe to publish. Cosmetic note: they are
  browser print-to-PDF exports (header/footer with date + claude.ai artifact URL) —
  optional re-export for polish, not blocking.
- Project repo/demo links point to the canonical targets (github.com/fcob95/...,
  franciscobarroscruz.com) — live once pushed/deployed.
- `ProjectDownloadSchema.file` enforces a leading "/" so the served path is correct.

## Tests

- Vitest 57 passing (counts updated to 8 projects). e2e 11/11 against the prod build
  (added a test asserting /projects/ai-learning-guides exposes the MCP download link).
- Quartet green: typecheck / lint / test / build (build serves /downloads/\*.pdf).

## Risks / Notes

- ~19 MB of PDFs now versioned (binary). Fine for a portfolio; revisit Git LFS only
  if more large assets are added.
- Project content (descriptions/metrics) authored by Claude, reviewed by Francisco.
