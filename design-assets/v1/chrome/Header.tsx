"use client";

/**
 * Header.tsx
 *
 * Sticky top chrome. Brand mark + desktop nav + locale switch + theme toggle.
 * Mobile: brand + hamburger → drawer with the same nav.
 *
 * Uses shadcn's <Sheet> on mobile in production; this preview uses a simple
 * conditional render.
 */

import { useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import type { TFn } from "@/design-assets/v1/shapes";

export interface HeaderProps {
  route: string;
  locale: "es" | "en";
  theme: "light" | "dark";
  t: TFn;
  onNavigate: (href: string) => void;
  onLocaleChange: (l: "es" | "en") => void;
  onThemeChange: (t: "light" | "dark") => void;
}

export function Header({ route, locale, theme, t, onNavigate, onLocaleChange, onThemeChange }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const links: Array<[string, string]> = [
    ["/", t("nav.home")],
    ["/about", t("nav.about")],
    ["/projects", t("nav.projects")],
    ["/experience", t("nav.experience")],
    ["/contact", t("nav.contact")],
  ];

  const go = (href: string) => { setOpen(false); onNavigate(href); };

  return (
    <header className="sticky top-0 z-20 backdrop-blur-md bg-[color-mix(in_oklab,var(--color-paper)_88%,transparent)] border-b border-rule">
      <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 h-14 md:h-16 flex items-center justify-between gap-4">
        <BrandMark onClick={() => go("/")} />

        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          {links.map(([href, label]) => (
            <NavLink key={href} href={href} current={route} onClick={go}>{label}</NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <LocaleSwitch locale={locale} onChange={onLocaleChange} />
          <span aria-hidden className="hidden md:inline-block w-px h-5 bg-rule" />
          <ThemeToggle theme={theme} onChange={onThemeChange} />

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="md:hidden inline-flex items-center justify-center w-9 h-9 border border-rule text-ink rounded-sm"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-rule bg-paper">
          <nav className="px-5 py-3 flex flex-col gap-1" aria-label="Mobile">
            {links.map(([href, label]) => (
              <button
                key={href}
                type="button"
                onClick={() => go(href)}
                className={`text-left py-2.5 text-[15px] border-b border-rule last:border-b-0 ${
                  route === href ? "text-ink font-medium" : "text-ink-muted"
                }`}
              >
                {route === href && (
                  <span aria-hidden className="inline-block w-1.5 h-1.5 bg-terracotta mr-2 -translate-y-0.5" />
                )}
                {label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function BrandMark({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Francisco Barros — Home"
      className="group inline-flex items-baseline gap-2.5 select-none"
    >
      <span className="inline-block w-2 h-2 bg-terracotta -translate-y-0.5 transition-transform group-hover:rotate-45" />
      <span className="font-display text-[20px] tracking-[-0.01em] text-ink">Francisco Barros</span>
    </button>
  );
}

function NavLink({
  href, current, onClick, children,
}: { href: string; current: string; onClick: (h: string) => void; children: React.ReactNode }) {
  const active = current === href;
  return (
    <button
      type="button"
      onClick={() => onClick(href)}
      className={`relative px-2 py-1 text-sm transition-colors ${active ? "text-ink" : "text-ink-muted hover:text-ink"}`}
      aria-current={active ? "page" : undefined}
    >
      {children}
      {active && <span aria-hidden className="absolute -bottom-0.5 left-2 right-2 h-px bg-terracotta" />}
    </button>
  );
}

function LocaleSwitch({ locale, onChange }: { locale: "es" | "en"; onChange: (l: "es" | "en") => void }) {
  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted select-none"
    >
      <span aria-hidden className="opacity-50">[</span>
      <button
        type="button"
        onClick={() => onChange("es")}
        aria-pressed={locale === "es"}
        data-event="locale_switch"
        data-locale="es"
        className={`transition-colors ${locale === "es" ? "text-terracotta-ink font-medium" : "hover:text-ink"}`}
      >
        ES
      </button>
      <span aria-hidden className="opacity-50">/</span>
      <button
        type="button"
        onClick={() => onChange("en")}
        aria-pressed={locale === "en"}
        data-event="locale_switch"
        data-locale="en"
        className={`transition-colors ${locale === "en" ? "text-terracotta-ink font-medium" : "hover:text-ink"}`}
      >
        EN
      </button>
      <span aria-hidden className="opacity-50">]</span>
    </div>
  );
}

function ThemeToggle({ theme, onChange }: { theme: "light" | "dark"; onChange: (t: "light" | "dark") => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(theme === "dark" ? "light" : "dark")}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className="inline-flex items-center justify-center w-9 h-9 border border-rule text-ink-muted hover:text-ink hover:border-rule-strong transition-colors rounded-sm"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
