import { applyKeys } from '@/features/apply/domain/queryKeys'
import { useCustomSuspenseQuery } from '@/shared/hooks/customQuery'

import { schoolKeys } from '../domain/queryKeys'

export const useGetRecruitingData = (recruitingId: string) => {
  const { queryKey, queryFn } = schoolKeys.getTempSavedRecruitments(recruitingId)
  return useCustomSuspenseQuery(queryKey, queryFn)
}

export const useGetApplicationFormData = (recruitingId: string) => {
  const { queryKey, queryFn } = schoolKeys.getApplicationForm(recruitingId)
  return useCustomSuspenseQuery(queryKey, queryFn)
}

export const useGetTempSavedApplicationData = (recruitingId: string) => {
  const { queryKey, queryFn } = schoolKeys.getTempSavedApplication(recruitingId)
  return useCustomSuspenseQuery(queryKey, queryFn)
}

export const useGetRecruitmentsList = (status: 'ONGOING' | 'CLOSED' | 'SCHEDULED') => {
  const { queryKey, queryFn } = schoolKeys.recruitments({ status })
  return useCustomSuspenseQuery(queryKey, queryFn)
}

export const useGetApplicationAnswer = (recruitmentId: string, formId: string) => {
  const { queryKey, queryFn } = applyKeys.getApplicationAnswer(recruitmentId, formId)
  return useCustomSuspenseQuery(queryKey, queryFn)
}
