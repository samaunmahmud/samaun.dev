import { useState } from 'react'
import { profile } from '../../data/profile'
import { CheckIcon, CopyIcon, MailIcon } from '../ui/Icons'
import { socialIcon } from '../ui/socialIcons'
import { Reveal } from '../ui/Reveal'

export function Contact() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] surface px-6 py-16 text-center sm:px-12 md:py-24">
          <div className="aurora" aria-hidden>
            <span className="-bottom-40 -left-20 h-96 w-[520px]" />
            <span className="-top-40 -right-20 h-96 w-[480px]" />
            <span className="-bottom-52 left-1/3 h-80 w-[420px]" />
          </div>
          <div className="bg-grid mask-fade-b pointer-events-none absolute inset-0" aria-hidden />
          <div className="relative">
            <p className="font-mono text-xs tracking-widest text-accent uppercase">08 · Contact</p>
            <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl leading-tight font-semibold tracking-tight sm:text-5xl md:text-6xl">
              Open to 2027 placement opportunities. <span className="text-gradient">Get in touch.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-fg-muted">
              The best way to reach me is by email. You can also find me on LinkedIn and GitHub.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-medium text-ink-950 shadow-[0_0_40px_-8px] shadow-accent/60 transition hover:bg-accent-strong"
              >
                <MailIcon size={18} /> Send an email
              </a>
              <button
                type="button"
                onClick={copy}
                className="inline-flex items-center gap-2 rounded-xl border border-ink-600 px-5 py-3.5 font-mono text-sm text-fg-muted transition hover:border-fg-faint hover:text-fg"
              >
                {copied ? <CheckIcon size={16} className="text-up" /> : <CopyIcon size={16} />}
                {copied ? 'Copied!' : profile.email}
              </button>
            </div>

            <div className="mt-10 flex justify-center gap-2">
              {profile.socials
                .filter((s) => s.key !== 'email')
                .map((s) => {
                  const Icon = socialIcon[s.key]
                  return (
                    <a
                      key={s.key}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="grid h-12 w-12 place-items-center rounded-xl border border-ink-700 text-fg-muted transition hover:border-accent/50 hover:text-accent"
                    >
                      <Icon size={20} />
                    </a>
                  )
                })}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
