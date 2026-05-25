# hero/

## Hero.tsx

Section `/` (home). Defines the editorial-3D voice of the whole site.

### Composition

- **Numbered editorial header** — `01 / Home …… Portfolio · 2026`
- **Left column** (7/12 on desktop)
  - Location pulse strip (green dot, `prefers-reduced-motion` safe)
  - Massive display name (`clamp(56px, 9vw, 120px)`, Instrument Serif), with a
    layered terracotta shadow on "Barros" and a terracotta period after "Cruz."
  - Tagline paragraph from `profile.tagline[locale]`
  - 3 CTAs: View projects (primary), Download CV (outline), Contact (text link)
- **Right column** (5/12 on desktop)
  - Isometric stack of 3 pillar cards
  - Each card: numbered kicker, icon (in accent circle), title, 3 bullets, footer hint
  - Hover/focus on one card lifts it and dims the others
  - Backdrop offset hairline frame

### Props (`HeroProps`)

| Prop          | Type                            | Source         |
| ------------- | ------------------------------- | -------------- |
| `profile`     | `Profile`                       | data layer     |
| `locale`      | `"es" \| "en"`                  | i18n provider  |
| `t`, `L`      | `TFn`, `LFn`                    | i18n provider  |
| `onNavigate`  | `(href: string) => void`        | router         |

### Pillars

Pillar copy is **inlined** in the component (3 hard-coded entries — Pricing
Strategy / Revenue Analytics / AI-Augmented Decision Making). This is intentional:
the pillars are part of the **brand statement**, not data. If you ever need a 4th
pillar, edit this file.

### Motion

- Entry: `fadeUp` variants on the location strip and the name (560ms, custom easing).
- Pillar hover: pure CSS transition on transform/opacity/box-shadow.
- `useReducedMotion()` → all motion is skipped (animations short-circuit to static).

### Analytics

- `data-event="document_download" data-id="cv"` on the Download CV `<a>`.

### Accessibility

- Pillar cards are `role="button"`, focusable with `tabIndex={0}`, keyboard-equivalent
  to mouse hover for the lift effect.
- Name `<h1>` has `id="hero-name"`; section is `aria-labelledby`-bound.
- All decorative elements (grid backdrop, shadow word, backdrop frame) are `aria-hidden`.
