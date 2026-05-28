import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";
import type { Locale } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { ProjectsListContainer } from "@/components/sections/projects-list/ProjectsList.container";

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
  const t = await getTranslations({ locale, namespace: "projects" });
  return buildPageMetadata({
    title: t("title").replace(/\.$/, ""),
    description: t("intro"),
    path: "/projects",
    locale,
  });
}

/**
 * Projects index (`/projects`). Renders the filterable projects grid. Data + i18n
 * are wired inside ProjectsListContainer (Server Component → presentational
 * ProjectsList). Chrome (Header/Footer) is mounted by the locale layout.
 *
 * A11y: the presentational section starts at <h2>; we add the single page <h1>
 * here as visually-hidden (sr-only) so the document has exactly one h1 without
 * altering the editorial design (which intentionally leads with the number
 * strip, not a giant heading).
 */
export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "projects" });

  return (
    <>
      <h1 className="sr-only">{t("title").replace(/\.$/, "")}</h1>
      <ProjectsListContainer locale={locale as Locale} />
    </>
  );
}
