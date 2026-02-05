// 이메일 인증 상태를 관리하는 훅
import { useCallback, useEffect, useState } from 'react'

export interface EmailVerificationState {
  isVerified: boolean
  markVerified: () => void
  resetVerification: () => void
}

export interface EmailSendState {
  isSent: boolean
  sendEmail: () => void
  resetEmailSend: () => void
}

/**
 * 이메일 인증 상태를 관리하는 훅
 */
export function useEmailVerification(): EmailVerificationState {
  const [isVerified, setIsVerified] = useState(false)

  const markVerified = useCallback(() => setIsVerified(true), [])
  const resetVerification = useCallback(() => setIsVerified(false), [])

  return {
    isVerified,
    markVerified,
    resetVerification,
  }
}

export function useEmailSend(): EmailSendState {
  const [isSent, setIsSent] = useState(false)

  const sendEmail = useCallback(() => setIsSent(true), [])
  const resetEmailSend = useCallback(() => setIsSent(false), [])

  return {
    isSent,
    sendEmail,
    resetEmailSend,
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
