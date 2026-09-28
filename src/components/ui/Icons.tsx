import type { SVGProps } from 'react'

export type IconProps = SVGProps<SVGSVGElement> & { size?: number }

const base = (size = 18): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  'aria-hidden': true,
})

export const GitHubIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} fill="currentColor" {...p}>
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
  </svg>
)

export const LinkedInIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} fill="currentColor" {...p}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
)

export const LeetCodeIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} fill="currentColor" {...p}>
    <path d="M13.48 0a1.37 1.37 0 0 0-.96.44L7.12 6.22l-2.9 3.12a5.1 5.1 0 0 0-1.24 2.03 5.4 5.4 0 0 0-.12 2.27 5.2 5.2 0 0 0 .5 1.54c.17.33.37.64.6.93l4.32 4.64a5.47 5.47 0 0 0 7.69.1l2.51-2.44a1.39 1.39 0 0 0-1.93-2l-2.51 2.43a2.7 2.7 0 0 1-3.73-.06L6.03 16.1a2.52 2.52 0 0 1-.58-2.47c.07-.22.18-.43.33-.6l2.81-3.03 5.23-5.63a1.39 1.39 0 0 0-.34-2.13A1.35 1.35 0 0 0 13.48 0Zm-2.87 12.03a1.38 1.38 0 1 0 0 2.77h9.4a1.38 1.38 0 1 0 0-2.77h-9.4Z" />
  </svg>
)

export const MailIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7 8 6 8-6" />
  </svg>
)

export const ArrowUpRight = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
)

export const DownloadIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 20h14" />
  </svg>
)

export const MenuIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)

export const CloseIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

export const CopyIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V6a2 2 0 0 1 2-2h9" />
  </svg>
)

export const CheckIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
)
