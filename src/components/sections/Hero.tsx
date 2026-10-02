import { motion } from 'motion/react'
import { useState } from 'react'
import { profile } from '../../data/profile'
import { useClock } from '../../hooks/useClock'
import { timeAgo, useLastPush } from '../../hooks/useLastPush'
import { magnet, release } from '../../lib/pointer'
import { CountUp } from '../ui/CountUp'
import { ArrowUpRight, DownloadIcon } from '../ui/Icons'
import { socialIcon } from '../ui/socialIcons'
import { Terminal } from '../ui/Terminal'

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export function Hero() {
  const socials = profile.socials.filter((s) => s.key !== 'email')
  const stat = profile.stats[0]

  return (
    <section id="top" className="relative flex min-h-svh flex-col overflow-hidden pt-28 sm:pt-32">
      <div className="relative mx-auto w-full max-w-6xl flex-1 px-5 sm:px-8">
        {/* Greeting badge + headline, centred */}
        <div className="text-center">
          <motion.p {...fade(0)} className="relative inline-block">
            <span className="inline-block rounded-full border border-fg/80 px-4 py-1.5 text-sm font-medium text-fg">
              {profile.greeting}
            </span>
            <Doodle className="absolute -top-4 -right-6 h-6 w-6 text-accent" />
          </motion.p>

          <motion.h1
            {...fade(0.08)}
            className="relative mt-5 font-display text-display-xl font-semibold text-fg"
          >
            {profile.headline.lead} <span className="text-accent">{profile.headline.accent}</span>,
            <br />
            {profile.headline.tail}
            <Doodle className="absolute -bottom-6 -left-2 hidden h-9 w-9 rotate-180 text-accent sm:block lg:-left-6" />
          </motion.h1>
        </div>

        {/* Quote · visual · stat — stacks on mobile */}
        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] items-start gap-10 lg:mt-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,580px)_minmax(0,1fr)] lg:gap-8">
          <motion.div {...fade(0.16)} className="max-w-xs lg:mt-16">
            <QuoteIcon className="h-7 w-7 text-fg" />
            <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">{profile.tagline}</p>
            <div className="mt-5 flex items-center gap-2">
              {socials.map((s) => {
                const Icon = socialIcon[s.key]
                return (
                  <a
                    key={s.key}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-ink-700 text-fg-muted transition hover:border-accent hover:bg-accent hover:text-ink-950"
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-first lg:order-none"
          >
            <Stage />
          </motion.div>

          {stat && (
            <motion.div {...fade(0.24)} className="lg:mt-16 lg:justify-self-end lg:text-right">
              <p className="flex gap-1 text-accent lg:justify-end" aria-hidden>
                {[0, 1, 2, 3, 4].map((i) => (
                  <StarIcon key={i} className="h-4 w-4" />
                ))}
              </p>
              <p className="mt-2 font-display text-5xl leading-none font-bold text-fg">
                <CountUp value={stat.value} />
              </p>
              <p className="text-sm text-fg-muted">{stat.label}</p>
              <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-ink-700 px-3 py-1 text-xs text-fg-muted">
                <span className="h-2 w-2 shrink-0 rounded-full bg-up" />
                {profile.availability}
              </p>
            </motion.div>
          )}
        </div>

        <motion.div {...fade(0.32)}>
          <StatusLine />
        </motion.div>
      </div>

      <StackTicker />
    </section>
  )
}

/* ── Stage: the orange disc with the portrait (or terminal) and the CTA capsule ── */

function Stage() {
  return (
    <div className="relative mx-auto max-w-[580px] pt-6">
      {/* The disc sits behind, its top half showing above the content */}
      <div className="absolute inset-x-[4%] top-0 aspect-square rounded-full bg-accent-bright" aria-hidden />
      <div className="relative px-[3%]">
        {profile.photo ? (
          <img
            src={profile.photo}
            alt={profile.name}
            className="relative mx-auto block max-h-[520px] w-auto object-contain"
            fetchPriority="high"
          />
        ) : (
          <div className="pt-[14%]">
            <Console />
          </div>
        )}
      </div>

      {/* Glass capsule with the two CTAs, overlapping the bottom edge */}
      <div
        data-theme="dark"
        className="relative z-10 mx-auto -mt-9 flex w-fit items-center gap-1.5 rounded-full border border-white/20 bg-ink-950/50 p-1.5 text-fg shadow-lg backdrop-blur-md"
      >
        <a
          href="#projects"
          onPointerMove={(e) => magnet(e)}
          onPointerLeave={release}
          className="magnetic group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-ink-950 transition hover:bg-accent-strong"
        >
          View projects
          <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
        {profile.cvUrl ? (
          <a
            href={profile.cvUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-medium text-fg transition hover:text-accent"
          >
            <DownloadIcon size={16} />
            Résumé
          </a>
        ) : (
          <a href="#contact" className="rounded-full px-5 py-3 font-medium text-fg transition hover:text-accent">
            Hire me
          </a>
        )}
      </div>
    </div>
  )
}

/** Three hand-drawn strokes, as on the template's "Hello!" badge. */
function Doodle({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className} aria-hidden>
      <path d="M4 14 L9 19" />
      <path d="M10 6 L12 16" />
      <path d="M18 4 L15 15" />
    </svg>
  )
}

function QuoteIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden>
      <path d="M13 8c-5 1.5-9 5.6-9 11.5V25h9v-9H8.6c.4-2.8 2.2-4.9 5.4-5.9L13 8Zm15 0c-5 1.5-9 5.6-9 11.5V25h9v-9h-4.4c.4-2.8 2.2-4.9 5.4-5.9L28 8Z" />
    </svg>
  )
}

function StarIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path d="m10 1.5 2.6 5.5 6 .7-4.5 4.1 1.2 5.9L10 14.8l-5.3 2.9 1.2-5.9L1.4 7.7l6-.7L10 1.5Z" />
    </svg>
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
    <div className="mt-12 mb-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-xs text-fg-faint">
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
