# DESIGN_BRIEF.md — Brief para Claude.ai (frontend-design)

> Documento **autocontenido**. Quien lo lea (sin conocer el proyecto) debe poder producir buen diseño.
> Francisco completa los `[PLACEHOLDER]` antes de llevarlo a una sesión de Claude.ai con la skill
> `frontend-design`. El output se carga en `design-assets/v1/` siguiendo la §7.

---

## Sección 1 — Contexto del producto

**Quién:** Francisco Barros, Ingeniero Civil Industrial chileno. Consultor en Product Management, BI,
Pricing Intelligence e IA aplicada.

**Objetivo del sitio:** activo de marca personal para postular a roles senior (PM regional, BI, AI/Data)
en Chile y remoto internacional. Debe transmitir solvencia técnica y criterio de negocio.

**Audiencia:** recruiters y hiring managers senior. Leen rápido, en desktop y mobile, muchas veces en
inglés. Valoran claridad, evidencia (proyectos con impacto) y pulcritud.

**Tono visual deseado:** dinámico, atractivo, simple, técnico-confiable. **No** startup-juvenil (nada de
degradados chillones ni emojis), **no** corporate-aburrido (nada de stock genérico).

**Estética:** minimalismo expresivo con acentos 3D (vía CSS transforms / Canvas 2D, **no** WebGL pesado)
y micro-animaciones con intención. Soporte dark y light. Tipografía con jerarquía marcada.

**Referencias visuales:** `[PLACEHOLDER — Francisco pega 2-4 referencias / links / capturas]`
**Paleta de marca preferida:** `[PLACEHOLDER — o "propón tú"]`

## Sección 2 — Inventario de páginas

| Página            | Ruta (slug en inglés) | Propósito                                    | CTAs principales                            |
| ----------------- | --------------------- | -------------------------------------------- | ------------------------------------------- |
| Home              | `/`                   | Hook + síntesis de valor + accesos           | "Ver proyectos", "Descargar CV", "Contacto" |
| About             | `/about`              | Historia, enfoque, skills                    | "Descargar CV", "Contacto"                  |
| Projects (list)   | `/projects`           | Grid filtrable de proyectos                  | Click a detalle, filtros por tag            |
| Project (detalle) | `/projects/[slug]`    | Caso de estudio: problema, solución, impacto | Links repo/demo, "Volver", "Contacto"       |
| Experience        | `/experience`         | Timeline profesional                         | "Descargar CV"                              |
| Contact           | `/contact`            | Formulario + canales                         | Submit del formulario                       |
| Privacy           | `/privacy`            | Política de privacidad / cookies             | Opt-out de analítica                        |

(No hay `/admin`: la analítica se consulta en PostHog.)

## Sección 3 — Shapes de datos por sección

> Diseña en función de estos shapes. **No inventes campos. No asumas datos que no estén listados.**
> Campo localizable = `{ es: string, en: string }`. Imagen = `{ src, alt: {es,en}, width, height }`.

```ts
Profile {
  name: string
  role: { es: string, en: string }
  tagline: { es: string, en: string }
  bio: { es: string, en: string }          // 1-2 párrafos
  location: string                          // "Santiago, Chile"
  avatar: Image
  email: string
  cvUrl: { es: string, en: string }         // PDF por idioma
  socials: { platform: "linkedin"|"github"|"x"|"email", url: string }[]
}

ProjectCard {                               // usado en /projects
  slug: string
  title: { es: string, en: string }
  summary: { es: string, en: string }       // 1 línea
  heroImage: Image
  tags: string[]                            // ej. "AI", "BI", "Pricing"
  year: number
  featured: boolean
}

ProjectDetail extends ProjectCard {         // usado en /projects/[slug]
  role: { es: string, en: string }
  problem: { es: string, en: string }
  solution: { es: string, en: string }
  impact: { es: string, en: string }
  stack: string[]
  gallery: Image[]
  metrics: { label: { es: string, en: string }, value: string }[]
  links: { repo?: string, demo?: string }
}

ExperienceItem {                            // usado en /experience
  company: string
  role: { es: string, en: string }
  period: { start: string, end: string | "present" }  // "2022-03"
  location: string
  summary: { es: string, en: string }
  highlights: { es: string, en: string }[]
  logo?: Image
}
```

## Sección 4 — Inventario shadcn disponible

Reutiliza estos antes de crear desde cero: **Button, Card, Dialog, Sheet, Tabs, Accordion, Badge,
Tooltip, Avatar, Separator, Input, Textarea, Label, DropdownMenu, NavigationMenu, Skeleton, Sonner
(toast)**. Iconos: **`lucide-react`** únicamente.

## Sección 5 — Constraints técnicos

- **Tailwind v4** (config CSS-first vía `@theme`). Core utility classes únicamente. Sin plugins exóticos. Evita arbitrary values cuando hay
  escala disponible.
- **Framer Motion** para animaciones; declara las `variants` por componente.
- **3D vía CSS 3D transforms + Canvas 2D** (presupuesto JS extra casi nulo). **No** React Three Fiber
  en v1.
- **`prefers-reduced-motion` obligatorio**: toda animación debe degradar a estado estático.
- **Mobile-first**, breakpoints `sm/md/lg/xl`, **sin scroll horizontal** en ningún viewport.
- **WCAG 2.1 AA**: contraste ≥4.5:1, focus visible, navegable con teclado, jerarquía de headings.
- **Bilingüe**: cualquier área de texto debe acomodar ES (más extenso) y EN sin romper el layout.

## Sección 6 — Analytics injection points

Estos elementos deben disparar eventos (se conectan en E3; aquí solo asegura los estados visuales):

| Interacción              | Evento                                   | Estado visual requerido      |
| ------------------------ | ---------------------------------------- | ---------------------------- |
| Botón descargar CV       | `document_download` (id="cv")            | loading + post-click (async) |
| Click en project card    | `project_view`                           | hover/focus claros           |
| Link externo de proyecto | `project_link_click` (target=repo\|demo) | estado externo (icono)       |
| Switch de idioma         | `locale_switch`                          | estado activo del locale     |
| Submit de contacto       | `contact_submit`                         | loading + success + error    |
| Scroll de página         | `scroll_depth`                           | —                            |
| Tiempo en página         | `time_on_page`                           | —                            |

> "Asegúrate de que estos elementos tengan estados loading/post-click — los eventos son async."

## Sección 7 — Output esperado de Claude.ai

- Formato: **TSX + Tailwind**, un archivo por sección.
- Estructura: `design-assets/v1/<section>/` (ej. `hero/`, `projects-list/`, `project-detail/`, `about/`,
  `experience/`, `contact/`).
- Cada sección incluye: componente principal `.tsx`, un `README.md` explicando qué hace, preview/screenshot
  opcional.
- `design-assets/v1/design-tokens.ts` con colores, tipografías, spacing, radios, como constantes
  legibles. El equipo los portará al bloque `@theme` de `app/globals.css` (Tailwind v4).
- Componentes con **props tipados según los shapes de §3**.
- Strings provisionales como `t("key")` (solo marcar puntos de i18n; **no traducir**).
- **Sin lógica de fetch — solo presentational.** Recibe data por props.

## Sección 8 — NO hacer

- ❌ Inventar campos de data.
- ❌ Hardcodear strings en un solo idioma (usar `t("key")`).
- ❌ Usar librerías UI fuera del inventario de §4.
- ❌ Animaciones sin `prefers-reduced-motion`.
- ❌ React Three Fiber / WebGL pesado en v1.
- ❌ Imágenes/iconos con licencia (iconos: `lucide-react`).
- ❌ Lógica de fetch o acceso a datos dentro del asset.
