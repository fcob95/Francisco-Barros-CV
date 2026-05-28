import type { ProjectDetail } from "@/lib/content/schemas";

export const finanzasFlow: ProjectDetail = {
  slug: "finanzas-flow",
  kind: "side-project",
  primaryMetric: {
    value: "3",
    label: { es: "Bancos integrados", en: "Banks integrated" },
  },
  title: {
    es: "Finanzas Flow",
    en: "Finanzas Flow",
  },
  summary: {
    es: "App de gestión financiera que procesa emails bancarios chilenos (BICE, Santander, Falabella) y clasifica transacciones con IA.",
    en: "Personal finance app that ingests Chilean bank emails (BICE, Santander, Falabella) and classifies transactions with AI.",
  },
  heroImage: {
    src: "/images/projects/finanzas-flow.svg",
    alt: { es: "Finanzas Flow", en: "Finanzas Flow" },
    width: 1600,
    height: 900,
  },
  tags: ["AI", "Personal Finance", "Python"],
  year: 2026,
  featured: false,
  // Source preview uses status 'WIP'; normalized to lowercase "wip" per schema.
  status: "wip",
  role: {
    es: "Solo build",
    en: "Solo build",
  },
  problem: {
    es: "Los emails bancarios chilenos llegan en formatos variables por banco y son difíciles de consolidar en un único feed financiero útil para presupuestar.",
    en: "Chilean bank emails arrive in bank-specific formats and are hard to consolidate into a single useful feed for budgeting.",
  },
  solution: {
    es: "Backend Python/FastAPI con SQLAlchemy 2.x. Parser por banco con fallback a Claude API para casos ambiguos. Clasificación de transacciones por categoría aprendiendo del histórico del usuario.",
    en: "Python/FastAPI backend with SQLAlchemy 2.x. Per-bank parser with Claude API fallback for ambiguous cases. Transaction classification by category, learning from the user history.",
  },
  impact: {
    es: "Feed unificado de cashflow en tiempo real, sin depender de Open Banking (que en Chile aún es limitado).",
    en: "Unified cashflow feed in real time, without depending on Open Banking (still limited in Chile).",
  },
  stack: ["Python 3.11", "FastAPI", "SQLAlchemy 2.x", "Claude API"],
  gallery: [],
  metrics: [
    {
      label: { es: "Bancos soportados", en: "Banks supported" },
      value: "3",
    },
    {
      label: { es: "Status", en: "Status" },
      value: "WIP",
    },
  ],
  links: {},
};
