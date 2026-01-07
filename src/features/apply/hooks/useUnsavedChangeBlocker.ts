import { useEffect, useMemo, useState } from 'react'
import { useBlocker } from '@tanstack/react-router'

export function useUnsavedChangesBlocker(when: boolean) {
  const [open, setOpen] = useState(false)

  const blocker = useBlocker({
    shouldBlockFn: () => when,
    withResolver: true,
  })

  useEffect(() => {
    if (blocker.status === 'blocked') setOpen(true)
  }, [blocker.status])

  return useMemo(() => {
    return {
      open,
      stay: () => {
        setOpen(false)
        if (blocker.status !== 'blocked') return
        blocker.reset()
      },
      leave: () => {
        setOpen(false)
        if (blocker.status !== 'blocked') return
        blocker.proceed()
      },
      next: blocker.next,
      status: blocker.status,
    }
  }, [open, blocker.status, blocker.next, blocker])
}
