import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";
import { getProfile, getServices, type Locale } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { servicesJsonLd } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServicesContainer } from "@/components/sections/services/Services.container";

async function resolveLocale(params: Promise<{ locale: string }>) {
  const { locale } = await params;
  return hasLocale(routing.locales, locale)
    ? (locale as Locale)
    : routing.defaultLocale;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "services" });
  return buildPageMetadata({
    title: t("pageTitle"),
    description: t("metaDescription"),
    path: "/services",
    locale,
  });
}

/**
 * Services (`/services`). The SEO-primary surface: renders the service catalog
 * (indexable copy per service) + ProfessionalService/Service JSON-LD. Data +
 * i18n are wired inside ServicesContainer (Server Component → presentational
 * Services). Chrome (Header/Footer) is mounted by the locale layout.
 *
 * A11y: the section leads with an <h2> and uses <h3> per service; we add the
 * single page <h1> here as visually-hidden (sr-only) carrying the page title.
 */
export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "services" });
  const profile = await getProfile();
  const services = await getServices();

  return (
    <>
      <JsonLd
        data={servicesJsonLd(services, profile, locale as Locale)}
      />
      <h1 className="sr-only">{t("pageTitle")}</h1>
      <ServicesContainer locale={locale as Locale} />
    </>
  );
}
