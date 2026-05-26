import type { ExperienceItem } from "@/lib/content/schemas";

/**
 * Seed experience timeline (realistic, NOT final — Francisco replaces later).
 * Ordered most-recent first. One item is ongoing (`end: "present"`).
 */
export const experience: ExperienceItem[] = [
  {
    company: "Independiente",
    role: {
      es: "Consultor en Pricing, BI e IA aplicada",
      en: "Pricing, BI & Applied AI Consultant",
    },
    period: { start: "2022-03", end: "present" },
    location: "Santiago, Chile",
    summary: {
      es: "Asesoro a equipos comerciales en estrategia de precios, analítica de negocio y automatización con IA, construyendo además las herramientas internas que lo sostienen.",
      en: "I advise commercial teams on pricing strategy, business analytics and AI automation, while building the internal tooling that supports it.",
    },
    highlights: [
      {
        es: "Diseñé motores de pricing y modelos de elasticidad para retail y SaaS.",
        en: "Designed pricing engines and elasticity models for retail and SaaS.",
      },
      {
        es: "Construí tableros de BI con métricas certificadas adoptadas por equipos comerciales.",
        en: "Built BI dashboards with certified metrics adopted by commercial teams.",
      },
      {
        es: "Desarrollé agentes de IA para autoservicio de analítica con consultas trazables.",
        en: "Developed AI agents for self-service analytics with traceable queries.",
      },
    ],
    logo: {
      src: "/images/experience/independiente.svg",
      alt: {
        es: "Logo de práctica independiente",
        en: "Independent practice logo",
      },
      width: 120,
      height: 120,
    },
  },
  {
    company: "Retail Regional",
    role: {
      es: "Analista Senior de Revenue Management",
      en: "Senior Revenue Management Analyst",
    },
    period: { start: "2020-01", end: "2022-02" },
    location: "Santiago, Chile",
    summary: {
      es: "Lideré la analítica de precios y promociones para categorías de alto volumen, conectando el área comercial con datos accionables.",
      en: "Led pricing and promotion analytics for high-volume categories, connecting the commercial area with actionable data.",
    },
    highlights: [
      {
        es: "Implementé reglas de precios basadas en margen y posición competitiva.",
        en: "Implemented margin- and competitive-position-based pricing rules.",
      },
      {
        es: "Reduje el ciclo de revisión de precios de semanal a diario.",
        en: "Reduced the price-review cycle from weekly to daily.",
      },
    ],
    logo: {
      src: "/images/experience/retail-regional.svg",
      alt: {
        es: "Logo de Retail Regional",
        en: "Retail Regional logo",
      },
      width: 120,
      height: 120,
    },
  },
  {
    company: "SaaS B2B",
    role: {
      es: "Analista de Business Intelligence",
      en: "Business Intelligence Analyst",
    },
    period: { start: "2018-06", end: "2019-12" },
    location: "Santiago, Chile",
    summary: {
      es: "Construí el modelo semántico de ingresos y los tableros que el equipo comercial usa para decisiones de pricing y retención.",
      en: "Built the revenue semantic model and the dashboards the commercial team uses for pricing and retention decisions.",
    },
    highlights: [
      {
        es: "Unifiqué definiciones de MRR, churn y expansión en una fuente de verdad.",
        en: "Unified MRR, churn and expansion definitions into a single source of truth.",
      },
      {
        es: "Automaticé reportes que antes tomaban días de trabajo manual.",
        en: "Automated reports that previously took days of manual work.",
      },
    ],
  },
  {
    company: "Universidad",
    role: {
      es: "Ingeniero Civil Industrial, mención Finanzas",
      en: "Industrial Civil Engineer, Finance specialization",
    },
    period: { start: "2013-03", end: "2018-05" },
    location: "Santiago, Chile",
    summary: {
      es: "Formación en optimización, estadística y finanzas, con foco en la traducción de problemas de negocio a modelos cuantitativos.",
      en: "Training in optimization, statistics and finance, focused on translating business problems into quantitative models.",
    },
    highlights: [
      {
        es: "Tesis sobre modelos de optimización aplicados a decisiones comerciales.",
        en: "Thesis on optimization models applied to commercial decisions.",
      },
    ],
  },
];
