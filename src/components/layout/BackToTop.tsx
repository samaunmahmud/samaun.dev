import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { ArrowUpIcon } from '../ui/Icons'

/** Floating "back to top" button, shown once the hero is scrolled past. */
export function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#top"
          aria-label="Back to top"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          className="fixed right-5 bottom-5 z-40 grid h-11 w-11 place-items-center rounded-full border border-ink-700 bg-ink-900/90 text-fg-muted shadow-lg shadow-black/10 backdrop-blur transition-colors hover:border-accent hover:text-accent sm:right-8 sm:bottom-8"
        >
          <ArrowUpIcon size={18} />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
