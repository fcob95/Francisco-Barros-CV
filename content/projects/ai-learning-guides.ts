import type { ProjectDetail } from "@/lib/content/schemas";

export const aiLearningGuides: ProjectDetail = {
  slug: "ai-learning-guides",
  kind: "side-project",
  primaryMetric: {
    value: "3",
    label: { es: "guías · ~255 págs", en: "guides · ~255 pp" },
  },
  title: {
    es: "Guías de estudio: MCP, Agent SDK y Skills",
    en: "Study guides: MCP, Agent SDK & Skills",
  },
  summary: {
    es: "Tres guías de estudio independientes para aprender a construir con IA: el Model Context Protocol, el Claude Agent SDK y Agent Skills. Descargables y libres.",
    en: "Three independent study guides for building with AI: the Model Context Protocol, the Claude Agent SDK and Agent Skills. Free to download.",
  },
  heroImage: {
    src: "/images/projects/ai-learning-guides.svg",
    alt: {
      es: "Guías de estudio descargables sobre IA",
      en: "Downloadable AI study guides",
    },
    width: 1600,
    height: 900,
  },
  tags: ["AI", "MCP", "Agents", "Learning"],
  year: 2026,
  featured: false,
  role: {
    es: "Autor (con asistencia de IA)",
    en: "Author (AI-assisted)",
  },
  problem: {
    es: "Aprender a construir agentes de IA de verdad —MCP, el Agent SDK, Skills— exige cruzar documentación oficial dispersa, specs que cambian de versión y muchos detalles que solo se aprenden tropezando. No existía una ruta de estudio consolidada, en español, con ejemplos y ejercicios.",
    en: "Learning to actually build AI agents —MCP, the Agent SDK, Skills— means crossing scattered official docs, specs that change between versions, and many details you only learn by tripping over them. There was no consolidated, example-driven study path in Spanish.",
  },
  solution: {
    es: "Escribí tres guías de estudio independientes, verificadas contra la documentación oficial (spec MCP 2025-11-25 y docs de Anthropic, auditadas al 2026-05-15), con ejemplos ficticios, ejercicios, glosarios, footguns y una ruta de aprendizaje de 4 semanas. Forman una secuencia: Agent SDK → Skills → MCP. Material de estudio, no documentación oficial — la fuente oficial siempre prevalece.",
    en: "I wrote three independent study guides, verified against official documentation (MCP spec 2025-11-25 and Anthropic docs, audited as of 2026-05-15), with fictitious examples, exercises, glossaries, footguns and a 4-week learning path. They form a sequence: Agent SDK → Skills → MCP. Study material, not official docs — the official source always prevails.",
  },
  impact: {
    es: "Material libre y descargable para que cualquiera con Python intermedio aprenda a construir con MCP, el Agent SDK y Skills desde un solo lugar. Todos los ejemplos son ficticios: cero datos privados.",
    en: "Free, downloadable material so anyone with intermediate Python can learn to build with MCP, the Agent SDK and Skills from a single place. All examples are fictitious: zero private data.",
  },
  stack: ["Claude", "Python", "MCP", "Agent SDK", "Agent Skills"],
  gallery: [],
  metrics: [
    { label: { es: "MCP", en: "MCP" }, value: "122 págs" },
    { label: { es: "Agent Skills", en: "Agent Skills" }, value: "80 págs" },
    { label: { es: "Agent SDK", en: "Agent SDK" }, value: "53 págs" },
  ],
  links: {},
  downloads: [
    {
      file: "/downloads/MCP.pdf",
      label: {
        es: "MCP — Guía de estudio (122 págs)",
        en: "MCP — Study guide (122 pp)",
      },
      summary: {
        es: "El Model Context Protocol de punta a punta: arquitectura host/client/server, primitivas (tools, resources, prompts, sampling), transports (stdio y Streamable HTTP), autorización OAuth 2.1, construir servers y clients en Python, seguridad, debugging y 13 footguns. Contra el spec 2025-11-25.",
        en: "The Model Context Protocol end to end: host/client/server architecture, primitives (tools, resources, prompts, sampling), transports (stdio and Streamable HTTP), OAuth 2.1 authorization, building servers and clients in Python, security, debugging and 13 footguns. Against the 2025-11-25 spec.",
      },
    },
    {
      file: "/downloads/SKILLS.pdf",
      label: {
        es: "Agent Skills — El manual completo (80 págs)",
        en: "Agent Skills — The complete manual (80 pp)",
      },
      summary: {
        es: "La capa que convierte agentes en especialistas: qué es una skill, anatomía y frontmatter YAML, cómo las descubre y carga cada superficie, autoría paso a paso, skills con código y con archivos de referencia, integración en Agent SDK / Claude Code / API, plugins y marketplace, best practices y seguridad. 11 ejercicios.",
        en: "The layer that turns agents into specialists: what a skill is, anatomy and YAML frontmatter, how each surface discovers and loads them, authoring step by step, skills with code and with reference files, integration in Agent SDK / Claude Code / API, plugins and marketplace, best practices and security. 11 exercises.",
      },
    },
    {
      file: "/downloads/SDK.pdf",
      label: {
        es: "Claude Agent SDK en Python (53 págs)",
        en: "Claude Agent SDK in Python (53 pp)",
      },
      summary: {
        es: "Por qué Anthropic externalizó el motor de Claude Code como librería: SDK estándar (LLM como respondedor) vs Agent SDK (el loop vive dentro del SDK), anatomía de un agente, 5 patrones de diseño, costos y performance, y cuándo NO conviene migrar (over-engineering).",
        en: "Why Anthropic externalized the Claude Code engine as a library: standard SDK (LLM as responder) vs Agent SDK (the loop lives inside the SDK), anatomy of an agent, 5 design patterns, cost and performance, and when NOT to migrate (over-engineering).",
      },
    },
  ],
};
