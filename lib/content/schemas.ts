import { z } from "zod";

/**
 * Zod schemas for the typed content layer.
 *
 * Shape isomorphic to Sanity (ADR-002): field names and shape replicate what
 * would be Sanity documents, so a future migration is a mechanical mapping
 * rather than a refactor.
 *
 * Schema scope is the canonical design v1 (ADR-008): the production source of
 * truth is `design-assets/v1`, which legitimately uses fields beyond the
 * original DESIGN_BRIEF §3 (kind, company, primaryMetric, status, headline,
 * stats, trustCompanies, Skills, Education). The schema — not §3 — is the
 * source of truth for shape from here on.
 *
 * Every localizable field is `{ es, en }` with both sides non-empty.
 */

// --- Reusable helpers -------------------------------------------------------

/** Localizable text field. Both locales required and non-empty. */
export const LocalizedSchema = z.object({
  es: z.string().min(1),
  en: z.string().min(1),
});
export type Localized = z.infer<typeof LocalizedSchema>;

/** Image with localized alt text. Dimensions match the asset's intrinsic size. */
export const ImageSchema = z.object({
  src: z.string().min(1),
  alt: LocalizedSchema,
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});
export type Image = z.infer<typeof ImageSchema>;

// --- Profile ----------------------------------------------------------------

export const SocialSchema = z.object({
  platform: z.enum(["linkedin", "github", "x", "email"]),
  url: z.string().min(1),
});
export type Social = z.infer<typeof SocialSchema>;

export const ProfileSchema = z.object({
  name: z.string().min(1),
  /** Pillars line for the hero (separate from the tagline). */
  headline: LocalizedSchema,
  role: LocalizedSchema,
  tagline: LocalizedSchema,
  bio: LocalizedSchema,
  /** Concrete-stat line for the hero. */
  stats: LocalizedSchema,
  location: z.string().min(1),
  avatar: ImageSchema,
  email: z.string().email(),
  cvUrl: LocalizedSchema,
  /** Company ids surfaced as trust signals in the hero. */
  trustCompanies: z.array(z.string().min(1)),
  socials: z.array(SocialSchema),
});
export type Profile = z.infer<typeof ProfileSchema>;

// --- Projects ---------------------------------------------------------------

/** Primary metric surfaced on the project card (single headline KPI). */
export const ProjectPrimaryMetricSchema = z.object({
  value: z.string().min(1),
  label: LocalizedSchema,
});
export type ProjectPrimaryMetric = z.infer<typeof ProjectPrimaryMetricSchema>;

export const ProjectCardSchema = z.object({
  slug: z.string().min(1),
  /** Distinguishes professional case studies from personal side projects. */
  kind: z.enum(["case-study", "side-project"]),
  /** Company id, present only on case studies. */
  company: z.string().min(1).optional(),
  title: LocalizedSchema,
  summary: LocalizedSchema,
  primaryMetric: ProjectPrimaryMetricSchema,
  heroImage: ImageSchema,
  tags: z.array(z.string().min(1)),
  year: z.number().int(),
  featured: z.boolean(),
  /**
   * Lifecycle status. Only "wip" is modeled. The source uses 'WIP' (upper);
   * normalize to lowercase "wip" in content before validation.
   */
  status: z.enum(["wip"]).optional(),
});
export type ProjectCard = z.infer<typeof ProjectCardSchema>;

export const ProjectMetricSchema = z.object({
  label: LocalizedSchema,
  value: z.string().min(1),
});
export type ProjectMetric = z.infer<typeof ProjectMetricSchema>;

export const ProjectLinksSchema = z.object({
  repo: z.string().min(1).optional(),
  demo: z.string().min(1).optional(),
});
export type ProjectLinks = z.infer<typeof ProjectLinksSchema>;

/** A downloadable file attached to a project (e.g. a study-guide PDF). */
export const ProjectDownloadSchema = z.object({
  /** Path under /public, served from the site root (e.g. "/downloads/x.pdf"). */
  file: z.string().min(1).startsWith("/"),
  label: LocalizedSchema,
  summary: LocalizedSchema,
});
export type ProjectDownload = z.infer<typeof ProjectDownloadSchema>;

export const ProjectDetailSchema = ProjectCardSchema.extend({
  role: LocalizedSchema,
  problem: LocalizedSchema,
  solution: LocalizedSchema,
  impact: LocalizedSchema,
  stack: z.array(z.string().min(1)),
  gallery: z.array(ImageSchema),
  metrics: z.array(ProjectMetricSchema),
  links: ProjectLinksSchema,
  /** Optional downloadable material (e.g. study guides). */
  downloads: z.array(ProjectDownloadSchema).optional(),
  /**
   * When true, the detail-page hero renders `heroImage` as a real `<Image>`
   * (e.g. a product/dashboard screenshot) instead of the editorial SVG fallback.
   * Most projects use the fallback (design v1, ADR-008); only projects with real
   * art set this. `heroImage.src` must then point to a raster file under `/public`.
   */
  heroIsScreenshot: z.boolean().optional(),
});
export type ProjectDetail = z.infer<typeof ProjectDetailSchema>;

// --- Experience -------------------------------------------------------------

export const ExperiencePeriodSchema = z.object({
  start: z.string().min(1),
  end: z.union([z.string().min(1), z.literal("present")]),
});
export type ExperiencePeriod = z.infer<typeof ExperiencePeriodSchema>;

export const ExperienceItemSchema = z.object({
  company: z.string().min(1),
  role: LocalizedSchema,
  period: ExperiencePeriodSchema,
  location: z.string().min(1),
  summary: LocalizedSchema,
  highlights: z.array(LocalizedSchema),
  logo: ImageSchema.optional(),
});
export type ExperienceItem = z.infer<typeof ExperienceItemSchema>;

// --- Skills -----------------------------------------------------------------

/**
 * A skill cluster groups related capabilities under a localized title.
 * `items` are plain strings (single-language by design — they are proper nouns
 * and technical terms that read the same in ES/EN), matching the design v1.
 */
export const SkillClusterSchema = z.object({
  title: LocalizedSchema,
  items: z.array(z.string().min(1)),
});
export type SkillCluster = z.infer<typeof SkillClusterSchema>;

// --- Services ---------------------------------------------------------------

/**
 * A service offering — the SEO-primary surface (applied AI for business).
 * Each entry is indexable copy (title · summary · description paragraph ·
 * what's-included list), NOT bullets in an image. `slug` doubles as the section
 * anchor id and the Service JSON-LD @id fragment, so it stays as authored.
 * `icon` is a lucide-react component name, mapped to the component in the
 * presentational Services. `keyword` is the primary keyword this service targets.
 */
export const ServiceSchema = z.object({
  slug: z.string().min(1),
  title: LocalizedSchema,
  summary: LocalizedSchema,
  description: LocalizedSchema,
  includes: z.array(LocalizedSchema).min(1),
  icon: z.enum(["Workflow", "Plug", "Database", "FileBarChart", "Sparkles"]),
  keyword: z.string().min(1),
});
export type Service = z.infer<typeof ServiceSchema>;

// --- Education --------------------------------------------------------------

export const EducationSchema = z.object({
  degree: LocalizedSchema,
  school: z.string().min(1),
  period: z.string().min(1),
  location: z.string().min(1),
  notes: z.array(LocalizedSchema),
});
export type Education = z.infer<typeof EducationSchema>;
