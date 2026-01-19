import { axiosInstance } from '@/api/axiosInstance'
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
type EmailVerificationResponseDTO = CommonResponseDTO<
  components['schemas']['SendEmailVerificationResponse']
>
type EmailVerificationRequestDTO = components['schemas']['SendEmailVerificationRequest']

export async function register(requestBody: RegisterRequestDTO): Promise<RegisterResponseDTO> {
  const { data } = await axiosInstance.post('/auth/register', requestBody)
  return data.result
}

export async function refresh(requestBody: RefreshRequestDTO): Promise<RefreshResponseDTO> {
  const { data } = await axiosInstance.post('/auth/refresh', requestBody)
  return data.result
}

// 추후 변경될 수 있음 (현재 로직은 직접 코드를 입력해서 인증을 받는 방식인데 디자인과 달라 Blocked 상태)
export async function emailVerification(
  requestBody: EmailVerificationRequestDTO,
): Promise<EmailVerificationResponseDTO> {
  const { data } = await axiosInstance.post('/auth/email-verification', requestBody)
  return data.result
}
