import { profile } from '../../data/profile'
import { resumeUrl } from '../../lib/actions'
import { ArrowUpRight } from '../ui/Icons'

/** Served by Vercel for any unknown URL (dist/404.html). Gets a lost visitor back to the useful pages. */
export function NotFound() {
  const path = window.location.pathname

  return (
    <main className="relative grid min-h-svh place-items-center overflow-hidden px-5 py-16 text-center">
      <div className="bg-grid mask-fade-b pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative max-w-xl">
        <p className="font-mono text-xs tracking-widest text-accent uppercase">404 · Not found</p>
        <h1 className="mt-5 font-display text-display-lg font-bold text-balance">
          There’s nothing at <span className="break-all text-accent">{path}</span>
        </h1>
        <p className="mt-5 text-lg text-fg-muted">
          The link may be old or mistyped. Here’s where to find {profile.shortName}’s work instead.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-ink-950 transition hover:bg-accent-strong"
          >
            See the projects <ArrowUpRight size={16} />
          </a>
          <a
            href={resumeUrl}
            className="rounded-full border border-ink-600 px-6 py-3 font-medium text-fg transition hover:border-accent hover:text-accent"
          >
            Résumé
          </a>
          <a href="/" className="rounded-full px-6 py-3 font-medium text-fg-muted transition hover:text-accent">
            Home
          </a>
        </div>
      </div>
    </main>
  )
}
