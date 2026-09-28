#!/bin/sh
# Fails if any commit in the given range mentions Claude / Anthropic attribution.
# Used by CI; run locally with:  sh scripts/check-attribution.sh
RANGE="${1:-HEAD}"
if git log --format='%H%n%B' "$RANGE" | grep -iqE 'co-authored-by:.*(claude|anthropic)|generated (with|by) .*claude|claude-session:|claude\.ai/code/'; then
  echo "✖ Found AI attribution in commit history ($RANGE):"
  git log --format='%h %s' "$RANGE" | head -20
  echo "Rewrite those commit messages (git commit --amend / git rebase -i) before pushing."
  exit 1
fi
echo "✔ No AI attribution in commits ($RANGE)"
