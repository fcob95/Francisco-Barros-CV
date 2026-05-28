import type { ProjectDetail } from "@/lib/content/schemas";

export const aiOrchestratedPortfolio: ProjectDetail = {
  slug: "ai-orchestrated-portfolio",
  kind: "side-project",
  primaryMetric: {
    value: "5·4·7",
    label: { es: "agentes · skills · hooks", en: "agents · skills · hooks" },
  },
  title: {
    es: "Este portafolio — construido con un orquestador de IA",
    en: "This portfolio — built with an AI orchestrator",
  },
  summary: {
    es: "El sitio que estás viendo: un CV + portafolio bilingüe en Next.js 15, construido con un orquestador de Claude Code propio (subagentes, skills, hooks y ADRs).",
    en: "The site you are looking at: a bilingual CV + portfolio in Next.js 15, built with a custom Claude Code orchestrator (subagents, skills, hooks and ADRs).",
  },
  heroImage: {
    src: "/images/projects/ai-orchestrated-portfolio.svg",
    alt: {
      es: "Arquitectura del sitio y su orquestador de IA",
      en: "Site architecture and its AI orchestrator",
    },
    width: 1600,
    height: 900,
  },
  tags: ["AI Orchestration", "Next.js", "Claude Code", "Full-stack"],
  year: 2026,
  featured: false,
  role: {
    es: "Diseño, arquitectura y desarrollo (solo build, asistido por IA)",
    en: "Design, architecture & development (solo build, AI-assisted)",
  },
  problem: {
    es: "Quería un portafolio que no solo se viera bien, sino que demostrara cómo trabajo: desarrollo asistido por IA de punta a punta, con disciplina de ingeniería real (tipos estrictos, tests, i18n, analítica con consentimiento, SEO). El reto era orquestar todo eso sin que la IA improvisara, manteniendo la fuente del diseño separada de su integración y con calidad verificable en cada paso.",
    en: "I wanted a portfolio that not only looked good but showed how I work: end-to-end AI-assisted development with real engineering discipline (strict types, tests, i18n, consent-based analytics, SEO). The challenge was orchestrating all of that without the AI improvising — keeping the design source separate from its integration, with verifiable quality at every step.",
  },
  solution: {
    es: "Diseñé un orquestador de Claude Code a la medida en `.claude/`: 5 subagentes con roles acotados (planner para planes read-only; frontend-builder para base UI/layout; data-layer para contenido tipado y schemas Zod; design-integrator para portar el diseño con el patrón presentacional+contenedor; code-reviewer como gate crítico), 4 skills reutilizables (integrar una sección de diseño, agregar un proyecto, declarar un evento de analítica tipado, y migrar de una versión de diseño a la siguiente), y 7 hooks que blindan calidad en cada guardado/commit (typecheck, prettier, paridad i18n ES/EN, contenido localizado, cero strings hardcodeados, quartet pre-commit y log de subagentes). MCP de GitHub y PostHog quedan declarados para automatizar PR y analítica. El diseño se genera aparte en Claude.ai y se *porta* por valor (nunca se importa). La ejecución fue por fases (F0–F7) con decisiones registradas como ADRs.",
    en: "I designed a bespoke Claude Code orchestrator in `.claude/`: 5 subagents with scoped roles (planner for read-only plans; frontend-builder for UI/layout base; data-layer for typed content and Zod schemas; design-integrator to port the design with a presentational+container pattern; code-reviewer as a critical gate), 4 reusable skills (integrate a design section, add a project, declare a typed analytics event, and migrate from one design version to the next), and 7 hooks that enforce quality on every save/commit (typecheck, prettier, ES/EN i18n parity, localized content, zero hardcoded strings, a pre-commit quartet, and subagent logging). GitHub and PostHog MCP are declared to automate PRs and analytics. The design is generated separately in Claude.ai and *ported* by value (never imported). Execution ran in phases (F0–F7) with decisions recorded as ADRs.",
  },
  impact: {
    es: "Un sitio listo para producción: bilingüe (ES/EN), accesible (WCAG AA, una sola h1 por página), con SEO completo (metadata dinámica, sitemap, hreflang, JSON-LD, Open Graph), analítica con consentimiento bloqueante y sin IP cruda, y JS inicial bajo 50 kB gzip. Pero el verdadero entregable es el método: un flujo de IA orquestada, auditable y repetible, que es exactamente lo que construyo para automatizar trabajo real.",
    en: "A production-ready site: bilingual (ES/EN), accessible (WCAG AA, a single h1 per page), with full SEO (dynamic metadata, sitemap, hreflang, JSON-LD, Open Graph), consent-gated analytics with no raw IP, and initial JS under 50 kB gzip. But the real deliverable is the method: an orchestrated, auditable, repeatable AI workflow — exactly what I build to automate real work.",
  },
  stack: [
    "Next.js 15",
    "TypeScript",
    "Tailwind v4",
    "next-intl",
    "Zod",
    "PostHog",
    "Resend",
    "Claude Code",
  ],
  gallery: [],
  metrics: [
    {
      label: { es: "Orquestador", en: "Orchestrator" },
      value: "5+4+7",
    },
    {
      label: { es: "Tests (unit + e2e)", en: "Tests (unit + e2e)" },
      value: "57 + 10",
    },
    {
      label: { es: "JS inicial (gzip)", en: "Initial JS (gzip)" },
      value: "<50 kB",
    },
  ],
  links: {
    repo: "https://github.com/fcob95/Francisco-Barros-CV",
    demo: "https://franciscobarroscruz.com",
  },
};
