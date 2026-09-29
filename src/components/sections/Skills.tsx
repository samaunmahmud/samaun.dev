import { profile } from '../../data/profile'
import { filterStack } from '../../lib/actions'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

/** How many projects use each tech, so skills that appear in projects can filter them. */
const USED = profile.projects
  .flatMap((p) => p.stack)
  .reduce<Record<string, number>>((acc, t) => ({ ...acc, [t]: (acc[t] ?? 0) + 1 }), {})

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
      index="04"
      eyebrow="Skills"
      title={
        <>
          Technical skills, <span className="text-fg-muted">grouped by area.</span>
        </>
      }
      intro="The languages, frameworks and tools I use across my projects and coursework. Click one with a number to see the projects that use it."
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
                {g.items.map((item) => {
                  const n = USED[item]
                  if (!n)
                    return (
                      <li key={item} className="rounded-lg border border-ink-700 bg-ink-850 px-3 py-1.5 text-sm text-fg">
                        {item}
                      </li>
                    )
                  return (
                    <li key={item}>
                      <button
                        type="button"
                        onClick={() => filterStack(item)}
                        title={`Show the ${n} project${n > 1 ? 's' : ''} that use ${item}`}
                        className="group/chip inline-flex items-center gap-2 rounded-lg border border-ink-700 bg-ink-850 px-3 py-1.5 text-sm text-fg transition hover:-translate-y-0.5 hover:border-accent/50 hover:bg-accent-soft hover:text-accent"
                      >
                        {item}
                        <span className="rounded bg-ink-700 px-1 font-mono text-[10px] text-fg-muted transition group-hover/chip:bg-accent group-hover/chip:text-ink-950">
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
