# experience/

## Experience.tsx

Section `/experience`. Vertical editorial timeline.

### Composition

1. Numbered header — `04 / Experience …… Download CV / ES|EN` (right-aligned link)
2. Section title — `Experiencia profesional.`
3. **Timeline (`<ol>`)** with a vertical rail
   - Each `<li>` is a 2-column grid: `[date column] [content card]`
   - **Dot on rail**: terracotta square for jobs, ocean-gray circle for education
   - **Date column**: period (formatted via `formatPeriod()`) + location
   - **Content card**: company (display), role (mono terracotta-ink), summary, bullets
   - Cards have `boxShadow: "4px 4px 0 var(--color-rule-strong)"` (subtle offset)
4. **Closing Education item** — different dot, subtle paper-sunken card

### Props

| Prop        | Type                | Notes                                |
| ----------- | ------------------- | ------------------------------------ |
| `items`     | `ExperienceItem[]`  | Most-recent first.                   |
| `education` | `Education`         | One block, rendered at the end.      |
| `profile`   | `Profile`           | Used for CV download link.           |
| `locale`    | `"es" \| "en"`      |                                      |
| `t`, `L`    | `TFn`, `LFn`        |                                      |

### `formatPeriod(start, end, locale)`

Pure helper inside the file. Takes ISO `YYYY-MM` and produces `"Ene 2025 — Feb 2026"`
or `"Jan 2025 — Feb 2026"`. `"present"` → "Presente" / "Present".

### Print

Each timeline entry is a single block — safe to page-break between entries.
