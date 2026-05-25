# about/

## About.tsx

Section `/about`.

### Composition

1. Numbered header — `02 / About …… Quién soy`
2. **Lead grid** (4 / 8 cols)
   - Portrait slab with terracotta offset frame. Avatar fallback: SVG with initials
     and editorial "bust" silhouette. Replace with real `<Image>` when available.
   - Quick facts (location + years of experience), mono caps
   - Display-serif lead pull-quote (`about.lead`)
   - Mono headline strip in terracotta-ink (`profile.headline`)
   - Long bio paragraph (`profile.bio`)
   - CTAs: Download CV · Contact
3. **Skills grid** — 4 clusters in a 2×2 grid (single col on mobile)
   - Each cluster: serif title + numbered index + flat list of tags

### Props

| Prop        | Type           | Notes                                                |
| ----------- | -------------- | ---------------------------------------------------- |
| `profile`   | `Profile`      | data                                                 |
| `skills`    | `SkillCluster[]` | order in array = visual order. 4 expected.         |
| `locale`    | `"es" \| "en"` | i18n                                                 |
| `t`, `L`    | `TFn`, `LFn`   | i18n helpers                                         |
| `onContact` | `() => void`   | router                                               |

### Print

Designed to print cleanly. Recruiters tend to "Cmd+P" the About page. The skills
grid stacks vertically with `@media print { .grid-cols-2 { grid-template-columns: 1fr; } }`.
Add to global stylesheet — not done in this component.
