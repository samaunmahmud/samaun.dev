import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import { fetchGitHub } from '../lib/github'

export interface Repo {
  name: string
  url: string
  description: string | null
  language: string | null
  stars: number
  pushedAt: Date
}

/** True for repos listed in profile.hiddenRepos (case-insensitive; "Name-*" matches a prefix). */
export function isHiddenRepo(name: string) {
  const n = name.toLowerCase()
  return profile.hiddenRepos.some((h) => {
    const p = h.toLowerCase()
    return p.endsWith('*') ? n.startsWith(p.slice(0, -1)) : n === p
  })
}

/**
 * Most recently pushed public repos (forks excluded), from the public GitHub API (see lib/github.ts).
 * `null` while loading, `[]` if the API is unavailable — the UI hides itself then.
 */
export function useGitHubRepos(username: string, limit = 6) {
  const [repos, setRepos] = useState<Repo[] | null>(null)

  useEffect(() => {
    if (!username) return
    const ctrl = new AbortController()
    fetchGitHub<
      {
        name: string
        html_url: string
        description: string | null
        language: string | null
        stargazers_count: number
        pushed_at: string
        fork: boolean
      }[]
    >('repos', username, ctrl.signal)
      .then(
        (data) =>
          setRepos(
            data
              // skip forks, practice repos and the profile-README repo (named after the user)
              .filter((r) => !r.fork && !isHiddenRepo(r.name) && r.name.toLowerCase() !== username.toLowerCase())
              .slice(0, limit)
              .map((r) => ({
                name: r.name,
                url: r.html_url,
                description: r.description,
                language: r.language,
                stars: r.stargazers_count,
                pushedAt: new Date(r.pushed_at),
              })),
          ),
      )
      .catch((err) => {
        if (err?.name !== 'AbortError') setRepos([])
      })
    return () => ctrl.abort()
  }, [username, limit])

  return repos
}
