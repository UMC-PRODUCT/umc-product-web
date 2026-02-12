// 회원가입 및 이메일 인증 관련 API 뮤테이션 훅 모음
import { useCustomMutation } from '@/shared/hooks/customQuery'

import {
  deleteMemberOAuth,
  postEmailVerification,
  postEmailVerificationCode,
  postMemberOAuth,
  postRegister,
} from '../domain/api'

export function useAuthMutation() {
  /** 회원가입 */
  function usePostRegister() {
    return useCustomMutation(postRegister)
  }
  /** 이메일 인증 요청 */
  function usePostEmailVerification() {
    return useCustomMutation(postEmailVerification)
  }
  /** 이메일 인증 코드 확인 */
  function usePostEmailVerificationCode() {
    return useCustomMutation(postEmailVerificationCode)
  }
  /** OAuth 연결 추가 */
  function usePostMemberOAuth() {
    return useCustomMutation(postMemberOAuth)
  }
  /** OAuth 연결 해제 */
  function useDeleteMemberOAuth() {
    return useCustomMutation(deleteMemberOAuth)
  }
  return {
    usePostRegister,
    usePostEmailVerification,
    usePostEmailVerificationCode,
    usePostMemberOAuth,
    useDeleteMemberOAuth,
  }
}
