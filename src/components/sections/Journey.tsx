import { motion, useScroll, useSpring } from 'motion/react'
import { useRef } from 'react'
import { profile } from '../../data/profile'
import type { TimelineItem } from '../../data/types'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

const KIND: Record<TimelineItem['kind'], { label: string; dot: string; pill: string }> = {
  education: { label: 'Education', dot: 'bg-sky', pill: 'text-sky border-sky/30 bg-sky/10' },
  role: { label: 'Role', dot: 'bg-accent', pill: 'text-accent border-accent/30 bg-accent-soft' },
  hackathon: { label: 'Hackathon', dot: 'bg-violet', pill: 'text-violet border-violet/30 bg-violet/10' },
}

export function Journey() {
  const ref = useRef<HTMLOListElement>(null)
  // The accent line draws down the timeline as it scrolls through the viewport
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <Section
      id="journey"
      index="05"
      band
      split
      eyebrow="Journey"
      title={
        <>
          Education, roles <span className="text-fg-muted">and hackathons.</span>
        </>
      }
    >
      <ol ref={ref} className="relative ml-2 border-l border-ink-700 sm:ml-4">
        <motion.span
          className="absolute top-0 bottom-0 -left-px w-px origin-top bg-accent"
          style={{ scaleY: progress }}
          aria-hidden
        />
        {profile.timeline.map((item, i) => {
          const kind = KIND[item.kind]
          return (
            <li key={item.title} className="relative pb-12 pl-8 last:pb-0 sm:pl-12">
              <span className="absolute top-1.5 -left-[7px] flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-ink-950 bg-ink-950">
                <span className={`h-2.5 w-2.5 rounded-full ${kind.dot} shadow-[0_0_0_4px] shadow-ink-950`} />
              </span>
              <Reveal delay={i * 0.05}>
                <div className="grid gap-2 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-6">
                  <div>
                    <p className="font-mono text-sm text-fg-muted">{item.period}</p>
                    <p className={`mt-2 w-fit rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-wider uppercase ${kind.pill}`}>{kind.label}</p>
                  </div>
                  <div className="rounded-2xl surface p-6 hover:-translate-y-0.5 hover:border-ink-600">
                    <h3 className="font-display text-lg font-semibold text-fg">{item.title}</h3>
                    <p className="mt-0.5 text-accent">{item.org}</p>
                    <ul className="mt-3 space-y-1.5 text-[15px] text-fg-muted">
                      {item.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
