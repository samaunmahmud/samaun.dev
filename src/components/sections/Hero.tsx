import { motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { profile } from '../../data/profile'
import { useClock } from '../../hooks/useClock'
import { timeAgo, useLastPush } from '../../hooks/useLastPush'
import { ArrowUpRight, DownloadIcon } from '../ui/Icons'
import { socialIcon } from '../ui/socialIcons'
import { Terminal } from '../ui/Terminal'

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
      {/* Background: grid + aurora wash + a price-line horizon that draws itself (a nod to Meridian) */}
      <div className="aurora" aria-hidden>
        <span className="top-[-18%] left-[-8%] h-[520px] w-[620px]" />
        <span className="top-[-10%] right-[-10%] h-[480px] w-[560px]" />
        <span className="top-[35%] left-[30%] h-[380px] w-[520px]" />
      </div>
      <div className="bg-grid mask-fade-b pointer-events-none absolute inset-0" aria-hidden />
      <PriceLine animate={!reduce} />

      <div className="relative mx-auto my-auto grid w-full max-w-6xl items-center grid-cols-[minmax(0,1fr)] gap-14 px-5 pb-16 sm:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <div>
          <motion.p
            {...fade(0)}
            className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-ink-700 bg-ink-900/80 px-3.5 py-1.5 text-xs text-fg-muted backdrop-blur"
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-up" />
            {profile.availability}
          </motion.p>

          <motion.p {...fade(0.06)} className="mt-8 font-mono text-sm tracking-wide text-accent">
            {profile.name}
          </motion.p>
          <motion.h1
            {...fade(0.1)}
            className="mt-3 font-display text-[2.6rem] leading-[1.04] font-bold tracking-tight sm:text-6xl lg:text-[3.75rem]"
          >
            {profile.headline.lead} <span className="text-gradient">{profile.headline.accent}</span>
          </motion.h1>

          <motion.p {...fade(0.16)} className="mt-7 max-w-xl text-lg leading-relaxed text-fg-muted">
            {profile.tagline}
          </motion.p>

          <motion.div {...fade(0.24)} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-medium text-ink-950 shadow-[0_0_40px_-8px] shadow-accent/60 transition hover:bg-accent-strong"
            >
              View projects
              <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            {profile.cvUrl ? (
              <a
                href={profile.cvUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-ink-600 bg-ink-900/60 px-5 py-3 font-medium text-fg backdrop-blur transition hover:border-fg-faint"
              >
                <DownloadIcon size={16} />
                Résumé
              </a>
            ) : (
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-ink-600 bg-ink-900/60 px-5 py-3 font-medium text-fg backdrop-blur transition hover:border-fg-faint"
              >
                Get in touch
              </a>
            )}
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

          <motion.div {...fade(0.32)}>
            <StatusLine />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Console />
        </motion.div>
      </div>

      <StackTicker />
    </section>
  )
}

/* ── Stack ticker: every skill from profile.ts, scrolling like a market tape ── */

const TICKER = profile.skills.flatMap((g) => g.items)

function StackTicker() {
  return (
    <div className="relative border-y border-ink-700/70 bg-ink-900/50 backdrop-blur-sm">
      <p className="sr-only">Tech stack: {TICKER.join(', ')}</p>
      <div className="mask-fade-x overflow-hidden py-3.5" aria-hidden>
        <div className="flex w-max animate-ticker hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center">
              {TICKER.map((item, i) => (
                <li key={item} className="flex items-center gap-3 px-5 font-mono text-xs tracking-wide text-fg-muted">
                  <span className={`text-[9px] ${i % 3 === 0 ? 'text-up' : i % 3 === 1 ? 'text-accent' : 'text-sky'}`}>▲</span>
                  {item}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Status line: local time + latest GitHub push ──────────── */

function StatusLine() {
  const time = useClock(profile.timezone)
  const github = profile.socials.find((s) => s.key === 'github')
  const push = useLastPush(github?.handle ?? '')
  const city = profile.location.split(',').at(-1)?.trim()

  return (
    <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-ink-800 pt-5 font-mono text-xs text-fg-faint">
      <span>
        <span className="text-fg-muted">{city}</span> · {time}
      </span>
      {push && (
        <a
          href={push.url}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex min-w-0 items-center gap-2 transition hover:text-fg-muted"
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-up" />
          last push {timeAgo(push.at)} →{' '}
          <span className="truncate text-accent group-hover:underline">{push.repo}</span>
        </a>
      )}
    </div>
  )
}

/* ── Console: live terminal + source tab ───────────────────── */

const TABS = [
  { id: 'terminal', label: 'zsh' },
  { id: 'code', label: 'Developer.java' },
] as const

function Console() {
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('terminal')

  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[2rem] bg-accent/15 blur-3xl" aria-hidden />
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-accent/60 via-ink-700 to-violet/40" aria-hidden />
      <div
        data-theme="dark"
        className="relative overflow-hidden rounded-2xl bg-ink-900 text-fg shadow-2xl shadow-black/40"
      >
        <div className="flex items-center gap-2 border-b border-ink-700 px-4">
          <span className="h-3 w-3 rounded-full bg-rose/80" />
          <span className="h-3 w-3 rounded-full bg-amber/80" />
          <span className="h-3 w-3 rounded-full bg-up/80" />
          <div role="tablist" aria-label="Console view" className="ml-3 flex">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={tab === t.id}
                aria-controls={`panel-${t.id}`}
                onClick={() => setTab(t.id)}
                className={`relative px-3 py-3 font-mono text-xs transition-colors ${
                  tab === t.id ? 'text-fg' : 'text-fg-faint hover:text-fg-muted'
                }`}
              >
                {t.label}
                {tab === t.id && <span className="absolute inset-x-2 -bottom-px h-px bg-accent" />}
              </button>
            ))}
          </div>
          <span className="ml-auto hidden items-center gap-1.5 font-mono text-[10px] tracking-wider text-fg-faint uppercase sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-up" /> interactive
          </span>
        </div>
        <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
          {tab === 'terminal' ? <Terminal /> : <CodeCard />}
        </div>
      </div>
    </div>
  )
}

/* ── Code tab ──────────────────────────────────────────────── */

const k = 'text-violet' // keyword
const t = 'text-sky' // type
const s = 'text-amber' // string
const c = 'text-fg-faint italic' // comment

function CodeCard() {
  return (
    <pre className="h-[340px] overflow-auto p-5 font-mono text-[12.5px] leading-6 text-fg sm:text-[13px]">
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
  )
}

/* ── Price line ────────────────────────────────────────────── */

function PriceLine({ animate }: { animate: boolean }) {
  const d =
    'M0 220 L60 205 L110 214 L170 180 L220 190 L280 150 L330 162 L390 120 L440 135 L500 98 L560 110 L620 70 L680 84 L740 52 L800 64 L860 30 L920 42 L1000 12'
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 bottom-12 h-[180px] w-full text-accent opacity-30"
      viewBox="0 0 1000 240"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="pl-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.18" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
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
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: animate ? 0 : 1 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, delay: 0.3, ease: 'easeInOut' }}
      />
    </svg>
  )
}
