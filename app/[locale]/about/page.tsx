import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";
import { getProfile, pick, type Locale } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { personJsonLd } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";
import { AboutContainer } from "@/components/sections/about/About.container";

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
  const t = await getTranslations({ locale, namespace: "about" });
  const profile = await getProfile();
  return buildPageMetadata({
    title: t("whoIAm"),
    description: pick(locale, profile.bio).slice(0, 200),
    path: "/about",
    locale,
  });
}

/**
 * About (`/about`). Renders the bio + portrait + skills clusters + Person
 * JSON-LD. Data + i18n are wired inside AboutContainer (Server Component →
 * presentational About). Chrome (Header/Footer) is mounted by the locale layout.
 *
 * A11y: the section leads with an <h2>; we add the single page <h1> here as
 * visually-hidden (sr-only) carrying the page title (about.whoIAm).
 */
export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "about" });
  const profile = await getProfile();

  return (
    <>
      <JsonLd data={personJsonLd(profile, locale as Locale)} />
      <h1 className="sr-only">{t("whoIAm")}</h1>
      <AboutContainer locale={locale as Locale} />
    </>
  );
}
