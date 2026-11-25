import { animate, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

/** Counts a whole number ("10", "3,500+") up from 0 when it scrolls into view. Other values render as-is. */
export function CountUp({ value }: { value: string }) {
  const match = /^(\d[\d,]*)(\+?)$/.exec(value)
  const target = match ? Number(match[1].replaceAll(',', '')) : null
  const suffix = match?.[2] ?? ''
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (target === null || reduce || !inView) return
    const controls = animate(0, target, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setShown(Math.round(v)),
    })
    return () => controls.stop()
  }, [target, reduce, inView])

  if (target === null || reduce) return <span ref={ref}>{value}</span>
  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden>
        {shown.toLocaleString('en-GB')}
        {suffix}
      </span>
    </span>
  )
}
