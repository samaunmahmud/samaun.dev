import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, type KeyboardEvent } from 'react'
import { profile } from '../../data/profile'
import { useProjectParam } from '../../hooks/useProjectParam'
import { closeProject, goTo, openProject } from '../../lib/actions'
import { ArrowUpRight, CloseIcon } from './Icons'
import { ProjectCover } from './ProjectCover'
import { ProjectLinks, Status } from './ProjectMeta'
import { Tag } from './Tag'

const projects = profile.projects

/** Full-screen case-study view for one project. Open state lives in the URL (?project=slug). */
export function ProjectModal() {
  const slug = useProjectParam()
  const index = projects.findIndex((p) => p.slug === slug)
  const project = index >= 0 ? projects[index] : null
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!project) return
    returnFocus.current ??= document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus({ preventScroll: true })
    panelRef.current?.scrollTo({ top: 0 })
    return () => {
      document.body.style.overflow = ''
    }
  }, [project])

  // Hand focus back to whatever opened the view once it has closed
  useEffect(() => {
    if (project || !returnFocus.current) return
    returnFocus.current.focus({ preventScroll: true })
    returnFocus.current = null
  }, [project])

  const step = (dir: 1 | -1) => openProject(projects[(index + dir + projects.length) % projects.length].slug)

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.stopPropagation()
      closeProject()
    } else if (e.key === 'ArrowRight' && !(e.target instanceof HTMLInputElement)) step(1)
    else if (e.key === 'ArrowLeft' && !(e.target instanceof HTMLInputElement)) step(-1)
    else if (e.key === 'Tab') {
      // Keep keyboard focus inside the dialog
      const items = panelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      if (!items?.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-modal"
          className="fixed inset-0 z-[65] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onKeyDown={onKeyDown}
        >
          <div className="absolute inset-0 bg-ink-950/70 backdrop-blur-md" onClick={closeProject} aria-hidden />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="relative max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-ink-700 bg-ink-900 shadow-2xl shadow-black/40 sm:rounded-3xl"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-[16/8] overflow-hidden border-b border-ink-700">
              <ProjectCover project={project} />
              <button
                ref={closeRef}
                type="button"
                onClick={closeProject}
                aria-label="Close project details"
                className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full border border-ink-700 bg-ink-900/80 text-fg backdrop-blur transition hover:border-accent hover:text-accent"
              >
                <CloseIcon size={18} />
              </button>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={project.slug}
                className="p-7 sm:p-10"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
              >
                <Status status={project.status} />
                <h2 id="project-modal-title" className="mt-4 font-display text-display-md font-bold">
                  {project.name}
                </h2>
                <p className="mt-2 text-lg text-accent">{project.tagline}</p>
                <p className="mt-5 text-lg leading-relaxed text-fg-muted">{project.description}</p>

                <h3 className="mt-9 font-mono text-xs tracking-widest text-fg-faint uppercase">What I worked on</h3>
                <ul className="mt-4 space-y-3">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-fg">
                      <span className="mt-2.5 h-1 w-3 shrink-0 rounded-full bg-accent" />
                      {h}
                    </li>
                  ))}
                </ul>

                <h3 className="mt-9 font-mono text-xs tracking-widest text-fg-faint uppercase">Stack</h3>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.stack.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>

                <div className="mt-9 flex flex-wrap items-center gap-2">
                  <ProjectLinks project={project} />
                  {project.flow && (
                    <button
                      type="button"
                      onClick={() => {
                        closeProject()
                        window.setTimeout(() => goTo('deep-dive'), 50)
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-ink-600 px-3.5 py-2 text-sm font-medium text-fg transition hover:border-fg-faint"
                    >
                      See the architecture <ArrowUpRight size={14} />
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="sticky bottom-0 flex items-center justify-between border-t border-ink-700 bg-ink-900/95 px-7 py-4 font-mono text-xs text-fg-faint backdrop-blur sm:px-10">
              <button type="button" onClick={() => step(-1)} className="transition hover:text-accent">
                ← {projects[(index - 1 + projects.length) % projects.length].name}
              </button>
              <span className="hidden sm:inline">
                {index + 1} / {projects.length}
              </span>
              <button type="button" onClick={() => step(1)} className="transition hover:text-accent">
                {projects[(index + 1) % projects.length].name} →
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
