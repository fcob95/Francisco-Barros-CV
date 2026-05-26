import type { ProjectDetail } from "@/lib/content/schemas";

export const revenueAnalyticsPlatform: ProjectDetail = {
  slug: "revenue-analytics-platform",
  title: {
    es: "Plataforma de Analítica de Revenue",
    en: "Revenue Analytics Platform",
  },
  summary: {
    es: "Modelo de datos y tableros de BI unificados para el equipo comercial de un SaaS B2B.",
    en: "Unified data model and BI dashboards for the commercial team of a B2B SaaS.",
  },
  heroImage: {
    src: "/images/projects/revenue-analytics-platform.svg",
    alt: {
      es: "Tablero de cohortes de ingresos y retención",
      en: "Revenue cohorts and retention dashboard",
    },
    width: 1200,
    height: 630,
  },
  tags: ["BI", "Pricing"],
  year: 2023,
  featured: true,
  role: {
    es: "Consultor de BI y modelado de datos.",
    en: "BI and data modeling consultant.",
  },
  problem: {
    es: "Los reportes de ingresos vivían en planillas dispersas con definiciones inconsistentes de MRR y churn, lo que generaba discusiones de números en vez de decisiones.",
    en: "Revenue reporting lived in scattered spreadsheets with inconsistent MRR and churn definitions, fueling debates about numbers instead of decisions.",
  },
  solution: {
    es: "Diseñé un modelo semántico con métricas certificadas (MRR, NRR, churn, expansión) y construí tableros de cohortes y forecasting que el equipo comercial consulta a diario.",
    en: "I designed a semantic model with certified metrics (MRR, NRR, churn, expansion) and built cohort and forecasting dashboards the commercial team uses daily.",
  },
  impact: {
    es: "Una fuente de verdad única para ingresos, decisiones de pricing respaldadas por cohortes y reuniones comerciales que dejaron de discutir definiciones.",
    en: "A single source of truth for revenue, pricing decisions backed by cohorts and commercial meetings that stopped arguing over definitions.",
  },
  stack: ["SQL", "dbt", "Power BI", "Python"],
  gallery: [
    {
      src: "/images/projects/revenue-analytics-platform.svg",
      alt: {
        es: "Vista de forecasting de ingresos por segmento",
        en: "Revenue forecasting view by segment",
      },
      width: 1200,
      height: 630,
    },
  ],
  metrics: [
    {
      label: { es: "Métricas certificadas", en: "Certified metrics" },
      value: "18",
    },
    {
      label: { es: "Tiempo de reporte", en: "Reporting time" },
      value: "-65%",
    },
    {
      label: { es: "Adopción del equipo", en: "Team adoption" },
      value: "100%",
    },
  ],
  links: {
    repo: "https://github.com/franciscobarros/revenue-analytics-platform",
  },
};
