import { axiosInstance } from '@/api/axiosInstance'
import type { PartType } from '@/features/auth/domain'
import type { CommonPagingResponseDTO, CommonResponseDTO } from '@/shared/types/api'

import type {
  ChapterMiniType,
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
  /** GET /curriculums - 파트별 커리큘럼 조회 */
  const { data } = await axiosInstance.get('/curriculums', { params })
  return data
}

export const getAllSchools = async (): Promise<
  CommonResponseDTO<{ schools: Array<UniversitySimple> }>
> => {
  /** GET /schools/all - 전체 학교 조회 */
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
  /** GET /schools - 학교 목록 페이징 조회 */
  const { data } = await axiosInstance.get('/schools', { params })
  return data
}

export const getChapter = async (): Promise<
  CommonResponseDTO<{ chapters: Array<ChapterMiniType> }>
> => {
  /** GET /chapters - 챕터 목록 조회 */
  const { data } = await axiosInstance.get('/chapters')
  return data
}

export const getUnassignedSchools = async ({
  gisuId,
}: {
  gisuId: string
}): Promise<CommonResponseDTO<{ schools: Array<UniversitySimple> }>> => {
  /** GET /schools/unassigned - 미배정 학교 조회 */
  const { data } = await axiosInstance.get('/schools/unassigned', { params: { gisuId } })
  return data
}

export const getAllGisu = async (): Promise<
  CommonResponseDTO<{
    gisuList: Array<GisuType>
  }>
> => {
  /** GET /gisu/all - 기수 목록 */
  const { data } = await axiosInstance.get('/gisu/all')
  return data
}

export const getSchoolDetails = async ({
  schoolId,
}: {
  schoolId: string
}): Promise<CommonResponseDTO<UniversityFullType>> => {
  /** GET /schools/{schoolId} - 학교 상세 조회 */
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
  /** GET /chapters/with-schools - 기수별 챕터+학교 조회 */
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
  /** POST /schools - 학교 생성 */
  const { data } = await axiosInstance.post('/schools', body)
  return data
}

export const postGisu = async (body: {
  number: string
  startAt: string
  endAt: string
}): Promise<CommonResponseDTO<null>> => {
  /** POST /gisu - 기수 생성 */
  const { data } = await axiosInstance.post('/gisu', body)
  return data
}

export const postGisuActivate = async (gisuId: string): Promise<CommonResponseDTO<null>> => {
  /** POST /gisu/{gisuId}/activate - 기수 활성화 */
  const { data } = await axiosInstance.post(`/gisu/${gisuId}/activate`)
  return data
}

export const postChapter = async (body: {
  gisuId: string
  name: string
  schoolIds?: Array<string>
}): Promise<CommonResponseDTO<null>> => {
  /** POST /chapters - 챕터 생성 */
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
  /** PATCH /schools/{schoolId} - 학교 수정 */
  const { data } = await axiosInstance.patch(`/schools/${schoolId}`, body)
  return data
}

export const patchSchoolUnAssign = async (
  schoolId: string,
  body: { gisuId: string },
): Promise<CommonResponseDTO<null>> => {
  /** PATCH /schools/{schoolId}/unassign - 학교 배정 해제 */
  const { data } = await axiosInstance.patch(`/schools/${schoolId}/unassign`, body)
  return data
}

export const patchSchoolAssign = async (
  schoolId: string,
  body: { chapterId: string },
): Promise<CommonResponseDTO<null>> => {
  /** PATCH /schools/{schoolId}/assign - 학교 배정 */
  const { data } = await axiosInstance.patch(`/schools/${schoolId}/assign`, body)
  return data
}

export const deleteSchool = async (schoolIds: Array<string>): Promise<CommonResponseDTO<null>> => {
  /** DELETE /schools - 학교 삭제 */
  const { data } = await axiosInstance.delete(`/schools`, { data: { schoolIds } })
  return data
}

export const deleteGisu = async (gisuId: string): Promise<CommonResponseDTO<null>> => {
  /** DELETE /gisu/{gisuId} - 기수 삭제 */
  const { data } = await axiosInstance.delete(`/gisu/${gisuId}`)
  return data
}
