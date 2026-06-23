import type { Locale, Profile, ProjectDetail, Service } from "@/lib/content";
import { pick } from "@/lib/content";
import { SITE_URL, absoluteUrl } from "@/lib/seo/site";

/**
 * Structured-data (schema.org) builders. Pure functions returning plain JSON-LD
 * objects; injected server-side via the `<JsonLd>` component. Only data already
 * public in `content/` is exposed — no extra PII.
 */

/** Schema.org `Person` from the profile. Surfaced on home + about. */
export function personJsonLd(profile: Profile, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: pick(locale, profile.role),
    description: pick(locale, profile.tagline),
    url: absoluteUrl("/", locale),
    image: `${SITE_URL}${profile.avatar.src}`,
    email: `mailto:${profile.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location,
    },
    sameAs: profile.socials
      .filter((s) => s.platform !== "email")
      .map((s) => s.url),
  };
}

/**
 * Schema.org `ProfessionalService` for the /services surface. The provider is a
 * `Person` built from the profile; `hasOfferCatalog` lists one `Offer` → `Service`
 * per service, with deep-link `url`s (`#<slug>`) matching the section anchors.
 * Only already-public content is exposed.
 */
export function servicesJsonLd(
  services: Service[],
  profile: Profile,
  locale: Locale,
) {
  const servicesUrl = absoluteUrl("/services", locale);
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: profile.name,
    url: servicesUrl,
    areaServed: profile.location,
    provider: {
      "@type": "Person",
      name: profile.name,
      jobTitle: pick(locale, profile.role),
      url: absoluteUrl("/", locale),
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: pick(locale, profile.role),
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: pick(locale, service.title),
          description: pick(locale, service.summary),
          url: `${servicesUrl}#${service.slug}`,
        },
      })),
    },
  };
}

/** Schema.org `CreativeWork` from a project detail. Surfaced on /projects/[slug]. */
export function projectJsonLd(
  project: ProjectDetail,
  profile: Profile,
  locale: Locale,
) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: pick(locale, project.title),
    description: pick(locale, project.summary),
    url: absoluteUrl(`/projects/${project.slug}`, locale),
    inLanguage: locale,
    dateCreated: String(project.year),
    keywords: project.tags.join(", "),
    about: project.tags,
    image: `${SITE_URL}${project.heroImage.src}`,
    creator: {
      "@type": "Person",
      name: profile.name,
      url: absoluteUrl("/", locale),
    },
  };
}
