import type { ProjectDetail } from "@/lib/content/schemas";

export const aiReportingSkinautica: ProjectDetail = {
  slug: "ai-reporting-skinautica",
  kind: "case-study",
  company: "skinautica",
  primaryMetric: {
    value: "-60%",
    label: { es: "Tiempo de análisis", en: "Analysis time" },
  },
  title: {
    es: "AI-Augmented Reporting Pipeline — Skinautica",
    en: "AI-Augmented Reporting Pipeline — Skinautica",
  },
  summary: {
    es: "Automatización de reportería ejecutiva con SQL + Python + Power BI, complementada con IA Generativa para narrativa y QA.",
    en: "Executive reporting automation with SQL + Python + Power BI, complemented with Generative AI for narrative and QA.",
  },
  heroImage: {
    src: "/images/projects/ai-reporting-skinautica.svg",
    alt: {
      es: "Pipeline de reportería con IA",
      en: "AI-augmented reporting pipeline",
    },
    width: 1600,
    height: 900,
  },
  tags: ["AI", "BI", "Automation"],
  year: 2025,
  featured: false,
  role: {
    es: "Consultor Comercial & Analista de Datos",
    en: "Commercial Consultant & Data Analyst",
  },
  problem: {
    es: "Reportería semanal y mensual consumía días-persona en pegar datos entre fuentes, ejecutar queries ad hoc y redactar conclusiones que la gerencia leía en 5 minutos.",
    en: "Weekly and monthly reporting burned person-days on stitching data across sources, running ad-hoc queries and drafting conclusions leadership read in 5 minutes.",
  },
  solution: {
    es: "Capa de orquestación con Claude que (1) consume queries SQL versionadas, (2) ejecuta el cálculo de KPIs y deltas, (3) redacta narrativa ejecutiva con citas a las celdas, y (4) entrega Power BI + memo en una sola pasada.",
    en: "Claude orchestration layer that (1) consumes versioned SQL queries, (2) runs KPI and delta computation, (3) drafts executive narrative with citations to underlying cells, and (4) ships Power BI + memo in a single pass.",
  },
  impact: {
    es: "-60% tiempo de análisis en el ciclo de reportería. Mayor consistencia narrativa entre semanas. Tiempo liberado para análisis estratégico real.",
    en: "-60% analysis time in the reporting cycle. Better narrative consistency week over week. Time freed up for actual strategic analysis.",
  },
  stack: ["Claude API", "Python", "SQL Server", "Power BI", "Bsale", "Shopify"],
  gallery: [],
  metrics: [
    {
      label: { es: "Tiempo de análisis", en: "Analysis time" },
      value: "-60%",
    },
    {
      label: { es: "Reportes automatizados", en: "Reports automated" },
      value: "14",
    },
    {
      label: { es: "Fuentes integradas", en: "Sources integrated" },
      value: "4",
    },
  ],
  links: {},
};
