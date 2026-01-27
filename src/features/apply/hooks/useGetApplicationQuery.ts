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
