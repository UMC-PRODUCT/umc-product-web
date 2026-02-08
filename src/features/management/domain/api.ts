import { axiosInstance } from '@/api/axiosInstance'
import type { PartType } from '@/features/auth/domain'
import type { CommonPagingResponseDTO, CommonResponseDTO } from '@/shared/types/api'

import type {
  ChapterType,
  Curriculum,
  GisuType,
  University,
  UniversityFullType,
  UniversitySimple,
} from './model'

export const getCurriculums = async (params: {
  part: PartType
}): Promise<CommonResponseDTO<Curriculum>> => {
  const { data } = await axiosInstance.get('/curriculums', { params })
  return data
}

export const getAllSchools = async (): Promise<
  CommonResponseDTO<{ schools: Array<UniversitySimple> }>
> => {
  const { data } = await axiosInstance.get('/schools/all')
  return data
}

export const getSchoolsPaging = async (params: {
  page?: string
  size?: string
  sort?: 'asc' | 'desc'
  chapterId?: string
  keyword?: string
}): Promise<CommonPagingResponseDTO<University>> => {
  const { data } = await axiosInstance.get('/schools', { params })
  return data
}

export const getUnassignedSchools = async ({
  gisuId,
}: {
  gisuId: string
}): Promise<CommonResponseDTO<{ schools: Array<UniversitySimple> }>> => {
  const { data } = await axiosInstance.get('/schools/unassigned', { params: { gisuId } })
  return data
}

export const getAllGisu = async (): Promise<
  CommonResponseDTO<{
    gisuList: Array<GisuType>
  }>
> => {
  const { data } = await axiosInstance.get('/gisu/all')
  return data
}

export const getSchoolDetails = async ({
  schoolId,
}: {
  schoolId: string
}): Promise<CommonResponseDTO<UniversityFullType>> => {
  const { data } = await axiosInstance.get(`/schools/${schoolId}`)
  return data
}

export const getGisuChapterWithSchools = async ({
  gisuId,
}: {
  gisuId: string
}): Promise<
  CommonResponseDTO<{
    chapters: Array<ChapterType>
  }>
> => {
  const { data } = await axiosInstance.get(`/chapters/with-schools`, { params: { gisuId } })
  return data
}

export const postSchool = async (body: {
  schoolName: string
  remark?: string
  logoImageId?: string
  kakaoLink?: string
  instagramLink?: string
  youtubeLink?: string
}): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.post('/schools', body)
  return data
}

export const postGisu = async (body: {
  number: string
  startAt: string
  endAt: string
}): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.post('/gisu', body)
  return data
}

export const postGisuActivate = async (gisuId: string): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.post(`/gisu/${gisuId}/activate`)
  return data
}

export const postChapter = async (body: {
  gisuId: string
  name: string
  schoolIds?: Array<string>
}): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.post('/chapters', body)
  return data
}

export const patchSchool = async (
  schoolId: string,
  body: {
    schoolName?: string
    remark?: string
    logoImageId?: string | null
    kakaoLink?: string | null
    instagramLink?: string | null
    youtubeLink?: string | null
  },
): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.patch(`/schools/${schoolId}`, body)
  return data
}

export const patchSchoolUnAssign = async (
  schoolId: string,
  body: { gisuId: string },
): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.patch(`/schools/${schoolId}/unassign`, body)
  return data
}

export const patchSchoolAssign = async (
  schoolId: string,
  body: { chapterId: string },
): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.patch(`/schools/${schoolId}/assign`, body)
  return data
}

export const deleteSchool = async (schoolIds: Array<string>): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.delete(`/schools`, { data: { schoolIds } })
  return data
}

export const deleteGisu = async (gisuId: string): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.delete(`/gisu/${gisuId}`)
  return data
}
