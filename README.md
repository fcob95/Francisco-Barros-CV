# Francisco Barros — sitio personal

Portafolio + CV interactivo bilingüe (ES/EN), listo para producción: **Next.js 15** (App Router),
**TypeScript strict**, **Tailwind v4**, contenido tipado validado con **Zod**, i18n con **next-intl**,
formulario de contacto con **Resend**, analítica con **PostHog** (consentimiento bloqueante, sin IP
cruda) y SEO completo (metadata dinámica, sitemap, JSON-LD, Open Graph vía `next/og`).

Construido con un **orquestador de Claude Code propio** (`.claude/`): subagentes especializados, skills,
hooks de calidad y decisiones registradas como ADRs. El diseño se genera en Claude.ai y se _porta_ (no se
referencia) hacia producción mediante ese orquestador — separando la fuente del diseño de su integración.

> Estado y plan: `PROGRESS.md`, `PLAN.md`. Arquitectura y decisiones (ADRs): `ARCHITECTURE.md`.

## Setup local

Requisitos: **Node ≥20** (recomendado 22, ver `.nvmrc`). El gestor de paquetes es **pnpm `11.3.0`**,
fijado en `package.json` (`packageManager`) y gestionado por **Corepack** (incluido con Node) — no lo
instales con `npm i -g pnpm`.

```bash
# 1. Habilitar pnpm vía Corepack
corepack enable
# En Windows sin permisos de admin, corepack enable da EPERM al escribir en Program Files.
# Alternativa (instala el shim en el bin global de npm, ya en PATH):
#   corepack enable --install-directory "$APPDATA\npm"
pnpm -v                       # debe imprimir 11.3.0

# 2. Instalar dependencias (usa pnpm-lock.yaml con versiones fijadas)
pnpm install

# 3. Variables de entorno
cp .env.example .env.local    # completar PostHog + Resend

# 4. Servidor local
pnpm dev                      # http://localhost:3000 (Turbopack)
```

Scripts:

| Script            | Qué hace                                                   |
| ----------------- | ---------------------------------------------------------- |
| `pnpm dev`        | Servidor local con Turbopack (`localhost:3000`).           |
| `pnpm build`      | Build de producción.                                       |
| `pnpm start`      | Sirve el build de producción.                              |
| `pnpm typecheck`  | `tsc --noEmit` (TS strict).                                |
| `pnpm lint`       | ESLint CLI (flat config, reglas `next`).                   |
| `pnpm test`       | Tests unitarios (Vitest, jsdom).                           |
| `pnpm test:watch` | Vitest en watch.                                           |
| `pnpm test:e2e`   | E2E (Playwright). Una vez: `pnpm exec playwright install`. |

**Versiones clave** (fijadas en `pnpm-lock.yaml`): Next.js 15.5, React 19.2, TypeScript 5.9,
Tailwind v4.3, next-intl 4, Zod 3, Vitest 2, Playwright 1.60.

> Los scripts de build de binarios nativos (sharp, esbuild, swc…) se aprueban en
> `pnpm-workspace.yaml` (`allowBuilds`), porque pnpm 11 los bloquea por defecto.

## Editar contenido

El contenido vive tipado en `content/` (no hay CMS externo en v1). Campos bilingües usan
`{ es, en }`. Edita el archivo correspondiente y abre PR; Zod valida en build.

- Perfil: `content/profile.ts`
- Proyectos: `content/projects/*.ts` (o usa el orquestador: `/new-project <nombre>`)
- Experiencia: `content/experience.ts`

Migración futura a Sanity: documentada en `ARCHITECTURE.md` (ADR-002) como mapeo mecánico.

## Generar / actualizar el diseño

1. Toma `DESIGN_BRIEF.md`, completa los placeholders.
2. Llévalo a una sesión Claude.ai con la skill `frontend-design`; itera.
3. Carga el resultado en `design-assets/v1/` (ver `design-assets/README.md`).
4. En Claude Code: `/integrate-design v1`.
5. Iteraciones posteriores: nueva carpeta `design-assets/v2/` + `/bump-design v1 v2`.

`design-assets/` es **read-only**: nunca se edita ni se importa directo desde `app/` o `components/`.

## Ver analítica

Dashboard en PostHog Cloud (proyecto configurado vía `NEXT_PUBLIC_POSTHOG_*`). Eventos custom listados
en `DESIGN_BRIEF.md` §6 y registrados en `lib/analytics/events.ts`.

## Deploy

Vercel. Conectar repo, definir envs (`NEXT_PUBLIC_SITE_URL`, PostHog, Resend), deploy. Smoke test prod
con Playwright. Dominio: apuntar `NEXT_PUBLIC_SITE_URL` al dominio final y configurar DNS en Vercel.

## Orquestador `.claude/`

Subagentes, skills, commands y hooks que gobiernan el desarrollo asistido. Guía de extensión en
`ARCHITECTURE.md` §5. Commands: `/plan`, `/review`, `/check-quality`, `/check-i18n`, `/new-project`,
`/integrate-design`, `/bump-design`.

## Licencia

Código bajo licencia **MIT** (ver `LICENSE`). El **contenido personal** (CV, biografía, textos de
proyectos, foto y branding en `content/`, `messages/`, `public/`) es © Francisco Barros Cruz, todos los
derechos reservados — no está cubierto por la licencia del código.
