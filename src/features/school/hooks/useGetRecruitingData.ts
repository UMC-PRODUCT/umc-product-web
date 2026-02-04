import { userRecruitement } from '@/features/apply/domain/queryKey'
import { useCustomSuspenseQuery } from '@/shared/hooks/customQuery'

import { recruiteKeys } from '../domain/queryKey'

export const useGetRecruitingData = (recruitingId: string) => {
  const { queryKey, queryFn } = recruiteKeys.getTempSavedRecruitments(recruitingId)
  return useCustomSuspenseQuery(queryKey, queryFn)
}

export const useGetApplicationFormData = (recruitingId: string) => {
  const { queryKey, queryFn } = recruiteKeys.getApplicationForm(recruitingId)
  return useCustomSuspenseQuery(queryKey, queryFn)
}

export const useGetTempSavedApplicationData = (recruitingId: string) => {
  const { queryKey, queryFn } = recruiteKeys.getTempSavedApplication(recruitingId)
  return useCustomSuspenseQuery(queryKey, queryFn)
}

export const useGetRecruitmentsList = (status: 'ONGOING' | 'CLOSED' | 'SCHEDULED') => {
  const { queryKey, queryFn } = recruiteKeys.recruitments({ status })
  return useCustomSuspenseQuery(queryKey, queryFn)
}

export const useGetApplicationAnswer = (recruitmentId: string, formId: string) => {
  const { queryKey, queryFn } = userRecruitement.getApplicationAnswer(recruitmentId, formId)
  return useCustomSuspenseQuery(queryKey, queryFn)
}
