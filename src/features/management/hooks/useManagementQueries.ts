import { useCustomQuery, useCustomSuspenseQuery } from '@/shared/hooks/customQuery'
import { managementKeys } from '@/shared/queryKeys'
import type { CommonSearchParams } from '@/shared/types/api'
import type { PartType } from '@/shared/types/umc'

import {
  getAllGisu,
  getAllSchools,
  getChallenger,
  getChallengerDetail,
  getChallengerRole,
  getChapter,
  getCurriculums,
  getGisuChapterWithSchools,
  getGisuList,
  getRecruitementsApplications,
  getSchoolDetails,
  getSchoolsPaging,
  getUnassignedSchools,
} from '../domain/api'

/**
 * 파트별 커리큘럼을 조회하는 Suspense 쿼리 훅.
 * @param part - 조회할 파트 타입
 * @returns 커리큘럼 조회 쿼리 결과
 */
export function useGetCurriculums(part: PartType) {
  return useCustomSuspenseQuery(managementKeys.getCurriculums(part), () => getCurriculums({ part }))
}

/**
 * 전체 기수 목록을 조회하는 쿼리 훅.
 * @returns 전체 기수 조회 쿼리 결과
 */
export function useGetAllGisu() {
  return useCustomQuery(managementKeys.getAllGisu, getAllGisu)
}

/**
 * 전체 학교 목록을 조회하는 쿼리 훅.
 * @returns 전체 학교 조회 쿼리 결과
 */
export function useGetAllSchools() {
  return useCustomQuery(managementKeys.getAllSchools, getAllSchools)
}

/**
 * 특정 기수의 지부/학교 매핑 정보를 조회하는 Suspense 쿼리 훅.
 * @param gisuId - 기수 ID
 * @returns 기수별 지부/학교 조회 쿼리 결과
 */
export function useGetGisuChapterWithSchools(gisuId: string) {
  return useCustomSuspenseQuery(managementKeys.getGisuChapterWithSchools(gisuId), () =>
    getGisuChapterWithSchools({ gisuId }),
  )
}

/**
 * 특정 기수의 미배정 학교 목록을 조회하는 Suspense 쿼리 훅.
 * @param gisuId - 기수 ID
 * @returns 미배정 학교 조회 쿼리 결과
 */
export function useGetUnassignedSchools(gisuId: string) {
  return useCustomSuspenseQuery(managementKeys.getUnassignedSchools(gisuId), () =>
    getUnassignedSchools({ gisuId }),
  )
}

/**
 * 학교 목록(페이징/검색/정렬)을 조회하는 쿼리 훅.
 * @param params - 페이지/정렬/필터/검색 파라미터
 * @returns 학교 페이징 조회 쿼리 결과
 */
export function useGetSchoolsPaging(
  params: CommonSearchParams & {
    sort?: 'asc' | 'desc'
    chapterId?: string
    keyword?: string
  },
) {
  return useCustomQuery(managementKeys.getSchoolsPaging(params), () => getSchoolsPaging(params), {
    placeholderData: (prev) => prev,
  })
}

/**
 * 학교 상세 정보를 조회하는 Suspense 쿼리 훅.
 * @param schoolId - 학교 ID
 * @returns 학교 상세 조회 쿼리 결과
 */
export function useGetSchoolDetails(schoolId: string) {
  return useCustomSuspenseQuery(managementKeys.getSchoolDetails(schoolId), () =>
    getSchoolDetails({ schoolId }),
  )
}

/**
 * 지부 목록을 조회하는 쿼리 훅.
 * @returns 지부 목록 조회 쿼리 결과
 */
export function useGetChapters() {
  return useCustomQuery(managementKeys.getChapters, getChapter)
}

/**
 * 전체 학교 목록을 조회하는 쿼리 훅.
 * @returns 전체 학교 조회 쿼리 결과
 */
export function useGetAllSchoolsList() {
  return useCustomQuery(managementKeys.getAllSchools, getAllSchools)
}

/**
 * 기수 목록(페이징)을 조회하는 쿼리 훅.
 * @param params - 페이지 파라미터
 * @returns 기수 페이징 조회 쿼리 결과
 */
export function useGetGisuList(params: CommonSearchParams) {
  return useCustomQuery(managementKeys.getGisuList(params), () =>
    getGisuList(params.page || '0', params.size || '10'),
  )
}

/**
 * 지원자 관리 목록을 조회하는 쿼리 훅.
 * @param params - 페이지/필터/검색 파라미터
 * @returns 지원자 목록 조회 쿼리 결과
 */
export function useGetRecruitmentApplications(
  params: CommonSearchParams & {
    chapterId?: string
    schoolId?: string
    part?: PartType | 'ALL'
    keyword?: string
  },
) {
  return useCustomQuery(managementKeys.getRecruitmentsApplications(params), () =>
    getRecruitementsApplications(params),
  )
}

/**
 * 회원(챌린저) 목록을 조회하는 쿼리 훅.
 * @param params - 페이지/정렬/필터/검색 파라미터
 * @returns 회원 검색 쿼리 결과
 */
export function useGetChallenger(params: Parameters<typeof getChallenger>[0]) {
  return useCustomQuery(managementKeys.getChallenger(params), () => getChallenger(params), {
    placeholderData: (prev) => prev,
  })
}

/**
 * 챌린저 상세 정보를 조회하는 쿼리 훅.
 * @param challengerId - 챌린저 ID
 * @returns 챌린저 상세 조회 쿼리 결과
 */
export function useGetChallengerDetail(challengerId: string) {
  return useCustomQuery(
    managementKeys.getChallengerDetail(challengerId),
    () => getChallengerDetail(challengerId),
    { enabled: Boolean(challengerId) },
  )
}

/**
 * 챌린저 역할 상세를 조회하는 쿼리 훅.
 * @param challengerRoleId - 챌린저 역할 ID
 * @returns 챌린저 역할 상세 조회 쿼리 결과
 */
export function useGetChallengerRole(challengerRoleId: string) {
  return useCustomQuery(
    managementKeys.getChallengerRoleDetail(challengerRoleId),
    () => getChallengerRole(challengerRoleId),
    { enabled: Boolean(challengerRoleId) },
  )
}
