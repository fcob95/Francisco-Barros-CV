import { z } from "zod";

/**
 * Zod schemas for the typed content layer.
 *
 * Shape isomorphic to Sanity (ADR-002): field names and shape replicate what
 * would be Sanity documents, so a future migration is a mechanical mapping
 * rather than a refactor. Do NOT add fields beyond DESIGN_BRIEF §3.
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
  role: LocalizedSchema,
  tagline: LocalizedSchema,
  bio: LocalizedSchema,
  location: z.string().min(1),
  avatar: ImageSchema,
  email: z.string().email(),
  cvUrl: LocalizedSchema,
  socials: z.array(SocialSchema),
});
export type Profile = z.infer<typeof ProfileSchema>;

// --- Projects ---------------------------------------------------------------

export const ProjectCardSchema = z.object({
  slug: z.string().min(1),
  title: LocalizedSchema,
  summary: LocalizedSchema,
  heroImage: ImageSchema,
  tags: z.array(z.string().min(1)),
  year: z.number().int(),
  featured: z.boolean(),
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

export const ProjectDetailSchema = ProjectCardSchema.extend({
  role: LocalizedSchema,
  problem: LocalizedSchema,
  solution: LocalizedSchema,
  impact: LocalizedSchema,
  stack: z.array(z.string().min(1)),
  gallery: z.array(ImageSchema),
  metrics: z.array(ProjectMetricSchema),
  links: ProjectLinksSchema,
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
