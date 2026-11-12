import { useEffect, useState, type PointerEvent } from 'react'
import { profile } from '../../data/profile'
import type { Project } from '../../data/types'
import { openProject, projectAnchor, STACK_EVENT } from '../../lib/actions'
import { release, tilt } from '../../lib/pointer'
import { ArrowUpRight } from '../ui/Icons'
import { ProjectCover } from '../ui/ProjectCover'
import { ProjectLinks, Status } from '../ui/ProjectMeta'
import { ProjectModal } from '../ui/ProjectModal'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { Tag } from '../ui/Tag'

/** Moves a soft light under the cursor and tilts the screenshot towards it. Pure CSS vars, no re-renders. */
function spotlight(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
  tilt(e, 5)
}
const spotlightCls =
  'before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-[inherit] before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 before:bg-[radial-gradient(420px_circle_at_var(--x)_var(--y),color-mix(in_oklab,var(--accent)_10%,transparent),transparent_60%)]'

/** Tech used in 3+ projects, most-used first — these become the filter chips (rarer tech is still reachable from Skills). */
const FILTERS = Object.entries(
  profile.projects.flatMap((p) => p.stack).reduce<Record<string, number>>((acc, t) => ({ ...acc, [t]: (acc[t] ?? 0) + 1 }), {}),
)
  .filter(([, n]) => n >= 3)
  .sort((a, b) => b[1] - a[1])

const FEATURED = profile.projects.filter((p) => p.featured)

/** Non-featured projects sorted into profile.projectGroups; anything unmatched falls into the last group. */
const GROUPS = (() => {
  const groups = profile.projectGroups.map((g) => ({ title: g.title, projects: [] as Project[] }))
  for (const p of profile.projects) {
    if (p.featured) continue
    const i = profile.projectGroups.findIndex((g) => g.statuses.includes(p.status))
    groups[i === -1 ? groups.length - 1 : i].projects.push(p)
  }
  return groups.filter((g) => g.projects.length > 0)
})()

/** 3 across unless that would leave a lonely last row and 2 across divides evenly (e.g. 4 cards → 2×2). */
const gridCols = (n: number) => (n % 3 !== 0 && n % 2 === 0 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3')

export function Projects() {
  const [tech, setTech] = useState<string | null>(null)
  // A click on a skill in the Skills section filters this list (see filterStack)
  useEffect(() => {
    const onFilter = (e: Event) => setTech((e as CustomEvent<string>).detail)
    window.addEventListener(STACK_EVENT, onFilter)
    return () => window.removeEventListener(STACK_EVENT, onFilter)
  }, [])
  const matches = (p: Project) => !tech || p.stack.includes(tech)
  const count = profile.projects.filter(matches).length
  const featured = FEATURED.filter(matches)
  const groups = GROUPS.map((g) => ({ ...g, projects: g.projects.filter(matches) })).filter((g) => g.projects.length > 0)

  return (
    <Section
      id="projects"
      index="02"
      eyebrow="Selected work"
      title={
        <>
          Selected <span className="text-accent">projects</span>, and the problems behind them.
        </>
      }
      intro="Each card lists the engineering problems I worked through, not just the stack."
    >
      {FILTERS.length > 0 && (
        <Reveal>
          <div className="mb-4 flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="mr-1 text-fg-faint">
              <span className="text-accent">$</span> filter --stack
            </span>
            <FilterChip label="all" count={profile.projects.length} active={!tech} onClick={() => setTech(null)} />
            {FILTERS.map(([t, n]) => (
              <FilterChip key={t} label={t} count={n} active={tech === t} onClick={() => setTech(tech === t ? null : t)} />
            ))}
            {/* A skill picked from the Skills section may be rarer than the chips, so it gets a chip of its own */}
            {tech && !FILTERS.some(([t]) => t === tech) && (
              <FilterChip label={tech} count={count} active onClick={() => setTech(null)} />
            )}
          </div>
          <p className="mb-10 min-h-5 text-sm text-fg-muted" aria-live="polite">
            {tech && (
              <>
                Showing {count} of {profile.projects.length} projects that use <span className="text-fg">{tech}</span>
                {' · '}
                <button type="button" onClick={() => setTech(null)} className="text-accent underline-offset-4 hover:underline">
                  show all
                </button>
              </>
            )}
          </p>
        </Reveal>
      )}

      {featured.length > 0 && (
        <>
          <GroupHeading title="Featured" count={featured.length} />
          <div className="space-y-8">
            {featured.map((p, i) => (
              <Reveal key={p.slug}>
                <FeaturedCard project={p} flip={i % 2 === 1} tech={tech} />
              </Reveal>
            ))}
          </div>
        </>
      )}

      {groups.map((g, gi) => (
        <div key={g.title} className={featured.length > 0 || gi > 0 ? 'mt-16' : ''}>
          <GroupHeading title={g.title} count={g.projects.length} />
          <div className={`grid gap-6 ${gridCols(g.projects.length)}`}>
            {g.projects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08} className="h-full">
                <SmallCard project={p} tech={tech} />
              </Reveal>
            ))}
          </div>
        </div>
      ))}

      <ProjectModal />
    </Section>
  )
}

/** Small mono label + rule above each group of cards, in the same style as the section eyebrows. */
function GroupHeading({ title, count }: { title: string; count: number }) {
  return (
    <h3 className="mb-6 flex items-center gap-3 font-mono text-xs tracking-widest text-fg-faint uppercase">
      <span className="text-accent-ink">{title}</span>
      <span>{String(count).padStart(2, '0')}</span>
      <span className="h-px flex-1 bg-ink-700" aria-hidden />
    </h3>
  )
}

function FilterChip({ label, count, active, onClick }: { label: string; count: number; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-md border px-2.5 py-1.5 transition-colors ${
        active ? 'border-accent/60 bg-accent-tint text-accent-ink' : 'border-ink-700 text-fg-muted hover:border-ink-600 hover:text-fg'
      }`}
    >
      {label} <span className={active ? 'text-accent/70' : 'text-fg-faint'}>{count}</span>
    </button>
  )
}

/** Makes the whole card open the case study; real links inside sit above it (z-20). */
function OpenDetails({ project }: { project: Project }) {
  return (
    <button
      type="button"
      onClick={() => openProject(project.slug)}
      aria-label={`Open ${project.name} case study`}
      className="absolute inset-0 z-[5] cursor-pointer rounded-[inherit]"
    />
  )
}

function DetailsHint() {
  return (
    <span className="inline-flex items-center gap-2.5 text-sm font-medium text-fg-muted transition group-hover:text-fg">
      Case study
      {/* Orange arrow disc, as on the template's cards; turns to point right on hover */}
      <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-ink-950 transition duration-300 group-hover:rotate-45">
        <ArrowUpRight size={16} />
      </span>
    </span>
  )
}

function FeaturedCard({ project, flip, tech }: { project: Project; flip: boolean; tech: string | null }) {
  return (
    <article
      id={projectAnchor(project.slug)}
      onPointerMove={spotlight}
      onPointerLeave={release}
      className={`group relative grid overflow-hidden rounded-3xl surface hover:border-ink-600 lg:grid-cols-2 ${spotlightCls}`}
    >
      <OpenDetails project={project} />
      <div className={`relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[400px] ${flip ? 'lg:order-2' : ''}`}>
        <ProjectCover project={project} className="transition duration-700 group-hover:scale-[1.03]" />
      </div>

      <div className="flex flex-col p-7 sm:p-9">
        <div>
          <Status status={project.status} />
        </div>
        <h4 className="mt-4 font-display text-display-md font-bold">{project.name}</h4>
        <p className="mt-1 text-accent">{project.tagline}</p>
        <p className="mt-4 leading-relaxed text-fg-muted">{project.description}</p>

        <ul className="mt-5 space-y-2.5">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-3 text-[15px] text-fg">
              <span className="mt-2.5 h-1 w-3 shrink-0 rounded-full bg-accent" />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <Tag key={s} active={s === tech}>
              {s}
            </Tag>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-7">
          <ProjectLinks project={project} />
          <DetailsHint />
        </div>
      </div>
    </article>
  )
}

function SmallCard({ project, tech }: { project: Project; tech: string | null }) {
  return (
    <article
      id={projectAnchor(project.slug)}
      onPointerMove={spotlight}
      onPointerLeave={release}
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl surface hover:-translate-y-1 hover:border-ink-600 ${spotlightCls}`}
    >
      <OpenDetails project={project} />
      <div className="relative aspect-[16/9] overflow-hidden border-b border-ink-700">
        <ProjectCover project={project} peek className="transition duration-700 group-hover:scale-[1.04]" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <Status status={project.status} />
        <h4 className="mt-3 font-display text-display-sm font-bold">{project.name}</h4>
        <p className="mt-1 text-sm text-accent">{project.tagline}</p>
        <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-fg-muted">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <Tag key={s} active={s === tech}>
              {s}
            </Tag>
          ))}
        </div>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-5">
          <ProjectLinks project={project} />
          <DetailsHint />
        </div>
      </div>
    </article>
  )
}
