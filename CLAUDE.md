# CLAUDE.md — raíz

Sitio personal de Francisco Barros (CV interactivo + portafolio + analítica). Orquestador editable a
largo plazo. El diseño visual NO se construye aquí: se genera en Claude.ai y se porta vía
`design-integrator`. Fuente de verdad de estado: `PROGRESS.md`. Plan maestro: `PLAN.md`.

## Stack (no cambiar sin ADR en ARCHITECTURE.md)

Next.js 15 App Router · TypeScript `strict` · Tailwind v4 (CSS `@theme`) + shadcn/ui · Framer Motion (3D vía CSS/Canvas,
R3F diferido) · contenido tipado en repo + Zod (isomorfo a Sanity) · PostHog Cloud · next-intl (ES
default, EN; slugs en inglés; `localePrefix: 'as-needed'`) · React Hook Form + Zod · Resend
(email-only) · Vercel · pnpm · Vitest + Playwright.

## Entorno local (arrancar SIEMPRE por aquí)

El proyecto **no usa Python ni venv** — es Node/pnpm. El "entorno" es: `node_modules` + `pnpm-lock.yaml`
(versiones fijadas) + configs. **Al inicio de cada sesión, antes de tocar código, verificar que el
entorno está listo.**

- **Toolchain:** Node ≥20 (usar 22, ver `.nvmrc`) · pnpm **fijado en `11.3.0`** vía `packageManager` +
  Corepack. No instalar pnpm con `npm i -g`; se gestiona con Corepack.
- **pnpm en PATH (gotcha Windows):** `corepack enable` falla con EPERM si no hay admin (escribe en
  `C:\Program Files\nodejs`). Solución usada: `corepack enable --install-directory "C:\Users\fcoba\AppData\Roaming\npm"`
  (bin global de npm, ya en PATH y escribible). Verificar con `pnpm -v` → `11.3.0`.
- **Instalar / restaurar entorno:** `pnpm install`. Scripts de build de binarios nativos
  (sharp, esbuild, swc, etc.) se aprueban en `pnpm-workspace.yaml` → `allowBuilds` (pnpm 11 ya no lee
  `onlyBuiltDependencies` desde `package.json`).
- **Servidor local:** `pnpm dev` → http://localhost:3000 (Turbopack).
- **Quartet de verificación (debe estar verde antes de cerrar cualquier fase):**
  `pnpm typecheck` · `pnpm lint` (ESLint CLI, no `next lint` que está deprecado) · `pnpm test` (Vitest) ·
  `pnpm build`.
- **E2E:** `pnpm test:e2e` (Playwright). Requiere navegadores una vez: `pnpm exec playwright install`.
- **Envs:** copiar `.env.example` → `.env.local` y completar PostHog + Resend antes de features que los usen.

Detalle de versiones resueltas y comandos en `README.md` §Setup local.

## Reglas inviolables

- **Idioma:** contenido visible ES/EN (a `messages/*.json` o `content/`). Código, identificadores,
  nombres de archivo, commits: inglés. Conversación conmigo: español.
- **`design-assets/` es read-only.** Jamás se edita ni se importa desde `app/` o `components/`. Los
  assets **se portan, no se referencian**. Ver `design-assets/CLAUDE.md`.
- **Nada hardcodeado.** Todo string visible va a i18n; todo contenido va a `content/`.
- **Server Components por defecto.** `"use client"` solo con justificación.
- **No instalar dependencias sin justificar.** No renombrar archivos/carpetas sin preguntar.
- **No deploy, commit destructivo ni avance de fase sin "ok" explícito.**
- TS `strict`, sin `any` injustificado. Fail fast con errores descriptivos.

## Patrones canónicos

- Patrón **presentacional + contenedor**: el asset portado se parte en (a) componente presentacional
  "tonto" (copia casi literal del asset) + (b) contenedor Server Component con el wiring
  (data/analytics/i18n). `bump-design` re-porta solo (a).
- Validación Zod en el borde (al leer `content/`).
- Eventos PostHog tipados en `lib/analytics/events.ts`.

## Anti-patrones (rechazar)

Redux/Zustand · Google Analytics · MDX para proyectos · auth de visitantes · persistir submissions de
contacto · arbitrary values de Tailwind cuando hay escala · animación sin `prefers-reduced-motion`.

## Flujo

Una fase a la vez. Checkpoint = commit + resumen + qué revisar + esperar "ok". Declarar qué subagente
se usó y por qué. Si un hook bloquea, explicar antes de saltarlo. Ante gap o ambigüedad: parar y
reportar, no inventar.
