import { useEffect, useState } from 'react'
import { fetchGitHub } from '../lib/github'
import { isHiddenRepo } from './useGitHubRepos'

export interface LastPush {
  repo: string
  url: string
  at: Date
}

/**
 * Most recent public push from the GitHub events API (cached by /api/github in production, see lib/github.ts).
 * Returns null while loading, if there are no recent pushes, or if the API is unavailable.
 */
export function useLastPush(username: string) {
  const [push, setPush] = useState<LastPush | null>(null)

  useEffect(() => {
    if (!username) return
    const ctrl = new AbortController()
    fetchGitHub<{ type: string; repo: { name: string }; created_at: string }[]>('events', username, ctrl.signal)
      .then((events) => {
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
