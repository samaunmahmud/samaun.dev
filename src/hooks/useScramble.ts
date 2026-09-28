import { useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'

const GLYPHS = '!<>-_\\/[]{}=+*^?#01'

/**
 * Decodes `text` from random glyphs, left to right. Returns the final text straight away
 * when the visitor prefers reduced motion. Render the result aria-hidden next to an sr-only copy.
 */
export function useScramble(text: string, { delay = 0, duration = 900 } = {}) {
  const reduce = useReducedMotion()
  const [out, setOut] = useState('')

  useEffect(() => {
    if (reduce) return
    let frame = 0
    const start = performance.now() + delay
    const tick = (now: number) => {
      const p = Math.min(1, Math.max(0, (now - start) / duration))
      const settled = Math.floor(p * text.length)
      let next = text.slice(0, settled)
      for (let i = settled; i < text.length; i++) {
        next += text[i] === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      }
      setOut(next)
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [text, delay, duration, reduce])

  return reduce ? text : out
}
