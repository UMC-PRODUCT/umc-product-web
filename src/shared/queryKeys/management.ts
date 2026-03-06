import { createQueryKeys } from '@lukemorales/query-key-factory'

import type { PartType } from '@/shared/types/umc'

import type { CommonSearchParams } from '../types/api'

type SchoolsPagingParams = CommonSearchParams & {
  sort?: 'asc' | 'desc'
  chapterId?: string
  keyword?: string
}

type RecruitmentApplicationsPagingParams = CommonSearchParams & {
  chapterId?: string
  schoolId?: string
  part?: PartType | 'ALL'
  keyword?: string
}

type ChallengerSearchParams = CommonSearchParams & {
  sort?: Array<string>
  keyword?: string
  schoolId?: string
  chapterId?: string
  part?: PartType
  gisuId?: string
}

const managementKeyFactory = createQueryKeys('management', {
  curriculums: (part: PartType) => [part],
  schools: {
    queryKey: null,
    contextQueries: {
      all: null,
      unassigned: (gisuId: string) => [gisuId],
    },
  },
  gisu: {
    queryKey: null,
    contextQueries: {
      all: null,
    },
  },
  gisuList: {
    queryKey: null,
    contextQueries: {
      paging: (params: SchoolsPagingParams) => [params],
    },
  },
  gisuDetail: (gisuId: string) => [gisuId],
  gisuChapterWithSchools: {
    queryKey: null,
    contextQueries: {
      detail: (gisuId: string) => [gisuId],
    },
  },
  schoolsByGisu: (gisuId: string) => [gisuId],
  schoolsPaging: {
    queryKey: null,
    contextQueries: {
      list: (params: SchoolsPagingParams) => [params],
    },
  },
  schoolDetail: (schoolId: string) => [schoolId],
  chapters: {
    queryKey: null,
    contextQueries: {
      all: null,
    },
  },
  recruitmentApplications: (params: RecruitmentApplicationsPagingParams) => [params],
  challenger: {
    queryKey: null,
    contextQueries: {
      list: (params: ChallengerSearchParams) => [params],
    },
  },
  challengerDetail: (challengerId: string) => [challengerId],
  memberProfileDetail: (memberId: string) => [memberId],
  challengerRoleDetail: (challengerRoleId: string) => [challengerRoleId],
})

export const managementKeys = {
  /** management 도메인 전체 prefix (`['management']`) */
  base: managementKeyFactory.gisu.queryKey.slice(0, 1),
  /** 파트별 커리큘럼 조회 키 */
  getCurriculums: (part: PartType) => managementKeyFactory.curriculums(part).queryKey,
  /** 전체 학교 목록 조회 키 */
  getAllSchools: managementKeyFactory.schools._ctx.all.queryKey,
  /** 전체 기수 목록(비페이징) 조회 키 */
  getAllGisu: managementKeyFactory.gisu._ctx.all.queryKey,
  /** 기수 목록 페이징 쿼리 전체 무효화용 base key */
  getGisuListBase: managementKeyFactory.gisuList.queryKey,
  /** 기수 목록 페이징 조회 키 */
  getGisuList: (params: SchoolsPagingParams) =>
    managementKeyFactory.gisuList._ctx.paging(params).queryKey,
  /** 기수 상세 조회 키 */
  getGisuDetail: (gisuId: string) => managementKeyFactory.gisuDetail(gisuId).queryKey,
  /** 기수-지부-학교 매핑 쿼리 전체 무효화용 base key */
  getGisuChapterWithSchoolsBase: managementKeyFactory.gisuChapterWithSchools.queryKey,
  /** 특정 기수의 지부-학교 매핑 조회 키 */
  getGisuChapterWithSchools: (gisuId: string) =>
    managementKeyFactory.gisuChapterWithSchools._ctx.detail(gisuId).queryKey,
  /** 특정 기수의 학교 목록 조회 키 */
  getSchoolsByGisu: (gisuId: string) => managementKeyFactory.schoolsByGisu(gisuId).queryKey,
  /** 특정 기수의 미배정 학교 조회 키 */
  getUnassignedSchools: (gisuId: string) =>
    managementKeyFactory.schools._ctx.unassigned(gisuId).queryKey,
  /** 학교 페이징 쿼리 전체 무효화용 base key */
  getSchoolsPagingBase: managementKeyFactory.schoolsPaging.queryKey,
  /** 학교 페이징 조회 키 */
  getSchoolsPaging: (params: SchoolsPagingParams) =>
    managementKeyFactory.schoolsPaging._ctx.list(params).queryKey,
  /** 학교 상세 조회 키 */
  getSchoolDetails: (schoolId: string) => managementKeyFactory.schoolDetail(schoolId).queryKey,
  /** 지부 목록 조회 키 */
  getChapters: managementKeyFactory.chapters._ctx.all.queryKey,
  /** 지원자 관리 목록 조회 키 */
  getRecruitmentsApplications: (params: RecruitmentApplicationsPagingParams) =>
    managementKeyFactory.recruitmentApplications(params).queryKey,
  /** 챌린저 목록 쿼리 전체 무효화용 base key */
  getChallengerBase: managementKeyFactory.challenger.queryKey,
  /** 챌린저 목록 조회 키 */
  getChallenger: (params: ChallengerSearchParams) =>
    managementKeyFactory.challenger._ctx.list(params).queryKey,
  /** 챌린저 상세 조회 키 */
  getChallengerDetail: (challengerId: string) =>
    managementKeyFactory.challengerDetail(challengerId).queryKey,
  /** 멤버 프로필 상세 조회 키 */
  getMemberProfileDetail: (memberId: string) =>
    managementKeyFactory.memberProfileDetail(memberId).queryKey,
  /** 챌린저 역할 상세 조회 키 */
  getChallengerRoleDetail: (challengerRoleId: string) =>
    managementKeyFactory.challengerRoleDetail(challengerRoleId).queryKey,
}
