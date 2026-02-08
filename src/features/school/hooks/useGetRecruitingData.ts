import { applyKeys } from '@/features/apply/domain/queryKeys'
import type { PartType } from '@/features/auth/domain'
import { useCustomSuspenseQuery } from '@/shared/hooks/customQuery'
import type { RecruitmentStatusType } from '@/shared/types/umc'

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

export const useGetRecruitmentsList = (status: RecruitmentStatusType) => {
  const { queryKey, queryFn } = schoolKeys.recruitments({ status })
  return useCustomSuspenseQuery(queryKey, queryFn)
}

export const useGetApplicationAnswer = (recruitmentId: string, formId: string) => {
  const { queryKey, queryFn } = applyKeys.getApplicationAnswer(recruitmentId, formId)
  return useCustomSuspenseQuery(queryKey, queryFn)
}

export const useGetRecruitmentDashboard = (recruitingId: string) => {
  const { queryKey, queryFn } = schoolKeys.getRecruitmentDashboard(recruitingId)
  return useCustomSuspenseQuery(queryKey, queryFn)
}

export const useGetDocumentAllApplicants = (
  recruitingId: string,
  params: {
    part: PartType
    keyword: string
    page: string
    size: string
  },
) => {
  const { queryKey, queryFn } = applyKeys.getDocsEvaluationApplicants(recruitingId, params)
  return useCustomSuspenseQuery(queryKey, queryFn)
}
