import { getTranslations } from "next-intl/server";

import { getProject, pick, type Locale } from "@/lib/content";
import { ProjectDetail } from "./ProjectDetail";
import type { ProjectDetailCopy, ProjectDetailView } from "./types";

/**
 * ProjectDetail container (Server Component).
 *
 * Reads the project from the content layer (the page handles not-found before
 * rendering this), locale-resolves every `{ es, en }` field via `pick`, resolves
 * chrome labels via getTranslations, and hands a serializable view-model + copy
 * bundle to the presentational ProjectDetail.
 */
export async function ProjectDetailContainer({
  project: p,
  locale,
}: {
  project: Awaited<ReturnType<typeof getProject>>;
  locale: Locale;
}) {
  const tSection = await getTranslations("section");
  const tBadge = await getTranslations("badge");
  const tCta = await getTranslations("cta");

  const view: ProjectDetailView = {
    slug: p.slug,
    kind: p.kind,
    title: pick(locale, p.title),
    summary: pick(locale, p.summary),
    role: pick(locale, p.role),
    year: p.year,
    tags: p.tags,
    isWip: p.status === "wip",
    stack: p.stack,
    problem: pick(locale, p.problem),
    solution: pick(locale, p.solution),
    impact: pick(locale, p.impact),
    metrics: p.metrics.map((m) => ({
      value: m.value,
      label: pick(locale, m.label),
    })),
    links: p.links,
  };

  const copy: ProjectDetailCopy = {
    caseStudy: tBadge("caseStudy"),
    sideProject: tBadge("sideProject"),
    wip: tBadge("wip"),
    role: tSection("role"),
    year: tSection("year"),
    stack: tSection("stack"),
    problem: tSection("problem"),
    solution: tSection("solution"),
    impact: tSection("impact"),
    metrics: tSection("metrics"),
    backToProjects: tCta("backToProjects"),
    viewRepo: tCta("viewRepo"),
    viewDemo: tCta("viewDemo"),
    contact: tCta("contact"),
  };

  return <ProjectDetail project={view} copy={copy} />;
}
