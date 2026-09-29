import { profile } from '../../data/profile'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

const DOTS = ['bg-accent', 'bg-sky', 'bg-violet', 'bg-up', 'bg-amber', 'bg-rose']

/** 6-col grid on desktop: rows of three, but a short last row stretches so there's no empty slot. */
function span(i: number, n: number) {
  const tail = n % 3
  if (tail === 2 && i >= n - 2) return 'lg:col-span-3'
  if (tail === 1 && i === n - 1) return 'lg:col-span-6'
  return 'lg:col-span-2'
}

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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {profile.skills.map((g, i) => (
          <Reveal key={g.name} delay={i * 0.05} className={`h-full ${span(i, profile.skills.length)}`}>
            <div className="group relative h-full overflow-hidden rounded-2xl surface p-6 hover:-translate-y-0.5 hover:border-accent/40">
              <span className={`absolute inset-x-0 top-0 h-0.5 ${DOTS[i % DOTS.length]} opacity-70`} aria-hidden />
              <p className="flex items-center gap-2.5 font-mono text-xs tracking-widest text-fg-muted uppercase">
                <span className={`h-2 w-2 rounded-full ${DOTS[i % DOTS.length]}`} />
                {g.name}
                <span className="ml-auto text-fg-faint">{String(g.items.length).padStart(2, '0')}</span>
              </p>
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
