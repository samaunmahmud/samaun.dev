# samaun.dev — personal portfolio

My portfolio: projects, journey, skills and where to find me online.
React 19 · TypeScript · Vite · Tailwind CSS v4 · Motion.

## Run it

```bash
npm install        # also installs the git hook (see below)
npm run dev        # http://localhost:5173
npm run check      # lint + type-check + build — run before every push
```

## Edit content

Everything the site says lives in **`src/data/profile.ts`**. Components never hard-code text.

- Add a project → append to `projects` (screenshots go in `public/projects/<slug>.png`, then set `image`)
- Update the "Right now" card → `now`
- Search the file for `TODO` to find what still needs filling in

Other files you'll touch:

| File | What |
|---|---|
| `public/cv.pdf` | your résumé — the Résumé buttons link here |
| `public/og.png` | 1200×630 preview image for LinkedIn / WhatsApp |
| `src/index.css` | colours, fonts, animations (`@theme` block) |
| `src/data/sections.ts` | navbar order |

## Project structure

```
src/
  data/          profile.ts (content) · types.ts · sections.ts
  components/
    layout/      Navbar, Footer
    sections/    Hero, About, Projects, Journey, Skills, Profiles, Contact
    ui/          Section, Reveal, Tag, Icons, ProjectCover
  hooks/         useActiveSection, useGitHubStats
.claude/         Claude Code project settings + skills
.githooks/       commit-msg hook
CLAUDE.md        instructions Claude Code reads every session
```

## Working with Claude Code

Open a terminal in this folder and run `claude`. It reads `CLAUDE.md` automatically, so it already knows the structure and rules. Useful prompts:

- `/add-project` — walks through adding a new project card
- `/ship-check` — pre-deploy checklist (TODOs, CV, links, build)
- "Make the Journey section show a logo for each org" — normal requests work too

### No AI attribution in commits

Three layers make sure commits are yours only:

1. **`.claude/settings.json`** sets `attribution.commit` and `attribution.pr` to empty and turns off session links, so Claude Code doesn't add a `Co-Authored-By` trailer or "Generated with Claude Code" line.
2. **`.githooks/commit-msg`** strips any such lines before a commit is saved, whatever wrote the commit. `npm install` switches it on (`git config core.hooksPath .githooks`).
3. **CI** (`.github/workflows/ci.yml`) fails if one ever slips into history.

To get the same for **all** your repos (Meridian etc.), add this to `~/.claude/settings.json`:

```json
{
  "attribution": { "commit": "", "pr": "", "sessionUrl": false }
}
```

## Deploy (Vercel)

1. Push to GitHub.
2. vercel.com → **Add New → Project** → import the repo. Vercel detects Vite; accept the defaults.
3. Optional: **Settings → Domains** to attach a custom domain.
4. Update the `og:image` URL in `index.html` to the full deployed URL.
