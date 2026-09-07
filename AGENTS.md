<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# furniturepos-marketing

The public site for Furniture OS at https://furniturepos.com. The app itself lives at
https://app.furniturepos.com in the `ademcwealth/Furniture-OS` repo.

## Non-negotiables

- **No email address anywhere in the site.** Not in JSX, not in a `mailto:`, not in a
  blog post. Demo requests go through the form, which delivers to `LEAD_NOTIFY_EMAIL` on
  the server. `scripts/check-posts.mjs` fails the build if a post contains one.
- **No customer or store names.** The product is described as "built inside a multi-store,
  multi-brand furniture retailer". Keep it that way.
- **Never push to `main`.** Open a PR; the owner merges.
- **Secrets stay in Vercel env.** Never commit `.env*`; `.env.example` documents the names.

## Layout

- `app/` routes: `/` (landing), `/blog`, `/blog/[slug]`, `/blog/tags/[tag]`,
  `/blog/rss.xml`, `/privacy`, plus `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`.
- `components/` sections and client widgets (welcome dialog, demo form).
- `lib/` schema, email delivery, blog loader, site constants.
- `content/blog/*.md` posts; `content/sources.yml` what the blog routine reads.
- `docs/routines/` scheduled-routine specs. The file is the routine.

## Blog posts

Markdown with frontmatter, `YYYY-MM-DD-slug.md`, at least two `https` sources, 500–1400
words, `##` headings. `npm run check-posts` enforces it and runs before every build.
