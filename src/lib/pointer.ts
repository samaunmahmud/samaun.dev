import type { PointerEvent } from 'react'

/** Pointer effects only make sense with a mouse, and never when motion is reduced. */
const enabled = () =>
  matchMedia('(pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches

/** 3D tilt towards the cursor. Writes CSS vars (--rx, --ry) so React never re-renders. */
export function tilt(e: PointerEvent<HTMLElement>, max = 6) {
  if (!enabled()) return
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width - 0.5
  const y = (e.clientY - r.top) / r.height - 0.5
  el.style.setProperty('--rx', `${(-y * max).toFixed(2)}deg`)
  el.style.setProperty('--ry', `${(x * max).toFixed(2)}deg`)
}

/** Nudges an element a few px towards the cursor (--mx, --my). */
export function magnet(e: PointerEvent<HTMLElement>, pull = 0.25) {
  if (!enabled()) return
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${((e.clientX - r.left - r.width / 2) * pull).toFixed(1)}px`)
  el.style.setProperty('--my', `${((e.clientY - r.top - r.height / 2) * pull).toFixed(1)}px`)
}

/** Tracks the cursor position inside an element (--px, --py) for spotlight gradients. */
export function track(e: PointerEvent<HTMLElement>) {
  if (!enabled()) return
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--px', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--py', `${e.clientY - r.top}px`)
}

/** Resets whichever of the above were set. */
export function release(e: PointerEvent<HTMLElement>) {
  for (const v of ['--rx', '--ry', '--mx', '--my']) e.currentTarget.style.removeProperty(v)
}
