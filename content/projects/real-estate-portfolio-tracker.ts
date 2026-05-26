import type { ProjectDetail } from "@/lib/content/schemas";

export const realEstatePortfolioTracker: ProjectDetail = {
  slug: "real-estate-portfolio-tracker",
  title: {
    es: "Tracker de Portafolio Inmobiliario",
    en: "Real Estate Portfolio Tracker",
  },
  summary: {
    es: "Herramienta para valorizar y proyectar el flujo de un portafolio de propiedades en UF.",
    en: "Tool to value and forecast the cash flow of a property portfolio in UF.",
  },
  heroImage: {
    src: "/images/projects/real-estate-portfolio-tracker.svg",
    alt: {
      es: "Tablero de flujo de caja inmobiliario en UF",
      en: "Real estate cash flow dashboard in UF",
    },
    width: 1200,
    height: 630,
  },
  tags: ["BI", "Pricing"],
  year: 2022,
  featured: false,
  role: {
    es: "Constructor de la herramienta personal de inversión.",
    en: "Builder of the personal investment tool.",
  },
  problem: {
    es: "Seguir la rentabilidad real de varias propiedades en UF, con créditos hipotecarios y gastos dispersos, era inviable a mano y escondía decisiones de venta o refinanciamiento.",
    en: "Tracking the real yield of several UF-denominated properties, with mortgages and scattered expenses, was unmanageable by hand and hid sell-or-refinance decisions.",
  },
  solution: {
    es: "Construí un modelo que consolida arriendos, gastos y deuda, convierte entre UF y CLP, y proyecta flujos y rentabilidad por propiedad con escenarios de tasa.",
    en: "I built a model that consolidates rents, expenses and debt, converts between UF and CLP, and projects cash flows and yield per property with interest-rate scenarios.",
  },
  impact: {
    es: "Visibilidad clara de la rentabilidad por propiedad y decisiones de refinanciamiento basadas en proyecciones en vez de intuición.",
    en: "Clear visibility of per-property yield and refinancing decisions based on projections instead of intuition.",
  },
  stack: ["Python", "polars", "SQLite", "Power BI"],
  gallery: [
    {
      src: "/images/projects/real-estate-portfolio-tracker.svg",
      alt: {
        es: "Proyección de flujo por propiedad con escenarios de tasa",
        en: "Per-property cash flow projection with rate scenarios",
      },
      width: 1200,
      height: 630,
    },
  ],
  metrics: [
    {
      label: { es: "Propiedades consolidadas", en: "Properties consolidated" },
      value: "6",
    },
    {
      label: { es: "Escenarios de tasa", en: "Rate scenarios" },
      value: "3",
    },
  ],
  links: {
    repo: "https://github.com/franciscobarros/real-estate-portfolio-tracker",
  },
};
