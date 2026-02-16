import { axiosInstance } from '@/api/axiosInstance'
import type { CommonPagingResponseDTO, CommonResponseDTO } from '@/shared/types/api'

import type {
  AllGisuResponseDTO,
  ChallengerDetailResponseDTO,
  ChallengerRoleDetailResponseDTO,
  ChaptersResponseDTO,
  Curriculum,
  GetChallengerParams,
  GetChallengerResponseDTO,
  GetCurriculumsParams,
  GetGisuChapterWithSchoolsParams,
  GetGisuDetailParams,
  GetRecruitementsApplicationsParams,
  GetRecruitmentsApplication,
  GetSchoolDetailsParams,
  GetSchoolsPagingParams,
  GetUnassignedSchoolsParams,
  GisuChapterWithSchoolsResponseDTO,
  GisuType,
  MemberProfileResponseDTO,
  PatchSchoolAssignBody,
  PatchSchoolBody,
  PatchSchoolUnassignBody,
  PostChallengerDeactivateBody,
  PostChallengerRoleBody,
  PostChallengerRoleResponseDTO,
  PostChapterBody,
  PostGisuBody,
  PostSchoolBody,
  PutCurriculumsBody,
  SchoolsResponseDTO,
  University,
  UniversityFullType,
} from './model'

/** GET /schools/gisu/{gisuId} - 기수별 학교 목록 조회 */
export const getSchoolsByGisu = async (
  gisuId: string,
): Promise<CommonResponseDTO<Array<UniversityFullType>>> => {
  const { data } = await axiosInstance.get(`/schools/gisu/${gisuId}`)
  return data
}
/**
 * 파트별 커리큘럼을 조회함
 * @param params - 파트 조회 파라미터
 * @returns 커리큘럼 응답 데이터
 */
export const getCurriculums = async (
  params: GetCurriculumsParams,
): Promise<CommonResponseDTO<Curriculum>> => {
  const { data } = await axiosInstance.get('/curriculums', { params })
  return data
}
/**
 * 전체 학교 목록을 조회함
 * @returns 전체 학교 목록 응답 데이터
 */
export const getAllSchools = async (): Promise<CommonResponseDTO<SchoolsResponseDTO>> => {
  const { data } = await axiosInstance.get('/schools/all')
  return data
}
/**
 * 학교 목록을 페이징으로 조회함
 * @param params - 페이지/정렬/검색 파라미터
 * @returns 학교 페이징 응답 데이터
 */
export const getSchoolsPaging = async (
  params: GetSchoolsPagingParams,
): Promise<CommonResponseDTO<CommonPagingResponseDTO<University>>> => {
  const { data } = await axiosInstance.get('/schools', { params })
  return data
}
/**
 * 전체 지부(챕터) 목록을 조회함
 * @returns 지부 목록 응답 데이터
 */
export const getChapter = async (): Promise<CommonResponseDTO<ChaptersResponseDTO>> => {
  const { data } = await axiosInstance.get('/chapters')
  return data
}
/**
 * 특정 기수의 미배정 학교 목록을 조회함
 * @param gisuId - 기수 ID
 * @returns 미배정 학교 목록 응답 데이터
 */
export const getUnassignedSchools = async ({
  gisuId,
}: GetUnassignedSchoolsParams): Promise<CommonResponseDTO<SchoolsResponseDTO>> => {
  const { data } = await axiosInstance.get('/schools/unassigned', { params: { gisuId } })
  return data
}
/**
 * 전체 기수 목록을 조회함
 * @returns 전체 기수 목록 응답 데이터
 */
export const getAllGisu = async (): Promise<CommonResponseDTO<AllGisuResponseDTO>> => {
  const { data } = await axiosInstance.get('/gisu/all')
  return data
}

/**
 * 기수 목록을 페이징으로 조회함
 * @param page - 페이지 번호(0-base)
 * @param size - 페이지 크기
 * @returns 기수 페이징 응답 데이터
 */
export const getGisuList = async (
  page: string,
  size: string,
): Promise<CommonResponseDTO<CommonPagingResponseDTO<GisuType>>> => {
  const { data } = await axiosInstance.get('/gisu', {
    params: { page, size },
  })
  return data
}

/**
 * 기수 ID로 단건 상세를 조회함.
 * @param gisuId - 기수 ID
 * @returns 기수 상세 응답 데이터
 */
export const getGisuById = async ({
  gisuId,
}: GetGisuDetailParams): Promise<CommonResponseDTO<GisuType>> => {
  const { data } = await axiosInstance.get(`/gisu/${gisuId}`)
  return data
}

/**
 * 학교 상세 정보를 조회함
 * @param schoolId - 학교 ID
 * @returns 학교 상세 응답 데이터
 */
export const getSchoolDetails = async ({
  schoolId,
}: GetSchoolDetailsParams): Promise<CommonResponseDTO<UniversityFullType>> => {
  const { data } = await axiosInstance.get(`/schools/${schoolId}`)
  return data
}

/**
 * 특정 기수의 지부/학교 매핑 정보를 조회함
 * @param gisuId - 기수 ID
 * @returns 지부/학교 매핑 응답 데이터
 */
export const getGisuChapterWithSchools = async ({
  gisuId,
}: GetGisuChapterWithSchoolsParams): Promise<
  CommonResponseDTO<GisuChapterWithSchoolsResponseDTO>
> => {
  const { data } = await axiosInstance.get(`/chapters/with-schools`, { params: { gisuId } })
  return data
}
/**
 * 학교를 생성함
 * @param body - 학교 생성 요청 본문
 * @returns 학교 생성 응답 데이터
 */
export const postSchool = async (body: PostSchoolBody): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.post('/schools', body)
  return data
}
/**
 * 기수를 생성함
 * @param body - 기수 생성 요청 본문
 * @returns 기수 생성 응답 데이터
 */
export const postGisu = async (body: PostGisuBody): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.post('/gisu', body)
  return data
}
/**
 * 특정 기수를 활성화함
 * @param gisuId - 기수 ID
 * @returns 기수 활성화 응답 데이터
 */
export const postGisuActivate = async (gisuId: string): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.post(`/gisu/${gisuId}/active`)
  return data
}
/**
 * 지부(챕터)를 생성함
 * @param body - 지부 생성 요청 본문
 * @returns 지부 생성 응답 데이터
 */
export const postChapter = async (body: PostChapterBody): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.post('/chapters', body)
  return data
}
/**
 * 학교 정보를 수정함
 * @param schoolId - 학교 ID
 * @param body - 학교 수정 요청 본문
 * @returns 학교 수정 응답 데이터
 */
export const patchSchool = async (
  schoolId: string,
  body: PatchSchoolBody,
): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.patch(`/schools/${schoolId}`, body)
  return data
}
/**
 * 학교의 기수 배정을 해제함
 * @param schoolId - 학교 ID
 * @param body - 배정 해제 요청 본문
 * @returns 배정 해제 응답 데이터
 */
export const patchSchoolUnAssign = async (
  schoolId: string,
  body: PatchSchoolUnassignBody,
): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.patch(`/schools/${schoolId}/unassign`, body)
  return data
}

/**
 * 학교를 지부에 배정함
 * @param schoolId - 학교 ID
 * @param body - 배정 요청 본문
 * @returns 학교 배정 응답 데이터
 */
export const patchSchoolAssign = async (
  schoolId: string,
  body: PatchSchoolAssignBody,
): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.patch(`/schools/${schoolId}/assign`, body)
  return data
}

/**
 * 학교를 삭제함
 * @param schoolIds - 삭제할 학교 ID 목록
 * @returns 학교 삭제 응답 데이터
 */
export const deleteSchool = async (schoolIds: Array<string>): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.delete(`/schools`, { data: { schoolIds } })
  return data
}

/**
 * 기수를 삭제함
 * @param gisuId - 기수 ID
 * @returns 기수 삭제 응답 데이터
 */
export const deleteGisu = async (gisuId: string): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.delete(`/gisu/${gisuId}`)
  return data
}

/**
 * 지부(챕터)를 삭제함
 * @param chapterId - 지부 ID
 * @returns 지부 삭제 응답 데이터
 */
export const deleteBranch = async (chapterId: string): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.delete(`/chapters/${chapterId}`)
  return data
}

/**
 * 총괄 지원자 관리 목록을 조회함
 * @param params - 페이지/필터/검색 파라미터
 * @returns 지원자 목록 응답 데이터
 */
export const getRecruitementsApplications = async ({
  chapterId,
  schoolId,
  part,
  keyword,
  page,
  size,
}: GetRecruitementsApplicationsParams): Promise<CommonResponseDTO<GetRecruitmentsApplication>> => {
  const { data } = await axiosInstance.get('/recruitments/applications', {
    params: { chapterId, schoolId, part, page, keyword, size },
  })
  return data
}

/**
 * 회원(챌린저) 목록을 검색 조회함
 * @param params - 페이지/정렬/필터/검색 파라미터
 * @returns 회원 검색 응답 데이터
 */
export const getChallenger = async (
  params: GetChallengerParams,
): Promise<CommonResponseDTO<GetChallengerResponseDTO>> => {
  const { data } = await axiosInstance.get('/member/search', {
    params,
  })
  return data
}

/**
 * 챌린저 상세 정보를 조회함
 * @param challengerId - 챌린저 ID
 * @returns 챌린저 상세 응답 데이터
 */
export const getChallengerDetail = async (
  challengerId: string,
): Promise<CommonResponseDTO<ChallengerDetailResponseDTO>> => {
  const { data } = await axiosInstance.get(`/challenger/${challengerId}`)
  return data
}

/**
 * memberId로 회원 상세 정보를 조회함
 * @param memberId - 회원 ID
 * @returns 회원 상세 응답 데이터
 */
export const getMemberProfile = async (
  memberId: string,
): Promise<CommonResponseDTO<MemberProfileResponseDTO>> => {
  const { data } = await axiosInstance.get(`/member/profile/${memberId}`)
  return data
}

/**
 * 챌린저를 비활성화(제명/탈부) 처리함
 * @param challengerId - 챌린저 ID
 * @param body - 비활성화 요청 본문
 * @returns 비활성화 응답 데이터
 */
export const postChallengerDeactivate = async (
  challengerId: string,
  body: PostChallengerDeactivateBody,
): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.post(`/challenger/${challengerId}/deactivate`, body)
  return data
}

/**
 * 챌린저 권한을 생성함
 * @param body - 권한 생성 요청 본문
 * @returns 생성된 권한 ID 응답 데이터
 */
export const postChallengerRole = async (
  body: PostChallengerRoleBody,
): Promise<CommonResponseDTO<PostChallengerRoleResponseDTO>> => {
  const { data } = await axiosInstance.post('/authorization/challenger-role', body)
  return data
}

/**
 * 챌린저 권한 상세를 조회함
 * @param challengerRoleId - 챌린저 권한 ID
 * @returns 챌린저 권한 상세 응답 데이터
 */
export const getChallengerRole = async (
  challengerRoleId: string,
): Promise<CommonResponseDTO<ChallengerRoleDetailResponseDTO>> => {
  const { data } = await axiosInstance.get(`/authorization/challenger-role/${challengerRoleId}`)
  return data
}

/**
 * 챌린저 권한을 삭제함
 * @param challengerRoleId - 챌린저 권한 ID
 * @returns 챌린저 권한 삭제 응답 데이터
 */
export const deleteChallengerRole = async (
  challengerRoleId: string,
): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.delete(`/authorization/challenger-role/${challengerRoleId}`)
  return data
}

/**
 * 활성 기수의 파트별 커리큘럼/워크북을 일괄 생성·수정·삭제함
 * @param body - 커리큘럼 일괄 관리 요청 본문
 * @returns 커리큘럼 저장 응답 데이터
 */
export const putCurriculums = async (
  body: PutCurriculumsBody,
): Promise<CommonResponseDTO<null>> => {
  const { data } = await axiosInstance.put('/curriculums', body)
  return data
}
