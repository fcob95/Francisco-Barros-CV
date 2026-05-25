# chrome/

Site-wide UI: header (sticky top) and footer (closing manifesto).

## Header.tsx

Sticky top chrome with `backdrop-blur` and 88% paper opacity (creates a soft glass
effect that doesn't fight the design).

### Composition

- **Brand mark**: terracotta pip (rotates 45° on hover) + "Francisco Barros"
- **Desktop nav**: 5 nav links (Home / About / Projects / Experience / Contact).
  Active link has terracotta underline.
- **Right cluster**: `[ES / EN]` locale switch (mono caps) · theme toggle (Sun/Moon)
  · hamburger (mobile only)
- **Mobile drawer**: full-width sheet with the same nav, vertical layout

### Props (`HeaderProps`)

| Prop             | Type                                | Notes                              |
| ---------------- | ----------------------------------- | ---------------------------------- |
| `route`          | `string`                            | for marking active link            |
| `locale`         | `"es" \| "en"`                      |                                    |
| `theme`          | `"light" \| "dark"`                 |                                    |
| `t`              | `TFn`                               |                                    |
| `onNavigate`     | `(href: string) => void`            |                                    |
| `onLocaleChange` | `(l: "es" \| "en") => void`         |                                    |
| `onThemeChange`  | `(t: "light" \| "dark") => void`    |                                    |

### Production swap

In a real Next.js app, use `<NavigationMenu>` (shadcn) for desktop and `<Sheet>`
for mobile. Replace the inline conditional drawer with the Sheet component.

### Analytics

- `data-event="locale_switch" data-locale="es|en"` on each locale button.

---

## Footer.tsx

Closing manifesto + meta row.

### Composition

- **Top row** (7 / 5 cols)
  - Mono kicker "— Fin" + closing display-serif sentence
  - CV download button + clickable email (right-aligned on desktop)
- **Hairline divider**
- **Bottom row** — `FB · Santiago — 2026` + social icons | built-by note + Privacy + Cookies

### Props (`FooterProps`)

| Prop             | Type                       |
| ---------------- | -------------------------- |
| `profile`        | `Profile`                  |
| `locale`         | `"es" \| "en"`             |
| `t`              | `TFn`                      |
| `onNavigate`     | `(href: string) => void`   |
| `onOpenCookies`  | `() => void`               |

The Cookies button is the **re-trigger** for `CookieBanner` (user might want to
change their decision).
