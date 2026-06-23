import { z } from "zod";

import { profile as profileSeed } from "@/content/profile";
import { experience as experienceSeed } from "@/content/experience";
import { skills as skillsSeed } from "@/content/skills";
import { services as servicesSeed } from "@/content/services";
import { education as educationSeed } from "@/content/education";
import { trustonicMovistar } from "@/content/projects/trustonic-movistar";
import { ndcCochaTravel } from "@/content/projects/ndc-cocha-travel";
import { marketplaceIntegrationSkinautica } from "@/content/projects/marketplace-integration-skinautica";
import { aiReportingSkinautica } from "@/content/projects/ai-reporting-skinautica";
import { finanzasFlow } from "@/content/projects/finanzas-flow";
import { realEstateChile } from "@/content/projects/real-estate-chile";
import { aiOrchestratedPortfolio } from "@/content/projects/ai-orchestrated-portfolio";
import { aiLearningGuides } from "@/content/projects/ai-learning-guides";

import {
  EducationSchema,
  ExperienceItemSchema,
  ProfileSchema,
  ProjectCardSchema,
  ProjectDetailSchema,
  ServiceSchema,
  SkillClusterSchema,
  type Education,
  type ExperienceItem,
  type Localized,
  type Profile,
  type ProjectCard,
  type ProjectDetail,
  type Service,
  type SkillCluster,
} from "@/lib/content/schemas";

/**
 * Content access layer. Isolates the rest of the app from the data source.
 *
 * Functions are async-ready (return `Promise<T>`) even though today they read
 * from TS modules, so swapping to Sanity later does not change the consumer
 * contract. Zod validation happens AT THE EDGE: every value leaving `content/`
 * is parsed here, failing fast with a descriptive error that names the entity.
 */

export const SUPPORTED_LOCALES = ["es", "en"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

/**
 * Centralized localization helper. Resolves a `{ es, en }` field to a single
 * locale. No ad-hoc `{ es, en }` resolution should happen outside this layer.
 */
export function pick(locale: Locale, field: Localized): string {
  return field[locale];
}

/** All project detail seeds, in display order (most relevant first). */
const projectSeeds: readonly unknown[] = [
  trustonicMovistar,
  ndcCochaTravel,
  marketplaceIntegrationSkinautica,
  aiReportingSkinautica,
  aiOrchestratedPortfolio,
  aiLearningGuides,
  finanzasFlow,
  realEstateChile,
];

/**
 * Parse with a descriptive, entity-named error on failure. Zod's message is
 * appended so the offending field is identifiable.
 */
function parseOrThrow<T>(
  schema: z.ZodType<T>,
  value: unknown,
  entity: string,
): T {
  const result = schema.safeParse(value);
  if (!result.success) {
    throw new Error(`[content] Invalid ${entity}: ${result.error.message}`);
  }
  return result.data;
}

export async function getProfile(): Promise<Profile> {
  return parseOrThrow(ProfileSchema, profileSeed, "Profile");
}

export async function getProjects(): Promise<ProjectCard[]> {
  return projectSeeds.map((seed, i) =>
    parseOrThrow(ProjectCardSchema, seed, `ProjectCard[${i}]`),
  );
}

export async function getProject(slug: string): Promise<ProjectDetail> {
  const seed = projectSeeds.find(
    (s): s is { slug: string } =>
      typeof s === "object" &&
      s !== null &&
      "slug" in s &&
      (s as { slug: unknown }).slug === slug,
  );
  if (!seed) {
    throw new Error(`[content] Project not found for slug "${slug}".`);
  }
  return parseOrThrow(ProjectDetailSchema, seed, `ProjectDetail("${slug}")`);
}

export async function getExperience(): Promise<ExperienceItem[]> {
  return experienceSeed.map((item, i) =>
    parseOrThrow(ExperienceItemSchema, item, `ExperienceItem[${i}]`),
  );
}

export async function getSkills(): Promise<SkillCluster[]> {
  return skillsSeed.map((cluster, i) =>
    parseOrThrow(SkillClusterSchema, cluster, `SkillCluster[${i}]`),
  );
}

export async function getServices(): Promise<Service[]> {
  return servicesSeed.map((service, i) =>
    parseOrThrow(ServiceSchema, service, `Service[${i}]`),
  );
}

export async function getEducation(): Promise<Education> {
  return parseOrThrow(EducationSchema, educationSeed, "Education");
}

export type {
  Education,
  ExperienceItem,
  Profile,
  ProjectCard,
  ProjectDetail,
  Service,
  SkillCluster,
} from "@/lib/content/schemas";
