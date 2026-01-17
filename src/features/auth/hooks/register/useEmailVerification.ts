import { useCallback, useEffect, useState } from 'react'

export interface EmailVerificationState {
  isVerified: boolean
  toggleVerification: () => void
  resetVerification: () => void
}

/**
 * 이메일 인증 상태를 관리하는 훅
 */
export function useEmailVerification(): EmailVerificationState {
  const [isVerified, setIsVerified] = useState(false)

  const toggleVerification = useCallback(() => setIsVerified((prev) => !prev), [])
  const resetVerification = useCallback(() => setIsVerified(false), [])

  return {
    isVerified,
    toggleVerification,
    resetVerification,
  }
}

/**
 * 이메일 변경 시 인증 상태를 초기화하는 훅
 */
export function useEmailVerificationSync(watchedEmail: string, resetVerification: () => void) {
  useEffect(() => {
    resetVerification()
  }, [watchedEmail, resetVerification])
}
