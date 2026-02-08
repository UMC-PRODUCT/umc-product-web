import { axiosInstance } from '@/api/axiosInstance'
import { SKIP_AUTH_REDIRECT_HEADER } from '@/shared/constants/apiHeaders'
import type { CommonResponseDTO } from '@/shared/types/api'
import type { TermsType } from '@/shared/types/umc'

import type {
  EmailVerificationRequestDTO,
  EmailVerificationResponseDTO,
  GetActiveGisuResponseDTO,
  GetGisuListResponseDTO,
  GetSchoolLinkResponseDTO,
  GetTermsResponseDTO,
  MyInfoResponseDTO,
  MyOAuthInfoResponseDTO,
  RefreshRequestDTO,
  RefreshResponseDTO,
  RegisterRequestDTO,
  RegisterResponseDTO,
  UpdateTermsRequestDTO,
  VerificationCodeRequestDTO,
  VerificationCodeResponseDTO,
} from './types'

export async function register(requestBody: RegisterRequestDTO): Promise<RegisterResponseDTO> {
  const { data } = await axiosInstance.post('/member/register', requestBody)
  return data.result
}

export const fetchTerm = async ({
  termsType,
}: {
  termsType: TermsType
}): Promise<CommonResponseDTO<GetTermsResponseDTO>> => {
  const { data } = await axiosInstance.get(`/terms/type/${termsType}`, {
    headers: SKIP_AUTH_REDIRECT_HEADER,
  })
  return data
}

export const fetchMyInfo = async (): Promise<MyInfoResponseDTO> => {
  const { data } = await axiosInstance.get('/member/me')
  return data.result
}

export const getSchoolLink = async (
  schoolId: string,
): Promise<CommonResponseDTO<GetSchoolLinkResponseDTO>> => {
  const { data } = await axiosInstance.get(`/schools/link/${schoolId}`)
  return data.result
}

export async function refresh(requestBody: RefreshRequestDTO): Promise<RefreshResponseDTO> {
  const { data } = await axiosInstance.post('/auth/token/renew', requestBody, {
    headers: SKIP_AUTH_REDIRECT_HEADER,
  })
  return data
}

export async function emailVerification(
  requestBody: EmailVerificationRequestDTO,
): Promise<EmailVerificationResponseDTO> {
  const { data } = await axiosInstance.post('/auth/email-verification', requestBody, {
    headers: SKIP_AUTH_REDIRECT_HEADER,
  })
  return data.result
}

export async function verifyEmailCode(
  requestBody: VerificationCodeRequestDTO,
): Promise<VerificationCodeResponseDTO> {
  const { data } = await axiosInstance.post('/auth/email-verification/code', requestBody, {
    headers: SKIP_AUTH_REDIRECT_HEADER,
  })
  return data.result
}

export async function getMyInfo(): Promise<MyInfoResponseDTO> {
  const { data } = await axiosInstance.get('/member/me')
  return data.result
}

export async function getTerm({
  termsType,
}: {
  termsType: TermsType
}): Promise<CommonResponseDTO<GetTermsResponseDTO>> {
  const { data } = await axiosInstance.get(`/terms/type/${termsType}`, {
    headers: SKIP_AUTH_REDIRECT_HEADER,
  })
  return data
}

export const getGisuList = async (): Promise<CommonResponseDTO<GetGisuListResponseDTO>> => {
  const { data } = await axiosInstance.get('/gisu/all')
  return data
}

export const getActiveGisu = async (): Promise<CommonResponseDTO<GetActiveGisuResponseDTO>> => {
  const { data } = await axiosInstance.get(`/gisu/active`)
  return data
}

export const getTermById = async (
  termId: string,
): Promise<CommonResponseDTO<GetTermsResponseDTO>> => {
  const { data } = await axiosInstance.get(`/terms/${termId}`, {
    headers: SKIP_AUTH_REDIRECT_HEADER,
  })
  return data
}

export const updateTerm = async (
  termId: string,
  requestBody: UpdateTermsRequestDTO,
): Promise<CommonResponseDTO<GetTermsResponseDTO>> => {
  const { data } = await axiosInstance.patch(`/terms/${termId}`, JSON.stringify(requestBody), {
    headers: { 'Content-Type': 'application/json' },
  })
  return data
}

export const getOAuthInfoMe = async (): Promise<MyOAuthInfoResponseDTO> => {
  const { data } = await axiosInstance.get('/member-oauth/me')
  return data.result
}

export const postAddOAuth = async ({
  oAuthVerificationToken,
}: {
  oAuthVerificationToken: string
}): Promise<CommonResponseDTO<MyOAuthInfoResponseDTO>> => {
  const { data } = await axiosInstance.post('/member-oauth', {
    oAuthVerificationToken,
  })
  return data
}

export const postRemoveOAuth = async ({
  memberOAuthId,
}: {
  memberOAuthId: number
}): Promise<void> => {
  const { data } = await axiosInstance.delete(`/member-oauth/${memberOAuthId}`)
  return data
}
