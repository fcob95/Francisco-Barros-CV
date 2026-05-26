# STATUS.md — tablero de continuidad

> 👉 **Si llegas nuevo a este proyecto (o sesión nueva), lee este archivo primero.** Te dice dónde
> estamos, qué falta y cómo continuar. Para el detalle, ve a los documentos que se citan.
>
> **Estados:** ✅ hecho · 🟡 en curso · ⚪ pendiente · 🔴 bloqueado

**Última actualización:** 2026-05-26 · **Etapa actual:** E3 — **F3 ✅ cerrada** (i18n next-intl + layout `[locale]` + theming + tokens editoriales en `@theme` + shadcn lean; PR #4, quartet/e2e verdes); siguiente: F4 (integración de diseño, sección por sección)

## Orden de lectura para retomar

1. **`STATUS.md`** (este) — dónde estamos y cómo seguir.
2. **`PROGRESS.md`** — decisiones activas (única fuente de verdad de decisiones).
3. **`PLAN.md`** — plan maestro de fases F0–F8 con criterios de aceptación.
4. **`ARCHITECTURE.md`** — arquitectura, ADRs, guía de extensión del orquestador.
5. **`DESIGN_BRIEF.md`** — input para Claude.ai (solo relevante en E2.5).

Regla de roles de archivo: **decisiones → `PROGRESS.md`**; **ejecución/cómo-seguir → `STATUS.md`**;
**plan → `PLAN.md`**; **racional arquitectónico → `ARCHITECTURE.md`**. No dupliques entre ellos.

---

## Resumen por etapa

| Etapa                              | Estado      | Encargado                       | Resultado / qué se hizo                                                                                                                                                                                       | Pendiente                                                                       |
| ---------------------------------- | ----------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **E1 Discovery**                   | ✅          | Claude (main)                   | 9 decisiones cerradas + 2 técnicas (Tailwind v4, geo sin IP). Ver `PROGRESS.md`.                                                                                                                              | —                                                                               |
| **E2 Planificación + orquestador** | ✅ aprobada | Claude (main)                   | 42 archivos: docs rectores, 7 CLAUDE.md jerárquicos, 5 agentes, 4 skills, 7 commands, 7 hooks, `.mcp.json`, contrato design-assets. Revisado: bug `/review` y coherencia de tokens corregidos.                | —                                                                               |
| **E2.5 Diseño**                    | ✅          | **Francisco** (en Claude.ai)    | `design-assets/v1/` cargado (41 archivos, todas las secciones + tokens + preview).                                                                                                                            | —                                                                               |
| **E3 Ejecución (F0–F8)**           | 🟡 en curso | varios subagentes               | **F0 ✅** (entorno + CI + `main` protegido), **F1 ✅** (content layer, PR #3) y **F3 ✅** (i18n + layout `[locale]` + theming + tokens en `@theme` + shadcn lean, PR #4). F4–F8 pendientes. _(F2 eliminada.)_ | F4 (integración de diseño, sección por sección) en adelante, una fase a la vez. |
| **E∞ Iteración de diseño**         | ⚪          | Francisco + `design-integrator` | —                                                                                                                                                                                                             | Futuro: `design-assets/vN/` + `/bump-design`.                                   |

---

## Detalle de E3 — fases

**Estado de fases:** F0 ✅ · F1 ✅ · F3 ✅ (cerradas 2026-05-26) · F4–F8 ⚪. _(F2 eliminada.)_

| Fase                            | Encargado                                | Skill/Command                                       | Criterio de aceptación (resumen)                                                                                                                                                                                                                                                                                                                             |
| ------------------------------- | ---------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **F0** Bootstrap                | `frontend-builder`                       | —                                                   | ✅ Cerrada 2026-05-26 (PR #1). Quartet verde + `.githooks/pre-commit` (wired vía `core.hooksPath`) + CI GitHub Actions (`quality` + `e2e`) + `main` protegido por ruleset (PR + checks). Revisado por `code-reviewer`.                                                                                                                                       |
| **F1** Content layer            | `data-layer`                             | `add-portfolio-project`                             | ✅ Cerrada 2026-05-26 (PR #3). Schemas Zod isomorfos a Sanity (`Profile`/`ProjectCard`/`ProjectDetail`/`ExperienceItem`), acceso async-ready con validación en el borde, seed bilingüe (4 proyectos + 4 exp) + SVGs en `public/`. 15 tests; quartet + e2e verdes; `code-reviewer` APPROVE.                                                                   |
| **F3** i18n + layout + tokens   | `frontend-builder`                       | `/check-i18n`                                       | ✅ Cerrada 2026-05-26 (PR #4). next-intl v4 (`es`/`en`, `as-needed`, detección activa), `app/[locale]/` + `not-found`, tokens editoriales en `@theme` + `[data-theme]`, fuentes `next/font`, theming next-themes, toggle + switcher, shadcn lean (Button/DropdownMenu sobre tokens), paridad ES/EN. `code-reviewer` APPROVE-WITH-NITS; quartet + e2e verdes. |
| **F4** Integración de diseño    | `design-integrator`                      | `integrate-design-section` (`/integrate-design v1`) | 1 sub-fase por sección (Hero→Projects→Detalle→About→Experience→Contact); checkpoint tras CADA una; data real + analytics + i18n + a11y.                                                                                                                                                                                                                      |
| **F5** Animación/interactividad | `frontend-builder` / `design-integrator` | —                                                   | Page transitions, hero CSS/Canvas 3D, `prefers-reduced-motion`; presupuesto JS ok.                                                                                                                                                                                                                                                                           |
| **F6** Analítica completa       | `design-integrator` + `frontend-builder` | `add-analytics-event`                               | PostHog + consentimiento bloqueante + privacidad (geo sin IP cruda); eventos visibles.                                                                                                                                                                                                                                                                       |
| **F7** SEO                      | `frontend-builder`                       | (`update-seo-page` futura)                          | Metadata desde contenido, sitemap bilingüe, JSON-LD, OG, hreflang; Lighthouse SEO 100, Perf ≥90.                                                                                                                                                                                                                                                             |
| **F8** Deploy                   | `frontend-builder`                       | `/deploy` (manual Vercel)                           | Sitio en prod; smoke Playwright verde; dominio documentado.                                                                                                                                                                                                                                                                                                  |

`code-reviewer` se invoca en cada checkpoint antes de pedir "ok". Detalle completo de cada fase en `PLAN.md`.

---

## Cómo seguir — paso a paso

### Paso 1 — AHORA (Francisco, en Claude.ai, NO aquí)

1. Abre **claude.ai** (web), sesión nueva, skill **frontend-design**. No es Claude Code; es otra app.
2. Completa los `[PLACEHOLDER]` de la Sección 1 de `DESIGN_BRIEF.md` (referencias visuales, paleta, tono).
3. Pega el `DESIGN_BRIEF.md` y arranca: _"Diseña los componentes de mi sitio según este brief, una
   sección a la vez, empezando por los design-tokens y el Hero"_. Usa **un solo hilo** para coherencia visual.
4. Itera sección por sección: Hero → Projects list → Project detalle → About → Experience → Contact.
5. Carga el resultado en **`design-assets/v1/`** según `design-assets/README.md` (una carpeta por
   sección con `<Section>.tsx` + `README.md`, más `design-tokens.ts` en la raíz de la versión).

### Paso 2 — Arrancar E3 (en Claude Code, sesión nueva en esta carpeta)

6. Escribe la frase de arranque: **"v1 cargado, iniciar E3"**.
   El agente leerá este `STATUS.md` + `PROGRESS.md` y comenzará F0.

### Paso 3 — Ejecutar F0 → F8 (una fase a la vez)

7. Por cada fase: el subagente encargado ejecuta → `code-reviewer` revisa → **checkpoint** (commit +
   resumen + qué revisar + esperar tu "ok"). En **F4**, checkpoint tras _cada sección_, no por fase.
8. Si en F4 aparece un gap (sección faltante, shape incompatible, asset que viola el contrato): el
   `design-integrator` **para y escala** — decides volver a Claude.ai o adaptar. No inventa.
9. Al cerrar cada fase: **actualizar este `STATUS.md`** (estado, resultado) y `PROGRESS.md` (pendientes).

### Paso 4 — Iterar diseño después de F4 (E∞, cuando quieras)

10. Nuevo diseño en Claude.ai → cargar en `design-assets/v2/` → `/bump-design v1 v2`.

---

## Decisiones menores (resueltas)

- **GitHub MCP / flujo:** confirmado **PR-based** con CI en `main`. `main` queda **protegido** (ruleset:
  PR obligatorio + checks `quality` y `e2e` en verde). Resuelto 2026-05-25 al cerrar F0.

## Cómo mantener este archivo

Actualízalo al cerrar cada fase: cambia el estado en las tablas, anota el resultado y mueve el foco a la
siguiente fase. Mantén la fecha de "Última actualización" y la "Etapa actual" del encabezado al día.
