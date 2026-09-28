import { profile } from '../../data/profile'
import type { TimelineItem } from '../../data/types'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

const KIND: Record<TimelineItem['kind'], { label: string; dot: string }> = {
  education: { label: 'Education', dot: 'bg-sky' },
  role: { label: 'Role', dot: 'bg-accent' },
  hackathon: { label: 'Hackathon', dot: 'bg-violet' },
}

export function Journey() {
  return (
    <Section
      id="journey"
      index="03"
      eyebrow="Journey"
      title={
        <>
          Where I&apos;ve been <span className="text-fg-muted">spending my time.</span>
        </>
      }
    >
      <ol className="relative ml-2 border-l border-ink-700 sm:ml-4">
        {profile.timeline.map((item, i) => {
          const kind = KIND[item.kind]
          return (
            <li key={item.title} className="relative pb-12 pl-8 last:pb-0 sm:pl-12">
              <span className="absolute top-1.5 -left-[7px] flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-ink-950 bg-ink-950">
                <span className={`h-2.5 w-2.5 rounded-full ${kind.dot}`} />
              </span>
              <Reveal delay={i * 0.05}>
                <div className="grid gap-2 sm:grid-cols-[180px_1fr] sm:gap-8">
                  <div>
                    <p className="font-mono text-sm text-fg-muted">{item.period}</p>
                    <p className="mt-1 font-mono text-[11px] tracking-wider text-fg-faint uppercase">{kind.label}</p>
                  </div>
                  <div className="rounded-2xl border border-ink-700 bg-ink-900/60 p-6 transition hover:border-ink-600">
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
