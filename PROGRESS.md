# PROGRESS.md

Single source of truth del estado arquitectónico actual y las decisiones activas. Reemplaza decisiones
obsoletas, no las historiza (eso vive en `.commits/`).

> Para "dónde estamos y cómo seguir" (ejecución, paso a paso, encargados), ver **`STATUS.md`**. Aquí
> viven solo las **decisiones**; no se duplican en STATUS.

## Estado actual

**Etapa:** E3, **F3 ✅ cerrada (2026-05-26, PR #4)**. F0/F1 cerradas (PR #1/#3). `design-assets/v1/`
cargado (E2.5). Capa de contenido tipado (F1) + i18n next-intl (`es`/`en`, `as-needed`) + layout
`app/[locale]/` + theming `data-theme` (next-themes) + tokens editoriales en `@theme` + shadcn lean.
Entorno verde + CI (quartet + e2e) + `main` protegido por ruleset. Contenido reescrito a los 6
proyectos reales del diseño + schema extendido (ADR-008, decisión 14). **F4 Bloque A ✅** (chrome
site-wide, Hero, Projects list+detail; rutas `/projects` y `/projects/[slug]` SSG; reset global
`prefers-reduced-motion`; eliminada dep huérfana `@radix-ui/react-dropdown-menu`). **F4 Bloque B ✅:
About (`/about`, foto real vía next/image + 4 skill clusters) + Experience (`/experience`, timeline 3
cargos + educación, `formatPeriod` locale-aware) portados; print CSS en `globals.css`. **F4 Bloque C ✅: Contact (`/contact`,
RHF+Zod, estados idle/loading/success/error, errores de campo localizados + honeypot anti-spam) + ruta
API `app/api/contact/route.ts` (Resend, Zod compartido, sin persistencia, Node runtime) + Privacy
(`/privacy`) + 404 editorial; CookieBanner portado sin montar (para F6).\*\* **F4 ✅ COMPLETA**: todas las
secciones de v1 portadas. Quartet verde + **e2e 10/10** contra build de producción; `code-reviewer`
APPROVE-WITH-NITS por bloque. **F5 ✅: `app/[locale]/template.tsx` (transición de página opacity+8px,
reduced-motion sin wrapper); auditoría reduced-motion limpia (todo gateado o cubierto por el reset CSS
global); presupuesto JS medido — todas las rutas <50 kB gz, bajo el NFR de 150 kB. Quartet + e2e 10/10.**
**F6 ✅: PostHog gobernado por consentimiento bloqueante (banner `fb-cookies`), eventos tipados en
`lib/analytics/events.ts` (los 7 del §6) vía helpers `track.*` con chokepoint único que no-opea sin init,
listener delegado sobre `data-event`, hooks scroll_depth/time_on_page, opt-out (Footer reabre banner),
config privacy-safe (sin autocapture/recording, DNT, cookieless); IP cruda se descarta vía toggle manual
de PostHog (TODO_MANUALES §3.1, ADR-007). +14 tests de analítica (40 total). `code-reviewer`
APPROVE-WITH-NITS (slug de `project_link_click` corregido).** **F7 ✅: metadata dinámica por página
(`generateMetadata` + helper `lib/seo/`), title template, canonical + hreflang (es/en/x-default),
`app/sitemap.ts` + `app/robots.ts`, JSON-LD (Person en home/about, CreativeWork en detalle), OG dinámico
vía `next/og` (`opengraph-image` por locale + por proyecto, con fallback de fuentes que no rompe), `<h1>`
sr-only por página (a11y: exactamente un h1 por página). +17 tests SEO (57 total). `code-reviewer`
APPROVE-WITH-NITS (fix bloqueante de lint: `eslint` ahora ignora `playwright-report/`/`test-results/`).**
**ALCANCE F4→F7 COMPLETO**: sitio listo para producción (sin desplegar). Quartet verde + e2e 10/10.
**Última actualización:** 2026-05-28.

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
14. **Diseño v1 = fuente de verdad de shapes; schema extendido más allá del DESIGN_BRIEF §3
    (2026-05-27, ADR-008):** Francisco ratificó que `design-assets/v1/` es la versión de producción del
    front. El diseño usa campos fuera del §3 original (`kind`, `company`, `primaryMetric`, `status` en
    proyectos; `headline`, `stats`, `trustCompanies` en perfil; entidades nuevas `Skills` y `Education`).
    Se **extendió el schema Zod** para soportarlos (respaldados por datos reales, mapeables a Sanity). El
    schema —no el §3— pasa a ser la fuente de verdad de la forma; `DESIGN_BRIEF.md` queda intacto como
    artefacto histórico. Detalle en `ARCHITECTURE.md` ADR-008.

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
- [x] **Contenido real + schema extendido (2026-05-27, decisión 14 / ADR-008):** `data-layer` reescribió
      `content/` a los 6 proyectos reales del diseño v1 (`trustonic-movistar`, `ndc-cocha-travel`,
      `marketplace-integration-skinautica`, `ai-reporting-skinautica`, `finanzas-flow`, `real-estate-chile`),
      perfil/experiencia reales, + nuevas entidades `Skills`/`Education`. Schema Zod extendido (`kind`,
      `company`, `primaryMetric`, `status`, `headline`, `stats`, `trustCompanies`). `getSkills`/`getEducation`
      añadidos. 26 tests Vitest. `code-reviewer` APPROVE-WITH-NITS (finding #1 rechazado con fundamento:
      `z.object()` hace strip por defecto → `getProjects` ya devuelve card-only). Quartet verde.
- [x] **F4 (integración de diseño, 2026-05-27) ✅** — 3 bloques vía `design-integrator`: **A** (chrome
      site-wide + Hero + Projects list/detail + rutas SSG), **B** (About con foto real + Experience timeline + educación + print CSS), **C** (Contact RHF+Zod con errores localizados + honeypot + ruta API Resend
      sin persistencia + Privacy + 404 editorial; CookieBanner portado sin montar para F6). Todas las
      secciones de v1 portadas (porte por valor, sin importar `design-assets/`). e2e extendido a las páginas
      nuevas → **10/10** contra build de producción. Quartet verde. `code-reviewer` APPROVE-WITH-NITS por
      bloque. _(F2 eliminada.)_
- [x] **F5 (animación, 2026-05-27) ✅** — `template.tsx` con transición de página reduced-motion-safe;
      auditoría de animaciones (todo gateado por `useReducedMotion` o cubierto por el reset CSS global);
      presupuesto JS verificado (<50 kB gz/ruta). Quartet + e2e 10/10.
- [x] **F6 (analítica, 2026-05-28) ✅** — PostHog consent-gated (banner bloqueante para init), eventos
      tipados (`track.*`, chokepoint único no-op sin consentimiento), listener delegado + hooks
      scroll/time, opt-out, config privacy-safe; IP cruda vía toggle manual PostHog (ADR-007). 40 tests.
      Quartet + e2e 10/10. Pageview de PostHog (`$pageview`/`$pageleave`) intencionalmente activo
      (solo URL, sin PII) — no está en el catálogo tipado por ser default de la plataforma.
- [x] **F7 (SEO + a11y, 2026-05-28) ✅** — metadata dinámica/localizada por página, canonical + hreflang,
      sitemap + robots, JSON-LD (Person/CreativeWork), OG dinámico `next/og`, `<h1>` por página. +17 tests
      SEO (57 total). Fix de lint (ignorar artefactos Playwright). Quartet + e2e 10/10.
- [x] **ALCANCE ACORDADO (F4→F7) COMPLETO (2026-05-28).** Sitio funcional y listo para producción, sin
      desplegar. **Pendiente fuera de alcance:** F8 (deploy a Vercel + dominio) cuando Francisco lo decida;
      ítems manuales en `TODO_MANUALES.md`; nits diferidos abajo.
- [x] **Portafolio ampliado (2026-05-28):** +2 proyectos → 8 total: `ai-orchestrated-portfolio`
      ("este sitio + su orquestador") y `ai-learning-guides` (3 guías de estudio MCP/Agent SDK/Skills,
      descargables). **Nueva capacidad reusable `downloads[]`** en `ProjectDetail` (schema + bloque
      "Descargas" en el detalle + evento `document_download`). PDFs en `public/downloads/` (revisados:
      seguros, sanitizados, atribuidos). Fix: visual fallback neutro (`frame`) + hero del detalle por
      `kind` + composiciones `agents`/`docs`. Quartet + e2e 11/11. Contenido redactado por Claude,
      revisado por Francisco.
- [ ] (Opcional/futuro) **F8 deploy** + nits diferidos (regex leading-slash en `ImageSchema.src`,
      rate-limiting de `/api/contact`, validación visual final por Francisco).

## Notas abiertas

- **Limpieza F4 (✅ hecha en Bloque A):** al portar `chrome/Header.tsx` (switcher `[ES/EN]` + theme
  toggle inline), se eliminaron `components/theme-toggle.tsx`, `components/locale-switcher.tsx`,
  `components/ui/dropdown-menu.tsx` y la dep `@radix-ui/react-dropdown-menu` (nada los usaba).
- **shadcn sin uso en la UI viva (limpieza 2026-05-28):** el diseño v1 portado usa sus propios
  `<button>`/`<a>` estilizados, así que la `Button` de shadcn (montada en F3) quedó huérfana. Se
  eliminaron `components/ui/button.tsx`, `lib/utils.ts` (`cn`) y las deps `@radix-ui/react-slot`,
  `class-variance-authority`, `clsx`, `tailwind-merge`. `components.json` se conserva: re-agregar shadcn
  más adelante es `pnpm dlx shadcn add <comp>` (recrea `cn`/deps). Matiz: el stack en CLAUDE.md aún lista
  "shadcn/ui", pero hoy no hay componentes shadcn en la UI renderizada.
- **Nits diferidos de Bloque A (`code-reviewer`):** labels editoriales en inglés en locale ES
  (`01 / Home`, `03 / Projects`, textos dentro de SVG `aria-hidden`) — pendiente confirmar con Francisco
  si es intencional (voz del diseño). `projects.intro` fija el conteo 4/2 en prosa (riesgo de quedar
  obsoleto). Claves i18n sembradas sin uso aún (`section.featured/allProjects/...`, `cta.viewProject`).
  Hero detail fallback `CASE STUDY · {slug}` hardcodeado (SVG decorativo, se reemplaza con arte real).
- **Diferido a F7 (a11y/SEO):** `/projects`, `/about`, `/experience` no tienen `<h1>` (empiezan en `<h2>`;
  Hero y `/projects/[slug]` sí tienen `<h1>`). Resolver con `<h1 sr-only>` por página en el paso de SEO,
  de forma consistente, sin alterar el diseño editorial. (WCAG 2.4.6 / 1.3.1.)
- **Contacto — anti-abuso (decidido diferir, Bloque C):** la ruta `/api/contact` tiene validación Zod +
  caps de longitud + honeypot (`company`) que descarta bots en silencio, pero **no tiene rate-limiting**.
  Riesgo aceptado para v1 (un atacante podría inundar el inbox / quemar cuota Resend). Mitigación futura:
  Vercel rate limit / `@upstash/ratelimit` o Cloudflare Turnstile. El literal del email en `contact.error`
  (mensajes) duplica `profile.email` — actualizar ambos al confirmar el correo real (ver `TODO_MANUALES.md`).
- **Nits diferidos de Bloque B (`code-reviewer`):** `companySlugFor` en `Experience.tsx` tiene una rama
  de fallback muerta (inofensiva, degrada a sin-icono). `formatPeriod` no valida `YYYY-MM` malformado;
  considerar regex en `ExperiencePeriodSchema` (fail-fast en el borde). La rama `period.present` está
  cableada pero ningún dato la ejercita aún.
- **Pendiente F4-close:** extender specs e2e a las páginas nuevas (`/projects`, `/about`, `/experience`,
  `/contact`).
- **JS budget:** First Load `/[locale]` 157 kB sin comprimir ≈ 48-55 kB gzipped — holgado bajo el NFR
  (`<150 KB gzipped`, PLAN). Medición formal de presupuesto en F5/F7.
- PostHog MCP documentado pero no activado.
- **Auditoría de seguridad (2026-05-28, `SECURITY_AUDIT.md`):** revisión estática del repo público de cara
  al deploy en Vercel. Sin críticos. 2 medios (rate-limit en `/api/contact` — ver nota anti-abuso arriba;
  faltan security headers en `next.config.ts`) + 3 bajos (`postcss <8.5.10` transitiva build-time, GHSA-qx2v-qp2m-jg93;
  PII pública en PDFs de `public/cv/`; descarte de IP en PostHog es toggle manual, `TODO_MANUALES.md` §3.1).
  **Pre-deploy obligatorio:** cerrar rate-limit + activar descarte de IP. Headers → encajan en F7.
- **GA re-evaluado y descartado (2026-05-28):** Francisco preguntó por Google Analytics; ratificada la
  decisión #1 (**PostHog Cloud only**). GA es anti-patrón en los `CLAUDE.md` y añadiría cookies + IP +
  doble superficie de consentimiento. Si se quiere "vista Google" de SEO, la vía liviana es Search Console
  (sin código/cookies), no GA.

> Resuelto 2026-05-25: flujo **PR-based** confirmado; `main` protegido vía ruleset (PR obligatorio +
> checks `quality`/`e2e` en verde). El log de commits manuales se cubre con `.githooks/pre-commit`.
