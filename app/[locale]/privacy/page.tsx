import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";
import type { Locale } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { PrivacyContainer } from "@/components/sections/privacy/Privacy.container";

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
  const t = await getTranslations({ locale, namespace: "privacy" });
  return buildPageMetadata({
    title: t("title").replace(/\.$/, ""),
    description: t("analytics").slice(0, 200),
    path: "/privacy",
    locale,
  });
}

/**
 * Privacy (`/privacy`). Long-form prose page. Data + i18n are wired inside
 * PrivacyContainer (Server Component → presentational Privacy). Chrome
 * (Header/Footer) is mounted by the locale layout.
 *
 * No page-level <h1> here: the Privacy section already renders a visible <h1>
 * (privacy.title), so the page has exactly one.
 */
export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return <PrivacyContainer />;
}
