import { notFound } from "next/navigation";

import {
  getProfile,
  getProject,
  getProjects,
  pick,
  type Locale,
} from "@/lib/content";
import { SITE_URL } from "@/lib/seo/site";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/seo/og/render";

/**
 * Per-project OG image (1200 × 630). Reuses the site card composition but swaps
 * the bottom-strip subtitle for the project summary, so each case study gets a
 * distinct, on-brand social card. Pre-rendered for every (locale, slug).
 *
 * Node runtime (default) — see fonts.ts.
 */
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export async function generateStaticParams() {
  const projects = await getProjects();
  return (["es", "en"] satisfies Locale[]).flatMap((locale) =>
    projects.map((p) => ({ locale, slug: p.slug })),
  );
}

export default async function ProjectOpengraphImage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const profile = await getProfile();

  let project: Awaited<ReturnType<typeof getProject>>;
  try {
    project = await getProject(slug);
  } catch {
    notFound();
  }

  return renderOgImage({
    profile,
    locale,
    subtitle: pick(locale, project.title),
    displayUrl: `${SITE_URL.replace(/^https?:\/\//, "")}/projects/${slug}`,
  });
}
