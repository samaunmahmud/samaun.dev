import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionProps {
  id: string
  index: string
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  children: ReactNode
}

/** Shared wrapper so every section has the same rhythm: number · eyebrow · title. */
export function Section({ id, index, eyebrow, title, intro, children }: SectionProps) {
  return (
    <section id={id} className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
      <Reveal>
        <p className="mb-4 flex items-center gap-3 font-mono text-xs tracking-widest text-accent uppercase">
          <span className="text-fg-faint">{index}</span>
          <span className="h-px w-8 bg-accent/50" />
          {eyebrow}
        </p>
        <h2 className="max-w-3xl font-display text-3xl leading-tight font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
          {title}
        </h2>
        {intro && <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">{intro}</p>}
      </Reveal>
      <div className="mt-14">{children}</div>
    </section>
  )
}
