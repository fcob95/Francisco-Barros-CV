# project-detail/

## ProjectDetail.tsx

Section `/projects/[slug]`. Full case-study or side-project page.

### Composition

1. Back link
2. Kicker strip — `CASE STUDY | SIDE PROJECT` (in accent color) ··· year · role
3. Title (display) + summary (lead) + tags + optional WIP badge
4. Hero image (16:7) — replace `DetailHeroFallback` with `next/image` when assets exist
5. **Two-column body**
   - **Sticky aside (3/12)**: Role · Year · Stack · optional Repo/Demo links
   - **Main (9/12)**: numbered Problem (01), Solution (02), Impact (03), Metrics (04)
   - Impact heading takes the accent color (terracotta for case-study, ocean for side-project)
   - Metrics: 3 equal-width cells, the first metric value uses the accent
6. Footer nav — back to projects · contact CTA

### Props (`ProjectDetailProps`)

| Prop        | Type                            | Source        |
| ----------- | ------------------------------- | ------------- |
| `project`   | `ProjectDetail`                 | data layer    |
| `t`, `L`    | `TFn`, `LFn`                    | i18n provider |
| `onBack`    | `() => void`                    | router        |
| `onContact` | `() => void`                    | router        |

### Analytics

- `data-event="project_link_click" data-target="repo|demo"` on external links.

### Accessibility

- Page is `<article aria-labelledby="project-title">`.
- Metrics section has its own `aria-labelledby`.
- All decorative SVG is `aria-hidden`.
