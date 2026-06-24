/**
 * seo/metadata.ts
 *
 * Per-page Next.js `Metadata` builders. Next.js App Router reads the object you
 * return from `generateMetadata()` (or a static `metadata` export) and emits all
 * the <title>, <meta>, <link rel=canonical>, OG and Twitter tags for you.
 *
 * USAGE (app/page.tsx):
 *   import { pageMetadata } from "@/design-assets/v1/seo/metadata";
 *   export const metadata = pageMetadata("home", "es");
 *
 * For dynamic routes (app/proyectos/[slug]/page.tsx):
 *   export async function generateMetadata({ params }) {
 *     const project = await getProject(params.slug);
 *     return projectMetadata(project, "es");
 *   }
 *
 * Title rule: ~55-60 chars incl. suffix. Description: ~150-160 chars.
 */

import type { Metadata } from "next";
import { SITE, abs, localePath, type Locale } from "./site.config";
import type { ProjectDetail, LocalizedString } from "@/design-assets/v1/shapes";

type PageKey = "home" | "about" | "projects" | "services" | "experience" | "contact" | "privacy" | "blog";

interface PageSeo {
  title: LocalizedString;
  description: LocalizedString;
  /** Path WITHOUT locale prefix (added automatically). */
  path: string;
}

/**
 * Hand-tuned copy per page. Each title/description is length-checked in the
 * README table. Keywords woven in naturally.
 */
const PAGES: Record<PageKey, PageSeo> = {
  home: {
    title: {
      es: "IA aplicada a negocio + Pricing | Francisco Barros",
      en: "Applied AI for Business + Pricing | Francisco Barros",
    },
    description: {
      es: "Consultor en IA aplicada a negocio: automatización, integración de IA, sistemas RAG y reportería automatizada. Diferenciador en pricing y revenue analytics.",
      en: "Applied-AI consultant for business: automation, AI integration, RAG systems and automated reporting. Differentiated by pricing and revenue analytics.",
    },
    path: "/",
  },
  about: {
    title: {
      es: "Sobre mí — Consultor IA y datos | Francisco Barros",
      en: "About — AI & Data Consultant | Francisco Barros",
    },
    description: {
      es: "Ingeniero civil industrial con 4+ años en IA aplicada, automatización, pricing y revenue analytics en retail, telecom y travel. Conoce mi enfoque y stack.",
      en: "Industrial engineer with 4+ years in applied AI, automation, pricing and revenue analytics across retail, telecom and travel. My approach and stack.",
    },
    path: "/about",
  },
  services: {
    title: {
      es: "Servicios de IA aplicada | Francisco Barros",
      en: "Applied AI Services | Francisco Barros",
    },
    description: {
      es: "Servicios: automatización con IA, integración de IA, sistemas RAG, reportería automatizada y consultoría en inteligencia artificial con foco en revenue.",
      en: "Services: AI automation, AI integration, RAG systems, automated reporting and AI consulting with a revenue-focused lens.",
    },
    path: "/servicios",
  },
  projects: {
    title: {
      es: "Proyectos y casos de IA | Francisco Barros",
      en: "Projects & AI Case Studies | Francisco Barros",
    },
    description: {
      es: "Casos reales de automatización con IA, integración de marketplaces, pricing dinámico y reportería automatizada, con impacto medible en revenue y eficiencia.",
      en: "Real cases of AI automation, marketplace integration, dynamic pricing and automated reporting, with measurable impact on revenue and efficiency.",
    },
    path: "/proyectos",
  },
  experience: {
    title: {
      es: "Experiencia profesional | Francisco Barros",
      en: "Professional Experience | Francisco Barros",
    },
    description: {
      es: "Trayectoria en IA aplicada, pricing y revenue analytics: Skinautica, Cocha Travel y Movistar. €2M+ en revenue impactado y -60% en tiempo de análisis.",
      en: "Track record in applied AI, pricing and revenue analytics: Skinautica, Cocha Travel and Movistar. €2M+ revenue impacted and -60% analysis time.",
    },
    path: "/experiencia",
  },
  contact: {
    title: {
      es: "Contacto — Hablemos de tu proyecto IA | Francisco Barros",
      en: "Contact — Let's talk AI | Francisco Barros",
    },
    description: {
      es: "¿Tienes un problema de automatización, integración de IA o reportería? Escríbeme. Respuesta en menos de 24 horas hábiles. Proyectos remotos en Latam y global.",
      en: "Got an automation, AI integration or reporting problem? Write to me. Reply within 24 business hours. Remote projects across Latam and globally.",
    },
    path: "/contacto",
  },
  privacy: {
    title: {
      es: "Privacidad | Francisco Barros",
      en: "Privacy | Francisco Barros",
    },
    description: {
      es: "Cómo trato tus datos: analítica privada con PostHog, sin cookies de tracking de terceros ni perfiles personales.",
      en: "How I handle your data: privacy-friendly PostHog analytics, no third-party tracking cookies, no personal profiles.",
    },
    path: "/privacy",
  },
  blog: {
    title: {
      es: "Blog — IA aplicada y datos | Francisco Barros",
      en: "Blog — Applied AI & Data | Francisco Barros",
    },
    description: {
      es: "Notas sobre IA aplicada a negocio, automatización, sistemas RAG, reportería y pricing analytics. Aprendizajes de proyectos reales.",
      en: "Notes on applied AI for business, automation, RAG systems, reporting and pricing analytics. Lessons from real projects.",
    },
    path: "/blog",
  },
};

/** Build hreflang alternates map for a path. */
function alternatesFor(path: string): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const loc of SITE.locales) {
    languages[loc] = abs(localePath(loc, path));
  }
  // x-default points at the canonical default-locale URL.
  languages["x-default"] = abs(path);
  return {
    canonical: abs(path),
    languages,
  };
}

/** Base OG/Twitter block shared by all pages. */
function openGraphFor(locale: Locale, title: string, description: string, path: string): Metadata["openGraph"] {
  return {
    type: "website",
    siteName: SITE.shortName,
    locale: locale === "es" ? "es_CL" : "en_US",
    title,
    description,
    url: abs(localePath(locale, path)),
    images: [
      {
        // Prefer the dynamic route; falls back to static path if route absent.
        url: abs(`/og?locale=${locale}`),
        width: SITE.ogImage.width,
        height: SITE.ogImage.height,
        alt: `${SITE.name} — ${title}`,
      },
    ],
  };
}

/** Main entry: metadata for a static page. */
export function pageMetadata(key: PageKey, locale: Locale = SITE.defaultLocale): Metadata {
  const p = PAGES[key];
  const title = p.title[locale];
  const description = p.description[locale];

  return {
    metadataBase: new URL(SITE.url),
    title,
    description,
    keywords: SITE.keywords,
    authors: [{ name: SITE.name, url: SITE.url }],
    creator: SITE.name,
    alternates: alternatesFor(p.path),
    openGraph: openGraphFor(locale, title, description, p.path),
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [abs(`/og?locale=${locale}`)],
      ...(SITE.twitterHandle ? { site: SITE.twitterHandle, creator: SITE.twitterHandle } : {}),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
  };
}

/** Dynamic: metadata for a project detail page. */
export function projectMetadata(project: ProjectDetail, locale: Locale = SITE.defaultLocale): Metadata {
  const path = `/proyectos/${project.slug}`;
  const title = `${project.title[locale]} | ${SITE.titleSuffix}`.slice(0, 70);
  const description = project.summary[locale].slice(0, 160);

  return {
    metadataBase: new URL(SITE.url),
    title,
    description,
    alternates: alternatesFor(path),
    openGraph: {
      ...openGraphFor(locale, title, description, path),
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [abs(`/og?locale=${locale}&slug=${project.slug}`)],
    },
  };
}

export { PAGES };
