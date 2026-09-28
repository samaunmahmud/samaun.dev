import { useEffect, useState } from 'react'

/** Live "14:32 BST"-style time in the given IANA zone, ticking once a minute. */
export function useClock(timeZone: string) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    // Align to the next minute boundary, then tick every 60s
    let interval: number | undefined
    const timeout = window.setTimeout(() => {
      setNow(new Date())
      interval = window.setInterval(() => setNow(new Date()), 60_000)
    }, 60_000 - (Date.now() % 60_000))
    return () => {
      window.clearTimeout(timeout)
      window.clearInterval(interval)
    }
  }, [])

  return new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(now)
}
