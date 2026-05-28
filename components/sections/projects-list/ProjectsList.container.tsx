import { getTranslations } from "next-intl/server";

import { getProjects, pick, type Locale } from "@/lib/content";
import { ProjectsList } from "./ProjectsList";
import type { ProjectCardView, ProjectsListCopy } from "./types";

/**
 * ProjectsList container (Server Component).
 *
 * Reads the project cards from the content layer, locale-resolves every
 * `{ es, en }` field via `pick`, resolves all chrome labels via getTranslations,
 * and hands a serializable view-model + copy bundle to the presentational
 * (client) ProjectsList. No content access or `t`/`L` crosses the boundary.
 */
export async function ProjectsListContainer({ locale }: { locale: Locale }) {
  const projects = await getProjects();
  const tSection = await getTranslations("section");
  const tBadge = await getTranslations("badge");
  const tCta = await getTranslations("cta");
  const tProjects = await getTranslations("projects");

  const cards: ProjectCardView[] = projects.map((p) => ({
    slug: p.slug,
    kind: p.kind,
    company: p.company,
    title: pick(locale, p.title),
    summary: pick(locale, p.summary),
    primaryMetric: {
      value: p.primaryMetric.value,
      label: pick(locale, p.primaryMetric.label),
    },
    tags: p.tags,
    year: p.year,
    featured: p.featured,
    isWip: p.status === "wip",
  }));

  const copy: ProjectsListCopy = {
    title: tProjects("title"),
    intro: tProjects("intro"),
    totalLabel: tProjects("total"),
    filterBy: tSection("filterBy"),
    all: tSection("all"),
    caseStudy: tBadge("caseStudy"),
    sideProject: tBadge("sideProject"),
    featured: tBadge("featured"),
    wip: tBadge("wip"),
    readMore: tCta("readMore"),
    nothing: tSection("nothing"),
    cardAriaPrefix: tProjects("cardAriaPrefix"),
  };

  return <ProjectsList projects={cards} copy={copy} />;
}
