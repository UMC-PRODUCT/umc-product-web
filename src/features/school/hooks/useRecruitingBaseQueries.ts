import {
  getRecruitmentApplicationAnswer,
  getRecruitmentApplicationForm,
} from '@/features/apply/domain/api'
import { useCustomQuery, useCustomSuspenseQuery } from '@/shared/hooks/customQuery'
import { applyKeys, schoolKeys } from '@/shared/queryKeys'
import type { RecruitmentStatusType } from '@/shared/types/umc'
import { normalizeRecruitmentApplicationForm } from '@/shared/utils'

import {
  getRecruitmentApplicationFormDraft,
  getRecruitmentDashboardSummary,
  getRecruitmentDraft,
  getRecruitmentExtensionBases,
  getRecruitments,
  getRecruitmentsDocumentEvaluation,
} from '../domain/api'

/** 모집 임시저장 조회 */
export const useGetRecruitmentDraft = (recruitingId: string) => {
  return useCustomSuspenseQuery(schoolKeys.getRecruitmentDraft(recruitingId), () =>
    getRecruitmentDraft(recruitingId),
  )
}

/** 지원서 폼 조회 */
export const useGetRecruitmentApplicationForm = (recruitingId: string) => {
  return useCustomSuspenseQuery(
    schoolKeys.getRecruitmentApplicationForm(recruitingId),
    () => getRecruitmentApplicationForm(recruitingId),
    {
      select: (data) => ({
        ...data,
        result: normalizeRecruitmentApplicationForm(data.result),
      }),
    },
  )
}

/** 지원서 폼 임시저장 조회 */
export const useGetRecruitmentApplicationFormDraft = (recruitingId: string) => {
  return useCustomSuspenseQuery(
    schoolKeys.getRecruitmentApplicationFormDraft(recruitingId),
    () => getRecruitmentApplicationFormDraft(recruitingId),
    {
      select: (data) => ({
        ...data,
        result: normalizeRecruitmentApplicationForm(data.result),
      }),
    },
  )
}

/** 모집 리스트 조회 */
export const useGetRecruitmentsList = (status: RecruitmentStatusType) => {
  return useCustomSuspenseQuery(schoolKeys.getRecruitments({ status }), () =>
    getRecruitments({ status }),
  )
}

/** 추가 모집 생성 가능 목록(기반 데이터) 조회 */
export const useGetRecruitmentExtensionBases = (options?: { enabled?: boolean }) => {
  return useCustomQuery(schoolKeys.getRecruitmentExtensionBases, getRecruitmentExtensionBases, {
    enabled: options?.enabled,
  })
}

/** 서류 평가 가능한 모집 목록 조회 */
export const useGetRecruitmentsDocumentEvaluation = () => {
  return useCustomQuery(
    schoolKeys.getRecruitmentsDocumentEvaluation,
    getRecruitmentsDocumentEvaluation,
  )
}

/** 지원서 답변 조회 */
export const useGetRecruitmentApplicationAnswer = (recruitmentId: string, formId: string) => {
  return useCustomSuspenseQuery(
    applyKeys.getRecruitmentApplicationAnswer(recruitmentId, formId),
    () => getRecruitmentApplicationAnswer(recruitmentId, formId),
  )
}

/** 모집 대시보드 요약 조회 */
export const useGetRecruitmentDashboardSummary = (recruitingId: string) => {
  return useCustomSuspenseQuery(schoolKeys.getRecruitmentDashboardSummary(recruitingId), () =>
    getRecruitmentDashboardSummary(recruitingId),
  )
}
