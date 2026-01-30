import type { CommonResponseDTO } from '@/shared/types/api'

export type RegisterResponseDTO = CommonResponseDTO<{ memberId?: number }>
export type RegisterRequestDTO = {
  oAuthVerificationToken?: string
  name?: string
  nickname?: string
  emailVerificationToken?: string
  schoolId?: number
  profileImageId?: number
  termsAgreements?: Array<{
    termsId?: number
    isAgreed?: boolean
  }>
}
export type RefreshResponseDTO = CommonResponseDTO<{ accessToken?: string }>
export type RefreshRequestDTO = {
  refreshToken?: string
}
export type EmailVerificationRequestDTO = {
  email?: string
}
export type EmailVerificationResponseDTO = { emailVerificationId?: string }

export type VerificationCodeRequestDTO = {
  emailVerificationId?: string
  verificationCode?: string
}
export type VerificationCodeResponseDTO = { emailVerificationToken?: string }

export type MyInfoResponseDTO = CommonResponseDTO<{
  id?: number
  name?: string
  nickname?: string
  email?: string
  schoolId?: number
  schoolName?: number
  profileImageLink?: number
  status?: 'ACTIVE' | 'INACTIVE' | 'WITHDRAWN'
}>

export type GetTermsResponseDTO = {
  id: string
  title: string
  content: string
  isMandatory: boolean
}
