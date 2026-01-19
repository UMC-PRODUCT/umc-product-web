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

export async function register(requestBody: RegisterRequestDTO): Promise<RegisterResponseDTO> {
  const { data } = await axiosInstance.post('/auth/register', requestBody)
  return data.result
}

export async function refresh(
  requestBody: RefreshRequestDTO,
): Promise<CommonResponseDTO<RefreshResponseDTO>> {
  const { data } = await axiosInstance.post('/auth/refresh', requestBody)
  return data.result
}
