/**
 * View model + resolved copy for the project-detail section.
 *
 * The Server container locale-resolves every `{ es, en }` field via `pick` and
 * resolves chrome labels via getTranslations, so the presentational component
 * receives plain serializable strings — no `t`/`L`/`pick`, no content access.
 */

/** A single metric cell, locale-resolved. */
export interface DetailMetricView {
  value: string;
  label: string;
}

/** A project detail, fully locale-resolved for rendering. */
export interface ProjectDetailView {
  slug: string;
  kind: "case-study" | "side-project";
  title: string;
  summary: string;
  role: string;
  year: number;
  tags: string[];
  isWip: boolean;
  stack: string[];
  problem: string;
  solution: string;
  impact: string;
  metrics: DetailMetricView[];
  links: { repo?: string; demo?: string };
}

/** Resolved labels for the detail chrome. */
export interface ProjectDetailCopy {
  caseStudy: string;
  sideProject: string;
  wip: string;
  role: string;
  year: string;
  stack: string;
  problem: string;
  solution: string;
  impact: string;
  metrics: string;
  backToProjects: string;
  viewRepo: string;
  viewDemo: string;
  contact: string;
}
