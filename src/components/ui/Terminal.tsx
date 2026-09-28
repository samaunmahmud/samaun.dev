import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { profile } from '../../data/profile'
import { NAV_SECTIONS } from '../../data/sections'
import { copyText, goTo, isMac, openExternal, openPalette, openProject } from '../../lib/actions'

interface Line {
  id: number
  node: ReactNode
}

const USER = profile.shortName.toLowerCase()
let lineId = 0
const SECTIONS = NAV_SECTIONS.map((s) => s.id)
const SLUGS = profile.projects.map((p) => p.slug)

const COMMANDS: Record<string, string> = {
  help: 'list commands',
  whoami: 'who is this?',
  about: 'the short version',
  now: 'what I’m doing right now',
  projects: 'list projects',
  open: 'open <project> — read a case study',
  skills: 'languages, frameworks, tools',
  ls: 'list sections',
  cd: 'cd <section> — scroll there',
  contact: 'ways to reach me',
  email: 'copy my email',
  ...(profile.cvUrl ? { cv: 'open my résumé' } : {}),
  github: 'open GitHub',
  linkedin: 'open LinkedIn',
  palette: 'open the command palette',
  clear: 'clear the screen',
}

const Accent = ({ children }: { children: ReactNode }) => <span className="text-accent">{children}</span>
const Faint = ({ children }: { children: ReactNode }) => <span className="text-fg-faint">{children}</span>
const Str = ({ children }: { children: ReactNode }) => <span className="text-amber">{children}</span>

function Prompt() {
  return (
    <span className="mr-[1ch] shrink-0 select-none">
      <span className="text-up">{USER}@brunel</span>
      <Faint>:</Faint>
      <span className="text-sky">~</span>
      <Faint>$</Faint>
    </span>
  )
}

function social(key: string) {
  return profile.socials.find((s) => s.key === key)
}

/** Returns output for a command. `null` means "clear the screen". */
function execute(raw: string): ReactNode | null {
  const [cmd = '', ...args] = raw.trim().split(/\s+/)
  const arg = args.join(' ').toLowerCase()

  switch (cmd.toLowerCase()) {
    case '':
      return ''
    case 'help':
      return (
        <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4">
          {Object.entries(COMMANDS).map(([name, desc]) => (
            <Row key={name} left={<Accent>{name}</Accent>} right={<Faint>{desc}</Faint>} />
          ))}
        </div>
      )
    case 'whoami':
      return (
        <>
          <p className="text-fg">{profile.name}</p>
          <p>
            <Faint>role </Faint>
            {profile.role}
          </p>
          <p>
            <Faint>base </Faint>
            {profile.location}
          </p>
          <p>
            <Faint>status </Faint>
            <span className="text-up">{profile.availability}</span>
          </p>
        </>
      )
    case 'about':
      return <p className="text-fg-muted">{profile.about[0]}</p>
    case 'now':
      return (
        <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4">
          {profile.now.map((n) => (
            <Row key={n.label} left={<Faint>{n.label.toLowerCase()}</Faint>} right={n.value} />
          ))}
        </div>
      )
    case 'projects':
      return (
        <>
          <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4">
            {profile.projects.map((p) => (
              <Row key={p.slug} left={<Accent>{p.slug}</Accent>} right={<span className="text-fg-muted">{p.tagline}</span>} />
            ))}
          </div>
          <p className="mt-1">
            <Faint>→ try </Faint>open {profile.projects[0]?.slug}
          </p>
        </>
      )
    case 'open': {
      const p = profile.projects.find((x) => x.slug === arg || x.name.toLowerCase() === arg)
      if (!p) return <Err>open: no such project “{arg || '?'}”. Try: projects</Err>
      openProject(p.slug)
      return <p>→ opening the {p.name} case study…</p>
    }
    case 'skills':
    case 'stack':
      return (
        <>
          {profile.skills.map((g) => (
            <p key={g.name}>
              <Accent>{g.name.toLowerCase()}</Accent>
              <Faint>: [</Faint>
              {g.items.map((item, i) => (
                <span key={item}>
                  <Str>“{item}”</Str>
                  {i < g.items.length - 1 && <Faint>, </Faint>}
                </span>
              ))}
              <Faint>]</Faint>
            </p>
          ))}
        </>
      )
    case 'ls':
      return (
        <p className="flex flex-wrap gap-x-4">
          {SECTIONS.map((s) => (
            <span key={s} className="text-sky">
              {s}/
            </span>
          ))}
        </p>
      )
    case 'cd': {
      const target = arg.replace(/\/$/, '')
      if (!target || target === '~') return ''
      if (!SECTIONS.includes(target as (typeof SECTIONS)[number])) return <Err>cd: no such directory: {target}</Err>
      goTo(target)
      return ''
    }
    case 'contact':
      return (
        <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4">
          {profile.socials.map((s) => (
            <Row
              key={s.key}
              left={<Faint>{s.label.toLowerCase()}</Faint>}
              right={
                <a href={s.url} target="_blank" rel="noreferrer" className="break-all text-accent underline-offset-2 hover:underline">
                  {s.key === 'email' ? s.handle : `@${s.handle}`}
                </a>
              }
            />
          ))}
        </div>
      )
    case 'email':
      void copyText(profile.email)
      return (
        <p>
          <span className="text-up">✔</span> copied <Str>{profile.email}</Str> to clipboard
        </p>
      )
    case 'cv':
    case 'resume':
      if (!profile.cvUrl) return <p>Résumé coming soon. Try “contact”.</p>
      openExternal(profile.cvUrl)
      return <p>→ opening résumé…</p>
    case 'github':
    case 'linkedin': {
      const s = social(cmd.toLowerCase())
      if (s) openExternal(s.url)
      return <p>→ opening {s?.label}…</p>
    }
    case 'palette':
      openPalette()
      return ''
    case 'clear':
      return null
    default:
      return <Err>zsh: command not found: {cmd}. Type “help”.</Err>
  }
}

function Row({ left, right }: { left: ReactNode; right: ReactNode }) {
  return (
    <>
      <span>{left}</span>
      <span className="min-w-0">{right}</span>
    </>
  )
}

function Err({ children }: { children: ReactNode }) {
  return <p className="text-rose">{children}</p>
}

/** Completes the command name, or the argument for `open` / `cd`. */
function complete(input: string) {
  const parts = input.split(' ')
  if (parts.length === 1) {
    const hits = Object.keys(COMMANDS).filter((c) => c.startsWith(parts[0].toLowerCase()))
    return hits.length === 1 ? `${hits[0]} ` : input
  }
  const pool = parts[0] === 'open' ? SLUGS : parts[0] === 'cd' ? SECTIONS : []
  const hits = pool.filter((x) => x.startsWith(parts[1].toLowerCase()))
  return hits.length === 1 ? `${parts[0]} ${hits[0]}` : input
}

function echo(text: string, output: ReactNode): Line[] {
  const lines: Line[] = [
    {
      id: lineId++,
      node: (
        <p className="flex">
          <Prompt />
          <span className="min-w-0 break-all text-fg">{text}</span>
        </p>
      ),
    },
  ]
  if (output !== '') lines.push({ id: lineId++, node: <div className="mb-1">{output}</div> })
  return lines
}

/** A small working shell in the hero. Never grabs focus on its own — the visitor clicks in. */
export function Terminal() {
  const [lines, setLines] = useState<Line[]>(() => [
    ...echo('whoami', execute('whoami')),
    {
      id: lineId++,
      node: (
        <p className="text-fg-faint">
          Type <span className="text-accent">help</span> for commands, or press{' '}
          <span className="text-accent">{isMac() ? '⌘K' : 'Ctrl K'}</span> anywhere.
        </p>
      ),
    },
  ])
  const [input, setInput] = useState('')
  const history = useRef<string[]>([])
  const cursor = useRef(-1)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const text = input
      setInput('')
      cursor.current = -1
      if (text.trim()) history.current.unshift(text)
      const out = execute(text)
      setLines((prev) => (out === null ? [] : [...prev, ...echo(text, out)]))
    } else if (e.key === 'Tab') {
      if (!input) return // let Tab move focus out when there's nothing to complete
      e.preventDefault()
      setInput(complete(input))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (cursor.current < history.current.length - 1) cursor.current++
      setInput(history.current[cursor.current] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (cursor.current > -1) cursor.current--
      setInput(cursor.current === -1 ? '' : history.current[cursor.current])
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setLines([])
    }
  }

  return (
    <div
      ref={scrollRef}
      onClick={() => {
        if (!window.getSelection()?.toString()) inputRef.current?.focus({ preventScroll: true })
      }}
      className="h-[340px] cursor-text overflow-y-auto p-5 ring-accent/30 ring-inset focus-within:ring-1 font-mono text-[12.5px] leading-6 text-fg-muted sm:text-[13px]"
    >
      <div className="space-y-0.5">
        {lines.map((l) => (
          <div key={l.id}>{l.node}</div>
        ))}
      </div>
      <label className="flex items-center">
        <Prompt />
        <span className="sr-only">Terminal command</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          className="min-w-0 flex-1 bg-transparent text-base text-fg caret-accent placeholder:text-fg-faint/40 focus:outline-none sm:text-[13px]"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="send"
          placeholder="help"
        />
      </label>
    </div>
  )
}
