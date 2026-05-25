/**
 * shapes.ts
 *
 * Types from §3 of the brief. Components in design-assets/v1 are typed against these.
 * Do NOT add new fields here without updating the brief — the contract is intentional.
 */

/** Localized string. `es` is the source of truth; `en` is the translation. */
export type LocalizedString = { es: string; en: string };

/** Image asset. */
export type Image = {
  src: string;
  alt: LocalizedString;
  width: number;
  height: number;
};

export type SocialPlatform = 'linkedin' | 'github' | 'x' | 'email';

export type Social = {
  platform: SocialPlatform;
  url: string;
};

export type Profile = {
  name: string;
  /** Tagline-as-headline, used in <title>, OG image, hero subline. */
  headline: LocalizedString;
  /** Legacy `role` from brief — kept for backwards compat; equals `headline` in v1. */
  role: LocalizedString;
  /** Short conversational pitch (hero, OG, meta description). */
  tagline: LocalizedString;
  /** Stats one-liner for hero (concrete data: years, impact). */
  stats: LocalizedString;
  /** Long bio (about page) — 1-2 paragraphs. */
  bio: LocalizedString;
  /** e.g. "Santiago, Chile" */
  location: string;
  avatar: Image;
  email: string;
  /** Per-locale CV download URL. */
  cvUrl: LocalizedString;
  /** Companies to surface as trust signals (hero "Experience at" row). */
  trustCompanies: CompanySlug[];
  socials: Social[];
};

/** Company slug recognized by <CompanyLogo>. Add new ones as you go. */
export type CompanySlug = 'movistar' | 'telefonica' | 'cocha' | 'skinautica';

/** ProjectCard — used on /projects grid. */
export type ProjectCard = {
  slug: string;
  /**
   * Differentiates visual treatment + badge:
   * - "case-study" → terracotta accent, prominent in featured row
   * - "side-project" → ocean accent, secondary
   */
  kind: 'case-study' | 'side-project';
  /** Optional: company where the work was executed (case-study only, typically). */
  company?: CompanySlug;
  /** Headline metric rendered prominently on the card (every card should have one). */
  primaryMetric?: ProjectMetric;
  title: LocalizedString;
  /** One-line summary for the card. */
  summary: LocalizedString;
  heroImage: Image;
  /** Free-form tags used for filtering. */
  tags: string[];
  year: number;
  /** Bumps to span: 2 in the grid and adds a "featured" badge. */
  featured: boolean;
  /** Optional WIP marker (used in card and detail). */
  status?: 'WIP';
};

export type ProjectMetric = {
  label: LocalizedString;
  /** Pre-formatted display value (e.g. "+25%", "EUR 2M", "~5min"). */
  value: string;
};

/** ProjectDetail — full case-study / side-project page at /projects/[slug]. */
export type ProjectDetail = ProjectCard & {
  role: LocalizedString;
  problem: LocalizedString;
  solution: LocalizedString;
  impact: LocalizedString;
  stack: string[];
  gallery: Image[];
  metrics: ProjectMetric[];
  links: { repo?: string; demo?: string };
};

/** ExperienceItem — used in /experience timeline. */
export type ExperienceItem = {
  company: string;
  /** Company slug for the <CompanyLogo> mark rendered alongside the h3. */
  logo?: CompanySlug;
  role: LocalizedString;
  /** ISO "YYYY-MM"; end = "present" for current. */
  period: { start: string; end: string | 'present' };
  location: string;
  summary: LocalizedString;
  highlights: LocalizedString[];
};

/** Optional addition — formal education block beneath the timeline. */
export type Education = {
  degree: LocalizedString;
  school: string;
  period: string;
  location: string;
  notes: LocalizedString[];
};

/** Skills cluster — used on /about. */
export type SkillCluster = {
  title: LocalizedString;
  items: string[];
};

/** Translation helper signature. */
export type TFn = (key: string) => string;
/** Localized-string picker signature. */
export type LFn = (obj: LocalizedString | string | null | undefined) => string;
