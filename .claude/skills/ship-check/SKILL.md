---
name: ship-check
description: Pre-deploy check for the portfolio. Use before pushing to main or when Samaun asks "is it ready", "check the site", or "ready to deploy?".
---

# Ship check

Run through this and report a short pass/fail list at the end.

1. `npm run check` passes (lint + types + build).
2. `grep -rn "TODO" src/data/profile.ts` — list every remaining TODO. Placeholder LeetCode handle, missing repo/demo links and a missing CV are blockers.
3. `public/cv.pdf` exists and `public/og.png` exists (1200×630).
4. Every URL in `profile.ts` is well-formed (https://…) — list them so Samaun can click through.
5. `sh scripts/check-attribution.sh` passes — no AI attribution in commit messages.
6. If a dev server is running, check the page at 390px and 1440px for horizontal scroll and console errors.

Do not push. Tell Samaun what's left and let him push.
