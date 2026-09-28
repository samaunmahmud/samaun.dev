import { useState } from 'react'
import { profile } from '../../data/profile'
import type { SocialLink } from '../../data/types'
import { useGitHubStats } from '../../hooks/useGitHubStats'
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
      eyebrow="Find me online"
      title={
        <>
          The receipts, <span className="text-fg-muted">in one place.</span>
        </>
      }
    >
      <div className="grid gap-5 md:grid-cols-3">
        {cards.map((s, i) => (
          <Reveal key={s.key} delay={i * 0.07} className="h-full">
            <ProfileCard link={s} />
          </Reveal>
        ))}
      </div>
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
      className={`group flex h-full flex-col rounded-2xl border border-ink-700 bg-ink-900/60 p-6 transition hover:-translate-y-1 ${HOVER[link.key]}`}
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

/** Third-party image of the GitHub contribution calendar. Hides itself if the service is down. */
function ContributionGraph({ username }: { username: string }) {
  const [ok, setOk] = useState(true)
  const { theme } = useTheme()
  // The chart service takes a hex colour, so read the live --accent token for the current theme
  const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim().replace('#', '')
  if (!ok) return null
  return (
    <Reveal delay={0.15}>
      <div className="mt-5 overflow-x-auto rounded-2xl border border-ink-700 bg-ink-900/60 p-6">
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
