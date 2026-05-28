/**
 * Injects a JSON-LD structured-data block server-side. Renders a single
 * `<script type="application/ld+json">` with the serialized graph.
 *
 * Server Component (no `"use client"`): the script is emitted in the SSR HTML so
 * crawlers see it without executing JS. `data` comes from `lib/seo/jsonld.ts`
 * builders — typed as `unknown` here because each builder returns a distinct
 * schema shape and the component only serializes.
 *
 * `<` is escaped to `\u003c` to avoid prematurely closing the script tag if any
 * field ever contained "</script>" — the standard safe-injection guard.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
