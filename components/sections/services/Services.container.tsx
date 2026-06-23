import { getTranslations } from "next-intl/server";

import { getServices, pick, type Locale } from "@/lib/content";
import { Services, type ServicesCopy, type ServiceView } from "./Services";

/**
 * Services container (Server Component).
 *
 * Reads the service catalog from the content layer, locale-resolves every
 * `{ es, en }` field via `pick`, resolves all chrome labels via getTranslations,
 * and hands a serializable view-model + copy bundle to the presentational
 * Services. No content access or `t`/`L`/`pick` crosses the boundary.
 *
 * Service order in the array is the visual order (5 expected).
 */
export async function ServicesContainer({ locale }: { locale: Locale }) {
  const services = await getServices();

  const tServices = await getTranslations("services");
  const tCta = await getTranslations("cta");

  const servicesView: ServiceView[] = services.map((service) => ({
    slug: service.slug,
    title: pick(locale, service.title),
    description: pick(locale, service.description),
    includes: service.includes.map((it) => pick(locale, it)),
    icon: service.icon,
  }));

  const copy: ServicesCopy = {
    sectionLabel: tServices("sectionLabel"),
    countSuffix: tServices("countSuffix"),
    heading: tServices("heading"),
    intro: tServices("intro"),
    ctaQuestion: tServices("ctaQuestion"),
    contact: tCta("contact"),
  };

  return <Services services={servicesView} copy={copy} />;
}
