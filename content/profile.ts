import type { Profile } from "@/lib/content/schemas";

/**
 * Seed profile content (realistic, NOT final — Francisco replaces later).
 * Localizable fields carry both { es, en }; ES tends to be slightly longer.
 */
export const profile: Profile = {
  name: "Francisco Barros",
  role: {
    es: "Consultor en Product Management, BI y Pricing Intelligence",
    en: "Product Management, BI & Pricing Intelligence Consultant",
  },
  tagline: {
    es: "Convierto datos comerciales en decisiones de precio y producto que mueven el margen.",
    en: "I turn commercial data into pricing and product decisions that move the margin.",
  },
  bio: {
    es: "Ingeniero Civil Industrial chileno con especialización en finanzas. Trabajo en la intersección de analítica de negocio, pricing e IA aplicada: diseño modelos de precios, tableros de BI y herramientas internas que automatizan el análisis comercial. He liderado iniciativas de revenue management en retail y SaaS, traduciendo problemas ambiguos de negocio en sistemas medibles. Construyo lo que recomiendo: Python, SQL, Power BI y agentes de IA para acortar la distancia entre el análisis y la acción.",
    en: "Chilean Industrial Civil Engineer with a finance specialization. I work at the intersection of business analytics, pricing and applied AI: I design pricing models, BI dashboards and internal tools that automate commercial analysis. I have led revenue management initiatives across retail and SaaS, translating ambiguous business problems into measurable systems. I build what I recommend: Python, SQL, Power BI and AI agents to close the gap between analysis and action.",
  },
  location: "Santiago, Chile",
  avatar: {
    src: "/images/avatar.svg",
    alt: {
      es: "Retrato de Francisco Barros",
      en: "Portrait of Francisco Barros",
    },
    width: 400,
    height: 400,
  },
  email: "hello@franciscobarros.cl",
  cvUrl: {
    es: "/cv/francisco-barros-cv-es.pdf",
    en: "/cv/francisco-barros-cv-en.pdf",
  },
  socials: [
    {
      platform: "linkedin",
      url: "https://www.linkedin.com/in/franciscobarros",
    },
    { platform: "github", url: "https://github.com/franciscobarros" },
    { platform: "x", url: "https://x.com/franciscobarros" },
    { platform: "email", url: "mailto:hello@franciscobarros.cl" },
  ],
};
