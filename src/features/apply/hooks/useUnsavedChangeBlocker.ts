import { useEffect, useMemo, useRef, useState } from 'react'
import { useBlocker } from '@tanstack/react-router'

import type { NavigationBlockerResult } from '@/features/apply/types/unsavedChangeBlocker'

/**
 * 저장되지 않은 변경사항이 있을 때 라우트 이탈을 차단하는 훅
 * @param shouldBlockNavigation - true일 경우 라우트 변경 시 차단
 */
export function useUnsavedChangesBlocker(shouldBlockNavigation: boolean): NavigationBlockerResult {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const allowNextNavigationCountRef = useRef(0)

  // 라우트 변경 시 차단 여부 결정.
  const blocker = useBlocker({
    withResolver: true,
    shouldBlockFn: ({ current, next }) => {
      if (allowNextNavigationCountRef.current > 0) {
        allowNextNavigationCountRef.current -= 1
        return false
      }
      const isSameRoute =
        current.routeId === next.routeId &&
        current.pathname === next.pathname &&
        JSON.stringify(current.params) === JSON.stringify(next.params)
      if (isSameRoute) {
        return false
      }
      return shouldBlockNavigation
    },
  })

  useEffect(() => {
    if (blocker.status === 'blocked') {
      setIsModalOpen(true)
    }
  }, [blocker.status])

  return useMemo((): NavigationBlockerResult => {
    // 다음 네비게이션을 1회 허용(내부 이동용).
    const allowNextNavigationOnce = () => {
      allowNextNavigationCountRef.current += 1
    }

    const stay = () => {
      setIsModalOpen(false)
      if (blocker.status === 'blocked') {
        blocker.reset()
      }
    }

    const leave = () => {
      setIsModalOpen(false)
      if (blocker.status === 'blocked') {
        blocker.proceed()
      }
    }

    return {
      isOpen: isModalOpen,
      allowNextNavigationOnce,
      stay,
      leave,
    }
  }, [isModalOpen, blocker])
}
