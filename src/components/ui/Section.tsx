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
  /** Centre the heading block (not with `split`). */
  center?: boolean
  /** Content sits in a dark rounded panel (dark in both themes), like the template's "My Services" block. */
  panel?: boolean
  children: ReactNode
}

/** Shared wrapper so every section has the same rhythm: number · eyebrow · title. */
export function Section({ id, index, eyebrow, title, intro, band = false, split = false, aside, center = false, panel = false, children }: SectionProps) {
  const heading = (
    <Reveal className={center ? 'text-center' : ''}>
      <p className={`mb-5 flex items-center gap-3 ${center ? 'justify-center' : ''} font-mono text-xs tracking-widest text-accent uppercase`}>
        <span className="rounded-full border border-accent/30 bg-accent-soft px-2.5 py-1 leading-none tabular-nums">{index}</span>
        <span className="h-px w-10 bg-gradient-to-r from-accent/60 to-transparent" />
        {eyebrow}
      </p>
      <h2
        className={`font-display text-display-lg font-bold text-balance text-fg ${split ? '' : `max-w-3xl ${center ? 'mx-auto' : ''}`}`}
      >
        {title}
      </h2>
      {intro && <p className={`mt-5 max-w-2xl text-base ${center ? 'mx-auto' : ''} leading-relaxed text-fg-muted sm:text-lg`}>{intro}</p>}
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

  const inner = panel ? (
    <div className="relative mx-auto max-w-6xl px-3 py-10 sm:px-6 md:py-16">
      <div
        data-theme="dark"
        className="relative overflow-hidden rounded-[2rem] border border-ink-700 bg-ink-950 px-5 py-14 text-fg sm:rounded-[2.5rem] sm:px-10 md:py-20"
      >
        {/* Orange glows in the corners of the dark panel */}
        <div className="pointer-events-none absolute -top-32 -left-24 h-80 w-80 rounded-full bg-accent/25 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -right-24 -bottom-32 h-80 w-80 rounded-full bg-accent/20 blur-3xl" aria-hidden />
        <div className="relative">{body}</div>
      </div>
    </div>
  ) : (
    <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">{body}</div>
  )

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
