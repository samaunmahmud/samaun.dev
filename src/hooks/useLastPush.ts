import { useEffect, useState } from 'react'
import { isHiddenRepo } from './useGitHubRepos'

export interface LastPush {
  repo: string
  url: string
  at: Date
}

/**
 * Most recent public push from the GitHub events API (no token, 60 requests/hour per visitor).
 * Returns null while loading, if there are no recent pushes, or if the API is unavailable.
 */
export function useLastPush(username: string) {
  const [push, setPush] = useState<LastPush | null>(null)

  useEffect(() => {
    if (!username) return
    const ctrl = new AbortController()
    fetch(`https://api.github.com/users/${username}/events/public?per_page=30`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((events: { type: string; repo: { name: string }; created_at: string }[]) => {
        const e = events.find((ev) => ev.type === 'PushEvent' && !isHiddenRepo(ev.repo.name.split('/')[1] ?? ''))
        if (!e) return
        setPush({
          repo: e.repo.name.split('/')[1] ?? e.repo.name,
          url: `https://github.com/${e.repo.name}`,
          at: new Date(e.created_at),
        })
      })
      .catch(() => setPush(null))
    return () => ctrl.abort()
  }, [username])

  return push
}

/** "just now", "5m ago", "3h ago", "2d ago" */
export function timeAgo(date: Date) {
  const mins = Math.max(0, Math.round((Date.now() - date.getTime()) / 60_000))
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.round(mins / 60)
  if (hours < 48) return `${hours}h ago`
  return `${Math.round(hours / 24)}d ago`
}
