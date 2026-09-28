import { useSyncExternalStore } from 'react'
import { currentProject, PROJECT_EVENT } from '../lib/actions'

function subscribe(onChange: () => void) {
  window.addEventListener('popstate', onChange)
  window.addEventListener(PROJECT_EVENT, onChange)
  return () => {
    window.removeEventListener('popstate', onChange)
    window.removeEventListener(PROJECT_EVENT, onChange)
  }
}

/** Slug of the project whose detail view is open (from ?project=…), or null. */
export function useProjectParam() {
  return useSyncExternalStore(subscribe, currentProject, () => null)
}
