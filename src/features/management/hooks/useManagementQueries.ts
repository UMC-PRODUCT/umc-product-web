import type { PartType } from '@/features/auth/domain'
import { useCustomQuery, useCustomSuspenseQuery } from '@/shared/hooks/customQuery'

import { managementKeys } from '../domain/queryKeys'

export function useGetCurriculums(part: PartType) {
  const query = managementKeys.getCurriculums(part)
  return useCustomSuspenseQuery(query.queryKey, query.queryFn)
}

export function useGetAllGisu() {
  const query = managementKeys.getAllGisu()
  return useCustomQuery(query.queryKey, query.queryFn)
}

export function useGetAllSchools() {
  const query = managementKeys.getAllSchools()
  return useCustomQuery(query.queryKey, query.queryFn)
}

export function useGetGisuChapterWithSchools(gisuId: string) {
  const query = managementKeys.getGisuChapterWithSchools(gisuId)
  return useCustomSuspenseQuery(query.queryKey, query.queryFn)
}

export function useGetUnassignedSchools(gisuId: string) {
  const query = managementKeys.getUnassignedSchools(gisuId)
  return useCustomSuspenseQuery(query.queryKey, query.queryFn)
}

export function useGetSchoolsPaging(params: {
  page?: string
  size?: string
  sort?: 'asc' | 'desc'
  chapterId?: string
  keyword?: string
}) {
  const query = managementKeys.getSchoolsPaging(params)
  return useCustomQuery(query.queryKey, query.queryFn, { placeholderData: (prev) => prev })
}

export function useGetSchoolDetails(schoolId: string) {
  const query = managementKeys.getSchoolDetails(schoolId)
  return useCustomSuspenseQuery(query.queryKey, query.queryFn)
}

export function useGetChapters() {
  const query = managementKeys.getChapters()
  return useCustomQuery(query.queryKey, query.queryFn)
}
