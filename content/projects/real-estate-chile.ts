import type { ProjectDetail } from "@/lib/content/schemas";

export const realEstateChile: ProjectDetail = {
  slug: "real-estate-chile",
  kind: "side-project",
  primaryMetric: {
    value: "3,200+",
    label: { es: "Listings analizados", en: "Listings analyzed" },
  },
  title: {
    es: "Real Estate Investment Analysis — Chile",
    en: "Real Estate Investment Analysis — Chile",
  },
  summary: {
    es: "Pipeline de scoring para departamentos en Santiago, con reporte HTML interactivo standalone.",
    en: "Scoring pipeline for apartments in Santiago, with a standalone interactive HTML report.",
  },
  heroImage: {
    src: "/images/projects/real-estate-chile.svg",
    alt: {
      es: "Análisis de inversión inmobiliaria",
      en: "Real estate investment analysis",
    },
    width: 1600,
    height: 900,
  },
  tags: ["BI", "Real Estate", "Investment"],
  year: 2025,
  featured: false,
  role: {
    es: "Solo build",
    en: "Solo build",
  },
  problem: {
    es: "Las plataformas de propiedades en Chile no muestran rentabilidad esperada, cap rate ni comparables limpios para inversión.",
    en: "Property platforms in Chile do not surface expected yield, cap rate or clean comparables for investment.",
  },
  solution: {
    es: "Scraper de listings + normalización de UF/m², cálculo de cap rate ajustado por barrio, modelo de scoring por liquidez y appreciación esperada. Output: reporte HTML standalone con filtros.",
    en: "Listings scraper + UF/m² normalization, neighborhood-adjusted cap rate, scoring model by liquidity and expected appreciation. Output: standalone HTML report with filters.",
  },
  impact: {
    es: "Tomar decisiones de inversión en minutos en vez de horas; identificar oportunidades fuera del radar de los portales.",
    en: "Investment decisions in minutes instead of hours; opportunities surfaced beyond the portals’ radar.",
  },
  stack: ["Python", "Pandas", "HTML/JS"],
  gallery: [],
  metrics: [
    {
      label: { es: "Listings analizados", en: "Listings analyzed" },
      value: "3,200+",
    },
    {
      label: { es: "Comunas cubiertas", en: "Districts covered" },
      value: "12",
    },
  ],
  links: {},
};
