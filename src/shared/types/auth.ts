import type { CommonResponseDTO } from './api'

export type PostRefreshTokenResponseDTO = CommonResponseDTO<{
  accessToken: string
  refreshToken: string
}>
