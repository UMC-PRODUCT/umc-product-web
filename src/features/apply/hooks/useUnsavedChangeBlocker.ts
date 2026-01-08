import { useEffect, useMemo, useRef, useState } from 'react'
import { useBlocker } from '@tanstack/react-router'

interface NavigationBlockerResult {
  /** 이탈 확인 모달 표시 여부 */
  isOpen: boolean
  /** 내부 페이지 전환 시 한 번만 네비게이션 허용 */
  allowNextNavigationOnce: () => void
  /** 현재 페이지에 머무르기 */
  stay: () => void
  /** 페이지 이탈 진행 */
  leave: () => void
}

/**
 * 저장되지 않은 변경사항이 있을 때 라우트 이탈을 차단하는 훅
 * @param shouldBlockNavigation - true일 경우 라우트 변경 시 차단
 */
export function useUnsavedChangesBlocker(shouldBlockNavigation: boolean): NavigationBlockerResult {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const shouldIgnoreNextNavigationRef = useRef(false)

  const blocker = useBlocker({
    withResolver: true,
    shouldBlockFn: () => {
      if (shouldIgnoreNextNavigationRef.current) {
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
    const allowNextNavigationOnce = () => {
      shouldIgnoreNextNavigationRef.current = true
      queueMicrotask(() => {
        shouldIgnoreNextNavigationRef.current = false
      })
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
