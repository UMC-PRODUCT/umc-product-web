import type { PartType } from '@/features/auth/domain'
import { useCustomQuery, useCustomSuspenseQuery } from '@/shared/hooks/customQuery'

import { managementKeys } from '../domain/queryKeys'

export function useGetCurriculums(part: PartType) {
  const query = managementKeys.curriculums(part)
  return useCustomSuspenseQuery(query.queryKey, query.queryFn)
}

export function useGetAllGisu() {
  const query = managementKeys.allGisu()
  return useCustomSuspenseQuery(query.queryKey, query.queryFn)
}

export function useGetAllSchools() {
  const query = managementKeys.allSchools()
  return useCustomSuspenseQuery(query.queryKey, query.queryFn)
}

export function useGetGisuChapterWithSchools(gisuId: string) {
  const query = managementKeys.gisuChapterWithSchools(gisuId)
  return useCustomSuspenseQuery(query.queryKey, query.queryFn)
}

export function useGetUnassignedSchools(gisuId: string) {
  const query = managementKeys.unassignedSchools(gisuId)
  return useCustomSuspenseQuery(query.queryKey, query.queryFn)
}

export function useGetSchoolsPaging(params: {
  page?: string
  size?: string
  sort?: 'asc' | 'desc'
  chapterId?: string
  keyword?: string
}) {
  const query = managementKeys.school(params)
  return useCustomQuery(query.queryKey, query.queryFn, { placeholderData: (prev) => prev })
}

export function useGetSchoolDetails(schoolId: string) {
  const query = managementKeys.schoolDetail(schoolId)
  return useCustomSuspenseQuery(query.queryKey, query.queryFn)
}
