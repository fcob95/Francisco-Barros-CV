# services/

New section added for SEO: `/servicios`. This is the **primary indexable
surface** for the applied-AI positioning.

## Files

- `services.data.ts` — the catalog (5 services). Indexable copy per service:
  title · summary · description paragraph · what's-included list · target keyword.
- `Services.tsx` — presentational section. Renders real text (not bullets in
  images), keyword-bearing `<h3>` per service, anchor ids matching JSON-LD.

## Services → keyword map

| Service                         | slug                        | primary keyword                           |
| ------------------------------- | --------------------------- | ----------------------------------------- |
| Automatización con IA           | `automatizacion-ia`         | automatización con IA                     |
| Integración de IA               | `integracion-ia`            | integración de IA                         |
| Sistemas RAG                    | `sistemas-rag`              | sistemas RAG                              |
| Reportería automatizada         | `reporteria-automatizada`   | reportería automatizada                   |
| Consultoría en IA + Revenue     | `consultoria-ia-revenue`    | consultoría en inteligencia artificial    |

Pricing & revenue analytics is positioned as the **differentiator** (woven into
the last service + the section intro), per the brief.

## How to wire (Next.js)

```tsx
// app/servicios/page.tsx
import { Services } from "@/design-assets/v1/services/Services";
import { SERVICES } from "@/design-assets/v1/services/services.data";
import { ServicesJsonLd } from "@/design-assets/v1/seo/JsonLd";
import { pageMetadata } from "@/design-assets/v1/seo/metadata";

export const metadata = pageMetadata("services", "es");

export default function Page() {
  return (
    <>
      <ServicesJsonLd services={SERVICES} locale="es" />
      <Services services={SERVICES} locale="es" t={t} L={L} onContact={...} />
    </>
  );
}
```

> ⚠️ The copy in `services.data.ts` is **placeholder-grounded** in Francisco's
> real CV skills — safe to ship, but review the wording and confirm scope before
> launch. No invented client names or metrics beyond the CV.

## H1 note

`Services.tsx` uses `<h2>` for the section title (assuming it sits under a page
`<h1>`). If `/servicios` is its own route with no other H1, promote the section
title to `<h1>`.
