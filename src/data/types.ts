// Shapes for everything the site renders. Edit content in profile.ts, not here.

export type SocialKey = 'github' | 'linkedin' | 'leetcode' | 'email'

export interface SocialLink {
  key: SocialKey
  label: string
  handle: string
  url: string
}

/** One box in a project's architecture diagram (Deep dive section). */
export interface FlowNode {
  id: string
  label: string
  tech: string
  detail: string
  /** Drawn underneath this node instead of in the main left-to-right row. */
  branchOf?: string
}

export interface Project {
  slug: string
  name: string
  tagline: string
  description: string
  /** The hard problems solved — recruiters read these first. Keep to 2–4. */
  highlights: string[]
  stack: string[]
  status: 'live' | 'complete' | 'in-progress' | 'hackathon' | 'coursework'
  featured?: boolean
  repo?: string
  demo?: string
  /** Path under /public, e.g. "/projects/meridian.png". Falls back to a generated cover. */
  image?: string
  /** Pixel size of `image` (and `imageDark`), so the browser reserves space before it loads. */
  imageSize?: [width: number, height: number]
  /** Optional dark-theme version of `image`, shown in dev mode. */
  imageDark?: string
  /** Colour + illustration for the generated cover when there is no image. */
  accent: 'teal' | 'violet' | 'amber' | 'rose' | 'sky'
  art: 'candles' | 'bars' | 'network' | 'scan' | 'stars' | 'map'
  /** Optional architecture walkthrough. Every project with one gets a tab in the Deep dive section (one branch per main node). */
  flow?: FlowNode[]
}

export interface FaqItem {
  q: string
  a: string
}

export interface NowItem {
  label: string
  value: string
}

export interface TimelineItem {
  title: string
  org: string
  period: string
  kind: 'education' | 'role' | 'hackathon'
  points: string[]
}

export interface SkillGroup {
  name: string
  items: string[]
}

export interface Stat {
  value: string
  label: string
}

export interface Profile {
  name: string
  shortName: string
  role: string
  location: string
  /** IANA zone for the live clock in the hero, e.g. "Europe/London". */
  timezone: string
  /** Small badge above the hero headline. */
  greeting: string
  /** Hero headline: `lead` `accent`, then `tail` on its own line; `accent` is set in orange. */
  headline: { lead: string; accent: string; tail: string }
  /** Path under /public for a cut-out portrait on the hero's orange circle. Unset = the terminal shows there. */
  photo?: string
  tagline: string
  about: string[]
  availability: string
  /** "Right now" card in About — keep it current, it's the first thing that goes stale. */
  now: NowItem[]
  email: string
  /** Subject line pre-filled when a visitor clicks "Send an email". */
  emailSubject: string
  /** Path under /public. Unset = résumé buttons open the printable /resume page generated from this file. */
  cvUrl?: string
  /** Live URL of this site, shown on the printable résumé. */
  siteUrl: string
  /** This site's own repo — the footer links the build hash to it. */
  sourceRepo: string
  /** Practice repos kept out of the live GitHub feed. A trailing * matches a prefix. */
  hiddenRepos: string[]
  socials: SocialLink[]
  stats: Stat[]
  projects: Project[]
  timeline: TimelineItem[]
  skills: SkillGroup[]
  /** Recruiter FAQ. Only put answers here that are true today. */
  faq: FaqItem[]
}
