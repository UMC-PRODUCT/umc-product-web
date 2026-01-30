import { axiosInstance } from '@/api/axiosInstance'
import { SKIP_AUTH_REDIRECT_HEADER } from '@/shared/constants/apiHeaders'
import type { CommonResponseDTO } from '@/shared/types/api'
import type { TermsType } from '@/shared/types/umc'

import type {
  EmailVerificationRequestDTO,
  EmailVerificationResponseDTO,
  GetTermsResponseDTO,
  MyInfoResponseDTO,
  RefreshRequestDTO,
  RefreshResponseDTO,
  RegisterRequestDTO,
  RegisterResponseDTO,
  VerificationCodeRequestDTO,
  VerificationCodeResponseDTO,
} from './types'

export async function register(requestBody: RegisterRequestDTO): Promise<RegisterResponseDTO> {
  const { data } = await axiosInstance.post('/member/register', requestBody)
  return data.result
}

export async function refresh(requestBody: RefreshRequestDTO): Promise<RefreshResponseDTO> {
  const { data } = await axiosInstance.post<RefreshResponseDTO>('/auth/token/renew', requestBody, {
    headers: SKIP_AUTH_REDIRECT_HEADER,
  })
  return data
}

export async function emailVerification(
  requestBody: EmailVerificationRequestDTO,
): Promise<EmailVerificationResponseDTO> {
  const { data } = await axiosInstance.post('/auth/email-verification', requestBody, {
    headers: SKIP_AUTH_REDIRECT_HEADER,
  })
  return data.result
}

export async function verifyEmailCode(
  requestBody: VerificationCodeRequestDTO,
): Promise<VerificationCodeResponseDTO> {
  const { data } = await axiosInstance.post('/auth/email-verification/code', requestBody, {
    headers: SKIP_AUTH_REDIRECT_HEADER,
  })
  return data.result
}

export async function getMyInfo(): Promise<MyInfoResponseDTO> {
  const { data } = await axiosInstance.get('/member/me')
  return data.result
}

export async function getTerm({
  termsType,
}: {
  termsType: TermsType
}): Promise<CommonResponseDTO<GetTermsResponseDTO>> {
  const { data } = await axiosInstance.get(`/terms/type/${termsType}`, {
    headers: SKIP_AUTH_REDIRECT_HEADER,
  })
  return data
}
