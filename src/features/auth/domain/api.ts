import { axiosInstance } from '@/api/axiosInstance'
import type { components } from '@/shared/types/type'
import type { TermsType } from '@/shared/types/umc'

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
export type TermsRequestDTO = {
  termsType: TermsType
}
type MyInfoResponseDTO = components['schemas']['MemberInfoResponse']
export type TermsResponseDTO = components['schemas']['TermsResponse']

const SKIP_AUTH_REDIRECT_HEADER = { 'x-skip-auth-redirect': 'true' }

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

export async function getTermsId(requestBody: TermsRequestDTO): Promise<TermsResponseDTO> {
  const { data } = await axiosInstance.get<CommonResponseDTO<TermsResponseDTO>>(
    `/terms/type/${requestBody.termsType}`,
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
