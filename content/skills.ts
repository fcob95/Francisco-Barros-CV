import type { SkillCluster } from "@/lib/content/schemas";

/**
 * Skill clusters, derived from the canonical design v1 (`design-assets/v1`).
 * `items` are single-language strings by design (proper nouns / technical
 * terms that read identically in ES/EN).
 */
export const skills: SkillCluster[] = [
  {
    title: {
      es: "Pricing & Revenue Analytics",
      en: "Pricing & Revenue Analytics",
    },
    items: [
      "Pricing strategy",
      "Revenue management",
      "Elasticidad de demanda",
      "Forecasting",
      "Mix comercial",
      "Rentabilidad por canal",
    ],
  },
  {
    title: {
      es: "AI for Business",
      en: "AI for Business",
    },
    items: [
      "Claude (Pro/Max)",
      "ChatGPT",
      "Gemini",
      "NotebookLM",
      "Claude Code",
      "Prompt engineering aplicado",
      "Orquestación de agentes",
    ],
  },
  {
    title: {
      es: "Data & Business Intelligence",
      en: "Data & Business Intelligence",
    },
    items: [
      "SQL avanzado (SQL Server, Oracle)",
      "Power BI (DAX, modelamiento)",
      "Python",
      "Excel avanzado",
      "ETL multifuente",
    ],
  },
  {
    title: {
      es: "Data Governance",
      en: "Data Governance",
    },
    items: [
      "Reglas de negocio",
      "Linaje de datos",
      "Control de calidad",
      "Modelos de datos",
      "Bsale · Shopify · Walmart MP · AnyMarket",
    ],
  },
];
