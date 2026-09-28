import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'
import { profile } from '../../data/profile'
import { NAV_SECTIONS } from '../../data/sections'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useTheme } from '../../hooks/useTheme'
import { isMac, openPalette } from '../../lib/actions'
import { CloseIcon, MenuIcon, MoonIcon, SearchIcon, SunIcon } from '../ui/Icons'

const ids = NAV_SECTIONS.map((s) => s.id)

export function Navbar() {
  const active = useActiveSection(ids)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [mod] = useState(() => (isMac() ? '⌘' : 'Ctrl'))
  const { theme, toggle } = useTheme()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? 'border-b border-ink-700/60 bg-ink-950/75 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8" aria-label="Main">
        <a href="#top" className="group flex items-center gap-2.5 font-mono text-sm" onClick={() => setOpen(false)}>
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-accent/40 bg-accent-soft font-semibold text-accent transition group-hover:border-accent">
            SM
          </span>
          <span className="hidden text-fg-muted transition group-hover:text-fg sm:inline">
            {profile.shortName.toLowerCase()}<span className="text-accent">.dev</span>
          </span>
        </a>

        <ul className="hidden items-center lg:flex">
          {NAV_SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`relative rounded-md px-2.5 py-2 text-sm transition-colors ${
                  active === s.id ? 'text-fg' : 'text-fg-muted hover:text-fg'
                }`}
              >
                {active === s.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-md bg-ink-800"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openPalette}
            aria-label="Open command palette"
            aria-keyshortcuts="Meta+K Control+K"
            className="grid h-9 w-9 place-items-center rounded-lg border border-ink-700 text-fg-muted transition hover:border-ink-600 hover:text-fg xl:flex xl:w-auto xl:gap-2 xl:px-2.5"
          >
            <SearchIcon size={15} />
            <kbd className="hidden font-mono text-[11px] text-fg-faint xl:inline">{mod} K</kbd>
          </button>
          <button
            type="button"
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect()
              toggle({ x: r.left + r.width / 2, y: r.top + r.height / 2 })
            }}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dev mode (dark theme)'}
            title={theme === 'dark' ? 'Light theme' : 'Dev mode'}
            className="grid h-9 w-9 place-items-center rounded-lg border border-ink-700 text-fg-muted transition hover:border-ink-600 hover:text-accent"
          >
            {theme === 'dark' ? <SunIcon size={16} /> : <MoonIcon size={16} />}
          </button>
          <a
            href={profile.cvUrl ?? '#contact'}
            {...(profile.cvUrl ? { target: '_blank', rel: 'noreferrer' } : {})}
            className="hidden rounded-lg border border-accent/50 px-3.5 py-1.5 text-sm font-medium text-accent transition hover:bg-accent hover:text-ink-950 sm:inline-block"
          >
            {profile.cvUrl ? 'Résumé' : 'Get in touch'}
          </a>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-lg text-fg-muted hover:bg-ink-800 hover:text-fg lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </nav>

      <motion.div
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent"
        style={{ scaleX: progress }}
        aria-hidden
      />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100dvh' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 pt-4">
              {NAV_SECTIONS.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <a
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-ink-800 py-4 font-display text-2xl text-fg"
                  >
                    <span className="font-mono text-xs text-accent">0{i + 1}</span>
                    {s.label}
                  </a>
                </motion.li>
              ))}
              <li className="pt-6">
                <a
                  href={profile.cvUrl ?? '#contact'}
                  {...(profile.cvUrl ? { target: '_blank', rel: 'noreferrer' } : {})}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg bg-accent py-3 text-center font-medium text-ink-950"
                >
                  {profile.cvUrl ? 'Download résumé' : 'Get in touch'}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
