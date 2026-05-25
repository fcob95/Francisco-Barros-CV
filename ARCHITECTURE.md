# ARCHITECTURE.md

Referencia estática del proyecto y del orquestador. Decisiones activas en `PROGRESS.md`; plan de
ejecución en `PLAN.md`.

## 1. Arquitectura web

```
                         ┌──────────────────────────────┐
   Visitante ──HTTP──►   │  Next.js 15 (App Router)      │
                         │  app/[locale]/...             │
                         │  Server Components (default)  │
                         └───────┬───────────┬──────────┘
                                 │           │
              lee contenido      │           │  eventos (consentidos)
                  (build/req)    ▼           ▼
                    ┌────────────────┐   ┌──────────────────┐
                    │ content/ (TS)  │   │ PostHog Cloud     │
                    │ + Zod (lib/    │   │ (analítica)       │
                    │  content)      │   └──────────────────┘
                    └────────────────┘
                                 │  contacto (server action)
                                 ▼
                    ┌────────────────┐
                    │ Resend (email) │  ← sin persistencia
                    └────────────────┘

   Hosting: Vercel   ·   CI: GitHub Actions   ·   Dominio: NEXT_PUBLIC_SITE_URL
```

Sin base de datos y sin CMS externo en v1 (ver ADR-001, ADR-002).

## 2. Orquestador (.claude/)

```
   main agent (Opus 4.7)
     │
     ├─ planner            (Read/Grep/Glob)            → planes, no escribe código
     ├─ frontend-builder   (app, components/ui, layout, lib/seo)
     ├─ data-layer         (content, lib/content)
     ├─ design-integrator  (components/sections, app contenido)
     └─ code-reviewer      (Read, Bash: lint/typecheck/test)

   skills/  integrate-design-section · bump-design-version · add-portfolio-project · add-analytics-event
   commands/ /plan /review /check-quality /check-i18n /new-project /integrate-design /bump-design
   hooks/   typecheck-file · prettier-write · check-i18n-parity · check-content-localized ·
            check-no-hardcoded-strings · stop-quality · log-subagent
   mcp/     github (PostHog opcional, no activado)
```

## 3. Workflow de diseño

```
   DESIGN_BRIEF.md ──(Francisco)──► Claude.ai (frontend-design) ──► design-assets/vN/<section>/
                                                                          │  (read-only)
                                                                          ▼
                                         /integrate-design vN  →  design-integrator
                                                                          │
                       presentacional "tonto" (copia) ◄──split──► contenedor (data/analytics/i18n)
                                                                          │
                                                                          ▼
                                                          components/sections/  +  app/[locale]/
```

Iteración: nuevos assets en `design-assets/v(N+1)/` → `/bump-design vN v(N+1)` → `bump-design-version`
diffea, re-porta solo el presentacional de las secciones cambiadas, preserva contenedores.

## 4. ADRs

- **ADR-001 — PostHog en vez de DB custom.** PostHog ya cubre eventos, geo, dashboards. Montar Neon +
  Drizzle + endpoint + `/admin` duplicaba esfuerzo para un sitio personal. _Trade-off:_ sin ownership
  del dato crudo. _Reversible:_ añadir tabla + export cuando el dato propietario sea objetivo.
- **ADR-002 — Contenido tipado en repo en vez de Sanity.** Un solo autor técnico no justifica una
  dependencia externa + GROQ + Studio. Shape isomorfo a Sanity → migración mecánica futura. _Trade-off:_
  editar requiere PR/deploy. _Reversible:_ skill `migrate-content-to-sanity`.
- **ADR-003 — CSS 3D/Canvas en vez de R3F.** El presupuesto <50KB es imposible con three.js (~150KB+).
  CSS transforms + Canvas 2D logran el efecto a costo casi nulo. _Reversible:_ R3F lazy-loaded en v2.
- **ADR-004 — Slugs en inglés, `localePrefix: 'as-needed'`.** URLs limpias para el mercado principal
  (ES en raíz) sin duplicar rutas por locale; el contenido se localiza, la ruta no.
- **ADR-005 — Patrón presentacional + contenedor.** Aísla el wiring del diseño para que `bump-design`
  no enfrente merge a 3 bandas. Cumple "portar, no importar".
- **ADR-006 — Tailwind v4 (CSS-first).** Sin `tailwind.config.ts`; tokens en bloque `@theme` de
  `app/globals.css`. Los `design-tokens.ts` que entrega Claude.ai **se portan** a ese `@theme` (no se
  importan desde `design-assets/`, coherente con ADR-005 y el contrato read-only). _Reversible:_ v3 +
  `tailwind.config.ts` si hiciera falta.
- **ADR-007 — Geo sin IP cruda.** PostHog deriva geo país/ciudad de la IP pero se configura para
  descartar el `$ip` (no persistir IP en claro). Conserva el dato geográfico útil para el mercado
  internacional con privacidad razonable. _Trade-off:_ no hay geolocalización fina.

## 5. Cómo extender el orquestador

- **Nuevo subagente:** crear `.claude/agents/<name>.md` con misión/cuándo/cuándo-no/inputs/outputs/
  reglas/tools. Promover una skill a agente cuando su carga sea recurrente y necesite frontera de tools
  propia (candidatos: `seo-specialist`, `analytics-engineer`, `i18n-translator`).
- **Nueva skill:** `.claude/skills/<name>/SKILL.md` con front-matter `name` + `description` y pasos
  canónicos. Solo si hay uso recurrente (no skills de un solo uso).
- **Nuevo hook:** script en `.claude/hooks/<name>.mjs` (cross-platform, no-op si falta `package.json`)
  - entrada en `.claude/settings.json`.
- **Nuevo command:** `.claude/commands/<name>.md`.
- **Nuevo MCP:** entrada en `.mcp.json`. Regla: justificar 3+ usos antes de añadir.

## 6. Cómo iterar el diseño (vN → vN+1)

1. Nueva sesión Claude.ai, modificar/añadir componentes.
2. Cargar en `design-assets/v(N+1)/` (carpeta nueva; no sobrescribir vN).
3. `/bump-design vN v(N+1)`.
4. `design-integrator` diffea, re-integra preservando wirings, reporta regresiones.
5. Checkpoint antes de commit. `design-assets/vN/` se conserva como referencia.

## 7. Glosario

- **Asset de diseño:** componente TSX presentacional generado en Claude.ai, en `design-assets/vN/`.
- **Portar:** copiar y adaptar un asset a `components/sections/`, sin importarlo desde `design-assets/`.
- **Contenedor:** Server Component que provee data/analytics/i18n al presentacional.
- **Shape isomorfo a Sanity:** estructura de contenido cuyos nombres de campo y forma replican lo que
  serían documentos Sanity, para migración mecánica futura.
- **Campo localizable:** `{ es: string, en: string }`.
