/** Small side-effect helpers shared by the command palette and the hero terminal. */

/** Scrolls to a section or project anchor. CSS scroll-behavior handles smooth vs. reduced motion. */
export function goTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView()
  history.replaceState(null, '', `#${id}`)
}

export function openExternal(url: string) {
  if (url.startsWith('mailto:')) window.location.href = url
  else window.open(url, '_blank', 'noopener,noreferrer')
}

export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

export const PALETTE_EVENT = 'palette:open'
export const openPalette = () => window.dispatchEvent(new Event(PALETTE_EVENT))

export const isMac = () => typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.userAgent)

/** Anchor id for a project card, so the palette and terminal can jump straight to it. */
export const projectAnchor = (slug: string) => `project-${slug}`

/* ── Project detail view, driven by ?project=<slug> so it can be linked and shared ── */

export const PROJECT_EVENT = 'project:change'
const PROJECT_PARAM = 'project'

export const currentProject = () => new URLSearchParams(window.location.search).get(PROJECT_PARAM)

export function openProject(slug: string) {
  const url = new URL(window.location.href)
  url.searchParams.set(PROJECT_PARAM, slug)
  url.hash = ''
  // Replace when switching between projects so Back still closes the view in one step
  if (currentProject()) history.replaceState({ project: true }, '', url)
  else history.pushState({ project: true }, '', url)
  window.dispatchEvent(new Event(PROJECT_EVENT))
}

export function closeProject() {
  // If we opened it, going back restores the previous URL; otherwise (deep link) just strip the param
  if (history.state?.project) history.back()
  else {
    const url = new URL(window.location.href)
    url.searchParams.delete(PROJECT_PARAM)
    history.replaceState(null, '', url)
    window.dispatchEvent(new Event(PROJECT_EVENT))
  }
}

/* ── Stack filter: the Skills section can filter the Projects list ── */

export const STACK_EVENT = 'stack:filter'

export function filterStack(tech: string) {
  window.dispatchEvent(new CustomEvent<string>(STACK_EVENT, { detail: tech }))
  goTo('projects')
}
