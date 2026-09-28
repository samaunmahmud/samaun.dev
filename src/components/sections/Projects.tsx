import { type MouseEvent } from 'react'
import { profile } from '../../data/profile'
import type { Project } from '../../data/types'
import { ArrowUpRight, GitHubIcon } from '../ui/Icons'
import { ProjectCover } from '../ui/ProjectCover'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { Tag } from '../ui/Tag'

const STATUS: Record<Project['status'], { label: string; cls: string }> = {
  live: { label: 'Live', cls: 'text-up border-up/30 bg-up/10' },
  'in-progress': { label: 'In progress', cls: 'text-amber border-amber/30 bg-amber/10' },
  hackathon: { label: 'Hackathon', cls: 'text-violet border-violet/30 bg-violet/10' },
  coursework: { label: 'Team project', cls: 'text-sky border-sky/30 bg-sky/10' },
}

/** Moves a soft light under the cursor. Pure CSS vars, no re-renders. */
function spotlight(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
}
const spotlightCls =
  'before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-[inherit] before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 before:bg-[radial-gradient(420px_circle_at_var(--x)_var(--y),rgb(45_212_191/0.08),transparent_60%)]'

export function Projects() {
  const featured = profile.projects.filter((p) => p.featured)
  const rest = profile.projects.filter((p) => !p.featured)

  return (
    <Section
      id="projects"
      index="02"
      eyebrow="Selected work"
      title={
        <>
          Things I&apos;ve built, <span className="text-fg-muted">broken, and fixed.</span>
        </>
      }
      intro="Each one taught me something a tutorial couldn't. The bullet points are the hard parts."
    >
      <div className="space-y-8">
        {featured.map((p, i) => (
          <Reveal key={p.slug}>
            <FeaturedCard project={p} flip={i % 2 === 1} />
          </Reveal>
        ))}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08} className="h-full">
            <SmallCard project={p} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function Status({ status }: { status: Project['status'] }) {
  const s = STATUS[status]
  return <span className={`w-fit rounded-full border px-2.5 py-0.5 font-mono text-[11px] ${s.cls}`}>{s.label}</span>
}

function Links({ project }: { project: Project }) {
  if (!project.repo && !project.demo) return null
  return (
    <div className="flex flex-wrap gap-2">
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noreferrer"
          className="relative z-20 inline-flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-ink-950 transition hover:bg-accent-strong"
        >
          Live demo <ArrowUpRight size={14} />
        </a>
      )}
      {project.repo && (
        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer"
          className="relative z-20 inline-flex items-center gap-1.5 rounded-lg border border-ink-600 px-3.5 py-2 text-sm font-medium text-fg transition hover:border-fg-faint"
        >
          <GitHubIcon size={15} /> Code
        </a>
      )}
    </div>
  )
}

function FeaturedCard({ project, flip }: { project: Project; flip: boolean }) {
  return (
    <article
      onMouseMove={spotlight}
      className={`group relative grid overflow-hidden rounded-3xl border border-ink-700 bg-ink-900/70 transition hover:border-ink-600 lg:grid-cols-2 ${spotlightCls}`}
    >
      <div className={`relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[400px] ${flip ? 'lg:order-2' : ''}`}>
        <ProjectCover project={project} className="transition duration-700 group-hover:scale-[1.03]" />
      </div>

      <div className="flex flex-col p-7 sm:p-9">
        <div className="flex items-center gap-3">
          <Status status={project.status} />
          <span className="font-mono text-xs text-fg-faint">Featured</span>
        </div>
        <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight">{project.name}</h3>
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
            <Tag key={s}>{s}</Tag>
          ))}
        </div>

        <div className="mt-auto pt-7">
          <Links project={project} />
        </div>
      </div>
    </article>
  )
}

function SmallCard({ project }: { project: Project }) {
  return (
    <article
      onMouseMove={spotlight}
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink-700 bg-ink-900/70 transition hover:-translate-y-1 hover:border-ink-600 ${spotlightCls}`}
    >
      <div className="relative aspect-[16/9] overflow-hidden border-b border-ink-700">
        <ProjectCover project={project} className="transition duration-700 group-hover:scale-[1.04]" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <Status status={project.status} />
        <h3 className="mt-3 font-display text-xl font-semibold">{project.name}</h3>
        <p className="mt-1 text-sm text-accent">{project.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-fg-muted">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
        <div className="mt-auto pt-5">
          <Links project={project} />
        </div>
      </div>
    </article>
  )
}
