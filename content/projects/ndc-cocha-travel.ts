import type { ProjectDetail } from "@/lib/content/schemas";

export const ndcCochaTravel: ProjectDetail = {
  slug: "ndc-cocha-travel",
  kind: "case-study",
  company: "cocha",
  primaryMetric: {
    value: "120+",
    label: {
      es: "Rutas con pricing dinámico",
      en: "Routes with dynamic pricing",
    },
  },
  title: {
    es: "NDC Dynamic Pricing — Cocha Travel",
    en: "NDC Dynamic Pricing — Cocha Travel",
  },
  summary: {
    es: "Participación en la implementación del estándar NDC para pricing dinámico en travel distribution.",
    en: "Key contributor to the NDC standard rollout for dynamic pricing in travel distribution.",
  },
  heroImage: {
    src: "/images/projects/ndc-cocha-travel.svg",
    alt: { es: "Pricing dinámico NDC", en: "NDC dynamic pricing" },
    width: 1600,
    height: 900,
  },
  tags: ["Pricing", "Travel", "NDC", "Revenue Management"],
  year: 2024,
  featured: true,
  role: {
    es: "Revenue Management Analyst",
    en: "Revenue Management Analyst",
  },
  problem: {
    es: "La operación dependía de fares estáticos provistos por GDS legacy. Sin capacidad de matizar oferta por canal, segmento o ventana de compra, se perdían oportunidades de revenue y la competitividad caía frente a OTAs.",
    en: "The operation depended on static fares from a legacy GDS. Without the ability to differentiate offer by channel, segment or buying window, revenue opportunities were lost and competitiveness eroded versus OTAs.",
  },
  solution: {
    es: "Co-diseñé el pipeline NDC con aerolíneas partner y el equipo TI: ingestión en tiempo real de ofertas, modelo de elasticidad por ruta y segmento, y motor de decisión que prioriza el mejor combo precio-margen-conversión en cada query.",
    en: "Co-designed the NDC pipeline with partner airlines and IT: real-time offer ingestion, route-and-segment elasticity model, and a decision engine that picks the best price-margin-conversion combo per query.",
  },
  impact: {
    es: "Reducción del gap competitivo vs OTAs en tarifas, mayor flexibilidad para campañas tácticas y trazabilidad completa del descuento aplicado por venta.",
    en: "Closed the competitive gap vs OTAs on fares, enabled tactical campaigns, and gave full traceability of the discount applied per booking.",
  },
  stack: ["SQL Server", "Power BI", "Python", "NDC XML", "Azure Data Factory"],
  gallery: [],
  metrics: [
    {
      label: {
        es: "Rutas con pricing dinámico",
        en: "Routes with dynamic pricing",
      },
      value: "120+",
    },
    {
      label: { es: "Gap vs OTA reducido", en: "OTA gap closed" },
      value: "~40%",
    },
    {
      label: { es: "Tiempo a nuevo fare", en: "Time-to-new-fare" },
      value: "<5min",
    },
  ],
  links: {},
};
