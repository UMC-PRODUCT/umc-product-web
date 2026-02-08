import type { CommonResponseDTO } from '@/shared/types/api'
import type { OrganizationType, RoleType } from '@/shared/types/umc'

import type { PartType } from './model'

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
export type RefreshResponseDTO = CommonResponseDTO<{ accessToken: string; refreshToken: string }>
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

export type MyInfoResponseDTO = {
  id?: number
  name?: string
  nickname?: string
  email?: string
  schoolId?: number
  schoolName?: string
  profileImageLink?: string
  status?: 'ACTIVE' | 'INACTIVE' | 'WITHDRAWN'
  roles: Array<{
    id: string
    challengerId: string
    roleType: RoleType
    organizationType: OrganizationType
    responsiblePart: PartType | null
    gisuId: string
  }>
}

export type MyOAuthInfoResponseDTO = Array<{
  memberOAuthId: string
  memberId: string
  provider: 'KAKAO' | 'GOOGLE' | 'APPLE'
}>

export type GetTermsResponseDTO = {
  id: string
  title: string
  content: string
  isMandatory: boolean
}

export type UpdateTermsRequestDTO = {
  content: string
}

export type GetSchoolLinkResponseDTO = {
  kakaoLink?: string
  instagramLink?: string
  youtubeLink?: string
}

export type GetGisuListResponseDTO = {
  gisuList: Array<{
    gisuId: string
    generation: string
    startsAt: string
    endsAt: string
    isActive: boolean
  }>
}

export type GetActiveGisuResponseDTO = {
  gisuId: string
  generation: string
}
