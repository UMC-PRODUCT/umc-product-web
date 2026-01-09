import { useEffect, useState } from 'react'

const useEmailVerification = (email?: string, onInvite?: () => void) => {
  const [isEmailVerified, setIsEmailVerified] = useState(false)

  const handleSendVerificationEmail = () => {
    setIsEmailVerified((previous) => !previous)
    onInvite?.()
  }

  const emailVerificationButtonLabel = isEmailVerified ? '발송완료' : '초대하기'

  useEffect(() => {
    setIsEmailVerified(false)
  }, [email])

  return { emailVerificationButtonLabel, handleSendVerificationEmail, isEmailVerified }
}

export default useEmailVerification
