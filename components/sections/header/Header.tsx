"use client";

/**
 * Header.tsx — presentational + interactive chrome.
 *
 * Ported from design-assets/v1/chrome/Header.tsx (copied by value). The asset
 * received route/locale/theme/t and callbacks as props; in production all of
 * that is sourced from hooks (next-intl navigation + next-themes), so the chrome
 * is inherently a Client Component. The thin Server wrapper lives in
 * Header.container.tsx to honor the presentational+container pattern.
 *
 * "use client" justification: sticky-nav interactivity (mobile drawer state),
 * theme toggle (next-themes), active-route marking (usePathname) and the locale
 * switch (next-intl useRouter) all require client hooks.
 *
 * data-event attributes are preserved verbatim; PostHog wiring is deferred to F6.
 */

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { Menu, Moon, Sun, X } from "lucide-react";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type AppLocale = (typeof routing.locales)[number];

/** Nav targets paired with their literal `nav.*` message key. */
const NAV_ITEMS = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/projects", key: "projects" },
  { href: "/experience", key: "experience" },
  { href: "/contact", key: "contact" },
] as const;
type NavHref = (typeof NAV_ITEMS)[number]["href"];

export function Header() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");
  const tHeader = useTranslations("header");
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  const links = NAV_ITEMS.map((item) => [item.href, t(item.key)] as const);

  const closeMenu = () => setOpen(false);

  const onLocaleChange = (next: AppLocale) => {
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  };

  return (
    <header className="sticky top-0 z-20 backdrop-blur-md bg-[color-mix(in_oklab,var(--color-paper)_88%,transparent)] border-b border-rule">
      <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 h-14 md:h-16 flex items-center justify-between gap-4">
        <BrandMark onClick={closeMenu} label={tHeader("brand")} />

        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          {links.map(([href, label]) => (
            <NavLink
              key={href}
              href={href}
              current={pathname}
              onClick={closeMenu}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <LocaleSwitch
            locale={locale}
            onChange={onLocaleChange}
            ariaLabel={tHeader("language")}
          />
          <span
            aria-hidden
            className="hidden md:inline-block w-px h-5 bg-rule"
          />
          <ThemeToggle
            isDark={resolvedTheme === "dark"}
            onToggle={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            toLight={tHeader("toLight")}
            toDark={tHeader("toDark")}
          />

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? tHeader("closeMenu") : tHeader("openMenu")}
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
            {links.map(([href, label]) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  aria-current={active ? "page" : undefined}
                  className={`text-left py-2.5 text-[15px] border-b border-rule last:border-b-0 ${
                    active ? "text-ink font-medium" : "text-ink-muted"
                  }`}
                >
                  {active && (
                    <span
                      aria-hidden
                      className="inline-block w-1.5 h-1.5 bg-terracotta mr-2 -translate-y-0.5"
                    />
                  )}
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}

function BrandMark({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={label}
      className="group inline-flex items-baseline gap-2.5 select-none"
    >
      <span className="inline-block w-2 h-2 bg-terracotta -translate-y-0.5 transition-transform group-hover:rotate-45" />
      <span className="font-display text-[20px] tracking-[-0.01em] text-ink">
        {label}
      </span>
    </Link>
  );
}

function NavLink({
  href,
  current,
  onClick,
  children,
}: {
  href: NavHref;
  current: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const active = current === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative px-2 py-1 text-sm transition-colors ${
        active ? "text-ink" : "text-ink-muted hover:text-ink"
      }`}
      aria-current={active ? "page" : undefined}
    >
      {children}
      {active && (
        <span
          aria-hidden
          className="absolute -bottom-0.5 left-2 right-2 h-px bg-terracotta"
        />
      )}
    </Link>
  );
}

function LocaleSwitch({
  locale,
  onChange,
  ariaLabel,
}: {
  locale: AppLocale;
  onChange: (l: AppLocale) => void;
  ariaLabel: string;
}) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted select-none"
    >
      <span aria-hidden className="opacity-50">
        [
      </span>
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
      <span aria-hidden className="opacity-50">
        /
      </span>
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
      <span aria-hidden className="opacity-50">
        ]
      </span>
    </div>
  );
}

function ThemeToggle({
  isDark,
  onToggle,
  toLight,
  toDark,
}: {
  isDark: boolean;
  onToggle: () => void;
  toLight: string;
  toDark: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? toLight : toDark}
      className="inline-flex items-center justify-center w-9 h-9 border border-rule text-ink-muted hover:text-ink hover:border-rule-strong transition-colors rounded-sm"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
