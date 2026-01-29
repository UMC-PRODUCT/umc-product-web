import { useCustomQuery } from '@/shared/hooks/customQuery'

import { recruiteKeys } from '../domain/queryKey'

export const useGetRecruitingData = (recruitingId: string) => {
  const { queryKey, queryFn } = recruiteKeys.getTempSavedRecruitments(recruitingId)
  return useCustomQuery(queryKey, queryFn)
}

export const useGetApplicationFormData = (recruitingId: string) => {
  const { queryKey, queryFn } = recruiteKeys.getApplicationForm(recruitingId)
  return useCustomQuery(queryKey, queryFn)
}

export const useGetTempSavedApplicationData = (recruitingId: string) => {
  const { queryKey, queryFn } = recruiteKeys.getTempSavedApplication(recruitingId)
  return useCustomQuery(queryKey, queryFn)
}

export const useGetRecruitmentsList = (status: 'ONGOING' | 'CLOSED' | 'SCHEDULED') => {
  const { queryKey, queryFn } = recruiteKeys.recruitments({ status })
  return useCustomQuery(queryKey, queryFn)
}
