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
