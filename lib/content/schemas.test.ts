import { describe, expect, it } from "vitest";

import { profile } from "@/content/profile";
import { experience } from "@/content/experience";
import { pricingIntelligenceEngine } from "@/content/projects/pricing-intelligence-engine";
import { revenueAnalyticsPlatform } from "@/content/projects/revenue-analytics-platform";
import { commercialAiCopilot } from "@/content/projects/commercial-ai-copilot";
import { realEstatePortfolioTracker } from "@/content/projects/real-estate-portfolio-tracker";
import {
  ExperienceItemSchema,
  ImageSchema,
  LocalizedSchema,
  ProfileSchema,
  ProjectDetailSchema,
} from "@/lib/content/schemas";

const allProjects = [
  pricingIntelligenceEngine,
  revenueAnalyticsPlatform,
  commercialAiCopilot,
  realEstatePortfolioTracker,
];

describe("schema helpers", () => {
  it("rejects an empty localized side", () => {
    expect(LocalizedSchema.safeParse({ es: "", en: "ok" }).success).toBe(false);
    expect(LocalizedSchema.safeParse({ es: "ok", en: "ok" }).success).toBe(
      true,
    );
  });

  it("requires positive integer image dimensions", () => {
    const base = { src: "/x.svg", alt: { es: "a", en: "a" } };
    expect(
      ImageSchema.safeParse({ ...base, width: 0, height: 10 }).success,
    ).toBe(false);
    expect(
      ImageSchema.safeParse({ ...base, width: 10, height: 10 }).success,
    ).toBe(true);
  });
});

describe("seed parses against schemas", () => {
  it("profile", () => {
    expect(() => ProfileSchema.parse(profile)).not.toThrow();
  });

  it("every project (full detail)", () => {
    for (const project of allProjects) {
      expect(
        () => ProjectDetailSchema.parse(project),
        project.slug,
      ).not.toThrow();
    }
  });

  it("every experience item", () => {
    for (const item of experience) {
      expect(
        () => ExperienceItemSchema.parse(item),
        item.company,
      ).not.toThrow();
    }
  });
});

describe("seed business rules", () => {
  it("has at least one featured project", () => {
    expect(allProjects.some((p) => p.featured)).toBe(true);
  });

  it("project slugs are unique", () => {
    const slugs = allProjects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has at least one ongoing experience item", () => {
    expect(experience.some((e) => e.period.end === "present")).toBe(true);
  });
});
