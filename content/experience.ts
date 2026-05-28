import type { ExperienceItem } from "@/lib/content/schemas";

/**
 * Experience timeline, derived from the canonical design v1 (`design-assets/v1`).
 * Ordered most-recent first. The preview `logo` is a string id (e.g. "movistar");
 * our schema's `logo` is an optional Image, so it is omitted here rather than
 * inventing Image objects (logos can be added later as real assets).
 */
export const experience: ExperienceItem[] = [
  {
    company: "Skinautica",
    role: {
      es: "Consultor Comercial & Analista de Datos",
      en: "Commercial Consultant & Data Analyst",
    },
    period: { start: "2025-01", end: "2026-02" },
    location: "Las Condes, Chile",
    summary: {
      es: "Lideré la capa analítica de la operación retail: integración multicanal, dashboards de margen y rotación, y adopción de IA en flujos de reportería.",
      en: "Led the analytical layer of the retail operation: multi-channel integration, margin and turnover dashboards, and AI adoption in reporting flows.",
    },
    highlights: [
      {
        es: "Automatización de reportería con SQL + Python + Power BI (-60% tiempo de análisis).",
        en: "Reporting automation with SQL + Python + Power BI (-60% analysis time).",
      },
      {
        es: "Integración Bsale × Shopify × AnyMarket × Walmart con gobernanza de datos.",
        en: "Bsale × Shopify × AnyMarket × Walmart integration with data governance.",
      },
      {
        es: "Workflows con Claude para research, queries y memos ejecutivos.",
        en: "Claude workflows for research, queries and executive memos.",
      },
    ],
  },
  {
    company: "Cocha Travel",
    role: {
      es: "Revenue Management Analyst",
      en: "Revenue Management Analyst",
    },
    period: { start: "2024-02", end: "2024-12" },
    location: "Las Condes, Chile",
    summary: {
      es: "Modelamiento de pricing y demanda en industria turística. Participación clave en rollout NDC.",
      en: "Pricing and demand modeling for the travel industry. Key contributor to the NDC rollout.",
    },
    highlights: [
      {
        es: "Modelos de elasticidad y rentabilidad por producto.",
        en: "Elasticity and per-product profitability models.",
      },
      {
        es: "Dashboards Power BI de performance, demanda y forecast.",
        en: "Power BI dashboards for performance, demand and forecast.",
      },
      {
        es: "Implementación NDC para pricing dinámico.",
        en: "NDC implementation for dynamic pricing.",
      },
    ],
  },
  {
    company: "Telefónica / Movistar",
    role: {
      es: "Analista Senior de Operaciones",
      en: "Senior Operations Analyst",
    },
    period: { start: "2022-06", end: "2024-01" },
    location: "Providencia, Chile",
    summary: {
      es: "Iniciativas transversales en operaciones B2C: protección de revenue, anti-fraude en terminales y analítica de retención.",
      en: "Cross-functional B2C operations initiatives: revenue protection, handset anti-fraud and retention analytics.",
    },
    highlights: [
      {
        es: "Programa Trustonic: -20% bad debt, ~EUR 2M anuales en revenue protegido.",
        en: "Trustonic program: -20% bad debt, ~EUR 2M annually in protected revenue.",
      },
      {
        es: "Analítica de churn y detección de fugas de revenue.",
        en: "Churn analytics and revenue leakage detection.",
      },
      {
        es: "Coordinación cross-funcional TI + Legal + Comercial.",
        en: "Cross-functional coordination IT + Legal + Commercial.",
      },
    ],
  },
];
