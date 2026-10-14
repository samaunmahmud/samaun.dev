import { profile } from '../../data/profile'

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink-800">
      {/* Pure decoration, drawn with ::before so there's no text node for screen readers or contrast checkers */}
      <p
        className="pointer-events-none mx-auto max-w-6xl px-5 pt-12 font-display text-[clamp(3rem,13vw,10rem)] leading-none font-semibold tracking-tighter text-ink-800 select-none sm:px-8"
        aria-hidden
      >
        <span data-text={profile.shortName.toLowerCase()} className="before:content-[attr(data-text)]" />
        <span data-text=".dev" className="text-accent/40 before:content-[attr(data-text)]" />
      </p>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 font-mono text-xs text-fg-faint sm:flex-row sm:px-8">
        <p>
          © {YEAR} {profile.name}
        </p>
        <p className="text-center">
          Built with React, TypeScript and Tailwind CSS ·{' '}
          <a
            href={`${profile.sourceRepo}/commit/${__COMMIT__}`}
            target="_blank"
            rel="noreferrer"
            className="text-fg-muted underline decoration-ink-600 underline-offset-2 transition hover:text-accent"
            title={`Built ${__BUILD_DATE__}`}
          >
            build {__COMMIT__}
          </a>
        </p>
        <a href="#top" className="transition hover:text-accent">
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}
