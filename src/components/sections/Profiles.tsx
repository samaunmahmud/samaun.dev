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

const BLURB: Record<SocialLink['key'], string> = {
  github: 'Source for everything on this page, plus experiments that never made it here.',
  linkedin: 'Placement updates, hackathon write-ups and what I’m learning.',
  leetcode: 'Where I practise data structures and algorithms — Java all the way.',
  email: '',
}

const HOVER: Record<SocialLink['key'], string> = {
  github: 'hover:border-fg-faint',
  linkedin: 'hover:border-sky/60',
  leetcode: 'hover:border-amber/60',
  email: '',
}

export function Profiles() {
  const cards = profile.socials.filter((s) => s.key !== 'email')
  const github = profile.socials.find((s) => s.key === 'github')

  return (
    <Section
      id="profiles"
      index="06"
      eyebrow="Profiles"
      title={
        <>
          Code, activity <span className="text-fg-muted">and professional profiles.</span>
        </>
      }
    >
      <div className="grid gap-5 md:grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
        {cards.map((s, i) => (
          <Reveal key={s.key} delay={i * 0.07} className="h-full">
            <ProfileCard link={s} />
          </Reveal>
        ))}
      </div>
      {github && <RepoGrid username={github.handle} url={github.url} />}
      {github && <ContributionGraph username={github.handle} />}
    </Section>
  )
}

function ProfileCard({ link }: { link: SocialLink }) {
  const Icon = socialIcon[link.key]
  const gh = useGitHubStats(link.key === 'github' ? link.handle : '')
  const showGh = link.key === 'github' && gh

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noreferrer"
      className={`group flex h-full flex-col rounded-2xl surface p-6 hover:-translate-y-1 ${HOVER[link.key]}`}
    >
      <div className="flex items-center justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-ink-800 text-fg transition group-hover:text-accent">
          <Icon size={24} />
        </span>
        <ArrowUpRight size={18} className="text-fg-faint transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
      </div>
      <p className="mt-6 font-display text-xl font-semibold">{link.label}</p>
      <p className="font-mono text-sm text-accent">@{link.handle}</p>
      <p className="mt-3 text-sm leading-relaxed text-fg-muted">{BLURB[link.key]}</p>
      {showGh && (
        <div className="mt-auto flex gap-6 border-t border-ink-700 pt-4 font-mono text-sm">
          <span>
            <span className="text-fg">{gh.publicRepos}</span> <span className="text-fg-faint">repos</span>
          </span>
          {gh.followers >= 10 && (
            <span>
              <span className="text-fg">{gh.followers}</span> <span className="text-fg-faint">followers</span>
            </span>
          )}
        </div>
      )}
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
function RepoGrid({ username, url }: { username: string; url: string }) {
  const repos = useGitHubRepos(username)
  if (repos && repos.length === 0) return null

  return (
    <Reveal delay={0.1}>
      <div className="mt-12 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-xs tracking-widest text-fg-faint uppercase">Live from GitHub</p>
          <h3 className="mt-2 font-display text-2xl font-semibold text-fg">Recently active repositories</h3>
        </div>
        <a href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-accent hover:underline">
          View all on GitHub <ArrowUpRight size={14} />
        </a>
      </div>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy={!repos}>
        {repos
          ? repos.map((r) => (
              <li key={r.name}>
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
