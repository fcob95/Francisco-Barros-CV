# Commit 20260526-133038

**Type**: feat
**Scope**: lib/content, content, public
**Triviality**: non-trivial
**Validated by user**: yes

## Summary

feat(content): F1 content layer — Zod schemas, typed access functions, bilingual seed

## What changed

- Zod schemas isomorphic to Sanity for the four content entities, with `z.infer` types.
- Async-ready access layer with edge validation and a centralized locale helper.
- Realistic bilingual seed content (profile, 4 projects, 4 experience items) + placeholder SVGs.
- 15 Vitest tests covering schema validation, access functions and the not-found error path.

## Files modified

- `lib/content/schemas.ts`: schemas `Localized`, `Image`, `Social`, `Profile`, `ProjectCard`,
  `ProjectMetric`, `ProjectLinks`, `ProjectDetail` (via `.extend`), `ExperiencePeriod`,
  `ExperienceItem`; exact DESIGN_BRIEF §3 shape, no invented fields.
- `lib/content/index.ts`: `getProfile/getProjects/getProject(slug)/getExperience` (Promise-returning),
  `parseOrThrow` edge validation with entity-named errors, centralized `pick(locale, field)`.
- `content/profile.ts`, `content/experience.ts`, `content/projects/{pricing-intelligence-engine,
revenue-analytics-platform,commercial-ai-copilot,real-estate-portfolio-tracker}.ts`: bilingual seed.
- `lib/content/schemas.test.ts`, `lib/content/index.test.ts`: 15 content tests.
- `public/images/avatar.svg`, `public/images/projects/*.svg` (4), `public/images/experience/*.svg` (2):
  lightweight placeholders; intrinsic dimensions match the `width`/`height` declared in the seed.

## Implementation notes

- `ProjectDetail` uses `ProjectCardSchema.extend(...)` to keep the "extends" semantics real.
- `period.end` modeled as `z.union([z.string(), z.literal("present")])`; `links.repo/demo` and
  `Social.url` are `z.string().min(1)` (not `.url()`) so `mailto:` socials and bare paths validate —
  the brief specifies bare `string`.
- `getProjects()` validates seeds through `ProjectCardSchema` (strips detail-only fields); detail
  integrity is certified on `getProject()`. Conscious tradeoff, not a defect.
- Seed `cvUrl` points to `/cv/*.pdf` not yet present (real PDFs are Francisco's content, decision 8);
  not referenced by any rendering code in F1, so the build has no broken asset.
- Reviewed by `code-reviewer` → APPROVE (nits only). Quartet green.

## Tests

`pnpm test` → 16/16 (15 new content tests + pre-existing smoke). Asserts schema rejection paths,
seed-parses-against-schema, business invariants (≥1 featured, unique slugs, ≥1 ongoing), and the
`getProject('missing')` descriptive-error path.

## Risks / Notes

- Schemas now act as a frozen contract: a new field required by a design section in F4 must be added
  here first (and escalated to Francisco if it touches the brief).
- F4 still owes an asset↔shape compatibility check against `design-assets/v1/` (not done in F1).
