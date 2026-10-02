import { useState } from 'react'
import { profile } from '../../data/profile'
import type { SocialLink } from '../../data/types'
import { useGitHubRepos } from '../../hooks/useGitHubRepos'
import { useGitHubStats } from '../../hooks/useGitHubStats'
import { timeAgo } from '../../hooks/useLastPush'
import { useTheme } from '../../hooks/useTheme'
import { ArrowUpRight } from '../ui/Icons'
import { socialIcon } from '../ui/socialIcons'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

export function GitHub() {
  const links = profile.socials.filter((s) => s.key !== 'email')
  const github = profile.socials.find((s) => s.key === 'github')

  return (
    <Section
      id="github"
      index="06"
      eyebrow="GitHub"
      title={
        <>
          Live from GitHub, <span className="text-accent">updated as I push.</span>
        </>
      }
      intro="My most recently active repositories and a year of commits, pulled from GitHub when you load the page."
    >
      <Reveal>
        <div className="flex flex-wrap gap-3">
          {links.map((s) => (
            <ProfileLink key={s.key} link={s} />
          ))}
        </div>
      </Reveal>
      {github && <RepoGrid username={github.handle} />}
      {github && <ContributionGraph username={github.handle} />}
    </Section>
  )
}

/** Compact profile button; GitHub also shows the live public-repo count. */
function ProfileLink({ link }: { link: SocialLink }) {
  const Icon = socialIcon[link.key]
  const gh = useGitHubStats(link.key === 'github' ? link.handle : '')

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-3 rounded-xl surface py-2.5 pr-4 pl-2.5 hover:-translate-y-0.5 hover:border-accent/50"
    >
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink-800 text-fg transition group-hover:text-accent">
        <Icon size={18} />
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-medium text-fg">{link.label}</span>
        <span className="block font-mono text-xs text-fg-faint">
          @{link.handle}
          {link.key === 'github' && gh && <> · {gh.publicRepos} repos</>}
        </span>
      </span>
      <ArrowUpRight size={14} className="ml-1 text-fg-faint transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
    </a>
  )
}

/** GitHub's language colours are brand-ish; map the common ones onto theme tokens instead. */
const LANG_DOT: Record<string, string> = {
  Java: 'bg-amber',
  TypeScript: 'bg-sky',
  JavaScript: 'bg-up',
  Python: 'bg-violet',
  HTML: 'bg-rose',
}

/** Live list of recently pushed repos — shows the work is ongoing, not a snapshot. */
function RepoGrid({ username }: { username: string }) {
  const repos = useGitHubRepos(username)
  if (repos && repos.length === 0) return null

  return (
    <Reveal delay={0.1}>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy={!repos}>
        {repos
          ? repos.map((r, i) => (
              // four on phones keeps the scroll short; all six from sm up
              <li key={r.name} className={i >= 4 ? 'hidden sm:block' : undefined}>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col rounded-2xl surface p-5 hover:-translate-y-0.5 hover:border-accent/50"
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="truncate font-mono text-sm font-medium text-fg group-hover:text-accent">{r.name}</span>
                    <ArrowUpRight size={14} className="shrink-0 text-fg-faint transition group-hover:text-accent" />
                  </span>
                  <span className="mt-2 line-clamp-2 text-sm leading-relaxed text-fg-muted">
                    {r.description ?? <span className="text-fg-faint italic">No description</span>}
                  </span>
                  <span className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-4 font-mono text-[11px] text-fg-faint">
                    {r.language && (
                      <span className="inline-flex items-center gap-1.5">
                        <span className={`h-2 w-2 rounded-full ${LANG_DOT[r.language] ?? 'bg-fg-faint'}`} />
                        {r.language}
                      </span>
                    )}
                    {r.stars > 0 && <span>★ {r.stars}</span>}
                    <span>updated {timeAgo(r.pushedAt)}</span>
                  </span>
                </a>
              </li>
            ))
          : Array.from({ length: 6 }, (_, i) => (
              <li key={i} className="h-[132px] animate-pulse rounded-2xl border border-ink-700 bg-ink-850" />
            ))}
      </ul>
    </Reveal>
  )
}

/** Third-party image of the GitHub contribution calendar. Hides itself if the service is down. */
function ContributionGraph({ username }: { username: string }) {
  const [ok, setOk] = useState(true)
  const { theme } = useTheme()
  // The chart service takes a hex colour, so read the live --accent token for the current theme
  const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim().replace('#', '')
  if (!ok) return null
  return (
    <Reveal delay={0.15}>
      <div className="mt-8 overflow-x-auto rounded-2xl surface p-6">
        <p className="mb-4 font-mono text-xs tracking-widest text-fg-faint uppercase">GitHub activity · last 12 months</p>
        <img
          key={theme}
          src={`https://ghchart.rshah.org/${accent}/${username}`}
          alt={`${username}'s GitHub contribution chart`}
          loading="lazy"
          onError={() => setOk(false)}
          className="min-w-[680px] opacity-90 mix-blend-multiply dark:mix-blend-normal dark:invert-[.88] dark:hue-rotate-180"
        />
      </div>
    </Reveal>
  )
}
