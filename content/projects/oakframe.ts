import type { ProjectDetail } from "@/lib/content/schemas";

export const oakframe: ProjectDetail = {
  slug: "oakframe",
  kind: "side-project",
  primaryMetric: {
    value: "7",
    label: { es: "subagentes orquestados", en: "orchestrated subagents" },
  },
  title: {
    es: "OAKFRAME — E-commerce de muebles, AI-native",
    en: "OAKFRAME — Furniture e-commerce, AI-native",
  },
  summary: {
    es: "Plataforma e-commerce full-stack para una mueblería de autor: storefront, panel de administración y asistente con RAG, construida con orquestación agéntica y seguridad desde el diseño.",
    en: "Full-stack e-commerce platform for a bespoke furniture brand: storefront, admin panel and a RAG assistant, built with agentic orchestration and security-by-design.",
  },
  heroImage: {
    src: "/images/projects/oakframe.png",
    alt: {
      es: "Storefront de OAKFRAME — mueblería de autor en Santiago",
      en: "OAKFRAME storefront — bespoke furniture shop in Santiago",
    },
    width: 2160,
    height: 1215,
  },
  heroIsScreenshot: true,
  tags: ["E-commerce", "Full-stack", "RAG", "Security"],
  year: 2026,
  featured: true,
  role: {
    es: "Diseño y desarrollo end-to-end (full-stack, orquestación agéntica)",
    en: "End-to-end design & development (full-stack, agentic orchestration)",
  },
  problem: {
    es: "Una mueblería de autor necesitaba vender online —catálogo, cotización por proyecto y operación centralizada— sin depender de plataformas genéricas y sin exponer datos de pago ni de clientes.",
    en: "A bespoke furniture brand needed to sell online —catalog, per-project quoting and centralized operations— without relying on generic platforms and without exposing payment or customer data.",
  },
  solution: {
    es: "Plataforma propia con storefront público (catálogo, fichas y cotización), panel de administración full (productos, inventario, órdenes, cotizaciones) y un chatbot con RAG fundamentado en una base de conocimiento propia. Arquitectura multi-cloud: Next.js 15 (Vercel), FastAPI (Railway), PostgreSQL (Neon) e imágenes en Cloudflare R2. Integraciones: Mercado Pago (tokenizado/redirect, alcance PCI SAQ-A), Chilexpress (envío en tiempo real) y Google Maps. Construida con un ecosistema de Claude Code: orquestador restrictivo con checkpoint humano por fase, 7 subagentes especializados (incluido un security-auditor con veto vinculante), 4 hooks de seguridad deterministas y CI/CD con OIDC sin credenciales estáticas.",
    en: "A custom platform with a public storefront (catalog, product pages, quoting), a full admin panel (products, inventory, orders, quotes) and a RAG chatbot grounded in a private knowledge base. Multi-cloud architecture: Next.js 15 (Vercel), FastAPI (Railway), PostgreSQL (Neon) and images on Cloudflare R2. Integrations: Mercado Pago (tokenized/redirect, PCI SAQ-A scope), Chilexpress (real-time shipping) and Google Maps. Built with a Claude Code ecosystem: a restrictive orchestrator with a human checkpoint per phase, 7 specialized subagents (including a security-auditor with binding veto), 4 deterministic security hooks and OIDC-based CI/CD with no static credentials.",
  },
  impact: {
    es: "Ownership end-to-end de un producto real en producción: arquitectura distribuida multi-cloud, compliance de pagos (PCI SAQ-A), RAG en producción y cumplimiento de la Ley 21.719 desde el baseline. No es «montar una tienda»: es ingeniería de software con criterio de seguridad.",
    en: "End-to-end ownership of a real product in production: distributed multi-cloud architecture, payments compliance (PCI SAQ-A), RAG in production and Law 21.719 compliance from the baseline. Not “setting up a store” — software engineering with a security mindset.",
  },
  stack: [
    "Next.js 15",
    "FastAPI",
    "PostgreSQL",
    "Cloudflare R2",
    "Mercado Pago",
    "Claude Code",
  ],
  gallery: [],
  metrics: [
    {
      label: { es: "subagentes especializados", en: "specialized subagents" },
      value: "7",
    },
    {
      label: { es: "servicios cloud", en: "cloud services" },
      value: "4",
    },
    {
      label: { es: "alcance de pagos", en: "payments scope" },
      value: "PCI SAQ-A",
    },
  ],
  links: { demo: "https://www.okfrm.com" },
};
