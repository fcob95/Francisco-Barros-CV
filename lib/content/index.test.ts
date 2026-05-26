import { describe, expect, it } from "vitest";

import {
  getExperience,
  getProfile,
  getProject,
  getProjects,
  pick,
} from "@/lib/content";
import {
  ExperienceItemSchema,
  ProfileSchema,
  ProjectCardSchema,
  ProjectDetailSchema,
} from "@/lib/content/schemas";

describe("getProfile", () => {
  it("returns a schema-valid Profile", async () => {
    const profile = await getProfile();
    expect(() => ProfileSchema.parse(profile)).not.toThrow();
    expect(profile.name).toBe("Francisco Barros");
  });
});

describe("getProjects", () => {
  it("returns schema-valid ProjectCards", async () => {
    const projects = await getProjects();
    expect(projects.length).toBeGreaterThanOrEqual(3);
    for (const card of projects) {
      expect(() => ProjectCardSchema.parse(card)).not.toThrow();
    }
  });

  it("includes at least one featured project", async () => {
    const projects = await getProjects();
    expect(projects.some((p) => p.featured)).toBe(true);
  });
});

describe("getProject", () => {
  it("returns a full ProjectDetail for a known slug", async () => {
    const project = await getProject("pricing-intelligence-engine");
    expect(() => ProjectDetailSchema.parse(project)).not.toThrow();
    expect(project.stack.length).toBeGreaterThan(0);
    expect(project.metrics.length).toBeGreaterThan(0);
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
    expect(items.length).toBeGreaterThanOrEqual(3);
    for (const item of items) {
      expect(() => ExperienceItemSchema.parse(item)).not.toThrow();
    }
  });
});

describe("pick", () => {
  it("resolves a localized field by locale", () => {
    const field = { es: "Hola", en: "Hello" };
    expect(pick("es", field)).toBe("Hola");
    expect(pick("en", field)).toBe("Hello");
  });
});
