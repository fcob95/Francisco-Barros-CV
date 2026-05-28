import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";
import { getProfile, pick, type Locale } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { personJsonLd } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";
import { HeroContainer } from "@/components/sections/hero/Hero.container";

/**
 * Home metadata: name + tagline. Home uses the layout's `title.default`
 * (full name + role) rather than the "%s · …" template, so we omit `title`
 * here and only refine description + canonical/hreflang for "/".
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const resolved = hasLocale(routing.locales, locale)
    ? (locale as Locale)
    : routing.defaultLocale;
  const profile = await getProfile();

  const meta = buildPageMetadata({
    title: `${profile.name} — ${pick(resolved, profile.role)}`,
    description: pick(resolved, profile.tagline),
    path: "/",
    locale: resolved,
  });
  // Home keeps the layout's title.default (absolute), not the template form.
  return {
    ...meta,
    title: { absolute: `${profile.name} — ${pick(resolved, profile.role)}` },
  };
}

/**
 * Home (`/`). Renders the Hero section + Person JSON-LD. Chrome (Header/Footer)
 * is mounted site-wide by the locale layout. Real data + i18n are wired inside
 * HeroContainer (Server Component → presentational Hero).
 */
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const profile = await getProfile();

  return (
    <>
      <JsonLd data={personJsonLd(profile, locale as Locale)} />
      <HeroContainer locale={locale as Locale} />
    </>
  );
}
