import { axiosInstance } from '@/api/axiosInstance'
import { SKIP_AUTH_REDIRECT_HEADER } from '@/shared/constants/apiHeaders'
import type { CommonResponseDTO } from '@/shared/types/api'
import type { TermsType } from '@/shared/types/umc'

import type {
  GetActiveGisuResponseDTO,
  GetMemberMeResponseDTO,
  GetMemberOAuthMeResponseDTO,
  GetSchoolLinkResponseDTO,
  GetTermsResponseDTO,
  PatchTermsRequestDTO,
  PostEmailVerificationCodeRequestDTO,
  PostEmailVerificationCodeResponseDTO,
  PostEmailVerificationRequestDTO,
  PostEmailVerificationResponseDTO,
  PostRefreshTokenRequestDTO,
  PostRefreshTokenResponseDTO,
  PostRegisterRequestDTO,
  PostRegisterResponseDTO,
} from './types'

/** POST /member/register - 회원 가입 */
export async function postRegister(
  requestBody: PostRegisterRequestDTO,
): Promise<PostRegisterResponseDTO> {
  const { data } = await axiosInstance.post('/member/register', requestBody)
  return data.result
}

/** GET /schools/link/{schoolId} - 학교 링크 조회 */
export const getSchoolLink = async (
  schoolId: string,
): Promise<CommonResponseDTO<GetSchoolLinkResponseDTO>> => {
  const { data } = await axiosInstance.get(`/schools/link/${schoolId}`)
  return data
}

/** POST /auth/token/renew - 토큰 갱신 */
export async function postRefreshToken(
  requestBody: PostRefreshTokenRequestDTO,
): Promise<PostRefreshTokenResponseDTO> {
  const { data } = await axiosInstance.post('/auth/token/renew', requestBody, {
    headers: SKIP_AUTH_REDIRECT_HEADER,
  })
  return data
}

/** POST /auth/email-verification - 이메일 인증 요청 */
export async function postEmailVerification(
  requestBody: PostEmailVerificationRequestDTO,
): Promise<PostEmailVerificationResponseDTO> {
  const { data } = await axiosInstance.post('/auth/email-verification', requestBody, {
    headers: SKIP_AUTH_REDIRECT_HEADER,
  })
  return data.result
}

/** POST /auth/email-verification/code - 이메일 인증 코드 확인 */
export async function postEmailVerificationCode(
  requestBody: PostEmailVerificationCodeRequestDTO,
): Promise<PostEmailVerificationCodeResponseDTO> {
  const { data } = await axiosInstance.post('/auth/email-verification/code', requestBody, {
    headers: SKIP_AUTH_REDIRECT_HEADER,
  })
  return data.result
}

/** GET /member/me - 내 정보 조회 */
export async function getMemberMe(): Promise<GetMemberMeResponseDTO> {
  const { data } = await axiosInstance.get('/member/me')
  return data.result
}

/** GET /terms/type/{termsType} - 약관 조회(타입별) */
export async function getTermsByType({
  termsType,
}: {
  termsType: TermsType
}): Promise<CommonResponseDTO<GetTermsResponseDTO>> {
  const { data } = await axiosInstance.get(`/terms/type/${termsType}`, {
    headers: SKIP_AUTH_REDIRECT_HEADER,
  })
  return data
}

/** GET /gisu/active - 활성 기수 */
export const getActiveGisu = async (): Promise<CommonResponseDTO<GetActiveGisuResponseDTO>> => {
  const { data } = await axiosInstance.get(`/gisu/active`)
  return data
}

/** GET /terms/{termId} - 약관 상세 조회 */
export const getTermsById = async (
  termId: string,
): Promise<CommonResponseDTO<GetTermsResponseDTO>> => {
  const { data } = await axiosInstance.get(`/terms/${termId}`, {
    headers: SKIP_AUTH_REDIRECT_HEADER,
  })
  return data
}

/** PATCH /terms/{termId} - 약관 수정 */
export const patchTerms = async (
  termId: string,
  requestBody: PatchTermsRequestDTO,
): Promise<CommonResponseDTO<GetTermsResponseDTO>> => {
  const { data } = await axiosInstance.patch(`/terms/${termId}`, JSON.stringify(requestBody), {
    headers: { 'Content-Type': 'application/json' },
  })
  return data
}

/** GET /member-oauth/me - OAuth 연결 정보 조회 */
export const getMemberOAuthMe = async (): Promise<GetMemberOAuthMeResponseDTO> => {
  const { data } = await axiosInstance.get('/member-oauth/me')
  return data.result
}

/** POST /member-oauth - OAuth 연결 추가 */
export const postMemberOAuth = async ({
  oAuthVerificationToken,
}: {
  oAuthVerificationToken: string
}): Promise<CommonResponseDTO<GetMemberOAuthMeResponseDTO>> => {
  const { data } = await axiosInstance.post('/member-oauth', {
    oAuthVerificationToken,
  })
  return data
}

/** DELETE /member-oauth/{memberOAuthId} - OAuth 연결 해제 */
export const deleteMemberOAuth = async ({
  memberOAuthId,
}: {
  memberOAuthId: number
}): Promise<void> => {
  const { data } = await axiosInstance.delete(`/member-oauth/${memberOAuthId}`)
  return data
}
