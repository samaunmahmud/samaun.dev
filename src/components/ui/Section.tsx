import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionProps {
  id: string
  index: string
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  /** Full-width tinted background, to break the page into visible chapters. */
  band?: boolean
  /** Desktop: heading sticks in a left column, content sits on the right. */
  split?: boolean
  /** Extra content under the heading (split layout only), e.g. a CTA. */
  aside?: ReactNode
  children: ReactNode
}

/** Shared wrapper so every section has the same rhythm: number · eyebrow · title. */
export function Section({ id, index, eyebrow, title, intro, band = false, split = false, aside, children }: SectionProps) {
  const heading = (
    <Reveal>
      <p className="mb-5 flex items-center gap-3 font-mono text-xs tracking-widest text-accent uppercase">
        <span className="rounded-full border border-accent/30 bg-accent-soft px-2.5 py-1 leading-none tabular-nums">{index}</span>
        <span className="h-px w-10 bg-gradient-to-r from-accent/60 to-transparent" />
        {eyebrow}
      </p>
      <h2
        className={`font-display leading-[1.1] font-semibold tracking-tight text-pretty text-fg ${
          split ? 'text-[2rem] sm:text-5xl lg:text-[2.6rem]' : 'max-w-4xl text-[2rem] sm:text-5xl md:text-[3.25rem]'
        }`}
      >
        {title}
      </h2>
      {intro && <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">{intro}</p>}
      {aside && <div className="mt-8">{aside}</div>}
    </Reveal>
  )

  const body = split ? (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.9fr)] lg:gap-16">
      <div className="lg:sticky lg:top-28 lg:self-start">{heading}</div>
      <div>{children}</div>
    </div>
  ) : (
    <>
      {heading}
      <div className="mt-14">{children}</div>
    </>
  )

  const inner = <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">{body}</div>

  return band ? (
    <section id={id} className="relative border-y border-ink-800 bg-ink-900/55">
      <div className="bg-grid mask-fade-b pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      {inner}
    </section>
  ) : (
    <section id={id} className="relative">
      {inner}
    </section>
  )
}
