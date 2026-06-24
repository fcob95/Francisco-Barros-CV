/**
 * services/services.data.ts
 *
 * Service catalog — the SEO-primary positioning (applied AI for business),
 * with pricing/revenue analytics as the differentiator (last entry).
 *
 * Each service is indexable copy (problem → what's included → outcome), NOT just
 * bullets in an image. Used by Services.tsx and the ProfessionalService /
 * Service JSON-LD.
 *
 * These are PLACEHOLDER descriptions grounded in Francisco's real skills — review
 * and tweak the copy, but they are safe to ship (no invented client names/metrics
 * beyond what's in the CV).
 */

import type { LocalizedString } from "@/design-assets/v1/shapes";

export interface Service {
  /** Anchor id + JSON-LD @id fragment. */
  slug: string;
  /** Short label used in nav/cards. */
  title: LocalizedString;
  /** One-liner for cards + meta. */
  summary: LocalizedString;
  /** Indexable paragraph (≥ 1 real sentence; keywords woven naturally). */
  description: LocalizedString;
  /** What's included — indexable list. */
  includes: LocalizedString[];
  /** lucide-react icon name (wire in Services.tsx). */
  icon: "Workflow" | "Plug" | "Database" | "FileBarChart" | "Sparkles";
  /** Primary keyword this service targets (for the README map). */
  keyword: string;
}

export const SERVICES: Service[] = [
  {
    slug: "automatizacion-ia",
    title: { es: "Automatización con IA", en: "AI Automation" },
    summary: {
      es: "Automatizo procesos repetitivos de análisis, reportería y operación con IA y código.",
      en: "I automate repetitive analysis, reporting and ops processes with AI and code.",
    },
    description: {
      es: "Diseño e implemento automatización con IA para tareas que hoy consumen días-persona: extracción y limpieza de datos, generación de queries, redacción de reportes y orquestación de flujos. Combino Python, SQL y agentes (Claude Code) para que los procesos corran solos y de forma trazable.",
      en: "I design and implement AI automation for tasks that today burn person-days: data extraction and cleaning, query generation, report drafting and workflow orchestration. I combine Python, SQL and agents (Claude Code) so processes run on their own — and stay traceable.",
    },
    includes: [
      { es: "Mapeo de procesos y puntos de automatización", en: "Process mapping and automation points" },
      { es: "Pipelines en Python + SQL", en: "Python + SQL pipelines" },
      { es: "Orquestación con agentes de IA", en: "AI agent orchestration" },
      { es: "Documentación y handoff", en: "Documentation and handoff" },
    ],
    icon: "Workflow",
    keyword: "automatización con IA",
  },
  {
    slug: "integracion-ia",
    title: { es: "Integración de IA", en: "AI Integration" },
    summary: {
      es: "Conecto modelos de IA con tus sistemas, datos y herramientas existentes.",
      en: "I connect AI models to your existing systems, data and tools.",
    },
    description: {
      es: "Integro IA generativa (Claude, OpenAI, Gemini) con tus fuentes de datos, ERP, e-commerce y marketplaces. Resuelvo el plumbing — APIs, autenticación, manejo de contexto y costos — para que la IA opere dentro de tu stack y no como una herramienta aislada.",
      en: "I integrate generative AI (Claude, OpenAI, Gemini) with your data sources, ERP, e-commerce and marketplaces. I solve the plumbing — APIs, auth, context handling and cost — so AI operates inside your stack, not as an isolated tool.",
    },
    includes: [
      { es: "Integración con APIs y fuentes multifuente", en: "API and multi-source integration" },
      { es: "Manejo de contexto, costos y límites", en: "Context, cost and rate handling" },
      { es: "Conexión con ERP / Shopify / marketplaces", en: "ERP / Shopify / marketplace wiring" },
      { es: "Gobernanza y calidad de datos", en: "Data governance and quality" },
    ],
    icon: "Plug",
    keyword: "integración de IA",
  },
  {
    slug: "sistemas-rag",
    title: { es: "Sistemas RAG", en: "RAG Systems" },
    summary: {
      es: "Construyo sistemas RAG para consultar tu conocimiento interno con IA.",
      en: "I build RAG systems to query your internal knowledge with AI.",
    },
    description: {
      es: "Implemento sistemas RAG (Retrieval-Augmented Generation) que dejan a tu equipo preguntar en lenguaje natural sobre documentos, contratos, reportes y bases de conocimiento internas, con respuestas citadas y verificables. Cubro ingestión, embeddings, recuperación y evaluación.",
      en: "I implement RAG (Retrieval-Augmented Generation) systems that let your team ask natural-language questions over internal documents, contracts, reports and knowledge bases, with cited and verifiable answers. I cover ingestion, embeddings, retrieval and evaluation.",
    },
    includes: [
      { es: "Ingestión y chunking de documentos", en: "Document ingestion and chunking" },
      { es: "Embeddings y base vectorial", en: "Embeddings and vector store" },
      { es: "Recuperación con citas verificables", en: "Retrieval with verifiable citations" },
      { es: "Evaluación de calidad de respuestas", en: "Answer-quality evaluation" },
    ],
    icon: "Database",
    keyword: "sistemas RAG",
  },
  {
    slug: "reporteria-automatizada",
    title: { es: "Reportería automatizada", en: "Automated Reporting" },
    summary: {
      es: "Reportería ejecutiva que se genera sola: datos, KPIs y narrativa.",
      en: "Executive reporting that builds itself: data, KPIs and narrative.",
    },
    description: {
      es: "Construyo reportería automatizada que une SQL, Power BI e IA: ejecuta el cálculo de KPIs y deltas, redacta la narrativa ejecutiva con citas a las celdas y entrega el dashboard y el memo en una sola pasada. En proyectos reales reduje el tiempo de análisis en 60%.",
      en: "I build automated reporting that joins SQL, Power BI and AI: it runs KPI and delta computation, drafts the executive narrative with citations to the underlying cells, and ships the dashboard and memo in a single pass. In real projects I cut analysis time by 60%.",
    },
    includes: [
      { es: "Modelo de KPIs y deltas en SQL", en: "SQL KPI and delta model" },
      { es: "Dashboards en Power BI (DAX)", en: "Power BI dashboards (DAX)" },
      { es: "Narrativa ejecutiva con IA, citada", en: "AI executive narrative, cited" },
      { es: "Programación y entrega recurrente", en: "Scheduling and recurring delivery" },
    ],
    icon: "FileBarChart",
    keyword: "reportería automatizada",
  },
  {
    slug: "consultoria-ia-revenue",
    title: { es: "Consultoría en IA + Revenue", en: "AI + Revenue Consulting" },
    summary: {
      es: "Consultoría en IA aplicada con criterio de pricing y revenue analytics.",
      en: "Applied-AI consulting with a pricing and revenue-analytics lens.",
    },
    description: {
      es: "Consultoría en inteligencia artificial enfocada en negocio: dónde aplica IA, qué automatizar primero y cómo medir el retorno. Mi diferenciador es el criterio de pricing y revenue analytics — conecto la adopción de IA con decisiones de precio, margen y crecimiento rentable.",
      en: "Business-focused AI consulting: where AI applies, what to automate first and how to measure return. My differentiator is a pricing and revenue-analytics lens — I connect AI adoption to price, margin and profitable-growth decisions.",
    },
    includes: [
      { es: "Diagnóstico de oportunidades de IA", en: "AI opportunity assessment" },
      { es: "Roadmap priorizado por impacto", en: "Impact-prioritized roadmap" },
      { es: "Modelos de pricing y elasticidad", en: "Pricing and elasticity models" },
      { es: "Medición de ROI y revenue", en: "ROI and revenue measurement" },
    ],
    icon: "Sparkles",
    keyword: "consultoría en inteligencia artificial",
  },
];
