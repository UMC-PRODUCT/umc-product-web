import { axiosInstance } from '@/api/axiosInstance'
import { SKIP_AUTH_REDIRECT_HEADER } from '@/shared/constants/apiHeaders'
import type { components } from '@/shared/types/type'

type CommonResponseDTO<T> = {
  success: boolean
  code: string
  message: string
  result: T
}

type RegisterResponseDTO = CommonResponseDTO<components['schemas']['RegisterResponse']>
type RegisterRequestDTO = components['schemas']['RegisterMemberRequest']
type RefreshResponseDTO = CommonResponseDTO<components['schemas']['RenewAccessTokenResponse']>
type RefreshRequestDTO = components['schemas']['RenewAccessTokenRequest']
type EmailVerificationRequestDTO = components['schemas']['SendEmailVerificationRequest']
type EmailVerificationResponseDTO = components['schemas']['SendEmailVerificationResponse']
type VerificationCodeRequestDTO = components['schemas']['CompleteEmailVerificationRequest']
type VerificationCodeResponseDTO = components['schemas']['CompleteEmailVerificationResponse']
type MyInfoResponseDTO = components['schemas']['MemberInfoResponse']

export async function register(requestBody: RegisterRequestDTO): Promise<RegisterResponseDTO> {
  const { data } = await axiosInstance.post('/member/register', requestBody)
  return data.result
}

export async function refresh(requestBody: RefreshRequestDTO): Promise<RefreshResponseDTO> {
  const { data } = await axiosInstance.post('/auth/refresh', requestBody)
  return data.result
}

export async function emailVerification(
  requestBody: EmailVerificationRequestDTO,
): Promise<EmailVerificationResponseDTO> {
  const { data } = await axiosInstance.post<CommonResponseDTO<EmailVerificationResponseDTO>>(
    '/auth/email-verification',
    requestBody,
    {
      headers: SKIP_AUTH_REDIRECT_HEADER,
    },
  )
  return data.result
}

export async function verifyEmailCode(
  requestBody: VerificationCodeRequestDTO,
): Promise<VerificationCodeResponseDTO> {
  const { data } = await axiosInstance.post<CommonResponseDTO<VerificationCodeResponseDTO>>(
    '/auth/email-verification/code',
    requestBody,
    {
      headers: SKIP_AUTH_REDIRECT_HEADER,
    },
  )
  return data.result
}

export async function getMyInfo(): Promise<MyInfoResponseDTO> {
  const { data } = await axiosInstance.get<CommonResponseDTO<MyInfoResponseDTO>>('/member/me')
  return data.result
}
