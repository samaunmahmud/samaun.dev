import type { ReactNode } from 'react'

export function Tag({ children, active = false }: { children: ReactNode; active?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-1 font-mono text-[11px] leading-none transition-colors ${
        active ? 'border-accent/50 bg-accent-soft text-accent' : 'border-ink-700 bg-ink-850 text-fg-muted'
      }`}
    >
      {children}
    </span>
  )
}
