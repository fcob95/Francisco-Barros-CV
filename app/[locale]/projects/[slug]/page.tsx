import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";
import {
  getProfile,
  getProject,
  getProjects,
  pick,
  type Locale,
} from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { absoluteUrl } from "@/lib/seo/site";
import { projectJsonLd } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProjectDetailContainer } from "@/components/sections/project-detail/ProjectDetail.container";

/**
 * Pre-render every project slug for every locale. Returns the full cartesian
 * product (locale × slug) so the deepest dynamic segment carries both params,
 * matching the locale-param pattern the rest of the app uses.
 */
export async function generateStaticParams() {
  const projects = await getProjects();
  return routing.locales.flatMap((locale) =>
    projects.map((p) => ({ locale, slug: p.slug })),
  );
}

/**
 * Per-project metadata: localized title + summary, `article` OG type, and the
 * per-project OG image (the `opengraph-image` route at this segment). The image
 * URL is built explicitly so `twitter.images` also gets it.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const resolved = hasLocale(routing.locales, locale)
    ? (locale as Locale)
    : routing.defaultLocale;

  let project: Awaited<ReturnType<typeof getProject>>;
  try {
    project = await getProject(slug);
  } catch {
    return {};
  }

  const path = `/projects/${slug}`;
  return buildPageMetadata({
    title: pick(resolved, project.title),
    description: pick(resolved, project.summary),
    path,
    locale: resolved,
    ogType: "article",
    image: `${absoluteUrl(path, resolved)}/opengraph-image`,
  });
}

/**
 * Project detail (`/projects/[slug]`). Reads the project from the content layer
 * and renders the case study via ProjectDetailContainer (Server). An unknown
 * slug (getProject throws) maps to Next.js notFound(). Chrome is mounted by the
 * locale layout.
 */
export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  let project: Awaited<ReturnType<typeof getProject>>;
  try {
    project = await getProject(slug);
  } catch {
    notFound();
  }

  const profile = await getProfile();

  return (
    <>
      <JsonLd data={projectJsonLd(project, profile, locale as Locale)} />
      <ProjectDetailContainer project={project} locale={locale as Locale} />
    </>
  );
}
