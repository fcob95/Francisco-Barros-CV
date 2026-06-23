import { test, expect } from "@playwright/test";

import es from "../messages/es.json" with { type: "json" };

// Smoke coverage for the F4 pages (ES locale at the unprefixed root). Each test
// proves the route renders its section and that content/i18n are wired. The
// home + header are covered separately in home.spec.ts.

test("projects index lists projects and links to detail", async ({ page }) => {
  await page.goto("/projects");
  await expect(
    page.getByRole("heading", { name: es.projects.title }),
  ).toBeVisible();
  // A real project card links to its detail route.
  await expect(
    page.getByRole("link", { name: /trustonic/i }).first(),
  ).toBeVisible();
});

test("project detail renders the case study with an h1", async ({ page }) => {
  await page.goto("/projects/trustonic-movistar");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Trustonic",
  );
  // The case study links back to the projects index (top + bottom links).
  await expect(
    page.getByRole("link", { name: es.cta.backToProjects }).first(),
  ).toBeVisible();
});

test("about renders the lead statement", async ({ page }) => {
  await page.goto("/about");
  await expect(page.getByText(es.about.lead)).toBeVisible();
});

test("services renders the catalog, headings and contact CTA", async ({
  page,
}) => {
  await page.goto("/services");
  // Single page h1 (visually hidden) carries the page title.
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    es.services.pageTitle,
  );
  // The five service titles render as <h3> headings (ES copy).
  const serviceHeadings = [
    "Automatización con IA",
    "Integración de IA",
    "Sistemas RAG",
    "Reportería automatizada",
    "Consultoría en IA + Revenue",
  ];
  for (const name of serviceHeadings) {
    await expect(
      page.getByRole("heading", { level: 3, name }),
    ).toBeVisible();
  }
  // CTA links to /contact (locale-aware Link, ES root → unprefixed).
  const cta = page.getByRole("link", { name: es.cta.contact }).last();
  await expect(cta).toBeVisible();
  await expect(cta).toHaveAttribute("href", "/contact");
});

test("experience renders the professional timeline", async ({ page }) => {
  await page.goto("/experience");
  // Assert a real timeline entry (the page title now appears as both a
  // visually-hidden h1 and a visible section h2, so target unambiguous content).
  await expect(page.getByText("Cocha Travel").first()).toBeVisible();
});

test("contact renders the form fields", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByLabel(es.contact.nameLabel)).toBeVisible();
  await expect(page.getByLabel(es.contact.emailLabel)).toBeVisible();
  await expect(page.getByLabel(es.contact.messageLabel)).toBeVisible();
});

test("privacy renders the policy", async ({ page }) => {
  await page.goto("/privacy");
  await expect(
    page.getByRole("heading", { name: es.privacy.title }),
  ).toBeVisible();
});

test("learning-guides project exposes downloadable study material", async ({
  page,
}) => {
  await page.goto("/projects/ai-learning-guides");
  await expect(
    page.getByRole("heading", { name: es.section.downloads }),
  ).toBeVisible();
  const guide = page
    .getByRole("link", { name: /MCP — Guía de estudio/ })
    .first();
  await expect(guide).toBeVisible();
  await expect(guide).toHaveAttribute("href", "/downloads/MCP.pdf");
});

test("unknown route renders the editorial 404", async ({ page }) => {
  await page.goto("/this-route-does-not-exist");
  await expect(page.getByText(es.notFound.title)).toBeVisible();
});
