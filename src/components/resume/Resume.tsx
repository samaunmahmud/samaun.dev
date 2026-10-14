import { Analytics } from '@vercel/analytics/react'
import type { ReactNode } from 'react'
import { profile } from '../../data/profile'
import type { Project, TimelineItem } from '../../data/types'
import { DownloadIcon } from '../ui/Icons'

/** "https://github.com/x" → "github.com/x": reads better on paper, still a live link in the PDF. */
const bare = (url: string) => url.replace(/^(https?:|mailto:)\/*/, '').replace(/\/$/, '')

/** Featured work first, then the rest in profile order. */
const projects: Project[] = [...profile.projects.filter((p) => p.featured), ...profile.projects.filter((p) => !p.featured)]

const byKind = (kind: TimelineItem['kind']) => profile.timeline.filter((t) => t.kind === kind)

/**
 * One-page résumé rendered from profile.ts, served at /resume. Recruiters can print it or
 * save it as a PDF, so it always matches the site. Stays light-themed on screen and paper.
 */
export function Resume() {
  const links = [
    profile.siteUrl,
    ...profile.socials.filter((s) => s.key !== 'email').map((s) => s.url),
  ]

  return (
    <div className="min-h-screen bg-ink-850 py-6 text-fg print:bg-ink-950 print:py-0 sm:py-10">
      <div className="mx-auto mb-5 flex max-w-[210mm] flex-wrap items-center justify-between gap-3 px-5 print:hidden">
        <a href="/" className="text-sm font-medium text-fg-muted transition hover:text-accent">
          ← Back to portfolio
        </a>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-ink-950 transition hover:bg-accent-strong"
        >
          <DownloadIcon size={16} /> Print / save as PDF
        </button>
      </div>

      <article className="mx-auto max-w-[210mm] bg-ink-950 px-6 py-8 text-[13px] leading-snug shadow-[var(--shadow-card)] print:max-w-none print:p-0 print:shadow-none sm:px-12 sm:py-12">
        <header className="border-b-2 border-accent pb-4">
          <h1 className="font-display text-4xl font-bold tracking-tight">{profile.name}</h1>
          <p className="mt-1 text-base font-medium text-accent">{profile.role}</p>
          <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-fg-muted">
            <span>{profile.location}</span>
            <a href={`mailto:${profile.email}`} className="hover:text-accent">
              {profile.email}
            </a>
            {links.map((url) => (
              <a key={url} href={url} className="hover:text-accent">
                {bare(url)}
              </a>
            ))}
          </p>
        </header>

        <Block title="Profile">
          <p>{profile.tagline}</p>
          <p className="mt-1 font-medium">{profile.availability}.</p>
        </Block>

        <Block title="Education">
          <Entries items={byKind('education')} />
        </Block>

        <Block title="Projects">
          <div className="space-y-3 print:space-y-2">
            {projects.map((p) => (
              <section key={p.slug} className="break-inside-avoid">
                <h3 className="font-semibold">
                  {p.name} <span className="font-normal text-fg-muted">— {p.tagline}</span>
                </h3>
                <p className="mt-0.5 text-xs text-fg-faint">
                  {p.stack.join(' · ')}
                  {p.repo && (
                    <>
                      {' · '}
                      <a href={p.repo} className="text-fg-muted hover:text-accent">
                        {bare(p.repo)}
                      </a>
                    </>
                  )}
                </p>
                <ul className="mt-1 list-disc space-y-0.5 pl-4 marker:text-accent">
                  {p.highlights.slice(0, 3).map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </Block>

        <Block title="Experience">
          <Entries items={byKind('role')} />
        </Block>

        <Block title="Hackathons">
          <Entries items={byKind('hackathon')} />
        </Block>

        <Block title="Skills">
          <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-1">
            {profile.skills.map((g) => (
              <div key={g.name} className="contents">
                <dt className="font-semibold">{g.name}</dt>
                <dd className="text-fg-muted">{g.items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </Block>
      </article>
      <Analytics />
    </div>
  )
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-5 print:mt-4">
      <h2 className="mb-2 break-after-avoid font-mono text-[11px] font-semibold tracking-widest text-accent uppercase">{title}</h2>
      {children}
    </section>
  )
}

function Entries({ items }: { items: TimelineItem[] }) {
  return (
    <div className="space-y-2">
      {items.map((t) => (
        <div key={t.title} className="break-inside-avoid">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3">
            <h3 className="font-semibold">
              {t.title} <span className="font-normal text-fg-muted">· {t.org}</span>
            </h3>
            <span className="text-xs text-fg-muted">{t.period}</span>
          </div>
          <ul className="mt-0.5 list-disc space-y-0.5 pl-4 marker:text-accent">
            {t.points.map((pt) => (
              <li key={pt}>{pt}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
