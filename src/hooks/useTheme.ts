import { useSyncExternalStore } from 'react'
import { flushSync } from 'react-dom'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
/** Must match --ink-950 for each theme in index.css (browser chrome colour on mobile). */
const CHROME: Record<Theme, string> = { light: '#f4f1ea', dark: '#05080d' }

const root = () => document.documentElement
const read = (): Theme => (root().dataset.theme === 'dark' ? 'dark' : 'light')

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(root(), { attributes: true, attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}

function apply(theme: Theme) {
  root().dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', CHROME[theme])
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    /* private mode — the choice just won't persist */
  }
}

/**
 * Current theme + a toggle. The initial value is set before first paint by the
 * inline script in index.html, so there's no flash of the wrong theme.
 */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, read, () => 'light' as Theme)

  /** Pass the click origin to grow the new theme as a circle from that point. */
  const toggle = (origin?: { x: number; y: number }) => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reduce || !origin) {
      apply(next)
      return
    }
    const { x, y } = origin
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    const transition = document.startViewTransition(() => flushSync(() => apply(next)))
    transition.ready
      .then(() =>
        root().animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 550, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' },
        ),
      )
      .catch(() => {})
  }

  return { theme, toggle }
}
