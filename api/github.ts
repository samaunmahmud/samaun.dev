// Cached proxy for the three public GitHub API calls the site makes (Vercel Function).
// Visitors' browsers used to call api.github.com directly, which allows 60 requests an hour
// per IP — on a shared office or campus network the GitHub section would quietly vanish.
// Here Vercel's CDN caches each response, so GitHub sees a few requests an hour in total.
// Set GITHUB_TOKEN in Vercel (no scopes needed) to raise GitHub's limit further; optional.

/** Must match the GitHub handle in src/data/profile.ts (checked by scripts/validate-content.ts). */
export const GITHUB_USER = 'samaunmahmud'

/** The only things this endpoint will fetch, so it can't be used as an open proxy. */
const RESOURCES: Record<string, string> = {
  user: `users/${GITHUB_USER}`,
  repos: `users/${GITHUB_USER}/repos?sort=pushed&per_page=30`,
  events: `users/${GITHUB_USER}/events/public?per_page=30`,
}

export async function GET(request: Request) {
  const resource = new URL(request.url).searchParams.get('resource') ?? ''
  const path = RESOURCES[resource]
  if (!path) return Response.json({ error: `resource must be one of: ${Object.keys(RESOURCES).join(', ')}` }, { status: 400 })

  const token = process.env.GITHUB_TOKEN
  const upstream = await fetch(`https://api.github.com/${path}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'samaun.dev',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })

  return new Response(upstream.body, {
    status: upstream.status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      // Fresh for 15 minutes; after that serve the old copy for up to a day while refreshing in the background.
      // Errors are cached briefly so a GitHub outage doesn't hammer the API.
      'Cache-Control': upstream.ok ? 'public, s-maxage=900, stale-while-revalidate=86400' : 'public, s-maxage=60',
    },
  })
}
