import { profile } from '../../data/profile'
import { filterStack } from '../../lib/actions'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

/** How many projects use each tech, so skills that appear in projects can filter them. */
const USED = profile.projects
  .flatMap((p) => p.stack)
  .reduce<Record<string, number>>((acc, t) => ({ ...acc, [t]: (acc[t] ?? 0) + 1 }), {})

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
      index="04"
      eyebrow="Skills"
      panel
      center
      title={
        <>
          Technical skills, <span className="text-accent">grouped by area.</span>
        </>
      }
      intro="The languages, frameworks and tools I use across my projects and coursework. Click one with a number to see the projects that use it."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {profile.skills.map((g, i) => (
          <Reveal key={g.name} delay={i * 0.05} className={`h-full ${span(i, profile.skills.length)}`}>
            <div className="group relative h-full overflow-hidden rounded-3xl border border-ink-700 bg-ink-900/80 p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-accent/60">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-display text-xl font-semibold text-fg">{g.name}</h3>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent font-mono text-xs font-semibold text-ink-950 transition group-hover:rotate-12">
                  {String(g.items.length).padStart(2, '0')}
                </span>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {g.items.map((item) => {
                  const n = USED[item]
                  if (!n)
                    return (
                      <li key={item} className="rounded-full border border-ink-700 bg-ink-850 px-3.5 py-1.5 text-sm text-fg">
                        {item}
                      </li>
                    )
                  return (
                    <li key={item}>
                      <button
                        type="button"
                        onClick={() => filterStack(item)}
                        title={`Show the ${n} project${n > 1 ? 's' : ''} that use ${item}`}
                        className="group/chip inline-flex items-center gap-2 rounded-full border border-ink-700 bg-ink-850 px-3.5 py-1.5 text-sm text-fg transition hover:-translate-y-0.5 hover:border-accent/50 hover:bg-accent-soft hover:text-accent"
                      >
                        {item}
                        <span className="rounded-full bg-ink-700 px-1.5 font-mono text-[10px] text-fg-muted transition group-hover/chip:bg-accent group-hover/chip:text-ink-950">
                          {n}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
