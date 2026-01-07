import { useEffect, useMemo, useRef, useState } from 'react'
import { useBlocker } from '@tanstack/react-router'

export function useUnsavedChangesBlocker(when: boolean) {
  const [open, setOpen] = useState(false)
  const ignoreOnceRef = useRef(false)

  const blocker = useBlocker({
    withResolver: true,
    shouldBlockFn: () => {
      if (ignoreOnceRef.current) return false
      return when
    },
  })

  useEffect(() => {
    if (blocker.status === 'blocked') setOpen(true)
  }, [blocker.status])

  return useMemo(() => {
    return {
      open,

      /** 다음/이전 같은 "내부 페이지 전환" 직전에 호출 */
      allowNextNavigationOnce: () => {
        ignoreOnceRef.current = true
        // 다음 tick에 원복 (한 번만 허용)
        queueMicrotask(() => {
          ignoreOnceRef.current = false
        })
      },

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
    }
  }, [open, blocker])
}
