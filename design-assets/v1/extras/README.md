# extras/

Smaller pieces that don't warrant their own section folder: 404, Privacy page,
cookie banner, OG image template.

---

## NotFound.tsx — `/404`

Editorial 404. Massive layered serif "404" on the right (desktop only), kicker +
title + lead + 2 CTAs on the left ("Volver al inicio" + "Ver proyectos").

---

## Privacy.tsx — `/privacy`

Long-form prose, 720px container. Three short paragraphs (PostHog usage, cookies,
contact form data handling). Bilingual. Print-friendly by virtue of being plain prose.

---

## CookieBanner.tsx

Bottom-right discreet card. Two choices:

- **"Aceptar"** → `onDecide("accept")` → caller initialises PostHog
- **"Solo necesario"** → `onDecide("necessary")` → caller does NOT initialise tracking

Also closeable via the `X` button (treated as "necessary").

### Props

| Prop          | Type                              |
| ------------- | --------------------------------- |
| `open`        | `boolean` (caller controls)       |
| `t`           | `TFn`                             |
| `onDecide`    | `(choice: "accept" \| "necessary") => void` |
| `onLearnMore` | `() => void` (navigate to `/privacy`) |

### Caller pattern

```tsx
const [open, setOpen] = useState(() => !localStorage.getItem("fb-cookies"));

const handle = (c: CookieChoice) => {
  localStorage.setItem("fb-cookies", c);
  if (c === "accept") posthog.init(...);
  setOpen(false);
};

<CookieBanner open={open} t={t} onDecide={handle} onLearnMore={() => router.push("/privacy")} />
```

---

## OGImage.tsx — 1200 × 630

Server-rendered social card.

### How to use with `@vercel/og`

```ts
// app/og/route.tsx
import { ImageResponse } from "next/og";
import { OGImage } from "@/design-assets/v1/extras/OGImage";
import { profile } from "@/data/profile";

export const runtime = "edge";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const locale = (url.searchParams.get("locale") ?? "es") as "es" | "en";

  return new ImageResponse(<OGImage profile={profile} locale={locale} />, {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Instrument Serif", data: await fetchFont("Instrument+Serif"), style: "normal", weight: 400 },
      { name: "Inter", data: await fetchFont("Inter:wght@400;600"), style: "normal", weight: 400 },
      { name: "JetBrains Mono", data: await fetchFont("JetBrains+Mono:wght@500"), style: "normal", weight: 500 },
    ],
  });
}
```

Use everywhere via `<meta>`:

```html
<meta property="og:image" content="https://fcobarroscruz.cl/og?locale=es" />
<meta property="og:image" content="https://fcobarroscruz.cl/og?locale=en" />
```

### Composition

- Top-left: terracotta brand pip + "Francisco Barros" (serif)
- Top-right: `PORTFOLIO · 2026` (mono caps)
- Center: massive 3-line headline — `Pricing. / Revenue. / AI.` (terracotta period)
- Right: isometric mini-stack of 3 pillar cards
- Bottom: tagline (left) + URL (right) — separated by an ink hairline
