# projects-list/

## ProjectsList.tsx

Section `/projects`. Filterable editorial grid.

### Composition

1. Numbered header — `03 / Projects …… 6 · total`
2. Title block — display heading + 1-line intro
3. **Filter strip** — `[▽ Filtrar por] [All] [Case study] [Side project] | [TAG-1] [TAG-2] …`
4. **Grid** — 1 / 2 / 3 cols (sm/md/lg)
   - Featured cards span 2 columns
   - Empty state when filter returns 0
   - `loading={true}` renders 6 skeletons

### Filter logic

```
"all"          → all
"case-study"   → kind === "case-study"
"side-project" → kind === "side-project"
<any tag>      → tags.includes(tag)
```

Tag chips are sliced to **6** for visual restraint. If a project portfolio grows,
consider promoting filters to a `<Select>` (shadcn) instead of chips.

---

## ProjectCard.tsx

Single card. The visual differentiation is the most important UX cue here.

| Variant                  | Accent              | Dot shape         | Layout                |
| ------------------------ | ------------------- | ----------------- | --------------------- |
| `kind === "case-study"`  | terracotta          | square `▪`        | featured spans 2 cols |
| `kind === "side-project"`| ocean               | diamond `◆` (rotated square) | always 1 col |

On hover, the sticker shadow swaps from `--color-ink` to the accent. Card lifts -3px.

`<ProjectCardSkeleton featured?>` is the loading variant.

---

## ProjectVisual.tsx

Per-slug abstract SVG composition. **No stock photos. No emoji.**

| Slug                                   | Composition  | Visual cue              |
| -------------------------------------- | ------------ | ----------------------- |
| `trustonic-movistar`                   | shield       | `€2M PROTECTED`         |
| `ndc-cocha-travel`                     | flight       | arc + plane             |
| `marketplace-integration-skinautica`   | nodes        | force-graph of systems  |
| `ai-reporting-skinautica`              | stack        | layered frames + `-60%` |
| `finanzas-flow`                        | bars         | bank chips + bar chart  |
| `real-estate-chile`                    | map          | grid + property pins    |
| _fallback_                             | stack        | generic stack           |

Adding a new project: append to `compositions` map in this file, or accept the
fallback.

### Analytics

- `data-event="project_view" data-slug="<slug>"` on each card.
