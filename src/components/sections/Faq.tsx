import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { profile } from '../../data/profile'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <Section
      id="faq"
      index="07"
      band
      split
      aside={
        <p className="text-fg-muted">
          Something not covered here?{' '}
          <a href="#contact" className="text-accent underline-offset-4 hover:underline">
            Get in touch
          </a>
          .
        </p>
      }
      eyebrow="FAQ"
      title={
        <>
          Quick answers <span className="text-fg-muted">for recruiters.</span>
        </>
      }
    >
      <Reveal>
        <div className="divide-y divide-ink-700 border-y border-ink-700">
          {profile.faq.map((item, i) => {
            const expanded = open === i
            return (
              <div key={item.q}>
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={expanded}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(expanded ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="font-display text-lg text-fg transition-colors group-hover:text-accent sm:text-xl">
                      {item.q}
                    </span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition duration-300 ${
                        expanded ? 'rotate-45 border-accent text-accent' : 'border-ink-600 text-fg-muted'
                      }`}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      id={`faq-a-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-3xl pb-7 text-lg leading-relaxed text-fg-muted">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </Reveal>
    </Section>
  )
}
