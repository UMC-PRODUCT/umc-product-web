import { useEffect } from 'react'

/**
 * 페이지 이탈 시 브라우저 경고를 표시하는 훅
 * @param shouldWarnOnLeave - true일 경우 페이지 이탈 시 경고 표시
 */
export function useBeforeUnload(shouldWarnOnLeave: boolean): void {
  useEffect(() => {
    if (!shouldWarnOnLeave) return

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ''
      return ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [shouldWarnOnLeave])
}
