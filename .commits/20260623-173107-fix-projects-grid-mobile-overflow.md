# Commit 20260623-173107

**Type**: fix
**Scope**: projects-list
**Triviality**: non-trivial
**Validated by user**: yes (Francisco requested a responsive pass; fix verified across 3 viewports)

## Summary
fix(projects): stop featured cards overflowing the /projects grid on mobile

## What changed
- Featured project cards applied `gridColumn: span 2` unconditionally (inline style). On mobile the
  grid is a single implicit column, so `span 2` forced a phantom second track and pushed the page
  ~237px past the viewport → horizontal scroll on `/projects`.
- Moved the span to a responsive Tailwind class: `sm:col-span-2` (applies only once the grid actually
  has ≥2 columns), removed the inline `gridColumn`. Mobile now stacks cards in one clean column;
  sm/lg keep the featured 2-column span.

## Files modified
- `components/sections/projects-list/ProjectCard.tsx`: inline `gridColumn` → responsive `sm:col-span-2`.
- `PROGRESS.md`: Fase 3 (responsive) state.

## Implementation notes
- Inline styles can't express breakpoints; a Tailwind responsive class is the right tool. The class is
  a literal in a ternary so the JIT picks it up.
- Pre-existing latent bug (already present with 2 featured cards); surfaced and fixed during the
  responsive audit. Not introduced by the new projects.

## Tests
- Responsive audit (Playwright, viewports 390 / 820 / 1366) over all 9 pages: pre-fix `/projects`
  overflow = 237px on mobile; post-fix overflow = 0 on every page × viewport.
- typecheck ✅ · lint ✅ · Vitest 60/60 ✅ · build ✅ · e2e 14/14 ✅ (prod build). Mobile screenshots of
  home / projects / contact / project-detail visually confirmed.

## Risks / Notes
- None. Pure layout fix; no data/contract changes.
