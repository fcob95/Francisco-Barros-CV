# design-assets/v1

Editorial 3D — handoff package para implementar el portfolio de Francisco Barros.

> Generado siguiendo el `DESIGN_BRIEF.md` adjunto en la solicitud. Dirección visual:
> **minimalismo expresivo con acentos 3D** (cream + ink + terracotta, capas con offset,
> tipografía mixta serif/sans/mono).

---

## Estructura

```
design-assets/v1/
├── README.md                  # este archivo
├── design-tokens.ts           # Source of truth (colors, fonts, spacing, shadows…)
│                              # Incluye bloque @theme listo para Tailwind v4.
├── shapes.ts                  # TypeScript types — Profile, ProjectCard, ProjectDetail,
│                              # ExperienceItem, etc. Exactamente las shapes de §3 del brief.
│
├── chrome/                    # Cross-page UI
│   ├── Header.tsx             # Sticky nav + locale switch + theme toggle + mobile sheet
│   ├── Footer.tsx             # Manifesto + socials + CV + privacy/cookies
│   └── README.md
│
├── hero/                      # /
│   ├── Hero.tsx               # Display name + isometric 3-pillar stack
│   └── README.md
│
├── about/                     # /about
│   ├── About.tsx              # Lead + bio + skills grid + portrait slab
│   └── README.md
│
├── projects-list/             # /projects
│   ├── ProjectsList.tsx       # Filterable grid (kind + tag chips)
│   ├── ProjectCard.tsx        # Card variant: case-study vs side-project
│   ├── ProjectVisual.tsx      # Per-slug abstract SVG composition
│   └── README.md
│
├── project-detail/            # /projects/[slug]
│   ├── ProjectDetail.tsx      # Title + sticky meta + numbered Problem/Solution/Impact + metrics
│   └── README.md
│
├── experience/                # /experience
│   ├── Experience.tsx         # Vertical editorial timeline
│   └── README.md
│
├── contact/                   # /contact
│   ├── Contact.tsx            # Form (loading/success/error) + channel rows
│   └── README.md
│
├── extras/
│   ├── NotFound.tsx           # /404
│   ├── Privacy.tsx            # /privacy
│   ├── CookieBanner.tsx       # Consent gate for PostHog (PRD §6)
│   ├── OGImage.tsx            # 1200×630 — render con next/og o html-to-image
│   └── README.md
│
├── preview.html               # ← REVIEW ENTRYPOINT
│                              # Renderiza TODAS las secciones con React+Babel.
│                              # Abrir directamente en un browser. Top nav navega,
│                              # locale switch ES/EN, theme toggle, "Routes" debug pill
│                              # (bottom-left) salta a cualquier ruta (incl. /404, /privacy,
│                              # /og-image).
│
└── _preview/                  # Source de preview.html (Babel-transpiled in browser).
    │                          # NO portarlo a producción — son JSX (vs TSX limpios)
    │                          # con stubs locales en vez de imports reales.
    ├── stubs.jsx              # shadcn stubs · lucide-react stub · framer-motion stub
    ├── data.jsx               # Sample data (real, derivada del CV)
    ├── Header.jsx, Footer.jsx, Hero.jsx, About.jsx, ProjectsList.jsx,
    ├── ProjectDetail.jsx, Experience.jsx, Contact.jsx, NotFound.jsx,
    └── App.jsx                # Router-stub + theme/cookie state + preview navigator
```

---

## Cómo revisar visualmente

Abre `preview.html` en un browser. Carga React + Tailwind v4 + las Google Fonts.

- **Nav** del header navega entre Home / About / Projects / Experience / Contact.
- **Pill "Routes ·" abajo a la izquierda**: salta a rutas auxiliares (`/404`, `/privacy`, `/og-image`, project details específicos).
- **`[ES / EN]`** arriba a la derecha cambia idioma. Todo el texto está duplicado en `_preview/data.jsx`.
- **Sol/luna** alterna light ↔ dark.
- **Cookie banner** aparece después de ~1.4s en la primera visita (persiste decisión en localStorage).

---

## Cómo portar a producción (Next.js + Tailwind v4 + shadcn)

### 1. Tokens

`design-tokens.ts` exporta `TAILWIND_V4_THEME_CSS` con un bloque `@theme {}` listo:

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --color-paper:        #f5f1eb;
  --color-paper-raised: #fbf8f3;
  /* … paste el resto desde design-tokens.ts */
}

[data-theme="dark"] {
  --color-paper:        #0f0d0a;
  /* … overrides para dark */
}
```

Configura el theme switcher (`next-themes` recomendado) para escribir `data-theme` en `<html>`.

### 2. Fonts

```html
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
```

O usa `next/font/google` para self-host.

### 3. shadcn components usados

Del inventario de §4 del brief:

- `Button` — variants `default | accent | outline | ghost | link`
- `Card`, `Separator`, `Avatar`, `Badge`
- `Input`, `Textarea`, `Label` — para `/contact`
- `NavigationMenu`, `Sheet` — para el header (desktop + mobile drawer)
- `Tabs` — opcional, para los filtros de `/projects` si prefieres tabs en lugar de chips
- `Tooltip` — para el theme toggle y locale switch
- `Sonner` (toast) — para confirmación del contact form

Los `.tsx` de este paquete asumen estos imports:

```ts
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
// ... etc
```

### 4. Iconos

`lucide-react` — los iconos que uso están listados en cada `.tsx`. Stub local en `_preview/stubs.jsx` para el preview.

### 5. Animaciones

`framer-motion` para entries y hover micro-interactions. Cada componente:

- Importa `motion` y `useReducedMotion`.
- Define `variants` al inicio del archivo (no en JSX inline).
- Cuando `useReducedMotion()` es `true`, salta directo al estado final.

Stub muy simplificado de framer-motion en `_preview/stubs.jsx`. **Reemplaza por el real al portar.**

### 6. Data

Los componentes son 100% presentational — reciben data por props tipadas (`shapes.ts`).
Fetch / CMS / DB-binding viven fuera (en server components o data loaders).
Sample data en `_preview/data.jsx` (con valores reales del CV) sirve como seed para fixtures.

### 7. i18n

Strings marcados como `t("key.path")`. Reemplaza por tu librería real (`next-intl` recomendada).
Diccionario completo en `_preview/data.jsx → __DICT`.

### 8. Analytics

Los puntos de instrumentación están marcados con `data-event` y `data-id|target` attributes
(ver §6 del brief). Engánchales en un cliente PostHog wrapper. El cookie banner determina si el
init de PostHog corre o no.

### 9. Print stylesheet

Para `/about` y `/experience` (recruiters imprimen):

```css
@media print {
  header, footer, [data-no-print] { display: none; }
  main { max-width: none; padding: 1cm; }
  @page { size: A4; margin: 1.5cm; }
}
```

---

## Decisiones de diseño (resumen)

1. **Cream (#f5f1eb) sobre ink (#1c1917)** — papel editorial, sin gradientes ni
   blue-tinted shadows. Dark mode invierte estos dos.
2. **Terracotta (#d4621a)** = único acento de marca. Aparece como puntos de énfasis,
   bordes de "stickered" hover-shadow, etiquetas de case-study, badge de la `.`
   tras el nombre.
3. **Ocean (#0c4a6e)** = acento secundario, reservado para side projects.
4. **Tipografía mixta intencional**: Instrument Serif (display, máxima personalidad),
   Inter (body, neutral), JetBrains Mono (números, labels, micro-UI tipo terminal).
5. **3D acentos vía CSS transforms + hard offset shadows** — no WebGL, no React Three
   Fiber. La isometría del hero es 3 `<div>` con `translate + rotate`. El "sticker shadow"
   (`box-shadow: 4px 4px 0 var(--c-ink)`) se usa en cards principales, banner cookies,
   form de contacto y CTAs primarios.
6. **Numbered editorial headers** — cada sección tiene su `01 / Home`, `02 / About`, etc.
   en mono caps. Es el hilo conductor.
7. **Sharp corners por defecto** — `--radius-none` para frames editoriales; `--radius-sm`
   solo para inputs / chips por usabilidad.
8. **Sin emoji, sin stock photography** — placeholder visuals son SVG geométricos
   custom por proyecto (ProjectVisual.tsx).

---

## Qué FALTA en v1 (intencional, para iteraciones futuras)

- Galería de proyecto (campo `gallery` en ProjectDetail; v1 muestra solo hero).
- Buscador en /projects (chips bastan con 6 proyectos).
- Páginas individuales para skills (`/skills/[id]`).
- RSS / blog.
- Animación de scroll-driven en hero (sólo entry animation + hover por ahora).
- Real-time validation en el contact form (HTML5 nativo suficiente para v1).
