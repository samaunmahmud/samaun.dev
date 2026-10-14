/**
 * Public GitHub data for the site. In production it comes through /api/github (api/github.ts),
 * which Vercel caches for every visitor; in local dev there's no function, so call GitHub directly.
 */
export type GitHubResource = 'user' | 'repos' | 'events'

const DIRECT: Record<GitHubResource, (user: string) => string> = {
  user: (u) => `https://api.github.com/users/${u}`,
  repos: (u) => `https://api.github.com/users/${u}/repos?sort=pushed&per_page=30`,
  events: (u) => `https://api.github.com/users/${u}/events/public?per_page=30`,
}

export function fetchGitHub<T>(resource: GitHubResource, user: string, signal: AbortSignal): Promise<T> {
  const url = import.meta.env.PROD ? `/api/github?resource=${resource}` : DIRECT[resource](user)
  return fetch(url, { signal }).then((r) => (r.ok ? (r.json() as Promise<T>) : Promise.reject(r.status)))
}
