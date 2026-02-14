import type { LinkType } from '@/shared/constants/umc'
import type { CommonResponseDTO } from '@/shared/types/api'
import type { OrganizationType, RoleType } from '@/shared/types/umc'

import type { PartType } from './model'

export type PostRegisterResponseDTO = CommonResponseDTO<{
  memberId: string
  accessToken: string
  refreshToken: string
}>

export type PostRegisterRequestDTO = {
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
export type PostRefreshTokenResponseDTO = CommonResponseDTO<{
  accessToken: string
  refreshToken: string
}>
export type PostRefreshTokenRequestDTO = {
  refreshToken?: string
}
export type PostEmailVerificationRequestDTO = {
  email?: string
}
export type PostEmailVerificationResponseDTO = { emailVerificationId?: string }

export type PostEmailVerificationCodeRequestDTO = {
  emailVerificationId?: string
  verificationCode?: string
}
export type PostEmailVerificationCodeResponseDTO = { emailVerificationToken?: string }

export type GetMemberMeResponseDTO = {
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

export type GetMemberOAuthMeResponseDTO = Array<{
  memberOAuthId: string
  memberId: string
  provider: 'KAKAO' | 'GOOGLE' | 'APPLE'
}>

export type GetTermsResponseDTO = {
  id: string
  link: string
  isMandatory: boolean
}

export type PatchTermsRequestDTO = {
  content: string
}

export type ExternalLink = {
  title: string
  type: LinkType
  url: string
}

export type GetSchoolLinkResponseDTO = {
  links: Array<ExternalLink>
}

export type GetActiveGisuResponseDTO = {
  gisuId: string
  generation: string
}
