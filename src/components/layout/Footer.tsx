import { profile } from '../../data/profile'

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-ink-800">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 font-mono text-xs text-fg-faint sm:flex-row sm:px-8">
        <p>
          © {YEAR} {profile.name}
        </p>
        <p className="text-center">
          Designed & built by me with React, TypeScript & Tailwind ·{' '}
          <a
            href={`${profile.sourceRepo}/commit/${__COMMIT__}`}
            target="_blank"
            rel="noreferrer"
            className="text-fg-muted transition hover:text-accent"
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
