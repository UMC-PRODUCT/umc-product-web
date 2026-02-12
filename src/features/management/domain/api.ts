import { axiosInstance } from '@/api/axiosInstance'
import type { PartType } from '@/features/auth/domain'
import type { CommonPagingResponseDTO, CommonResponseDTO } from '@/shared/types/api'

import type {
  ChapterMiniType,
  ChapterType,
  Curriculum,
  ExternalLink,
  GisuType,
  University,
  UniversityFullType,
  UniversitySimple,
} from './model'
/** GET /curriculums - 파트별 커리큘럼 조회 */
export const getCurriculums = async (params: {
  part: PartType
}): Promise<CommonResponseDTO<Curriculum>> => {
  const { data } = await axiosInstance.get('/curriculums', { params })
  return data
}
/** GET /schools/all - 전체 학교 조회 */
export const getAllSchools = async (): Promise<
  CommonResponseDTO<{ schools: Array<UniversitySimple> }>
> => {
  const { data } = await axiosInstance.get('/schools/all')
  return data
}
/** GET /schools - 학교 목록 페이징 조회 */
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
/** GET /chapters - 챕터 목록 조회 */
export const getChapter = async (): Promise<
  CommonResponseDTO<{ chapters: Array<ChapterMiniType> }>
> => {
  const { data } = await axiosInstance.get('/chapters')
  return data
}
/** GET /schools/unassigned - 미배정 학교 조회 */
export const getUnassignedSchools = async ({
  gisuId,
}: {
  gisuId: string
}): Promise<CommonResponseDTO<{ schools: Array<UniversitySimple> }>> => {
  const { data } = await axiosInstance.get('/schools/unassigned', { params: { gisuId } })
  return data
}
/** GET /gisu/all - 기수 목록 */
export const getAllGisu = async (): Promise<
  CommonResponseDTO<{
    gisuList: Array<GisuType>
  }>
> => {
  const { data } = await axiosInstance.get('/gisu/all')
  return data
}

/** GET /gisu - 기수 목록 페이징 조회*/
export const getGisuList = async (
  page: string,
  size: string,
): Promise<
  CommonResponseDTO<{
    content: Array<GisuType>
    page: string
    size: string
    totalElements: string
    totalPages: string
    hasNext: boolean
    hasPrevious: boolean
  }>
> => {
  const { data } = await axiosInstance.get('/gisu', {
    params: { page, size },
  })
  return data
}

/** GET /schools/{schoolId} - 학교 상세 조회 */
export const getSchoolDetails = async ({
  schoolId,
}: {
  schoolId: string
}): Promise<CommonResponseDTO<UniversityFullType>> => {
  const { data } = await axiosInstance.get(`/schools/${schoolId}`)
  return data
}

/** GET /chapters/with-schools - 기수별 챕터+학교 조회 */
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
/** POST /schools - 학교 생성 */
export const postSchool = async (body: {
  schoolName: string
  remark?: string
  logoImageId?: string
  links: Array<ExternalLink>
}): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.post('/schools', body)
  return data
}
/** POST /gisu - 기수 생성 */
export const postGisu = async (body: {
  number: string
  startAt: string
  endAt: string
}): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.post('/gisu', body)
  return data
}
/** POST /gisu/{gisuId}/activate - 기수 활성화 */
export const postGisuActivate = async (gisuId: string): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.post(`/gisu/${gisuId}/activate`)
  return data
}
/** POST /chapters - 챕터 생성 */
export const postChapter = async (body: {
  gisuId: string
  name: string
  schoolIds?: Array<string>
}): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.post('/chapters', body)
  return data
}
/** PATCH /schools/{schoolId} - 학교 수정 */
export const patchSchool = async (
  schoolId: string,
  body: {
    schoolName?: string
    remark?: string
    logoImageId?: string
    links?: Array<ExternalLink>
  },
): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.patch(`/schools/${schoolId}`, body)
  return data
}
/** PATCH /schools/{schoolId}/unassign - 학교 배정 해제 */
export const patchSchoolUnAssign = async (
  schoolId: string,
  body: { gisuId: string },
): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.patch(`/schools/${schoolId}/unassign`, body)
  return data
}

/** PATCH /schools/{schoolId}/assign - 학교 배정 */
export const patchSchoolAssign = async (
  schoolId: string,
  body: { chapterId: string },
): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.patch(`/schools/${schoolId}/assign`, body)
  return data
}

/** DELETE /schools - 학교 삭제 */
export const deleteSchool = async (schoolIds: Array<string>): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.delete(`/schools`, { data: { schoolIds } })
  return data
}

/** DELETE /gisu/{gisuId} - 기수 삭제 */
export const deleteGisu = async (gisuId: string): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.delete(`/gisu/${gisuId}`)
  return data
}

/** DELETE /chapters/{chapterId} - 지부 삭제 */
export const deleteBranch = async (chapterId: string): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.delete(`/chapters/${chapterId}`)
  return data
}
