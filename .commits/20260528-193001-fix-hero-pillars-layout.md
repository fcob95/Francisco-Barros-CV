# Commit 20260528-193001

**Type**: fix
**Scope**: hero (pillars)
**Triviality**: non-trivial
**Validated by user**: yes

## Summary

fix(hero): lower desktop pillar fan into its box + vertical pillar cards on mobile

## What changed

- **Desktop (lg+):** re-anchored the isometric pillar fan so it no longer bleeds
  above its box and over the "Pilares ↘" label / header. Card vertical offset
  `index * -28` (top card at y=-56) → `(PILLAR_COUNT-1-index) * 28` (cards at
  y=56/28/0, top card at y=0). Same up-right stagger, step and rotation; just
  shifted down so the fan sits inside the box and the backdrop frame. Box height
  320→360 to clear the lowest card after the shift. Hover-lift/dim preserved.
- **Mobile (<lg):** the hover-lift is not touch-friendly. Replaced the overlapping
  absolute stack with a static vertical list (`flex flex-col gap-4`) of 3 full-width
  pillar cards (border + subtle offset shadow), all content visible, no hover/
  transforms. Removed the prior mobile scale-0.8 wrapper. Responsive split:
  `hidden lg:block` (desktop fan) vs `lg:hidden` (mobile list), one `pillars` source.
- Extracted `PillarCardContent` shared by both layouts (no data/markup duplication).

## Files modified

- `components/sections/hero/Hero.tsx`.

## Implementation notes

3 DESIGN-DEVIATION markers (baseY re-anchor, box height, mobile vertical layout) —
the asset only had the desktop isometric stack with the upward overhang. No global
overflow clip; prefers-reduced-motion still honored (mobile cards fully static).

## Tests

typecheck / lint / test (57) / build (52 pages) green; e2e via CI.

## Risks / Notes

Desktop box height estimated (360px) for ~3-line titles; the long title
("AI-Augmented Decision Making") is on the TOP card (room below), so low clip risk —
eyeball both locales at desktop width to confirm the lowest card isn't clipped.
