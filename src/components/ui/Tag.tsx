import type { ReactNode } from 'react'

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-ink-700 bg-ink-850 px-2 py-1 font-mono text-[11px] leading-none text-fg-muted">
      {children}
    </span>
  )
}
