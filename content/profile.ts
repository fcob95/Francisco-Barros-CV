import type { Profile } from "@/lib/content/schemas";

/**
 * Profile content, derived from the canonical design v1 (`design-assets/v1`).
 *
 * PENDING FRANCISCO'S FINAL CONFIRMATION (see TODO_MANUALES.md): the public
 * contact email, social URLs and CV file names below come straight from the
 * design preview seed. Francisco may change `email` / socials / `cvUrl` before
 * launch; treat them as placeholders to validate, not as final values.
 *
 * `avatar.src` points at Francisco's real photo in `public/images/avatar.jpeg`.
 */
export const profile: Profile = {
  name: "Francisco Barros Cruz",
  headline: {
    es: "Pricing Strategy · Revenue Analytics · AI-Augmented Decision Making",
    en: "Pricing Strategy · Revenue Analytics · AI-Augmented Decision Making",
  },
  role: {
    es: "Pricing Strategy · Revenue Analytics · AI-Augmented Decision Making",
    en: "Pricing Strategy · Revenue Analytics · AI-Augmented Decision Making",
  },
  tagline: {
    es: "Profesional senior en Pricing y Revenue Analytics. Trabajo en la intersección de estrategia comercial, datos y IA aplicada — donde la decisión de precio, margen y crecimiento se vuelve modelable.",
    en: "Senior professional in Pricing and Revenue Analytics. I work at the intersection of commercial strategy, data and applied AI — where pricing, margin and growth decisions become modelable.",
  },
  bio: {
    es: "4+ años impulsando decisiones comerciales mediante pricing, revenue management, análisis de demanda y rentabilidad en retail, turismo y telecomunicaciones. Desarrollo modelos de pricing, elasticidad, mix comercial y performance por canal, además de dashboards ejecutivos para apoyar la definición de precios, márgenes y crecimiento rentable. Adopción activa de IA Generativa (Claude, ChatGPT, Gemini, NotebookLM) para acelerar análisis documental, automatización de reportería, generación de insights y workflows estratégicos. Manejo avanzado de SQL, Power BI y Python para integración multifuente y data governance. Impacto medible: -60% tiempo de análisis, +25% ventas digitales, EUR 2M anuales recuperados. Foco en estrategia comercial, ejecución analítica, escalabilidad y uso de IA como multiplicador de productividad.",
    en: "4+ years driving commercial decisions through pricing, revenue management, demand and profitability analysis across retail, travel and telecommunications. I build pricing, elasticity, commercial mix and channel-performance models, plus executive dashboards to support price, margin and growth decisions. Active adoption of Generative AI (Claude, ChatGPT, Gemini, NotebookLM) to accelerate document analysis, reporting automation, insight generation and strategic workflows. Advanced command of SQL, Power BI and Python for multi-source integration and data governance. Measurable impact: -60% analysis time, +25% digital sales, EUR 2M recovered annually. Focus on commercial strategy, analytical execution, scalability and AI as a productivity multiplier.",
  },
  stats: {
    es: "4+ años en retail, telecom y travel. €2M+ en revenue impactado, -60% en tiempo de análisis.",
    en: "4+ years across retail, telecom and travel. €2M+ in revenue impacted, -60% in analysis time.",
  },
  location: "Santiago, Chile",
  avatar: {
    src: "/images/avatar.jpeg",
    alt: {
      es: "Francisco Barros Cruz",
      en: "Francisco Barros Cruz",
    },
    width: 400,
    height: 400,
  },
  email: "fcobarros1995@gmail.com",
  cvUrl: {
    es: "/cv/CV_Francisco_Barros_Cruz.pdf",
    en: "/cv/CV_Francisco_Barros_Cruz_EN.pdf",
  },
  trustCompanies: ["movistar", "cocha", "skinautica"],
  socials: [
    {
      platform: "linkedin",
      url: "https://www.linkedin.com/in/francisco-jose-barros-cruz/",
    },
    { platform: "github", url: "https://github.com/fcob95" },
    { platform: "email", url: "mailto:fcobarros1995@gmail.com" },
  ],
};
