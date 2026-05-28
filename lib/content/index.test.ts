import { describe, expect, it } from "vitest";

import {
  getEducation,
  getExperience,
  getProfile,
  getProject,
  getProjects,
  getSkills,
  pick,
} from "@/lib/content";
import {
  EducationSchema,
  ExperienceItemSchema,
  ProfileSchema,
  ProjectCardSchema,
  ProjectDetailSchema,
  SkillClusterSchema,
} from "@/lib/content/schemas";

describe("getProfile", () => {
  it("returns a schema-valid Profile", async () => {
    const profile = await getProfile();
    expect(() => ProfileSchema.parse(profile)).not.toThrow();
    expect(profile.name).toBe("Francisco Barros Cruz");
    expect(profile.trustCompanies.length).toBeGreaterThan(0);
  });
});

describe("getProjects", () => {
  it("returns the six schema-valid ProjectCards", async () => {
    const projects = await getProjects();
    expect(projects.length).toBe(6);
    for (const card of projects) {
      expect(() => ProjectCardSchema.parse(card)).not.toThrow();
      expect(card.primaryMetric.value.length).toBeGreaterThan(0);
    }
  });

  it("includes the two expected featured projects", async () => {
    const featured = (await getProjects())
      .filter((p) => p.featured)
      .map((p) => p.slug);
    expect(featured).toEqual(
      expect.arrayContaining(["trustonic-movistar", "ndc-cocha-travel"]),
    );
    expect(featured.length).toBe(2);
  });

  it("has unique slugs", async () => {
    const slugs = (await getProjects()).map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("getProject", () => {
  it("returns a full ProjectDetail for a known slug", async () => {
    const project = await getProject("trustonic-movistar");
    expect(() => ProjectDetailSchema.parse(project)).not.toThrow();
    expect(project.kind).toBe("case-study");
    expect(project.company).toBe("movistar");
    expect(project.stack.length).toBeGreaterThan(0);
    expect(project.metrics.length).toBeGreaterThan(0);
  });

  it("returns a side-project with normalized wip status", async () => {
    const project = await getProject("finanzas-flow");
    expect(project.kind).toBe("side-project");
    expect(project.company).toBeUndefined();
    expect(project.status).toBe("wip");
  });

  it("rejects with a descriptive error for an unknown slug", async () => {
    await expect(getProject("does-not-exist")).rejects.toThrow(
      /does-not-exist/,
    );
  });
});

describe("getExperience", () => {
  it("returns schema-valid ExperienceItems", async () => {
    const items = await getExperience();
    expect(items.length).toBe(3);
    for (const item of items) {
      expect(() => ExperienceItemSchema.parse(item)).not.toThrow();
    }
  });
});

describe("getSkills", () => {
  it("returns the four schema-valid skill clusters", async () => {
    const clusters = await getSkills();
    expect(clusters.length).toBe(4);
    for (const cluster of clusters) {
      expect(() => SkillClusterSchema.parse(cluster)).not.toThrow();
      expect(cluster.items.length).toBeGreaterThan(0);
    }
  });
});

describe("getEducation", () => {
  it("returns a schema-valid Education", async () => {
    const edu = await getEducation();
    expect(() => EducationSchema.parse(edu)).not.toThrow();
    expect(edu.school.length).toBeGreaterThan(0);
  });
});

describe("pick", () => {
  it("resolves a localized field by locale", () => {
    const field = { es: "Hola", en: "Hello" };
    expect(pick("es", field)).toBe("Hola");
    expect(pick("en", field)).toBe("Hello");
  });
});
