import type { ProjectDetail } from "@/lib/content/schemas";

export const pricingIntelligenceEngine: ProjectDetail = {
  slug: "pricing-intelligence-engine",
  title: {
    es: "Motor de Pricing Intelligence",
    en: "Pricing Intelligence Engine",
  },
  summary: {
    es: "Sistema de precios dinámicos que monitorea competencia y elasticidad para un retailer regional.",
    en: "Dynamic pricing system tracking competitors and elasticity for a regional retailer.",
  },
  heroImage: {
    src: "/images/projects/pricing-intelligence-engine.svg",
    alt: {
      es: "Tablero del motor de pricing con curvas de elasticidad",
      en: "Pricing engine dashboard with elasticity curves",
    },
    width: 1200,
    height: 630,
  },
  tags: ["Pricing", "AI", "BI"],
  year: 2024,
  featured: true,
  role: {
    es: "Líder técnico y de producto del motor de pricing.",
    en: "Technical and product lead of the pricing engine.",
  },
  problem: {
    es: "El retailer fijaba precios con planillas manuales y reaccionaba tarde a la competencia, perdiendo margen en categorías clave y arriesgando quiebres de stock por promociones mal calibradas.",
    en: "The retailer set prices with manual spreadsheets and reacted late to competitors, leaking margin in key categories and risking stockouts from poorly calibrated promotions.",
  },
  solution: {
    es: "Construí un motor que ingiere precios de competencia, estima elasticidad por SKU con modelos de regresión y recomienda precios bajo restricciones de margen y reglas de negocio, expuesto en un tablero accionable.",
    en: "I built an engine that ingests competitor prices, estimates per-SKU elasticity with regression models and recommends prices under margin constraints and business rules, surfaced in an actionable dashboard.",
  },
  impact: {
    es: "Recuperación de margen en las categorías piloto y reducción drástica del tiempo de revisión de precios, pasando de ciclos semanales manuales a recomendaciones diarias.",
    en: "Margin recovery across pilot categories and a drastic cut in price-review time, moving from manual weekly cycles to daily recommendations.",
  },
  stack: ["Python", "pandas", "scikit-learn", "PostgreSQL", "Power BI"],
  gallery: [
    {
      src: "/images/projects/pricing-intelligence-engine.svg",
      alt: {
        es: "Vista de recomendaciones de precio por categoría",
        en: "Per-category price recommendation view",
      },
      width: 1200,
      height: 630,
    },
  ],
  metrics: [
    {
      label: { es: "Recuperación de margen", en: "Margin recovery" },
      value: "+3.2 pts",
    },
    {
      label: { es: "Tiempo de revisión", en: "Review time" },
      value: "-80%",
    },
    {
      label: { es: "SKUs cubiertos", en: "SKUs covered" },
      value: "12k",
    },
  ],
  links: {
    repo: "https://github.com/franciscobarros/pricing-intelligence-engine",
    demo: "https://pricing-demo.franciscobarros.cl",
  },
};
