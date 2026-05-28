import { describe, expect, it } from "vitest";

import { profile } from "@/content/profile";
import { experience } from "@/content/experience";
import { skills } from "@/content/skills";
import { education } from "@/content/education";
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
  ImageSchema,
  LocalizedSchema,
  ProfileSchema,
  ProjectDetailSchema,
  SkillClusterSchema,
} from "@/lib/content/schemas";

const allProjects = [
  trustonicMovistar,
  ndcCochaTravel,
  marketplaceIntegrationSkinautica,
  aiReportingSkinautica,
  aiOrchestratedPortfolio,
  aiLearningGuides,
  finanzasFlow,
  realEstateChile,
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

  it("accepts only the modeled project kinds", () => {
    const card = {
      slug: "x",
      kind: "case-study",
      title: { es: "t", en: "t" },
      summary: { es: "s", en: "s" },
      primaryMetric: { value: "1", label: { es: "l", en: "l" } },
      heroImage: {
        src: "/x.svg",
        alt: { es: "a", en: "a" },
        width: 1,
        height: 1,
      },
      tags: ["x"],
      year: 2025,
      featured: false,
    };
    expect(ProjectDetailSchema.safeParse(card).success).toBe(false); // missing detail fields
    expect(
      ProjectDetailSchema.shape.kind.safeParse("invalid-kind").success,
    ).toBe(false);
    expect(
      ProjectDetailSchema.shape.kind.safeParse("side-project").success,
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

  it("every skill cluster", () => {
    for (const cluster of skills) {
      expect(
        () => SkillClusterSchema.parse(cluster),
        cluster.title.en,
      ).not.toThrow();
    }
  });

  it("education", () => {
    expect(() => EducationSchema.parse(education)).not.toThrow();
  });
});

describe("seed business rules", () => {
  it("has exactly eight projects", () => {
    expect(allProjects.length).toBe(8);
  });

  it("has the two expected featured projects", () => {
    const featured = allProjects.filter((p) => p.featured).map((p) => p.slug);
    expect(featured).toContain("trustonic-movistar");
    expect(featured).toContain("ndc-cocha-travel");
    expect(featured.length).toBe(2);
  });

  it("project slugs are unique", () => {
    const slugs = allProjects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every project carries a primaryMetric and a valid kind", () => {
    for (const project of allProjects) {
      expect(project.primaryMetric.value.length).toBeGreaterThan(0);
      expect(["case-study", "side-project"]).toContain(project.kind);
    }
  });

  it("only case studies carry a company", () => {
    for (const project of allProjects) {
      if (project.kind === "side-project") {
        expect(project.company).toBeUndefined();
      } else {
        expect(project.company).toBeTruthy();
      }
    }
  });

  it("normalizes the WIP status to lowercase on finanzas-flow", () => {
    expect(finanzasFlow.status).toBe("wip");
  });
});
