import { motion, useReducedMotion } from 'motion/react'
import { profile } from '../../data/profile'
import { ArrowUpRight, DownloadIcon } from '../ui/Icons'
import { socialIcon } from '../ui/socialIcons'

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export function Hero() {
  const reduce = useReducedMotion()
  const socials = profile.socials.filter((s) => s.key !== 'email')

  return (
    <section id="top" className="relative flex min-h-svh flex-col overflow-hidden pt-28 sm:pt-32">
      {/* Background: grid + glow + a price-line that draws itself (a nod to Meridian) */}
      <div className="bg-grid mask-fade-b pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute top-[-10%] left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
        aria-hidden
      />
      <PriceLine animate={!reduce} />

      <div className="relative mx-auto my-auto grid w-full max-w-6xl items-center grid-cols-[minmax(0,1fr)] gap-14 px-5 sm:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <div>
          <motion.p
            {...fade(0)}
            className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-ink-700 bg-ink-900/80 px-3.5 py-1.5 text-xs text-fg-muted backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-up opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-up" />
            </span>
            {profile.availability}
          </motion.p>

          <motion.p {...fade(0.06)} className="mt-8 font-mono text-sm text-accent">
            Hi, I&apos;m {profile.name} 👋
          </motion.p>
          <motion.h1
            {...fade(0.1)}
            className="mt-3 font-display text-5xl leading-[1.04] font-bold tracking-tight sm:text-6xl lg:text-[4.25rem]"
          >
            I build systems <br className="hidden sm:block" />
            that <span className="text-gradient">move fast.</span>
          </motion.h1>

          <motion.p {...fade(0.16)} className="mt-7 max-w-xl text-lg leading-relaxed text-fg-muted">
            {profile.tagline}
          </motion.p>

          <motion.div {...fade(0.24)} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-medium text-ink-950 shadow-[0_0_40px_-8px] shadow-accent/60 transition hover:bg-accent-strong"
            >
              See my work
              <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={profile.cvUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-ink-600 bg-ink-900/60 px-5 py-3 font-medium text-fg backdrop-blur transition hover:border-fg-faint"
            >
              <DownloadIcon size={16} />
              Résumé
            </a>
            <div className="ml-1 flex items-center gap-1">
              {socials.map((s) => {
                const Icon = socialIcon[s.key]
                return (
                  <a
                    key={s.key}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid h-11 w-11 place-items-center rounded-xl text-fg-muted transition hover:bg-ink-800 hover:text-accent"
                  >
                    <Icon size={20} />
                  </a>
                )
              })}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, rotate: reduce ? 0 : 1.5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <CodeCard />
        </motion.div>
      </div>

      <Ticker />
    </section>
  )
}

/* ── Code card ─────────────────────────────────────────────── */

const k = 'text-violet' // keyword
const t = 'text-sky' // type
const s = 'text-amber' // string
const c = 'text-fg-faint italic' // comment

function CodeCard() {
  return (
    <div className="relative">
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-accent/40 via-ink-700 to-transparent" aria-hidden />
      <div className="relative overflow-hidden rounded-2xl bg-ink-900/95 shadow-2xl shadow-black/50 backdrop-blur">
        <div className="flex items-center gap-2 border-b border-ink-700 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-rose/80" />
          <span className="h-3 w-3 rounded-full bg-amber/80" />
          <span className="h-3 w-3 rounded-full bg-up/80" />
          <span className="ml-3 font-mono text-xs text-fg-faint">Developer.java</span>
        </div>
        <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-6 text-fg sm:text-[13px]">
          <code>
            <span className={k}>public record</span> <span className={t}>Developer</span>(
            {'\n'}    <span className={t}>String</span> name,
            {'\n'}    <span className={t}>String</span> base,
            {'\n'}    <span className={t}>List</span>&lt;<span className={t}>String</span>&gt; stack
            {'\n'}) {'{}'}
            {'\n'}
            {'\n'}<span className={k}>var</span> me = <span className={k}>new</span> <span className={t}>Developer</span>(
            {'\n'}    <span className={s}>"{profile.name}"</span>,
            {'\n'}    <span className={s}>"Brunel · {profile.location.split(',')[0]}"</span>,
            {'\n'}    <span className={t}>List</span>.of(<span className={s}>"Java"</span>, <span className={s}>"Spring"</span>, <span className={s}>"React"</span>)
            {'\n'});
            {'\n'}
            {'\n'}me.lookingFor(); <span className={c}>// → "Placement, summer 2027"</span>
            <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-accent" />
          </code>
        </pre>
      </div>
    </div>
  )
}

/* ── Price line ────────────────────────────────────────────── */

function PriceLine({ animate }: { animate: boolean }) {
  const d =
    'M0 220 L60 205 L110 214 L170 180 L220 190 L280 150 L330 162 L390 120 L440 135 L500 98 L560 110 L620 70 L680 84 L740 52 L800 64 L860 30 L920 42 L1000 12'
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 bottom-24 h-[240px] w-full opacity-40"
      viewBox="0 0 1000 240"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="pl-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#2dd4bf" stopOpacity="0.18" />
          <stop offset="1" stopColor="#2dd4bf" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={`${d} L1000 240 L0 240 Z`}
        fill="url(#pl-fill)"
        initial={{ opacity: animate ? 0 : 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.4 }}
      />
      <motion.path
        d={d}
        fill="none"
        stroke="#2dd4bf"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: animate ? 0 : 1 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, delay: 0.3, ease: 'easeInOut' }}
      />
    </svg>
  )
}

/* ── Ticker ────────────────────────────────────────────────── */

function Ticker() {
  const items = [...profile.ticker, ...profile.ticker]
  return (
    <div className="mask-fade-x relative mt-16 overflow-hidden border-y border-ink-800 bg-ink-900/40 py-4 backdrop-blur-sm">
      <div className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused]">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-2 font-mono text-sm whitespace-nowrap text-fg-muted">
            <span className="text-[10px] text-up">▲</span>
            {item.toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  )
}
