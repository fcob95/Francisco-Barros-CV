import type { ProjectDetail } from "@/lib/content/schemas";

export const marketplaceIntegrationSkinautica: ProjectDetail = {
  slug: "marketplace-integration-skinautica",
  kind: "case-study",
  company: "skinautica",
  primaryMetric: {
    value: "+25%",
    label: { es: "Ventas digitales", en: "Digital sales" },
  },
  title: {
    es: "Marketplace Integration — Skinautica",
    en: "Marketplace Integration — Skinautica",
  },
  summary: {
    es: "Integración Bsale ERP + Shopify + AnyMarket + Walmart Marketplace, con gobernanza de datos punto a punto.",
    en: "Bsale ERP + Shopify + AnyMarket + Walmart Marketplace integration, with end-to-end data governance.",
  },
  heroImage: {
    src: "/images/projects/marketplace-integration-skinautica.svg",
    alt: { es: "Integración multicanal", en: "Multi-channel integration" },
    width: 1600,
    height: 900,
  },
  tags: ["E-commerce", "Integration", "Retail", "Data Quality"],
  year: 2025,
  featured: false,
  role: {
    es: "Consultor Comercial & Analista de Datos",
    en: "Commercial Consultant & Data Analyst",
  },
  problem: {
    es: "Inventario y precios divergían entre el ERP (Bsale), la tienda Shopify y los marketplaces (Walmart, AnyMarket). Resultado: oversell, pedidos cancelados y pérdida de ranking en Walmart.",
    en: "Inventory and pricing diverged between the ERP (Bsale), the Shopify store and the marketplaces (Walmart, AnyMarket). Result: oversells, canceled orders and lost Walmart ranking.",
  },
  solution: {
    es: "Mapeé el linaje de datos punto a punto, identifiqué los puntos de truncamiento y diseñé reglas de gobernanza para que Bsale sea fuente única de stock y pricing. Implementación con el partner tecnológico.",
    en: "Mapped end-to-end data lineage, identified truncation points, and designed governance rules so Bsale is single source of truth for stock and pricing. Implementation with the tech partner.",
  },
  impact: {
    es: "+25% ventas digitales en el trimestre post-implementación. Oversells eliminados. Ranking recuperado en Walmart Marketplace.",
    en: "+25% digital sales in the quarter post-implementation. Oversells eliminated. Walmart Marketplace rank recovered.",
  },
  stack: ["Bsale", "Shopify", "AnyMarket", "Walmart MP", "Power Query", "SQL"],
  gallery: [],
  metrics: [
    {
      label: { es: "Ventas digitales", en: "Digital sales" },
      value: "+25%",
    },
    {
      label: { es: "Oversells", en: "Oversells" },
      value: "0",
    },
    {
      label: { es: "SKUs unificados", en: "SKUs unified" },
      value: "2,400",
    },
  ],
  links: {},
};
