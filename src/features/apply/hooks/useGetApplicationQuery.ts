import { useCustomSuspenseQuery } from '@/shared/hooks/customQuery'

import { getActiveRecruitmentId } from '../domain/api'
import { applyKeys } from '../domain/queryKeys'

export function useGetActiveRecruitmentId() {
  return useCustomSuspenseQuery(applyKeys.getActiveRecruitmentId().queryKey, getActiveRecruitmentId)
}

export function useGetApplicationQuestions(recruitmentId: string) {
  return useCustomSuspenseQuery(
    applyKeys.getApplicationForm(recruitmentId).queryKey,
    applyKeys.getApplicationForm(recruitmentId).queryFn,
  )
}

export function useGetApplicationAnswer(recruitmentId: string, formId: string) {
  return useCustomSuspenseQuery(
    applyKeys.getApplicationAnswer(recruitmentId, formId).queryKey,
    applyKeys.getApplicationAnswer(recruitmentId, formId).queryFn,
  )
}

export function useGetSpecificPartRecruiting(recruitmentId: string) {
  return useCustomSuspenseQuery(
    applyKeys.getSpecificPartRecruiting(recruitmentId).queryKey,
    applyKeys.getSpecificPartRecruiting(recruitmentId).queryFn,
  )
}

export function useGetRecruitmentSchedules(recruitmentId?: string) {
  const queryId = recruitmentId ?? ''
  const query = applyKeys.getRecruitmentSchedules(queryId)
  return useCustomSuspenseQuery(query.queryKey, query.queryFn)
}

export function useGetRecruitmentNotice(recruitmentId?: string) {
  const queryId = recruitmentId ?? ''
  const query = applyKeys.getRecruitmentNotice(queryId)
  return useCustomSuspenseQuery(query.queryKey, query.queryFn)
}

export function useGetMyApplicationStatus(recruitmentId: string) {
  return useCustomSuspenseQuery(
    applyKeys.getMyApplicationStatus(recruitmentId).queryKey,
    applyKeys.getMyApplicationStatus(recruitmentId).queryFn,
  )
}
