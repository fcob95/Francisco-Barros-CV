# Commit 20260529-100328

**Type**: chore
**Scope**: hero (pillars)
**Triviality**: non-trivial
**Validated by user**: yes (Francisco's own manual adjustment)

## Summary

chore(hero): tune pillar fan vertical anchor + spacing (Francisco's adjustment)

## What changed

- `components/sections/hero/Hero.tsx`: Francisco hand-tuned the desktop isometric
  fan to his taste — `PILLAR_COUNT` 3 → 4.1 (used as the vertical-anchor multiplier
  in `baseY = (PILLAR_COUNT - 1 - index) * PILLAR_STEP_Y`, so the fan sits a bit
  lower) and `PILLAR_STEP_Y` 28 → 35 (more vertical gap between cards).

## Files modified

- `components/sections/hero/Hero.tsx` (3 lines).

## Implementation notes

Committed Francisco's manual edit verbatim. Verified green before push:
typecheck / lint / test (57) / build (52 pages) all pass; `PILLAR_COUNT` is only
referenced in the `baseY` math (not in any render/`.map`), so the non-integer 4.1
is harmless. Box height (360) still clears the lowest card at the new anchor.

## Tests

typecheck / lint / test / build green; e2e via CI.

## Risks / Notes

Readability nit (NOT changed, per Francisco's "leave it as I tuned it"): `PILLAR_COUNT`
is now a misnomer (it's an anchor factor, not a count of 3 pillars) and the adjacent
comment still says "= 56px" (now 108.5px). Worth a rename + comment fix for the
public repo; flagged to Francisco as an optional follow-up.
