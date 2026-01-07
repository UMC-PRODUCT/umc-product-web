import { useEffect } from 'react'

export function useBeforeUnload(when: boolean) {
  useEffect(() => {
    if (!when) return

    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
      return ''
    }

    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [when])
}
