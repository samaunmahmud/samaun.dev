# Samaun's portfolio — project guide for Claude Code

Personal portfolio site for Samaun Mahmud (CS (AI) student at Brunel, full-stack Java developer).
Audience: placement recruiters and engineers who give it 30–60 seconds. Speed and clarity beat flourish.

## Commands

- `npm run dev` — dev server on http://localhost:5173
- `npm run check` — lint + type-check + production build. **Run before saying any task is done.**
- `npm run preview` — serve the production build locally

## Stack

React 19 + TypeScript + Vite · Tailwind CSS v4 (config lives in `src/index.css` `@theme`, there is no tailwind.config.js) · `motion` for animation · self-hosted fonts via `@fontsource-variable/*`. Static site, no backend. Deployed on Vercel.

## Architecture

```
src/
  data/
    profile.ts     ← ALL site content (single source of truth)
    types.ts       ← shapes for that content
    sections.ts    ← navbar order; ids must match <Section id>
  components/
    layout/        ← Navbar, Footer
    sections/      ← one file per page section, in page order in App.tsx
    ui/            ← reusable pieces: Section, Reveal, Tag, Icons, ProjectCover
  hooks/           ← useActiveSection (nav highlight), useGitHubStats (live API)
public/            ← cv.pdf, og.png, favicon.svg, projects/*.png screenshots
```

## Rules

1. **Content goes in `src/data/profile.ts`, never hard-coded in components.** Components only render data.
2. **Never invent facts about Samaun** — no made-up metrics, employers, dates, grades or links. If content is missing, add a `// TODO:` in profile.ts and tell him.
3. **Colours only via theme tokens** (`bg-ink-900`, `text-accent`, `text-fg-muted` …). Add new colours to `@theme` in `src/index.css`, not as raw hex in JSX.
4. New section → create `components/sections/X.tsx` using the `<Section>` wrapper, add it to `App.tsx` and to `NAV_SECTIONS` in `data/sections.ts`, keep the `01, 02 …` index numbering in order.
5. Must work at 390px wide with no horizontal scroll. Grid columns that hold wide content need `minmax(0,1fr)`.
6. Respect `prefers-reduced-motion`; use the `<Reveal>` component for scroll-in animation rather than new motion code.
7. Accessibility: every icon-only link needs `aria-label`; images need `alt`; keep visible focus styles.
8. Keep the JS bundle lean — ask before adding a dependency.

## Git

- **Do not add any AI attribution** to commits or PRs: no `Co-Authored-By: Claude`, no "Generated with Claude Code", no session links. Commits are authored by Samaun only. (`.claude/settings.json` disables it, and `.githooks/commit-msg` strips it as a backstop.)
- Conventional commit messages: `feat: …`, `fix: …`, `style: …`, `content: …`, `chore: …`
- Small, focused commits. Never `git push` without being asked.

## Definition of done

`npm run check` passes · looks right at 390px and 1440px · no console errors · no new TODOs left silently.
