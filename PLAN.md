# PLAN.md — Plan maestro de implementación

Sitio personal de Francisco Barros. Este documento gobierna la ejecución (E3). Estado vivo en
`PROGRESS.md`; decisiones arquitectónicas y su racional en `ARCHITECTURE.md`.

## Resumen ejecutivo

CV interactivo + portafolio + analítica, bilingüe (ES/EN), como activo de marca para roles senior
(PM regional, BI, AI/Data). El diseño visual se genera en Claude.ai y se porta a producción vía el
subagente `design-integrator`. Stack: Next.js 15, Tailwind + shadcn, contenido tipado en repo (Zod),
PostHog, next-intl, Resend, Vercel. Sin CMS externo y sin base de datos en v1 (ver ADRs).

## Etapas

| Etapa                  | Quién     | Entregable                                 | Código de app  |
| ---------------------- | --------- | ------------------------------------------ | -------------- |
| E1 Discovery           | Claude    | Preguntas + decisiones                     | No             |
| E2 Planificación       | Claude    | Docs + `.claude/` + CLAUDE.md jerárquicos  | No             |
| **E2.5 Diseño (gate)** | Francisco | Assets TSX/Tailwind en `design-assets/v1/` | No (assets sí) |
| E3 Ejecución           | Claude    | Implementación por fases                   | Sí             |
| E∞ Iteración           | Ambos     | `design-assets/vN/`, refactor por skill    | Sí             |

## Fases de E3 — DAG

```
F0 ─► F1 ─► F3 ─► F4 ─► F5 ─► F6 ─► F7 ─► F8
                  ▲
        E2.5 (design-assets/v1 cargado antes de F4)
```

### F0 — Bootstrap

- **Qué:** repo git (+ `.commits/`, `.githooks/`, flujo `commit-logger`), `pnpm`, Next.js 15 + TS strict, Tailwind v4 + shadcn init, ESLint/Prettier, Husky,
  `.env.example`, CI base (GitHub Actions: install + lint + typecheck + build).
- **Agente:** `frontend-builder`. **Hooks activos:** prettier, typecheck, stop-quality.
- **Aceptación:** `pnpm install && pnpm build` ok; CI verde; hooks operativos.

### F1 — Content layer

- **Qué:** schemas Zod isomorfos a Sanity (`lib/content/schemas.ts`), funciones de acceso
  (`lib/content/index.ts`), contenido seed bilingüe realista en `content/` (profile, projects,
  experience). Imágenes seed en `/public`.
- **Agente:** `data-layer`. **Skill:** patrón de `add-portfolio-project`.
- **Aceptación:** validación Zod pasa; seed ES/EN completo; tipos exportados para el DESIGN_BRIEF §3.

### F2 — _Eliminada_ (la analítica vive en PostHog; ver ADR-001).

### F3 — i18n + layout base + design tokens

- **Qué:** next-intl, routing `app/[locale]/`, slugs en inglés, `localePrefix: 'as-needed'`, language
  switcher, theme toggle (dark/light), `not-found`, **portar** los tokens de
  `design-assets/v1/design-tokens.ts` al bloque `@theme` de `app/globals.css` (Tailwind v4; no se
  importa desde `design-assets/`), primitives shadcn base.
- **Agentes:** `frontend-builder` (+ paridad i18n vía hook/command). **Command:** `/check-i18n`.
- **Aceptación:** ambos locales navegables; tokens aplicados; paridad ES/EN ok.

### F4 — Integración de diseño (reemplaza "construcción de secciones")

- **Qué:** una sub-fase por sección — Hero → Projects list → Project detalle → About → Experience →
  Contact. Cada una ejecuta la skill `integrate-design-section` sobre `design-assets/v1/<section>/`.
- **Agente:** `design-integrator`. **Checkpoint tras CADA sub-fase.**
- **Si hay gap** (sección faltante, shape incompatible): parar, documentar, decidir (volver a Claude.ai
  o adaptar). No inventar campos.
- **Aceptación por sección:** data real de `content/`, eventos PostHog conectados, strings en i18n,
  a11y preservada, test de wiring + smoke visual, desviaciones documentadas.

### F5 — Animación e interactividad

- **Qué:** page transitions, scroll progress, hero CSS 3D/Canvas 2D, refinamiento de micro-anim.
  `prefers-reduced-motion` obligatorio. Presupuesto JS medido.
- **Agente:** `frontend-builder` o `design-integrator` según origen del efecto.
- **Aceptación:** sin jank; reduced-motion respetado; JS inicial dentro de presupuesto.

### F6 — Analítica completa

- **Qué:** PostHog provider, banner de consentimiento bloqueante, política de privacidad, eventos
  custom (`project_view`, `project_link_click`, `document_download`, `contact_submit`, `locale_switch`,
  `scroll_depth`, `time_on_page`), opt-out. Sin PII cruda.
- **Agente:** `design-integrator` (inyecta) / `frontend-builder` (provider). **Skill:** `add-analytics-event`.
- **Aceptación:** eventos visibles en PostHog; el consentimiento gobierna el init.

### F7 — SEO

- **Qué:** metadata dinámica desde `content/`, sitemap bilingüe, `robots`, JSON-LD Person +
  CreativeWork, OG dinámico vía `next/og`, hreflang, canonical.
- **Agente:** `frontend-builder` (+ skill futura `update-seo-page`).
- **Aceptación:** Lighthouse SEO 100, Perf ≥90 mobile.
- **Keywords ES:** "Product Manager Chile", "Consultor BI", "Pricing Intelligence", "IA aplicada",
  "Ingeniero Industrial Chile". **EN:** "Product Manager LATAM", "BI Consultant", "Pricing
  Intelligence", "Applied AI", "AI Product Manager".

### F8 — Deploy

- **Qué:** Vercel, envs (PostHog/Resend), smoke test prod (Playwright), instrucciones de dominio.
- **Agente:** `frontend-builder`. **Aceptación:** sitio en prod; smoke verde; dominio documentado.

## NFRs obligatorios

FCP <1.5s · JS inicial <150KB gzipped · Lighthouse ≥90 mobile · WCAG 2.1 AA · responsive mobile-first
sin scroll horizontal · TS strict sin `any` injustificado · privacidad (PostHog sin PII cruda + banner
bloqueante + opt-out) · i18n sin nada hardcodeado.

## Gates de aprobación

1. **E2** (scaffolding) → autoriza montar el orquestador. _(este es el gate actual)_
2. **E2.5** (manual, Francisco) → carga `design-assets/v1/`. Claude espera.
3. **Por fase F0–F8** → commit + resumen + qué revisar + esperar "ok".
4. **Por sub-fase de F4** → checkpoint tras cada sección.

## Riesgos y mitigaciones

| Riesgo                                    | Mitigación                                                      |
| ----------------------------------------- | --------------------------------------------------------------- |
| Gap DESIGN_BRIEF ↔ design-assets          | `design-integrator` para, documenta, decidimos. No inventa.     |
| Asset viola contrato read-only            | Rechazo con explicación, no arreglo silencioso.                 |
| `bump-design` rompe wirings               | Patrón presentacional+contenedor; re-porta solo presentacional. |
| Editar contenido vía PR = fricción futura | Shape isomorfo a Sanity + ADR-002 + skill futura.               |
| Presupuesto JS por 3D/anim                | CSS/Canvas, lazy-load, medición F5/F7.                          |
| Orquestador delgado al inicio             | Path de promoción skill→agente en ARCHITECTURE.md.              |
