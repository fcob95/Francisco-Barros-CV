# Commit 20260528-134036

**Type**: chore
**Scope**: deps / components/ui / tooling
**Triviality**: non-trivial
**Validated by user**: yes

## Summary

chore: remove unused shadcn Button cluster + add .editorconfig

## What changed

- Removed dead code verified by knip + grep: `components/ui/button.tsx` and
  `lib/utils.ts` (`cn`) had zero importers (the ported v1 design uses its own
  styled `<button>`/`<a>`). Removed their now-unused deps: `@radix-ui/react-slot`,
  `class-variance-authority`, `clsx`, `tailwind-merge`.
- Added `.editorconfig` (utf-8, LF, 2-space, trim trailing ws; markdown exempt),
  aligned with Prettier.
- Kept `components.json` so re-adding shadcn later is `pnpm dlx shadcn add <comp>`.

## Files modified

- `components/ui/button.tsx`, `lib/utils.ts`: deleted (dead).
- `package.json`, `pnpm-lock.yaml`: dropped 4 unused deps.
- `.editorconfig`: new.
- `PROGRESS.md`: note that shadcn is currently unused in the live UI (open notes).

## Implementation notes

depcheck flagged build-tool devDeps (tailwind/postcss/eslint-config-next/prettier/
@testing-library) as "unused" — all FALSE POSITIVES (used via config/CLI or
intended test stack), kept. knip's 40 "unused files" are .claude hooks (harness
entrypoints) and design-assets/\*\* (read-only reference) — kept. The only real dead
cluster was the shadcn Button + cn + its 4 deps. Verified safe: typecheck/lint/
test(57)/build all green after removal.

## Tests

- Full quartet green post-removal (typecheck, lint, test 57, build 44 pages).

## Risks / Notes

- Walks back the F3 "shadcn lean" setup (Button was the only shadcn component, now
  unused). `components.json` retained; re-adding is one command. Stack doc still
  lists shadcn/ui — accurate as "available", though nothing shadcn renders today.
