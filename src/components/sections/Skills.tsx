import { profile } from '../../data/profile'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

export function Skills() {
  return (
    <Section
      id="skills"
      index="05"
      eyebrow="Skills"
      title={
        <>
          Technical skills, <span className="text-fg-muted">grouped by area.</span>
        </>
      }
      intro="The languages, frameworks and tools I use across my projects and coursework."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {profile.skills.map((g, i) => (
          <Reveal key={g.name} delay={i * 0.05} className="h-full">
            <div className="h-full rounded-2xl border border-ink-700 bg-ink-900/60 p-6 transition hover:border-accent/40">
              <p className="font-mono text-xs tracking-widest text-accent uppercase">{g.name}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-ink-700 bg-ink-850 px-3 py-1.5 text-sm text-fg transition hover:border-accent/50 hover:text-accent"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
