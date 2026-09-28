import { useEffect, useState } from 'react'

export interface Repo {
  name: string
  url: string
  description: string | null
  language: string | null
  stars: number
  pushedAt: Date
}

/**
 * Most recently pushed public repos (forks excluded), from the public GitHub API.
 * `null` while loading, `[]` if the API is unavailable — the UI hides itself then.
 */
export function useGitHubRepos(username: string, limit = 6) {
  const [repos, setRepos] = useState<Repo[] | null>(null)

  useEffect(() => {
    if (!username) return
    const ctrl = new AbortController()
    fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=30`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(
        (
          data: {
            name: string
            html_url: string
            description: string | null
            language: string | null
            stargazers_count: number
            pushed_at: string
            fork: boolean
          }[],
        ) =>
          setRepos(
            data
              // skip forks and the profile-README repo (named after the user)
              .filter((r) => !r.fork && r.name.toLowerCase() !== username.toLowerCase())
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
