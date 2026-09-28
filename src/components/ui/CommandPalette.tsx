import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { profile } from '../../data/profile'
import { NAV_SECTIONS } from '../../data/sections'
import { copyText, goTo, openExternal, PALETTE_EVENT, projectAnchor } from '../../lib/actions'
import { ArrowUpRight, CopyIcon, DownloadIcon, HashIcon, SearchIcon } from './Icons'
import { socialIcon } from './socialIcons'

interface Command {
  id: string
  group: 'Navigate' | 'Projects' | 'Links' | 'Actions'
  label: string
  hint?: string
  icon: ReactNode
  run: () => void | Promise<void>
}

function buildCommands(onCopied: () => void): Command[] {
  return [
    ...NAV_SECTIONS.map((s, i) => ({
      id: `nav-${s.id}`,
      group: 'Navigate' as const,
      label: s.label,
      hint: `0${i + 1}`,
      icon: <HashIcon size={16} />,
      run: () => goTo(s.id),
    })),
    ...profile.projects.map((p) => ({
      id: `project-${p.slug}`,
      group: 'Projects' as const,
      label: p.name,
      hint: p.tagline,
      icon: <HashIcon size={16} />,
      run: () => goTo(projectAnchor(p.slug)),
    })),
    ...profile.socials
      .filter((s) => s.key !== 'email')
      .map((s) => {
        const Icon = socialIcon[s.key]
        return {
          id: `link-${s.key}`,
          group: 'Links' as const,
          label: `Open ${s.label}`,
          hint: `@${s.handle}`,
          icon: <Icon size={16} />,
          run: () => openExternal(s.url),
        }
      }),
    {
      id: 'copy-email',
      group: 'Actions',
      label: 'Copy email address',
      hint: profile.email,
      icon: <CopyIcon size={16} />,
      run: async () => {
        if (await copyText(profile.email)) onCopied()
        else openExternal(`mailto:${profile.email}`)
      },
    },
    {
      id: 'cv',
      group: 'Actions',
      label: 'Open résumé',
      hint: 'PDF',
      icon: <DownloadIcon size={16} />,
      run: () => openExternal(profile.cvUrl),
    },
    {
      id: 'source',
      group: 'Actions',
      label: 'View this site’s source',
      hint: 'GitHub',
      icon: <ArrowUpRight size={16} />,
      run: () => openExternal(profile.sourceRepo),
    },
  ]
}

/** ⌘K / Ctrl+K launcher. Opens on the shortcut, "/" or the `palette:open` window event. */
export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [toast, setToast] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)

  const commands = useMemo(() => buildCommands(() => setToast('Email copied to clipboard')), [])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter((c) => `${c.group} ${c.label} ${c.hint ?? ''}`.toLowerCase().includes(q))
  }, [commands, query])

  useEffect(() => {
    const show = () => {
      returnFocus.current = document.activeElement as HTMLElement | null
      setQuery('')
      setActive(0)
      setOpen(true)
    }
    const onKey = (e: globalThis.KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && e.target.closest('input, textarea, [contenteditable]')
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => {
          if (!o) returnFocus.current = document.activeElement as HTMLElement | null
          return !o
        })
        setQuery('')
        setActive(0)
      } else if (e.key === '/' && !typing) {
        e.preventDefault()
        show()
      }
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener(PALETTE_EVENT, show)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener(PALETTE_EVENT, show)
    }
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      requestAnimationFrame(() => inputRef.current?.focus())
    } else {
      document.body.style.overflow = ''
      returnFocus.current?.focus?.()
    }
  }, [open])

  useEffect(() => {
    if (!toast) return
    const t = window.setTimeout(() => setToast(''), 2200)
    return () => window.clearTimeout(t)
  }, [toast])

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const run = (cmd: Command | undefined) => {
    if (!cmd) return
    setOpen(false)
    // Let the dialog close and focus return before scrolling / opening
    requestAnimationFrame(() => void cmd.run())
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => (results.length ? (i + 1) % results.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      run(results[active])
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
    } else if (e.key === 'Tab') {
      e.preventDefault() // keep focus trapped in the input
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-ink-600 bg-ink-900/95 shadow-2xl shadow-black/60"
              initial={{ scale: 0.97, y: -8 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.97, y: -8 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 border-b border-ink-700 px-4">
                <SearchIcon size={18} className="shrink-0 text-fg-faint" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    setActive(0)
                  }}
                  onKeyDown={onKeyDown}
                  placeholder="Jump to a section, project or link…"
                  className="h-14 min-w-0 flex-1 bg-transparent text-[15px] text-fg placeholder:text-fg-faint focus:outline-none"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="palette-list"
                  aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
                  aria-autocomplete="list"
                  spellCheck={false}
                />
                <kbd className="hidden rounded border border-ink-600 px-1.5 py-0.5 font-mono text-[10px] text-fg-faint sm:inline">
                  ESC
                </kbd>
              </div>

              <ul ref={listRef} id="palette-list" role="listbox" className="max-h-[min(420px,60vh)] overflow-y-auto p-2">
                {results.length === 0 && (
                  <li className="px-3 py-8 text-center font-mono text-sm text-fg-faint">No matches for “{query}”</li>
                )}
                {results.map((cmd, i) => {
                  const header = cmd.group !== results[i - 1]?.group ? cmd.group : null
                  const selected = i === active
                  return (
                    <li key={cmd.id} role="presentation">
                      {header && (
                        <p className="px-3 pt-3 pb-1.5 font-mono text-[10px] tracking-widest text-fg-faint uppercase" aria-hidden>
                          {header}
                        </p>
                      )}
                      <div
                        id={`cmd-${cmd.id}`}
                        role="option"
                        aria-selected={selected}
                        data-index={i}
                        onMouseMove={() => setActive(i)}
                        onClick={() => run(cmd)}
                        className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                          selected ? 'bg-accent-soft text-fg' : 'text-fg-muted'
                        }`}
                      >
                        <span className={selected ? 'text-accent' : 'text-fg-faint'}>{cmd.icon}</span>
                        <span className="shrink-0">{cmd.label}</span>
                        {cmd.hint && <span className="min-w-0 truncate font-mono text-xs text-fg-faint">{cmd.hint}</span>}
                        {selected && <span className="ml-auto font-mono text-xs text-accent">↵</span>}
                      </div>
                    </li>
                  )
                })}
              </ul>

              <div className="flex items-center gap-4 border-t border-ink-700 px-4 py-2.5 font-mono text-[11px] text-fg-faint">
                <span>
                  <Kbd>↑</Kbd> <Kbd>↓</Kbd> navigate
                </span>
                <span>
                  <Kbd>↵</Kbd> select
                </span>
                <span className="ml-auto">{results.length} results</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div aria-live="polite" className="pointer-events-none fixed bottom-6 left-1/2 z-[80] -translate-x-1/2">
        <AnimatePresence>
          {toast && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="rounded-lg border border-accent/40 bg-ink-900 px-4 py-2 font-mono text-sm text-accent shadow-lg"
            >
              ✔ {toast}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

function Kbd({ children }: { children: ReactNode }) {
  return <kbd className="rounded border border-ink-600 px-1 py-px">{children}</kbd>
}
