# Commit 20260528-132727

**Type**: feat
**Scope**: content / lib/content
**Triviality**: non-trivial
**Validated by user**: yes

## Summary

feat(content): rewrite seed to 6 real projects + extend schema for design v1

## What changed

- Rewrote `content/` to Francisco's 6 real projects (slugs match the design's
  per-slug visuals): trustonic-movistar, ndc-cocha-travel,
  marketplace-integration-skinautica, ai-reporting-skinautica, finanzas-flow,
  real-estate-chile. Removed the 4 generic placeholder projects.
- Rewrote profile (real headline/tagline/bio/stats/socials/CV) and experience
  (Skinautica, Cocha Travel, Telefónica/Movistar) from the canonical design seed.
- Added two new content entities: `content/skills.ts` (4 clusters) and
  `content/education.ts`.
- Extended the Zod schema to match the design's data shapes: ProjectCard gains
  `kind`, `company?`, `primaryMetric`, `status?`; Profile gains `headline`,
  `stats`, `trustCompanies`; new `SkillClusterSchema` and `EducationSchema`.
- Added `getSkills()` / `getEducation()` access functions (async, validated).

## Files modified

- `content/profile.ts`, `content/experience.ts`: real bilingual data; avatar →
  `/images/avatar.jpeg`, cvUrl → `/cv/...`.
- `content/skills.ts`, `content/education.ts`: new entities.
- `content/projects/*.ts`: 6 real (added), 4 generic (deleted).
- `lib/content/schemas.ts`: extended schemas + new entity schemas.
- `lib/content/index.ts`: 6 project imports, `getSkills`/`getEducation`, re-exports.
- `lib/content/schemas.test.ts`, `lib/content/index.test.ts`: updated for new shapes.
- `ARCHITECTURE.md`: ADR-008 (schema extended beyond DESIGN_BRIEF §3; design v1 is
  the ratified source of truth for shapes).

## Implementation notes

- `status` modeled as `z.enum(["wip"])` (forward-intent); the source `"WIP"` is
  normalized to lowercase. `getProjects` returns ProjectCard projections — Zod's
  default object strip drops the detail-only fields at runtime (verified), so the
  `Promise<ProjectCard[]>` type is honest.
- Experience `logo` left optional/omitted (seed has no real logo assets yet).
- avatar/heroImage placeholder `src` kept non-empty to satisfy `ImageSchema`.

## Tests

- `pnpm typecheck` + `pnpm test` green (content/schema suites updated).
- Full quartet + e2e verified green at the end of the F4–F7 work.

## Risks / Notes

- Public profile values (email, social URLs, CV filenames) are real but pending
  Francisco's final confirmation — tracked in TODO_MANUALES.md. The email differs
  from the git-author email (fcobarros1995 vs fcobarros95) — to unify.
