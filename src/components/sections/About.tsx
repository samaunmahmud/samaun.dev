import { profile } from '../../data/profile'
import { CountUp } from '../ui/CountUp'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

export function About() {
  return (
    <Section
      id="about"
      index="01"
      eyebrow="About"
      title={
        <>
          Backend-focused, <span className="whitespace-nowrap text-accent">full-stack</span> in practice.
        </>
      }
    >
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="max-w-[62ch] space-y-5 text-base leading-[1.75] text-fg-muted sm:text-lg">
          {profile.about.map((p, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>

        <div className="space-y-5">
          <Reveal delay={0.1}>
            <div className="grid grid-cols-3 gap-3">
              {profile.stats.map((s) => (
                <div key={s.label} className="rounded-2xl surface p-4 hover:-translate-y-0.5 hover:border-accent/40">
                  <p className="text-gradient font-display text-4xl font-bold tabular-nums">
                    <CountUp value={s.value} />
                  </p>
                  <p className="mt-1 text-xs leading-snug text-fg-faint">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="relative overflow-hidden rounded-2xl surface p-6">
              <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-accent/15 blur-3xl" aria-hidden />
              <p className="flex items-center gap-2 font-mono text-xs tracking-widest text-accent uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>{' '}
                Right now
              </p>
              <dl className="mt-5 space-y-4">
                {profile.now.map((n) => (
                  <div key={n.label}>
                    <dt className="font-mono text-[11px] tracking-wide text-fg-faint uppercase">{n.label}</dt>
                    <dd className="mt-1 text-[15px] text-fg">{n.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 border-t border-ink-700 pt-4 text-sm text-fg-faint">Based in {profile.location}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
