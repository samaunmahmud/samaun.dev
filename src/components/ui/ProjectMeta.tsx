import type { Project } from '../../data/types'
import { ArrowUpRight, GitHubIcon } from './Icons'

const STATUS: Record<Project['status'], { label: string; cls: string }> = {
  live: { label: 'Live', cls: 'text-up border-up/30 bg-up/10' },
  complete: { label: 'Complete', cls: 'text-accent border-accent/30 bg-accent-soft' },
  'in-progress': { label: 'In progress', cls: 'text-amber border-amber/30 bg-amber/10' },
  hackathon: { label: 'Hackathon', cls: 'text-violet border-violet/30 bg-violet/10' },
  coursework: { label: 'Team project', cls: 'text-sky border-sky/30 bg-sky/10' },
}

export function Status({ status }: { status: Project['status'] }) {
  const s = STATUS[status]
  return <span className={`w-fit rounded-full border px-2.5 py-0.5 font-mono text-[11px] ${s.cls}`}>{s.label}</span>
}

/** Live demo + code buttons. z-20 keeps them clickable above a card's stretched "open details" button. */
export function ProjectLinks({ project }: { project: Project }) {
  if (!project.repo && !project.demo) return null
  return (
    <div className="flex flex-wrap gap-2">
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noreferrer"
          className="relative z-20 inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-medium text-ink-950 transition hover:bg-accent-strong"
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
