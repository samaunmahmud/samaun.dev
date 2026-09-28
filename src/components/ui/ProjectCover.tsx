import type { Project } from '../../data/types'

const ACCENT: Record<Project['accent'], string> = {
  teal: '#2dd4bf',
  sky: '#38bdf8',
  violet: '#a78bfa',
  rose: '#fb7185',
  amber: '#fbbf24',
}

/**
 * Generated cover art so the site looks finished before you have screenshots.
 * Set `image` on a project in profile.ts and this is replaced automatically.
 */
export function ProjectCover({ project, className = '' }: { project: Project; className?: string }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`${project.name} screenshot`}
        loading="lazy"
        className={`h-full w-full object-cover object-top ${className}`}
      />
    )
  }

  const color = ACCENT[project.accent]
  return (
    <div className={`relative h-full w-full overflow-hidden bg-ink-900 ${className}`}>
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse 70% 60% at 70% 20%, ${color}26, transparent 70%)` }}
      />
      <div className="bg-grid absolute inset-0 opacity-60" />
      <svg viewBox="0 0 400 240" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
        <Art kind={project.art} color={color} />
      </svg>
      <span className="absolute bottom-4 left-5 font-mono text-xs tracking-widest text-fg-faint uppercase">
        {project.slug}
      </span>
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
            const col = up ? color : '#fb7185'
            return (
              <g key={x}>
                <line x1={x} x2={x} y1={h} y2={l} stroke={col} strokeWidth="1.5" />
                <rect x={x - 7} y={Math.min(o, c)} width="14" height={Math.max(Math.abs(o - c), 3)} rx="2" fill={col} fillOpacity={up ? 0.9 : 0.7} />
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
              <circle cx={x} cy={y} r={r} fill={i === 0 ? color : '#0e1520'} stroke={color} strokeWidth="2" />
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
