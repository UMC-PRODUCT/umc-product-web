// 회원가입 및 이메일 인증 관련 API 뮤테이션 훅 모음
import { useCustomMutation } from '@/shared/hooks/customQuery'

import {
  emailVerification,
  postAddOAuth,
  postRemoveOAuth,
  register,
  verifyEmailCode,
} from '../domain/api'

export function useAuthMutation() {
  function useRegister() {
    return useCustomMutation(register)
  }
  function useSendEmail() {
    return useCustomMutation(emailVerification)
  }
  function useVerifyCode() {
    return useCustomMutation(verifyEmailCode)
  }
  function useAddOAuth() {
    return useCustomMutation(postAddOAuth)
  }
  function useDeleteOAuth() {
    return useCustomMutation(postRemoveOAuth)
  }
  return { useRegister, useSendEmail, useVerifyCode, useAddOAuth, useDeleteOAuth }
}
