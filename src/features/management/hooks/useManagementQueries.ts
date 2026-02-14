import { useCustomQuery, useCustomSuspenseQuery } from '@/shared/hooks/customQuery'
import { managementKeys } from '@/shared/queryKeys'
import type { CommonSearchParams } from '@/shared/types/api'
import type { PartType } from '@/shared/types/umc'

import {
  getAllGisu,
  getAllSchools,
  getChallenger,
  getChapter,
  getCurriculums,
  getGisuChapterWithSchools,
  getGisuList,
  getRecruitementsApplications,
  getSchoolDetails,
  getSchoolsPaging,
  getUnassignedSchools,
} from '../domain/api'

export function useGetCurriculums(part: PartType) {
  return useCustomSuspenseQuery(managementKeys.getCurriculums(part), () => getCurriculums({ part }))
}

export function useGetAllGisu() {
  return useCustomQuery(managementKeys.getAllGisu, getAllGisu)
}

export function useGetAllSchools() {
  return useCustomQuery(managementKeys.getAllSchools, getAllSchools)
}

export function useGetGisuChapterWithSchools(gisuId: string) {
  return useCustomSuspenseQuery(managementKeys.getGisuChapterWithSchools(gisuId), () =>
    getGisuChapterWithSchools({ gisuId }),
  )
}

export function useGetUnassignedSchools(gisuId: string) {
  return useCustomSuspenseQuery(managementKeys.getUnassignedSchools(gisuId), () =>
    getUnassignedSchools({ gisuId }),
  )
}

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

export function useGetSchoolDetails(schoolId: string) {
  return useCustomSuspenseQuery(managementKeys.getSchoolDetails(schoolId), () =>
    getSchoolDetails({ schoolId }),
  )
}

export function useGetChapters() {
  return useCustomQuery(managementKeys.getChapters, getChapter)
}

export function useGetAllSchoolsList() {
  return useCustomQuery(managementKeys.getAllSchools, getAllSchools)
}

export function useGetGisuList(params: CommonSearchParams) {
  return useCustomQuery(managementKeys.getGisuList(params), () =>
    getGisuList(params.page || '0', params.size || '10'),
  )
}

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

export function useGetChallenger(params: Parameters<typeof getChallenger>[0]) {
  return useCustomQuery(managementKeys.getChallenger(params), () => getChallenger(params), {
    placeholderData: (prev) => prev,
  })
}
