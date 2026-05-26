"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * Light/dark toggle. Client component: reads/writes theme state via
 * next-themes. Renders a stable placeholder until mounted to avoid a
 * hydration mismatch (server can't know the resolved theme), then swaps the
 * icon based on `resolvedTheme`. Accessible name comes from i18n.
 */
export function ThemeToggle() {
  const t = useTranslations("themeToggle");
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";
  // Before mount the resolved theme is unknown; keep a neutral icon and a
  // generic label so there is no flash and no mismatched accessible name.
  const label = !mounted ? t("label") : isDark ? t("light") : t("dark");

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={label}
      title={label}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {mounted && isDark ? (
        <Sun aria-hidden="true" />
      ) : (
        <Moon aria-hidden="true" />
      )}
    </Button>
  );
}
