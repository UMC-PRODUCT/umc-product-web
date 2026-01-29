import { useCustomQuery } from '@/shared/hooks/customQuery'

import { getActiveRecruitmentId } from '../domain/api'
import { userRecruitement } from '../domain/queryKey'

export function useGetActiveRecruitmentId() {
  return useCustomQuery(userRecruitement.getActiveRecruitmentId().queryKey, getActiveRecruitmentId)
}

export function useGetApplicationQuestions(recruitmentId: string) {
  return useCustomQuery(
    userRecruitement.getApplicationForm(recruitmentId).queryKey,
    userRecruitement.getApplicationForm(recruitmentId).queryFn,
  )
}

export function useGetApplicationAnswer(recruitmentId: string, formId: string) {
  return useCustomQuery(
    userRecruitement.getApplicationAnswer(recruitmentId, formId).queryKey,
    userRecruitement.getApplicationAnswer(recruitmentId, formId).queryFn,
  )
}

export function useGetSpecificPartRecruiting(recruitmentId: string) {
  return useCustomQuery(
    userRecruitement.getSpecificPartRecruiting(recruitmentId).queryKey,
    userRecruitement.getSpecificPartRecruiting(recruitmentId).queryFn,
  )
}

export function useGetRecruitmentSchedules(recruitmentId: string) {
  const query = userRecruitement.getRecruitmentSchedules(recruitmentId)
  return useCustomQuery(query.queryKey, query.queryFn, {
    enabled: Boolean(recruitmentId),
  })
}

export function useGetRecruitmentNotice(recruitmentId: string) {
  const query = userRecruitement.getRecruitmentNotice(recruitmentId)
  return useCustomQuery(query.queryKey, query.queryFn, {
    enabled: Boolean(recruitmentId),
  })
}

export function useGetMyApplicationStatus(recruitmentId: string) {
  return useCustomQuery(
    userRecruitement.getMyApplicationStatus(recruitmentId).queryKey,
    userRecruitement.getMyApplicationStatus(recruitmentId).queryFn,
  )
}
