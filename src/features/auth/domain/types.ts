import type { CommonResponseDTO } from '@/shared/types/api'
import type { ExternalLink } from '@/shared/types/link'
import type { OrganizationType, RoleType } from '@/shared/types/umc'

import type { PartType } from './model'

export type { PostRefreshTokenResponseDTO } from '@/shared/types/auth'
export type { ExternalLink } from '@/shared/types/link'

export type RegisterTokenPayload = {
  memberId: string
  accessToken: string
  refreshToken: string
}

export type PostRegisterResponseDTO = CommonResponseDTO<RegisterTokenPayload> | RegisterTokenPayload

export type PostRegisterRequestDTO = {
  oAuthVerificationToken?: string
  name?: string
  nickname?: string
  emailVerificationToken?: string
  schoolId?: string
  profileImageId?: string
  termsAgreements?: Array<{
    termsId?: string
    isAgreed?: boolean
  }>
}
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

export type PostChallengerRecordMemberRequestDTO = {
  code: string
}

export type GetMemberMeResponseDTO = {
  id?: string
  name?: string
  nickname?: string
  email?: string
  schoolId?: string
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

export type GetSchoolLinkResponseDTO = {
  links: Array<ExternalLink>
}

export type GetActiveGisuResponseDTO = {
  gisuId: string
  gisu: string
}
