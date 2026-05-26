import { test, expect } from "@playwright/test";

import es from "../messages/es.json" with { type: "json" };
import en from "../messages/en.json" with { type: "json" };

// localePrefix: 'as-needed' → `/` serves ES, `/en` serves EN. Assert the
// localized H1 renders in each locale (proves i18n routing + message loading).

test("home page serves Spanish at the root", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 1, name: es.home.title }),
  ).toBeVisible();
  await expect(page).toHaveURL(/\/$/);
});

test("home page serves English at /en", async ({ page }) => {
  await page.goto("/en");
  await expect(
    page.getByRole("heading", { level: 1, name: en.home.title }),
  ).toBeVisible();
});

test("locale switcher and theme toggle are reachable", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: es.localeSwitcher.label }),
  ).toBeVisible();
  // After hydration the toggle's accessible name reflects the action it will
  // perform (switch to dark from the light default), not the generic label.
  await expect(
    page.getByRole("button", { name: es.themeToggle.dark }),
  ).toBeVisible();
});
