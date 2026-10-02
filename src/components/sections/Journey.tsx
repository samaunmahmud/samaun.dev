import { profile } from '../../data/profile'
import type { TimelineItem } from '../../data/types'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

const KIND: Record<TimelineItem['kind'], { label: string; dot: string }> = {
  education: { label: 'Education', dot: 'border-fg bg-fg' },
  role: { label: 'Role', dot: 'border-accent bg-accent' },
  hackathon: { label: 'Hackathon', dot: 'border-accent bg-accent' },
}

/**
 * Centred timeline (the template's "My Work Experience"): org + period on the left,
 * role + details on the right, joined by a dashed spine. Mobile: one column, spine on the left.
 */
export function Journey() {
  return (
    <Section
      id="journey"
      index="05"
      center
      eyebrow="Journey"
      title={
        <>
          Education, roles and <span className="text-accent">hackathons</span>.
        </>
      }
    >
      <ol className="relative mx-auto max-w-4xl">
        <span
          className="absolute top-2 bottom-2 left-[11px] border-l-2 border-dashed border-ink-600 md:left-1/2 md:-translate-x-px"
          aria-hidden
        />
        {profile.timeline.map((item, i) => {
          const kind = KIND[item.kind]
          return (
            <li
              key={item.title}
              className="relative grid grid-cols-[24px_minmax(0,1fr)] gap-x-5 pb-12 last:pb-0 md:grid-cols-[minmax(0,1fr)_24px_minmax(0,1fr)] md:gap-x-10"
            >
              <Reveal delay={i * 0.05} className="col-start-2 md:col-start-1 md:text-right">
                <p className="font-display text-display-sm font-bold text-fg">{item.org}</p>
                <p className="mt-1 text-sm text-fg-muted">{item.period}</p>
                <p className="mt-2 inline-block rounded-full border border-ink-700 px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-fg-muted uppercase">
                  {kind.label}
                </p>
              </Reveal>

              {/* Dot on the spine: a ringed circle, like the template */}
              <span className="row-start-1 col-start-1 mt-1.5 grid h-6 w-6 place-items-center rounded-full border-2 border-dashed border-accent bg-ink-950 md:col-start-2">
                <span className={`h-2.5 w-2.5 rounded-full border ${kind.dot}`} />
              </span>

              <Reveal delay={i * 0.05 + 0.05} className="col-start-2 mt-3 md:col-start-3 md:row-start-1 md:mt-0">
                <h3 className="font-display text-display-sm font-bold text-fg">{item.title}</h3>
                <ul className="mt-2 space-y-1.5 text-[15px] leading-relaxed text-fg-muted">
                  {item.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </Reveal>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
