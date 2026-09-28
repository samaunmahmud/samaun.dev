import { profile } from '../../data/profile'
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
          Backend at heart, <span className="text-fg-muted">full-stack by necessity.</span>
        </>
      }
    >
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-lg leading-relaxed text-fg-muted">
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
                <div key={s.label} className="rounded-2xl border border-ink-700 bg-ink-900 p-4">
                  <p className="font-display text-3xl font-semibold text-fg">{s.value}</p>
                  <p className="mt-1 text-xs leading-snug text-fg-faint">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="rounded-2xl border border-ink-700 bg-ink-900 p-6">
              <p className="flex items-center gap-2 font-mono text-xs tracking-widest text-accent uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Right now
              </p>
              <dl className="mt-5 space-y-4">
                {profile.now.map((n) => (
                  <div key={n.label}>
                    <dt className="font-mono text-[11px] tracking-wide text-fg-faint uppercase">{n.label}</dt>
                    <dd className="mt-1 text-[15px] text-fg">{n.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 border-t border-ink-700 pt-4 text-sm text-fg-faint">📍 {profile.location}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
