---
name: add-project
description: Add a new project card to the portfolio. Use when Samaun says "add a project", "put X on my site", or shares a repo he wants featured.
---

# Add a project to the portfolio

1. Ask Samaun for anything you don't know. Never guess these:
   - name, one-line tagline, 2–3 sentence description
   - 2–4 highlights — the *hard problems he solved*, not features
   - stack, status (`live` | `in-progress` | `hackathon` | `coursework`)
   - repo URL and live demo URL (either may be absent)
   - featured or not (max 2–3 featured; featured = big alternating card)
2. If he gives a GitHub repo, you may read its README to draft the description and highlights — then show him the draft before saving.
3. Append an entry to `projects` in `src/data/profile.ts`, following the `Project` type in `src/data/types.ts`.
   - Pick an `accent` and `art` not already used by a neighbouring card.
   - If he has a screenshot, save it as `public/projects/<slug>.png` (1600×1000 works well) and set `image: '/projects/<slug>.png'`.
4. If the project count in `stats` is now wrong, update it.
5. Run `npm run check`. Report what you added in two or three lines.
