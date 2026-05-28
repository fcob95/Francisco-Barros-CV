import { test, expect } from "@playwright/test";

import es from "../messages/es.json" with { type: "json" };
import en from "../messages/en.json" with { type: "json" };

// localePrefix: 'as-needed' → `/` serves ES, `/en` serves EN. The home page is
// the Hero: its <h1> renders the (locale-independent) display name, while the
// localized "view projects" CTA proves the right message catalog loaded.

test("home serves Spanish at the root", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Barros");
  await expect(
    page.getByRole("link", { name: es.cta.viewProjects }),
  ).toBeVisible();
});

test("home serves English at /en", async ({ page }) => {
  await page.goto("/en");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Barros");
  await expect(
    page.getByRole("link", { name: en.cta.viewProjects }),
  ).toBeVisible();
});

test("header controls are reachable", async ({ page }) => {
  await page.goto("/");
  // Locale switch group + theme toggle live in the header.
  await expect(
    page.getByRole("group", { name: es.header.language }),
  ).toBeVisible();
  // Light is the pinned default → the toggle offers switching to dark.
  await expect(
    page.getByRole("button", { name: es.header.toDark }),
  ).toBeVisible();
});
