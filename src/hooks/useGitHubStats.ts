import { useEffect, useState } from 'react'
import { fetchGitHub } from '../lib/github'

export interface GitHubStats {
  publicRepos: number
  followers: number
}

/**
 * Live numbers from the public GitHub API (cached by /api/github in production, see lib/github.ts).
 * Returns null while loading or if the API is unavailable — the UI just hides the numbers.
 */
export function useGitHubStats(username: string) {
  const [stats, setStats] = useState<GitHubStats | null>(null)

  useEffect(() => {
    if (!username) return
    const ctrl = new AbortController()
    fetchGitHub<{ public_repos: number; followers: number }>('user', username, ctrl.signal)
      .then((u) => setStats({ publicRepos: u.public_repos, followers: u.followers }))
      .catch(() => setStats(null))
    return () => ctrl.abort()
  }, [username])

  return stats
}
