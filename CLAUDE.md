# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Website for the Arizona State University Video Game Development Club (VGDC, aka Heatwave Studios). Next.js 16 App Router + React 19 + TypeScript, Tailwind CSS v4, shadcn/ui (on the unified `radix-ui` package), content edited through Pages CMS. Hosted on Vercel.

**Next.js 16 differs from older versions** (see `AGENTS.md`, which `next dev` regenerates): check `node_modules/next/dist/docs/` before writing routing, caching, or file-convention code. Examples already hit: error boundaries receive `retry` (not `reset`); `cacheComponents` is on, so data is cached with `'use cache'` + `cacheLife()` rather than route segment config.

## Commands

```bash
npm run dev      # dev server (http://localhost:3000)
npm run build    # production build — the only full type-check; also shows which routes prerender
npm run lint     # eslint 9 flat config (eslint.config.mjs)
npm run format   # prettier + prettier-plugin-tailwindcss (content/ is ignored)
npx shadcn@latest add <component>   # add shadcn/ui components into components/ui
```

There is no test suite.

## Architecture

### Content (Pages CMS → markdown → server components)
- Content lives in `content/<collection>/*.md` (`about`, `games`, `teams`, `officers`) as YAML-frontmatter markdown. Editors change it via Pages CMS (app.pagescms.org), which commits straight to the repo; Vercel rebuilds on push. Schema is `.pages.yml` at the repo root — all collections share one field list (`title, slug, status, description, coverImage, publishedAt, body`) via a YAML anchor. Uploaded media goes to `public/images/`, referenced as `/images/...`.
- `lib/content.ts` `getCollection(name)` reads a collection from disk, drops non-`published` entries, sorts newest first. It's cached with `'use cache'` + `cacheLife('max')`, so content pages prerender as static. `next.config.ts` `outputFileTracingIncludes` ships `content/` with the server bundle — keep it.
- Pages are async server components that load content and render markdown on the server with the shared `components/markdown.tsx` (`<Markdown variant="about|games|teams">` — per-page accent colors/sizes live there). They pass already-rendered `ReactNode`s to a colocated client view for interactivity: `app/(content)/games/games-view.tsx` (Embla carousel + autoplay that pauses while reading), `app/(content)/teams/teams-view.tsx` (sidebar selection). The teams page splits each body into a lead shown beside the cover image and the rest below (`splitBody` in its `page.tsx`).

### Routes
- `app/layout.tsx` — root layout: fonts (`app/fonts.ts`), metadata.
- `app/page.tsx` — home (no navbar): scrolling background, banner, nav pills, social links.
- `app/(content)/` — route group adding `components/navbar.tsx` above a full-height, `overflow-hidden` area; pages scroll internally.
- Nav items (with per-section accent classes) and social links come from `config/site.ts`. `/officers` is linked but has no page yet.

### Styling
- Tailwind v4, configured in CSS only: `app/globals.css` defines the VGDC palette as `--color-*` tokens (`primary`, `secondary`, `success`, `warning`, `danger`, each with an `-alternative` shade from the logo) plus the shadcn tokens. Light-only. Tailwind runs through the `@tailwindcss/turbopack` loader in `next.config.ts` (there is no PostCSS config).
- The `shadcn` package is deliberately **not** a dependency (it pulls in vulnerable CLI deps); the two variants its components need (`data-open`, `data-closed`) are inlined at the top of `globals.css`. If a newly added component uses another `shadcn/tailwind.css` variant, inline that too. `cn()` comes from the `cn` package (re-exported by `lib/utils.ts`).
- Fonts: Inter (sans), Outfit, Fira Code via `next/font/google`; Poppins 400–700 via `next/font/local` from `app/fonts/`. Use a weight that's actually loaded, otherwise the browser substitutes the nearest one.
- Class strings that vary (accent colors) are written out in full in `config/site.ts` / `components/markdown.tsx` so Tailwind can detect them — don't build them by string concatenation.
