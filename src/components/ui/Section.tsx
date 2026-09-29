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
        <p className="mb-5 flex items-center gap-3 font-mono text-xs tracking-widest text-accent uppercase">
          <span className="rounded-full border border-accent/30 bg-accent-soft px-2.5 py-1 leading-none tabular-nums">{index}</span>
          <span className="h-px w-10 bg-gradient-to-r from-accent/60 to-transparent" />
          {eyebrow}
        </p>
        <h2 className="max-w-4xl font-display text-[2rem] leading-[1.1] font-semibold tracking-tight text-pretty text-fg sm:text-5xl md:text-[3.25rem]">
          {title}
        </h2>
        {intro && <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">{intro}</p>}
      </Reveal>
      <div className="mt-14">{children}</div>
    </section>
  )
}
