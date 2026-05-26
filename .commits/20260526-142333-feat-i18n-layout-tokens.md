# Commit 20260526-142333

**Type**: feat
**Scope**: i18n, app, theming, tokens, shadcn
**Triviality**: non-trivial
**Validated by user**: yes (checkpoint F3 + decisión locale ratificada)

## Summary

feat(i18n): F3 — next-intl routing, [locale] layout, theme + editorial tokens, lean shadcn

## What changed

- next-intl v4: routing (`es`/`en`, default `es`, `localePrefix: 'as-needed'`), request config,
  navigation APIs, middleware, typed `AppConfig` (`global.d.ts`).
- App restructure a `app/[locale]/` (layout con `<html lang>`, `NextIntlClientProvider`, fuentes,
  theme provider, `generateStaticParams`, `setRequestLocale`, guard `notFound`); `not-found` localizado
  - shim raíz; `app/page.tsx` eliminado (movido bajo `[locale]`).
- Theming: next-themes `attribute="data-theme"` (cuadra con `[data-theme="dark"]` de los tokens),
  theme-toggle (Sun/Moon, sin flash) y locale-switcher (preserva path).
- Tokens editoriales portados verbatim al `@theme` + `[data-theme="dark"]` de `globals.css`; fuentes
  (Instrument Serif / Inter / JetBrains Mono) vía `next/font` mapeadas a `--font-display/sans/mono`.
- shadcn lean: `components.json`, `lib/utils.ts` (`cn`), `ui/button`, `ui/dropdown-menu` — mapeados a
  los tokens editoriales, sin sistema de color paralelo.
- messages ES/EN con paridad de claves; e2e cubre `/` (ES) y `/en`.

## Files modified

- `i18n/{routing,navigation,request}.ts`, `middleware.ts`, `global.d.ts`, `next.config.ts` (plugin).
- `app/layout.tsx` (passthrough), `app/[locale]/{layout,page,not-found}.tsx`, `app/not-found.tsx`,
  `app/globals.css` (tokens + fuentes); `app/page.tsx` eliminado.
- `components/{theme-provider,theme-toggle,locale-switcher}.tsx`, `components/ui/{button,dropdown-menu}.tsx`,
  `lib/utils.ts`, `components.json`.
- `messages/{es,en}.json`.
- `e2e/home.spec.ts`, `playwright.config.ts` (pins es-CL + colorScheme light para determinismo).
- `package.json` + `pnpm-lock.yaml`: +`next-themes@0.4.6`, +`@radix-ui/react-slot@1.2.4`, +`@radix-ui/react-dropdown-menu@2.1.16`.

## Implementation notes

- shadcn se inicializó a mano (sin CLI) para que sus vars por defecto (`--background`/`--primary`) no
  aterrizaran en `globals.css`; los primitives referencian solo utilidades de los tokens (`bg-ink`,
  `bg-terracotta`, `border-rule`, ...).
- Se omitió `tailwindcss-animate`/`tw-animate-css`: se quitaron las clases de animación del dropdown
  que lo habrían exigido (evita una dep extra).
- `localeDetection` queda en su default (`true`): `/` es la URL canónica ES pero navegadores en EN se
  redirigen a `/en` (decisión ratificada por Francisco; ver decisión #5 ampliada en PROGRESS).
- Andamiaje: el `locale-switcher` con DropdownMenu diverge del `[ES/EN]` inline de `design-assets/v1`.
  Es transitorio; F4 porta `chrome/Header.tsx` y lo reemplaza. Candidato a limpieza en F4 (incl. dep
  Radix dropdown si nada más la usa).
- Revisado por `code-reviewer` → APPROVE-WITH-NITS, sin bloqueantes.

## Tests

`pnpm test` 16/16 · `pnpm test:e2e` 3/3 (ES en `/`, EN en `/en`, controles alcanzables) · typecheck +
lint + build verdes · hook de paridad i18n exit 0.

## Risks / Notes

- First Load JS `/[locale]`: 157 kB sin comprimir (~48-55 kB gzipped, holgado bajo el NFR). El NFR se
  re-expresa como "<150 KB gzipped" en PROGRESS para no re-litigarlo cada fase.
- Nits no bloqueantes para F4: mover toggles a `components/layout/`, guard duplicado layout/page,
  fragilidad de los pins de e2e si cambia el theme/locale por defecto.
