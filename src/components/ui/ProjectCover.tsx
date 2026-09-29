import type { Project } from '../../data/types'

/** Theme tokens, so covers recolour with the light/dark theme. "teal" = the main accent. */
const ACCENT: Record<Project['accent'], string> = {
  teal: 'var(--accent)',
  sky: 'var(--sky)',
  violet: 'var(--violet)',
  rose: 'var(--rose)',
  amber: 'var(--amber)',
}

/**
 * Generated cover art so the site looks finished before you have screenshots.
 * Set `image` on a project in profile.ts and this is replaced automatically.
 */
/** `peek`: the screenshot fills the width and runs off the bottom edge — for short, wide card headers. */
export function ProjectCover({ project, className = '', peek = false }: { project: Project; className?: string; peek?: boolean }) {
  if (project.image) {
    return project.imageDark ? (
      <>
        <Shot src={project.image} alt={`${project.name} screenshot`} label={project.slug} peek={peek} className={`dark:hidden ${className}`} />
        <Shot src={project.imageDark} alt={`${project.name} screenshot`} label={project.slug} peek={peek} className={`hidden dark:block ${className}`} />
      </>
    ) : (
      <Shot src={project.image} alt={`${project.name} screenshot`} label={project.slug} peek={peek} className={className} />
    )
  }

  const color = ACCENT[project.accent]
  return (
    <div className={`relative h-full w-full overflow-hidden bg-ink-900 ${className}`}>
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse 70% 60% at 70% 20%, color-mix(in oklab, ${color} 15%, transparent), transparent 70%)` }}
      />
      <div className="bg-grid absolute inset-0 opacity-60" />
      {/* SVG attributes can't read CSS vars, so the art draws in currentColor */}
      <svg viewBox="0 0 400 240" className="absolute inset-0 h-full w-full" style={{ color }} preserveAspectRatio="xMidYMid meet" aria-hidden>
        <Art kind={project.art} color="currentColor" />
      </svg>
      <span className="absolute bottom-4 left-5 font-mono text-xs tracking-widest text-fg-faint uppercase">
        {project.slug}
      </span>
    </div>
  )
}

/**
 * The whole screenshot, uncropped, in a browser-window frame on the same grid surface as the
 * generated covers, so it fits any frame shape (tall featured panel, wide modal header).
 * The frame tilts with --rx/--ry, which the parent card sets from the cursor (lib/pointer.ts).
 */
function Shot({ src, alt, label, peek, className }: { src: string; alt: string; label: string; peek: boolean; className: string }) {
  return (
    <div className={`relative h-full w-full overflow-hidden bg-ink-900 ${className}`}>
      <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,var(--color-accent-soft),transparent_70%)]" aria-hidden />
      <div className={`relative flex h-full justify-center ${peek ? 'px-6 pt-6 sm:px-8 sm:pt-7' : 'items-center p-5 sm:p-8'}`}>
        <figure
          className={`tilt-3d flex flex-col overflow-hidden border border-ink-700 bg-ink-850 shadow-2xl shadow-black/30 ${
            peek ? 'w-full rounded-t-xl border-b-0' : 'max-h-full max-w-full rounded-xl'
          }`}
        >
          <div className="flex shrink-0 items-center gap-1.5 border-b border-ink-700 px-3 py-2" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-rose/70" />
            <span className="h-2 w-2 rounded-full bg-amber/70" />
            <span className="h-2 w-2 rounded-full bg-up/70" />
            <span className="mx-auto truncate rounded-md bg-ink-800 px-3 py-0.5 font-mono text-[10px] text-fg-faint">{label}</span>
          </div>
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className={peek ? 'min-h-0 w-full flex-1 object-cover object-top' : 'min-h-0 max-w-full object-contain'}
          />
        </figure>
      </div>
    </div>
  )
}

function Art({ kind, color }: { kind: Project['art']; color: string }) {
  switch (kind) {
    case 'candles': {
      const candles = [
        [40, 150, 175, 135, 190], [70, 140, 160, 125, 170], [100, 145, 120, 110, 158],
        [130, 122, 132, 105, 140], [160, 128, 100, 92, 136], [190, 104, 115, 90, 124],
        [220, 112, 88, 75, 120], [250, 90, 96, 70, 104], [280, 92, 70, 58, 100],
        [310, 72, 60, 48, 80], [340, 62, 44, 34, 70],
      ]
      return (
        <g>
          <polyline
            points={candles.map(([x, , c]) => `${x},${c}`).join(' ')}
            fill="none"
            stroke={color}
            strokeOpacity=".35"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          {candles.map(([x, o, c, h, l]) => {
            const up = c < o
            return (
              <g key={x} className={up ? undefined : 'text-rose'}>
                <line x1={x} x2={x} y1={h} y2={l} stroke="currentColor" strokeWidth="1.5" />
                <rect x={x - 7} y={Math.min(o, c)} width="14" height={Math.max(Math.abs(o - c), 3)} rx="2" fill="currentColor" fillOpacity={up ? 0.9 : 0.7} />
              </g>
            )
          })}
        </g>
      )
    }
    case 'bars': {
      const h = [60, 95, 70, 120, 85, 140, 105, 160, 125]
      return (
        <g>
          {h.map((v, i) => (
            <rect key={i} x={50 + i * 36} y={200 - v} width="22" height={v} rx="4" fill={color} fillOpacity={0.25 + i * 0.07} />
          ))}
          <circle cx="96" cy="58" r="34" fill="none" stroke={color} strokeWidth="10" strokeOpacity=".25" />
          <circle cx="96" cy="58" r="34" fill="none" stroke={color} strokeWidth="10" strokeDasharray="140 214" strokeLinecap="round" transform="rotate(-90 96 58)" />
        </g>
      )
    }
    case 'network': {
      const nodes = [
        [200, 120, 18], [110, 70, 11], [300, 65, 11], [95, 180, 11], [305, 180, 11],
      ] as const
      return (
        <g>
          {nodes.slice(1).map(([x, y], i) => (
            <line key={i} x1="200" y1="120" x2={x} y2={y} stroke={color} strokeOpacity=".5" strokeWidth="1.5" strokeDasharray="3 5" />
          ))}
          <line x1="110" y1="70" x2="300" y2="65" stroke={color} strokeOpacity=".2" />
          <line x1="95" y1="180" x2="305" y2="180" stroke={color} strokeOpacity=".2" />
          {nodes.map(([x, y, r], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r={r + 10} fill={color} fillOpacity=".08" />
              <circle cx={x} cy={y} r={r} className={i === 0 ? undefined : 'fill-ink-850'} fill={color} stroke={color} strokeWidth="2" />
            </g>
          ))}
        </g>
      )
    }
    case 'scan':
      return (
        <g>
          <ellipse cx="200" cy="125" rx="110" ry="80" fill="none" stroke={color} strokeOpacity=".3" />
          <ellipse cx="160" cy="125" rx="38" ry="62" fill={color} fillOpacity=".1" stroke={color} strokeOpacity=".6" />
          <ellipse cx="240" cy="125" rx="38" ry="62" fill={color} fillOpacity=".1" stroke={color} strokeOpacity=".6" />
          {[70, 90, 110, 130, 150, 170].map((y) => (
            <path key={y} d={`M130 ${y} Q200 ${y + 14} 270 ${y}`} fill="none" stroke={color} strokeOpacity=".25" />
          ))}
          <rect x="60" y="112" width="280" height="3" fill={color} fillOpacity=".8" />
          <rect x="60" y="100" width="280" height="26" fill={color} fillOpacity=".08" />
        </g>
      )
    case 'map': {
      // Street grid, a scouting route and venue pins
      const pins = [
        [118, 150],
        [205, 88],
        [292, 132],
      ] as const
      return (
        <g>
          {[70, 120, 170].map((y) => (
            <line key={`h${y}`} x1="40" x2="360" y1={y} y2={y + 12} stroke={color} strokeOpacity=".18" strokeWidth="6" strokeLinecap="round" />
          ))}
          {[110, 200, 290].map((x) => (
            <line key={`v${x}`} x1={x} x2={x - 18} y1="40" y2="210" stroke={color} strokeOpacity=".18" strokeWidth="6" strokeLinecap="round" />
          ))}
          <polyline
            points={pins.map(([x, y]) => `${x},${y}`).join(' ')}
            fill="none"
            stroke={color}
            strokeOpacity=".7"
            strokeWidth="2"
            strokeDasharray="5 5"
          />
          {pins.map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <circle r="22" fill={color} fillOpacity=".1" />
              <path d="M0 0c-9-10-14-17-14-24a14 14 0 0 1 28 0c0 7-5 14-14 24z" fill={color} fillOpacity={i === 1 ? 1 : 0.55} />
              <circle cy="-24" r="5" className="fill-ink-900" />
            </g>
          ))}
        </g>
      )
    }
    case 'stars':
      return (
        <g>
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              transform={`translate(${95 + i * 52} 95) scale(1.6)`}
              d="M12 2l2.9 6.2 6.8.7-5.1 4.6 1.5 6.7L12 16.8 5.9 20.2l1.5-6.7L2.3 8.9l6.8-.7L12 2z"
              fill={i < 4 ? color : 'none'}
              fillOpacity={i < 4 ? 0.85 : 0}
              stroke={color}
              strokeWidth="1.2"
            />
          ))}
          {[0, 1, 2].map((i) => (
            <rect key={i} x="95" y={160 + i * 16} width={210 - i * 50} height="7" rx="3.5" fill={color} fillOpacity=".2" />
          ))}
        </g>
      )
  }
}
