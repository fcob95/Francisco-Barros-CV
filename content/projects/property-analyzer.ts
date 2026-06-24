import type { ProjectDetail } from "@/lib/content/schemas";

export const propertyAnalyzer: ProjectDetail = {
  slug: "property-analyzer",
  kind: "side-project",
  primaryMetric: {
    value: "6,000+",
    label: { es: "propiedades analizadas", en: "properties analyzed" },
  },
  title: {
    es: "Property Analyzer — Inteligencia de mercado inmobiliario",
    en: "Property Analyzer — Real-estate market intelligence",
  },
  summary: {
    es: "Dashboard interactivo de inversión inmobiliaria sobre 6.000+ propiedades del mercado chileno, con un scoring de oportunidad propio y filtros dinámicos. Pieza autosuficiente, portable y sin backend.",
    en: "Interactive real-estate investment dashboard over 6,000+ Chilean-market properties, with a proprietary opportunity score and dynamic filters. A self-contained, portable, backend-free piece.",
  },
  heroImage: {
    src: "/images/projects/property-analyzer.png",
    alt: {
      es: "Dashboard de Property Analyzer — análisis del mercado inmobiliario de Santiago",
      en: "Property Analyzer dashboard — Santiago real-estate market analysis",
    },
    width: 2160,
    height: 1215,
  },
  heroIsScreenshot: true,
  tags: ["BI", "Data Viz", "Real Estate", "Claude Design"],
  year: 2026,
  featured: false,
  role: {
    es: "Análisis y construcción end-to-end (Claude Code + Claude Design)",
    en: "End-to-end analysis & build (Claude Code + Claude Design)",
  },
  problem: {
    es: "El análisis de inversión inmobiliaria con criterio de analista —limpieza de datos, KPIs, estadística por comuna, rankings y detección de listings sobrevalorados— suele requerir un equipo y herramientas pesadas, y los portales no exponen un score de oportunidad comparable.",
    en: "Analyst-grade real-estate investment analysis —data cleaning, KPIs, per-district statistics, rankings and overvalued-listing detection— usually needs a team and heavy tooling, and portals don't expose a comparable opportunity score.",
  },
  solution: {
    es: "Dashboard que combina análisis tipo analista senior con un Opportunity Score (0–100) propio que pondera descuento vs. mediana del segmento (40%), tamaño (25%), amenities (20%) y ratio baños/dormitorios (15%). Doble score comparativo: Global (vs. la base completa) y Filtered (recalculado sobre el subconjunto que matchea los filtros activos, reconstruyendo las medianas del segmento). Filtros dinámicos en cliente (comuna, dormitorios, baños, rango UF, m², score mínimo, descuento, año, amenities). El protagonista es la metodología: Claude Code construye el pipeline analítico y Claude Design la capa visual.",
    en: "A dashboard combining senior-analyst-style analysis with a proprietary Opportunity Score (0–100) weighting discount vs. segment median (40%), size (25%), amenities (20%) and bath/bedroom ratio (15%). A dual comparative score: Global (vs. the full base) and Filtered (recomputed over the subset matching the active filters, rebuilding segment medians). Dynamic client-side filters (district, bedrooms, baths, UF range, m², min score, discount, year, amenities). The protagonist is the methodology: Claude Code builds the analytical pipeline, Claude Design the visual layer.",
  },
  impact: {
    es: "Profundidad, velocidad y calidad de presentación que antes requerían un equipo, empaquetadas en un único archivo HTML autosuficiente —datos embebidos, sin build ni backend— que se abre en el navegador y se comparte por email o GitHub Pages. La narrativa es la transformación del flujo de BI con Claude Code + Claude Design.",
    en: "Depth, speed and presentation quality that used to require a team, packaged in a single self-contained HTML file —embedded data, no build, no backend— that opens in the browser and is shared by email or GitHub Pages. The narrative is the transformation of the BI workflow with Claude Code + Claude Design.",
  },
  stack: ["HTML", "JavaScript", "CSS", "Claude Code", "Claude Design"],
  gallery: [],
  metrics: [
    {
      label: { es: "propiedades", en: "properties" },
      value: "6,000+",
    },
    {
      label: { es: "Opportunity Score", en: "Opportunity Score" },
      value: "0–100",
    },
    {
      label: { es: "archivo HTML, sin backend", en: "HTML file, no backend" },
      value: "1",
    },
  ],
  links: { demo: "https://property-analyzer-public.vercel.app" },
};
