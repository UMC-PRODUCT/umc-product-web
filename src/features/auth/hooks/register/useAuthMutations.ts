// 회원가입 및 이메일 인증 관련 API 뮤테이션 훅 모음
import { useCustomMutation } from '@/shared/hooks/customQuery'

import { emailVerification, register, verifyEmailCode } from '../../domain/api'

export function useAuth() {
  function useRegister() {
    return useCustomMutation(register)
  }
  function useSendEmail() {
    return useCustomMutation(emailVerification)
  }
  function useVerifyCode() {
    return useCustomMutation(verifyEmailCode)
  }
  return { useRegister, useSendEmail, useVerifyCode }
}
