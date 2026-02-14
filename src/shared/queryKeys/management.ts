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
  gisuList: (params: SchoolsPagingParams) => [params],
  gisuDetail: (gisuId: string) => [gisuId],
  gisuChapterWithSchools: (gisuId: string) => [gisuId],
  schoolsPaging: (params: SchoolsPagingParams) => [params],
  schoolDetail: (schoolId: string) => [schoolId],
  chapters: {
    queryKey: null,
    contextQueries: {
      all: null,
    },
  },
  recruitmentApplications: (params: RecruitmentApplicationsPagingParams) => [params],
  challenger: (params: ChallengerSearchParams) => [params],
  challengerDetail: (challengerId: string) => [challengerId],
  memberProfileDetail: (memberId: string) => [memberId],
  challengerRoleDetail: (challengerRoleId: string) => [challengerRoleId],
})

export const managementKeys = {
  getCurriculums: (part: PartType) => managementKeyFactory.curriculums(part).queryKey,
  getAllSchools: managementKeyFactory.schools._ctx.all.queryKey,
  getAllGisu: managementKeyFactory.gisu._ctx.all.queryKey,
  getGisuList: (params: SchoolsPagingParams) => managementKeyFactory.gisuList(params).queryKey,
  getGisuDetail: (gisuId: string) => managementKeyFactory.gisuDetail(gisuId).queryKey,
  getGisuChapterWithSchools: (gisuId: string) =>
    managementKeyFactory.gisuChapterWithSchools(gisuId).queryKey,
  getUnassignedSchools: (gisuId: string) =>
    managementKeyFactory.schools._ctx.unassigned(gisuId).queryKey,
  getSchoolsPaging: (params: SchoolsPagingParams) =>
    managementKeyFactory.schoolsPaging(params).queryKey,
  getSchoolDetails: (schoolId: string) => managementKeyFactory.schoolDetail(schoolId).queryKey,
  getChapters: managementKeyFactory.chapters._ctx.all.queryKey,
  getRecruitmentsApplications: (params: RecruitmentApplicationsPagingParams) =>
    managementKeyFactory.recruitmentApplications(params).queryKey,
  getChallenger: (params: ChallengerSearchParams) =>
    managementKeyFactory.challenger(params).queryKey,
  getChallengerDetail: (challengerId: string) =>
    managementKeyFactory.challengerDetail(challengerId).queryKey,
  getMemberProfileDetail: (memberId: string) =>
    managementKeyFactory.memberProfileDetail(memberId).queryKey,
  getChallengerRoleDetail: (challengerRoleId: string) =>
    managementKeyFactory.challengerRoleDetail(challengerRoleId).queryKey,
}
