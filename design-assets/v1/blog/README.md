# blog/

Scaffold for a blog / case-study section. **No real posts** — content is what
moves SEO long-term, and inventing it would be dishonest. This gives you the
structure so writing a post is fast.

## Files

```
blog/
├── BlogIndex.tsx       # /blog list view (presentational; filters drafts)
├── _template.mdx       # front-matter template — copy to start a new post
├── posts/
│   └── reporteria-automatizada-ia-sql.mdx   # PLACEHOLDER (draft:true, noindex)
└── README.md
```

## Writing a post

1. `cp blog/_template.mdx blog/posts/<slug>.mdx`
2. Fill the front-matter (title/description per locale, date, keyword, cover).
3. Write the body. One keyword per post. Put it in the first paragraph and ≥1 `## h2`.
4. Set `draft: false` when ready — only then does it enter the sitemap + index.
5. Add a 1200×630 cover (doubles as the post's OG image) with real alt text.

## Wiring (Next.js + MDX)

- Route: `app/blog/page.tsx` (index) + `app/blog/[slug]/page.tsx` (post).
- Parse `posts/*.mdx` front-matter (e.g. `gray-matter`) into `PostMeta[]`.
- Feed live (non-draft) slugs to the sitemap:
  ```ts
  // app/sitemap.ts
  import { buildSitemap } from "@/design-assets/v1/seo/sitemap";
  export default () => buildSitemap({ blogSlugs: async () => getLivePostSlugs() });
  ```
- Per-post metadata + `Article` JSON-LD (datePublished/dateModified from front-matter).

## The placeholder post

`posts/reporteria-automatizada-ia-sql.mdx` is marked `draft: true` and clearly
labelled as a placeholder. It exists ONLY to show the structure. **Replace or
delete before launch** — do not publish it as-is.
