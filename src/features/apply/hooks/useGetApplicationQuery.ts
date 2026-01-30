import { useCustomSuspenseQuery } from '@/shared/hooks/customQuery'

import { getActiveRecruitmentId } from '../domain/api'
import { userRecruitement } from '../domain/queryKey'

export function useGetActiveRecruitmentId() {
  return useCustomSuspenseQuery(
    userRecruitement.getActiveRecruitmentId().queryKey,
    getActiveRecruitmentId,
  )
}

export function useGetApplicationQuestions(recruitmentId: string) {
  return useCustomSuspenseQuery(
    userRecruitement.getApplicationForm(recruitmentId).queryKey,
    userRecruitement.getApplicationForm(recruitmentId).queryFn,
  )
}

export function useGetApplicationAnswer(recruitmentId: string, formId: string) {
  return useCustomSuspenseQuery(
    userRecruitement.getApplicationAnswer(recruitmentId, formId).queryKey,
    userRecruitement.getApplicationAnswer(recruitmentId, formId).queryFn,
  )
}

export function useGetSpecificPartRecruiting(recruitmentId: string) {
  return useCustomSuspenseQuery(
    userRecruitement.getSpecificPartRecruiting(recruitmentId).queryKey,
    userRecruitement.getSpecificPartRecruiting(recruitmentId).queryFn,
  )
}

export function useGetRecruitmentSchedules(recruitmentId?: string) {
  const queryId = recruitmentId ?? ''
  const query = userRecruitement.getRecruitmentSchedules(queryId)
  type QueryFnData = Awaited<ReturnType<typeof query.queryFn>>
  return useCustomSuspenseQuery<QueryFnData, unknown, QueryFnData, typeof query.queryKey>(
    query.queryKey,
    query.queryFn,
  )
}

export function useGetRecruitmentNotice(recruitmentId?: string) {
  const queryId = recruitmentId ?? ''
  const query = userRecruitement.getRecruitmentNotice(queryId)
  type QueryFnData = Awaited<ReturnType<typeof query.queryFn>>
  return useCustomSuspenseQuery<QueryFnData, unknown, QueryFnData, typeof query.queryKey>(
    query.queryKey,
    query.queryFn,
  )
}

export function useGetMyApplicationStatus(recruitmentId: string) {
  return useCustomSuspenseQuery(
    userRecruitement.getMyApplicationStatus(recruitmentId).queryKey,
    userRecruitement.getMyApplicationStatus(recruitmentId).queryFn,
  )
}
