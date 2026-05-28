import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";
import { getProfile, pick, type Locale } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { ExperienceContainer } from "@/components/sections/experience/Experience.container";

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
  const t = await getTranslations({ locale, namespace: "section" });
  const profile = await getProfile();
  return buildPageMetadata({
    title: t("experience"),
    description: pick(locale, profile.stats),
    path: "/experience",
    locale,
  });
}

/**
 * Experience (`/experience`). Renders the editorial timeline (most-recent first)
 * + the closing education block. Data + i18n are wired inside ExperienceContainer
 * (Server Component → presentational Experience). Chrome (Header/Footer) is
 * mounted by the locale layout.
 *
 * A11y: the section leads with an <h2>; we add the single page <h1> here as
 * visually-hidden (sr-only) carrying the page title (section.experience).
 */
export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "section" });

  return (
    <>
      <h1 className="sr-only">{t("experience")}</h1>
      <ExperienceContainer locale={locale as Locale} />
    </>
  );
}
