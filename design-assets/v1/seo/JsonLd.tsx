/**
 * seo/JsonLd.tsx
 *
 * Structured data (schema.org) as JSON-LD. Drop <JsonLd> components into the
 * relevant pages — they render a <script type="application/ld+json"> with the
 * graph. Google reads these for rich results & knowledge-panel signals.
 *
 * Schemas:
 *  - PersonLd            → /about and home (who you are + sameAs profiles)
 *  - ProfessionalServiceLd → home + /servicios (your business + service catalog)
 *  - ServiceLd           → per service (offer-level)
 *  - WebSiteLd           → root layout (sitelinks searchbox-ready)
 *  - BreadcrumbLd        → any deep page
 *
 * All builders return plain objects so you can also unit-test / validate them.
 * Validate output at https://validator.schema.org and
 * https://search.google.com/test/rich-results
 */

import { SITE, abs } from "./site.config";
import type { Locale } from "./site.config";
import type { Service } from "@/design-assets/v1/services/services.data";

// ─────────────────────────────────────────────────────────────────────────────
// Primitive: the <script> tag
// ─────────────────────────────────────────────────────────────────────────────

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify guarantees valid JSON; dangerouslySetInnerHTML is the
      // documented Next.js pattern for JSON-LD.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Builders (pure — return schema.org objects)
// ─────────────────────────────────────────────────────────────────────────────

export function personSchema(locale: Locale = SITE.defaultLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE.url}/#person`,
    name: SITE.name,
    url: SITE.url,
    jobTitle: SITE.jobTitle[locale],
    email: `mailto:${SITE.email}`,
    image: abs(SITE.ogImage.path),
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.locality.city,
      addressRegion: SITE.locality.region,
      addressCountry: SITE.locality.country,
    },
    knowsAbout: [
      "Inteligencia Artificial aplicada",
      "Automatización con IA",
      "Sistemas RAG",
      "Integración de IA",
      "Reportería automatizada",
      "Pricing analytics",
      "Revenue analytics",
      "Business Intelligence",
      "Power BI",
      "SQL",
      "Python",
    ],
    sameAs: [SITE.socials.linkedin, SITE.socials.github],
  };
}

export function professionalServiceSchema(locale: Locale = SITE.defaultLocale, services?: Service[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE.url}/#service`,
    name: SITE.name,
    url: SITE.url,
    description:
      locale === "es"
        ? "Consultoría en IA aplicada a negocio: automatización, integración de IA, sistemas RAG y reportería automatizada, con diferenciador en pricing y revenue analytics."
        : "Applied-AI consulting for business: automation, AI integration, RAG systems and automated reporting, differentiated by pricing and revenue analytics.",
    provider: { "@id": `${SITE.url}/#person` },
    areaServed: SITE.areaServed.regions.map((r) => ({ "@type": "AdministrativeArea", name: r })),
    availableLanguage: ["es", "en"],
    image: abs(SITE.ogImage.path),
    email: `mailto:${SITE.email}`,
    sameAs: [SITE.socials.linkedin, SITE.socials.github],
    ...(services && services.length > 0
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: locale === "es" ? "Servicios de IA aplicada" : "Applied AI services",
            itemListElement: services.map((s) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: s.title[locale],
                description: s.summary[locale],
                url: abs(`/servicios#${s.slug}`),
              },
            })),
          },
        }
      : {}),
  };
}

export function serviceSchema(service: Service, locale: Locale = SITE.defaultLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE.url}/servicios#${service.slug}`,
    name: service.title[locale],
    description: service.description[locale],
    serviceType: service.title[locale],
    provider: { "@id": `${SITE.url}/#person` },
    areaServed: SITE.areaServed.regions.map((r) => ({ "@type": "AdministrativeArea", name: r })),
    url: abs(`/servicios#${service.slug}`),
  };
}

export function webSiteSchema(locale: Locale = SITE.defaultLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.shortName,
    inLanguage: locale,
    publisher: { "@id": `${SITE.url}/#person` },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Convenience composite components
// ─────────────────────────────────────────────────────────────────────────────

/** Put in root layout: WebSite + Person + ProfessionalService graph. */
export function SiteJsonLd({ locale = SITE.defaultLocale, services }: { locale?: Locale; services?: Service[] }) {
  return (
    <JsonLd
      data={[webSiteSchema(locale), personSchema(locale), professionalServiceSchema(locale, services)]}
    />
  );
}

/** Put on /servicios: one Service node per offering. */
export function ServicesJsonLd({ services, locale = SITE.defaultLocale }: { services: Service[]; locale?: Locale }) {
  return <JsonLd data={services.map((s) => serviceSchema(s, locale))} />;
}
