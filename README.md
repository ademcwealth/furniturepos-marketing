# furniturepos-marketing

Marketing site and blog for [Furniture OS](https://furniturepos.com). Next.js 16 (App
Router), React 19, Tailwind v4. Deployed on Vercel.

## Develop

```bash
npm install
npm run dev        # http://localhost:3001 via .claude/launch.json, or :3000 directly
npm run lint
npm run build      # runs scripts/check-posts.mjs first
```

## Environment

Copy `.env.example` to `.env.local` and fill in:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Sends demo requests. |
| `LEAD_NOTIFY_EMAIL` | Where demo requests are delivered. Server-only; never rendered. |
| `LEAD_FROM_ADDRESS` | Verified sender on the furniturepos.com Resend domain. |

Without these the form still validates and shows a "try again later" message; nothing is
lost silently, the failure is logged server-side.

## Blog

Posts live in `content/blog/YYYY-MM-DD-slug.md`. A daily Claude Code routine
(`docs/routines/blog-writer.md`) drafts one post as a PR; a person merges it. Sources it
watches are in `content/sources.yml`.

## Rules

See [`AGENTS.md`](./AGENTS.md).
