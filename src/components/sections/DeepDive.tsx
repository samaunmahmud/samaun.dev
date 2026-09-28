import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { profile } from '../../data/profile'
import type { FlowNode } from '../../data/types'
import { projectAnchor } from '../../lib/actions'
import { ArrowUpRight, GitHubIcon } from '../ui/Icons'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

const CYCLE_MS = 4500

const project = profile.projects.find((p) => p.flow?.length)

/** Interactive architecture walkthrough for the first project that has a `flow`. */
export function DeepDive() {
  if (!project?.flow) return null
  const flow = project.flow

  return (
    <Section
      id="deep-dive"
      index="03"
      eyebrow="Deep dive"
      title={
        <>
          Under the hood of <span className="text-gradient">{project.name}.</span>
        </>
      }
      intro={project.description}
    >
      <Reveal>
        <Walkthrough flow={flow} />
      </Reveal>
      <Reveal delay={0.1}>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={`#${projectAnchor(project.slug)}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-ink-600 px-3.5 py-2 text-sm font-medium text-fg transition hover:border-fg-faint"
          >
            Back to the project card
          </a>
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-ink-950 transition hover:bg-accent-strong"
            >
              <GitHubIcon size={15} /> Read the code <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </Reveal>
    </Section>
  )
}

function Walkthrough({ flow }: { flow: FlowNode[] }) {
  const main = useMemo(() => flow.filter((n) => !n.branchOf), [flow])
  // Visit order: each main node, then anything branching off it
  const order = useMemo(() => main.flatMap((n) => [n, ...flow.filter((b) => b.branchOf === n.id)]), [main, flow])

  const [active, setActive] = useState(order[0].id)
  const [auto, setAuto] = useState(true)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.4 })
  const reduce = useReducedMotion()
  const cycling = auto && inView && !reduce

  // Auto-advance like a product tour until the visitor picks a node themselves
  useEffect(() => {
    if (!cycling) return
    const t = window.setTimeout(() => {
      const i = order.findIndex((n) => n.id === active)
      setActive(order[(i + 1) % order.length].id)
    }, CYCLE_MS)
    return () => window.clearTimeout(t)
  }, [active, cycling, order])

  const pick = (id: string) => {
    setAuto(false)
    setActive(id)
  }
  const current = order.find((n) => n.id === active) ?? order[0]
  const step = order.indexOf(current) + 1

  return (
    <div ref={ref} className="overflow-hidden rounded-3xl border border-ink-700 bg-ink-900/70">
      {/* Diagram */}
      <div className="relative border-b border-ink-700 p-6 sm:p-10">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden />

        {/* Desktop: main row left→right, branches hang underneath their parent */}
        <div
          className="relative hidden gap-x-12 gap-y-14 lg:grid"
          style={{ gridTemplateColumns: `repeat(${main.length}, minmax(0, 1fr))` }}
          role="group"
          aria-label="Architecture diagram"
        >
          {main.map((n, i) => (
            <div key={n.id} className="relative">
              <Node node={n} active={active === n.id} onPick={pick} />
              {i < main.length - 1 && <Connector direction="x" />}
            </div>
          ))}
          {main.map((n) => {
            const branch = flow.find((b) => b.branchOf === n.id)
            return (
              <div key={`${n.id}-branch`} className="relative">
                {branch && (
                  <>
                    <Connector direction="y" />
                    <Node node={branch} active={active === branch.id} onPick={pick} />
                  </>
                )}
              </div>
            )
          })}
        </div>

        {/* Mobile / tablet: one column in visit order */}
        <ol className="relative space-y-8 lg:hidden" aria-label="Architecture diagram">
          {order.map((n, i) => (
            <li key={n.id} className={`relative ${n.branchOf ? 'ml-8' : ''}`}>
              {i > 0 && <Connector direction="y" />}
              <Node node={n} active={active === n.id} onPick={pick} />
            </li>
          ))}
        </ol>
      </div>

      {/* Detail panel */}
      <div className="grid gap-6 p-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:p-10" aria-live="polite">
        <p className="font-mono text-sm text-fg-faint">
          <span className="text-accent">{String(step).padStart(2, '0')}</span> / {String(order.length).padStart(2, '0')}
        </p>
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <p className="font-mono text-xs tracking-widest text-accent uppercase">{current.tech}</p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-fg">{current.label}</h3>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-fg-muted">{current.detail}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Tour progress: fills while auto-advancing */}
      <div className="h-0.5 bg-ink-800" aria-hidden>
        {cycling && (
          <motion.div
            key={current.id}
            className="h-full origin-left bg-accent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: CYCLE_MS / 1000, ease: 'linear' }}
          />
        )}
      </div>
    </div>
  )
}

function Node({ node, active, onPick }: { node: FlowNode; active: boolean; onPick: (id: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onPick(node.id)}
      aria-pressed={active}
      className={`relative z-10 w-full rounded-2xl border p-4 text-left transition duration-300 ${
        active
          ? 'border-accent bg-ink-900 shadow-[0_0_0_4px] shadow-accent-soft'
          : 'border-ink-700 bg-ink-900/90 hover:border-ink-600'
      }`}
    >
      <span className={`block font-mono text-[11px] ${active ? 'text-accent' : 'text-fg-faint'}`}>{node.tech}</span>
      <span className="mt-1 block font-display text-lg font-semibold text-fg">{node.label}</span>
    </button>
  )
}

/** Line between two nodes with a data packet travelling along it. */
function Connector({ direction }: { direction: 'x' | 'y' }) {
  if (direction === 'x') {
    return (
      <span className="absolute top-1/2 left-full h-px w-12 bg-ink-600" aria-hidden>
        <span className="absolute top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 animate-packet rounded-full bg-accent shadow-[0_0_8px] shadow-accent" />
      </span>
    )
  }
  return (
    <span className="absolute bottom-full left-8 h-8 w-px bg-ink-600 lg:left-1/2 lg:h-14" aria-hidden>
      <span className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 animate-packet-y rounded-full bg-accent shadow-[0_0_8px] shadow-accent" />
    </span>
  )
}
