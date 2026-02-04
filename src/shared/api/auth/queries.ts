import { createQueryKeys } from '@lukemorales/query-key-factory'

import { axiosInstance } from '@/api/axiosInstance'
import { SKIP_AUTH_REDIRECT_HEADER } from '@/shared/constants/apiHeaders'
import type { CommonResponseDTO } from '@/shared/types/api'
import type { TermsType } from '@/shared/types/umc'

export type GetTermsResponseDTO = {
  id: string
  title: string
  content: string
  isMandatory: boolean
}

export type MyInfoResponseDTO = {
  id?: number
  name?: string
  nickname?: string
  email?: string
  schoolId?: number
  schoolName?: string
  profileImageLink?: string
  status?: 'ACTIVE' | 'INACTIVE' | 'WITHDRAWN'
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
  const { data } = await axiosInstance.get(`/admin/schools/link/${schoolId}`)
  return data
}

export const getGisuList = async (): Promise<CommonResponseDTO<GetGisuListResponseDTO>> => {
  const { data } = await axiosInstance.get('/admin/gisu')
  return data
}

export const termsKeys = createQueryKeys('terms', {
  detail: (termsType: TermsType) => ({
    queryKey: ['terms', termsType, 'detail'],
    queryFn: () => fetchTerm({ termsType }),
  }),
})

export const memberKeys = createQueryKeys('member', {
  me: () => ({
    queryKey: ['member', 'me'],
    queryFn: () => fetchMyInfo(),
  }),
})

export const schoolKeys = createQueryKeys('school', {
  schoolLink: (schoolId: string) => ({
    queryKey: [schoolId, 'link'],
    queryFn: () => getSchoolLink(schoolId),
  }),
  gisu: () => ({
    queryKey: ['gisu'],
    queryFn: () => getGisuList(),
  }),
})
