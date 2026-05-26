# PROGRESS.md

Single source of truth del estado arquitectónico actual y las decisiones activas. Reemplaza decisiones
obsoletas, no las historiza (eso vive en `.commits/`).

> Para "dónde estamos y cómo seguir" (ejecución, paso a paso, encargados), ver **`STATUS.md`**. Aquí
> viven solo las **decisiones**; no se duplican en STATUS.

## Estado actual

**Etapa:** E3, **F3 ✅ cerrada (2026-05-26, PR #4)**. F0/F1 cerradas (PR #1/#3). `design-assets/v1/`
cargado (E2.5). Capa de contenido tipado (F1) + i18n next-intl (`es`/`en`, `as-needed`) + layout
`app/[locale]/` + theming `data-theme` (next-themes) + tokens editoriales en `@theme` + shadcn lean.
Entorno verde + CI (quartet + e2e) + `main` protegido por ruleset. Siguiente: **F4 (integración de
diseño: portar secciones de `design-assets/v1/` a `components/sections/`, una sub-fase por sección)**.
**Última actualización:** 2026-05-26.

> Nota de proceso: el entorno (núcleo de F0) se construyó por pedido explícito de Francisco, **fuera del
> flujo formal de F0** (sin subagente `frontend-builder` ni checkpoint/`code-reviewer`). El 2026-05-25 se
> auditó retroactivamente con `code-reviewer`: detectó que `pnpm test` estaba **roto** (no era "verde"
> como se afirmaba) y otros 3 gaps. `frontend-builder` aplicó los fixes; quartet re-verificado verde.
> La ceremonia formal de F0 (git/hooks/CI/ruleset) ya se completó después: PR #1 mergeado a `main`
> (`7722e97`) con CI en verde y `main` protegido (ver decisión 13). Se conserva esta nota solo como
> aprendizaje de proceso (no volver a construir núcleo fuera del flujo formal).

## Decisiones activas (cerradas en E1)

1. **Analítica:** PostHog Cloud only. Sin Neon/Drizzle/`/api/analytics/track`/`/admin`. F2 eliminada.
2. **CMS:** contenido tipado en repo + Zod, bilingüe, shape isomorfo a Sanity. Migración a Sanity =
   mapeo mecánico futuro (ADR-002 + skill `migrate-content-to-sanity` documentada, no creada).
3. **Orquestador:** lean, 5 agentes. seo/analytics/i18n como skills+hooks, promovibles a agente.
4. **3D:** CSS 3D transforms + Canvas 2D. R3F diferido.
5. **i18n routing:** slugs en inglés todos los locales; `localePrefix: 'as-needed'` (ES raíz, EN `/en`).
   **Detección de idioma activa** (`localeDetection: true`, default de next-intl, ratificado 2026-05-26):
   `/` es la URL canónica en ES, pero un navegador con `Accept-Language: en` se redirige a `/en`. El
   idioma también es conmutable vía el switcher. ("ES raíz" = ES sin prefijo, no "siempre español en `/`".)
6. **Dominio:** placeholder `https://franciscobarros.cl` vía `NEXT_PUBLIC_SITE_URL`.
7. **Contacto:** solo email vía Resend, sin persistencia.
8. **Contenido:** seed bilingüe realista; reemplazo posterior editando `content/`.
9. **Patrón de diseño:** presentacional + contenedor.
10. **Tailwind v4** (CSS-first): tokens portados al bloque `@theme` de `app/globals.css`, no
    `tailwind.config.ts` (ADR-006).
11. **Analítica geo:** PostHog deriva geo país/ciudad y descarta la IP cruda (`$ip`); no se persiste
    (ADR-007).
12. **Toolchain fijado:** pnpm `11.3.0` (vía `packageManager` + Corepack), Node ≥20 (`.nvmrc` = 22).
    Versiones del stack fijadas en `pnpm-lock.yaml` (Next 15.5, React 19.2, TS 5.9, Tailwind v4.3,
    next-intl 4, Zod 3, Vitest 2, Playwright 1.60). Scripts de build nativos aprobados en
    `pnpm-workspace.yaml` (`allowBuilds`; pnpm 11 ya no lee `onlyBuiltDependencies` de `package.json`).
    Lint vía ESLint CLI (no `next lint`, deprecado en Next 16). **No hay Python/venv** — el "entorno" es
    Node/pnpm. Guía de arranque por sesión en `CLAUDE.md` §Entorno local.
13. **Repo público + `main` protegido (2026-05-26):** el repo `github.com/fcob95/Francisco-Barros-CV`
    pasó de **privado a público**. Motivo: los rulesets / branch protection requieren GitHub Pro en
    repos privados; público los habilita gratis. Se verificó que la historia no contiene secretos (solo
    placeholders en `.env.example`). `main` protegido por **ruleset** (id 16886707): PR obligatorio,
    checks `quality` y `e2e` en verde, sin push directo ni force-push. Flujo PR-based confirmado.

- [x] Cerrar scaffolding E2 (docs + `.claude/` + CLAUDE.md jerárquicos + design-assets).
- [x] Gate E2 → aprobado por Francisco (2026-05-25).
- [x] **E2.5:** `design-assets/v1/` cargado (41 archivos: hero, projects-list, project-detail, about,
      experience, contact, chrome, extras, design-tokens, preview).
- [x] **F0 (núcleo, fuera de flujo formal):** `package.json` + lockfile, `tsconfig` strict, Tailwind v4
      (`@import "tailwindcss"` + `@theme` vacío), `app/{layout,page}.tsx` placeholder, ESLint flat config,
      Vitest (+ smoke test) y Playwright configurados.
- [x] **F0 (auditoría retroactiva, 2026-05-25):** `code-reviewer` revisó el núcleo. Bloqueante: `pnpm
test` roto por contaminación de `postcss.config.mjs` hacia el pipeline de Vitest. `frontend-builder`
      aplicó fixes: aislar Vitest del PostCSS (`css.postcss.plugins: []` en `vitest.config.ts`), crear
      `.nvmrc=22`, añadir `pnpm test` al hook `stop-quality.mjs`, instalar `prettier` 3.8.3 +
      `.prettierrc.json`/`.prettierignore`. Quartet re-verificado verde (lint/typecheck/test/build; First
      Load JS 103 kB, dentro del NFR <150 KB).
- [x] **F0 (repo, 2026-05-25):** `git init` (rama `main`) + commit inicial `7919275` (101 archivos,
      sin secretos) con primer log en `.commits/`. Push a `github.com/fcob95/Francisco-Barros-CV`
      (privado en su origen; **ahora público**, ver decisión 13). `.gitignore` endurecido (`.env*` +
      `!.env.example`). Commit inicial fue directo a
      `main` (remoto vacío); cambios siguientes vía **flujo PR-based** (decidido 2026-05-25).
- [x] **F0 (cierre formal, 2026-05-26, PR #1):** `.githooks/pre-commit` (defense-in-depth del flujo
      `commit-logger` para commits manuales) + `core.hooksPath` wired vía `scripts/setup-hooks.mjs`
      (`prepare`); GitHub Actions `ci.yml` con jobs `quality` (install `--frozen-lockfile` + quartet) y
      `e2e` (playwright contra `build && start` en CI). PR #1 con CI verde → merge rebase a `main`
      (`7722e97`). `main` protegido por ruleset (ver decisión 13); rechazo de push directo verificado.
      Revisado por `code-reviewer` (bloqueante B1 + D1 + D2 aplicados).
- [x] **Inconsistencia menor (`PLAN.md` §F0):** alineado — shadcn se inicializa en **F3** (no F0); se
      quitó "Husky" (se usa `.githooks/` nativo vía `core.hooksPath`); CI ahora incluye test + e2e.
- [x] **F1 (content layer, 2026-05-26, PR #3):** `lib/content/schemas.ts` (Zod isomorfo a Sanity:
      `Profile`, `ProjectCard`, `ProjectDetail` extends, `ExperienceItem`; tipos vía `z.infer`),
      `lib/content/index.ts` (`getProfile/getProjects/getProject(slug)/getExperience` async-ready,
      validación en el borde, `pick(locale, field)`), seed bilingüe en `content/` (4 proyectos + 4 exp) + SVGs placeholder en `public/`. 15 tests Vitest. `code-reviewer` APPROVE; quartet + e2e verdes.
- [x] **F3 (i18n + layout + tokens, 2026-05-26, PR #4):** next-intl v4 (`i18n/{routing,navigation,request}`,
      `middleware.ts`, `global.d.ts`), restructure a `app/[locale]/` (+ `not-found` localizado y shim raíz),
      tokens editoriales portados verbatim al `@theme` + `[data-theme="dark"]` de `globals.css`, fuentes vía
      `next/font`, theming con next-themes (`attribute="data-theme"`), theme-toggle + locale-switcher,
      shadcn lean (Button + DropdownMenu mapeados a tokens, sin paleta paralela), `messages/{es,en}.json`
      con paridad. `code-reviewer` APPROVE-WITH-NITS; quartet + e2e + paridad i18n verdes.
- [ ] E3: F4 (integración de diseño) — una sub-fase por sección (Hero → Projects list → Project detalle →
      About → Experience → Contact) vía `design-integrator` + `integrate-design-section`. Checkpoint tras
      CADA sección. _(F2 eliminada.)_

## Notas abiertas

- **Limpieza candidata en F4:** al portar `chrome/Header.tsx` de v1 (switcher `[ES/EN]` inline +
  icon-toggle), el `locale-switcher.tsx` con shadcn DropdownMenu queda obsoleto. Si nada más usa
  DropdownMenu tras F4, eliminar el primitive `components/ui/dropdown-menu.tsx`, `locale-switcher.tsx`
  y la dep `@radix-ui/react-dropdown-menu`. Mover los toggles a `components/layout/`.
- **JS budget:** First Load `/[locale]` 157 kB sin comprimir ≈ 48-55 kB gzipped — holgado bajo el NFR
  (`<150 KB gzipped`, PLAN). Medición formal de presupuesto en F5/F7.
- PostHog MCP documentado pero no activado.

> Resuelto 2026-05-25: flujo **PR-based** confirmado; `main` protegido vía ruleset (PR obligatorio +
> checks `quality`/`e2e` en verde). El log de commits manuales se cubre con `.githooks/pre-commit`.
