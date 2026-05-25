# CLAUDE.md — app/

Routing y composición de páginas (Next.js 15 App Router).

## Scope

`app/[locale]/...` con next-intl. Páginas, layouts, metadata, route handlers, server actions.

## Reglas inviolables

- **Server Components por defecto.** `"use client"` solo cuando hay interactividad real; documentar.
- **Slugs en inglés** para todos los locales (`/projects`, `/about`, `/experience`, `/contact`,
  `/privacy`). `localePrefix: 'as-needed'` → ES en raíz, EN en `/en/...`.
- Toda página obtiene contenido vía `lib/content` (nunca importa de `content/` directo ni hardcodea).
- Metadata declarativa (`generateMetadata`) alimentada desde `lib/content` + `lib/seo`.
- Strings de UI desde `messages/*.json` con `useTranslations`/`getTranslations`.
- Las secciones visuales se consumen desde `components/sections/` (contenedor + presentacional), nunca
  desde `design-assets/`.

## Patrones canónicos

- Página = compone contenedores de sección, pasa data ya leída por Server Components.
- `generateStaticParams` para locales y slugs de proyecto.
- Server actions para el formulario de contacto (Resend, sin persistir).

## Anti-patrones

Fetch en Client Components cuando un Server Component basta · strings hardcodeados · rutas localizadas
duplicadas · importar `design-assets/`.
