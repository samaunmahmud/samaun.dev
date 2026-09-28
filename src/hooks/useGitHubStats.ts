import { useEffect, useState } from 'react'

export interface GitHubStats {
  publicRepos: number
  followers: number
}

/**
 * Live numbers from the public GitHub API (no token, 60 requests/hour per visitor).
 * Returns null while loading or if the API is unavailable — the UI just hides the numbers.
 */
export function useGitHubStats(username: string) {
  const [stats, setStats] = useState<GitHubStats | null>(null)

  useEffect(() => {
    if (!username) return
    const ctrl = new AbortController()
    fetch(`https://api.github.com/users/${username}`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((u) => setStats({ publicRepos: u.public_repos, followers: u.followers }))
      .catch(() => setStats(null))
    return () => ctrl.abort()
  }, [username])

  return stats
}
