/**
 * View models + resolved copy for the projects-list section.
 *
 * The Server container locale-resolves every `{ es, en }` field via `pick` and
 * resolves every label via `getTranslations`, so the presentational (client)
 * components receive plain, serializable strings only — no `t`/`L`/`pick` and no
 * content access cross the server/client boundary.
 */

import type { CardMetricView } from "./MetricSticker";

/** A project card, fully locale-resolved for rendering. */
export interface ProjectCardView {
  slug: string;
  kind: "case-study" | "side-project";
  /** Company id (case studies only); narrowed to a known logo slug or omitted. */
  company?: string;
  title: string;
  summary: string;
  primaryMetric: CardMetricView;
  tags: string[];
  year: number;
  featured: boolean;
  isWip: boolean;
}

/** Resolved labels for the list chrome (filters, badges, CTAs, empty state). */
export interface ProjectsListCopy {
  title: string;
  intro: string;
  totalLabel: string;
  filterBy: string;
  all: string;
  caseStudy: string;
  sideProject: string;
  featured: string;
  wip: string;
  readMore: string;
  nothing: string;
  /** aria-label for a card link, e.g. "Open project: <title>". */
  cardAriaPrefix: string;
}
