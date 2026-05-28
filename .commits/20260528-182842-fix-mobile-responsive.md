# Commit 20260528-182842

**Type**: fix
**Scope**: hero / contact (responsive)
**Triviality**: non-trivial
**Validated by user**: yes

## Summary

fix(responsive): hero pillar stack + contact form fit on mobile

## What changed

- `components/sections/hero/Hero.tsx`: the fixed 380×320 isometric pillar stack
  overflowed its full-width column on phones (~360–400px) and got clipped by the
  Hero section's `overflow-hidden` (cards cut on the right, off-center). Wrapped it
  so the layout reserves only the SCALED footprint: outer wrapper
  `w-[304px] h-[256px] lg:w-[380px] lg:h-[320px] mx-auto lg:mx-0`, inner stack
  `origin-top-left scale-[0.8] lg:scale-100`. Fits a 360px viewport (304px ≤ 320px
  content) and centers; desktop (lg+) is byte-for-byte the original.
- `components/sections/contact/Contact.tsx`: submit row `flex justify-between` →
  `flex flex-wrap … gap-x-4 gap-y-3` so the reply-promise + button wrap on very
  narrow phones instead of overflowing. (Form width already fit; the 6px sticker
  shadow stays inside the section's px-5 padding.)

## Files modified

- `components/sections/hero/Hero.tsx`, `components/sections/contact/Contact.tsx`.

## Implementation notes

The naive fix (transform: scale alone) doesn't help because the element still
reserves its unscaled 380px box → keeps overflowing. Sizing the wrapper to the
scaled box (304×256) is what removes the overflow. All divergences gated below lg
(marked DESIGN-DEVIATION); the asset had no mobile handling for this stack.
Edge note: at a 320px viewport the 304px footprint slightly exceeds the 280px
content area, clipped symmetrically (centered, not off-center); acceptable for the
decorative stack. Drop to scale-[0.72] if a guaranteed 320px fit is ever needed.

## Tests

typecheck / lint / test (57) / build (52 pages) green; e2e via CI.

## Risks / Notes

Desktop unchanged. No global overflow-x clip added (would break the sticky header
and project-detail sticky aside).
