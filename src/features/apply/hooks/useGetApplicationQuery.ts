import { getDocumentEvaluationApplicationDetail } from '@/features/school/domain/api'
import type { GetDocumentEvaluationApplicationResponseDTO } from '@/features/school/domain/model'
import { useCustomQuery, useCustomSuspenseQuery } from '@/shared/hooks/customQuery'
import { applyKeys, schoolKeys } from '@/shared/queryKeys'
import type { CommonResponseDTO } from '@/shared/types/api'
import type { FormPage, RecruitmentApplicationForm } from '@/shared/types/form'
import { normalizeRecruitmentApplicationForm } from '@/shared/utils'

import {
  getActiveRecruitmentId,
  getMyApplicationStatus,
  getRecruitmentApplicationAnswer,
  getRecruitmentApplicationForm,
  getRecruitmentNotice,
  getRecruitmentParts,
  getRecruitmentSchedules,
} from '../domain/api'

/** 활성 모집 ID 조회 */
export function useGetActiveRecruitmentId() {
  return useCustomSuspenseQuery(applyKeys.getActiveRecruitmentId, getActiveRecruitmentId)
}

/** 지원서 폼 조회 */
export function useGetRecruitmentApplicationForm(recruitmentId: string) {
  type RecruitmentApplicationFormResponse = CommonResponseDTO<RecruitmentApplicationForm>
  return useCustomSuspenseQuery(
    applyKeys.getRecruitmentApplicationForm(recruitmentId),
    () => getRecruitmentApplicationForm(recruitmentId),
    {
      select: (data: RecruitmentApplicationFormResponse) => {
        const pages: Array<FormPage> = data.result.pages
        const normalizedPages = pages.map((page) => {
          if (!page.scheduleQuestion) return page
          const schedule = page.scheduleQuestion.schedule
          const legacyDisabled = (schedule as { disabled?: typeof schedule.disabledByDate })
            .disabled
          const disabledByDate = Array.isArray(legacyDisabled)
            ? legacyDisabled
            : schedule.disabledByDate

          return {
            ...page,
            scheduleQuestion: {
              ...page.scheduleQuestion,
              schedule: {
                ...schedule,
                disabledByDate,
              },
            },
          }
        })

        return {
          ...data,
          result: {
            ...normalizeRecruitmentApplicationForm({
              ...data.result,
              pages: normalizedPages,
            }),
          },
        }
      },
    },
  )
}

/** 지원서 답변 조회 */
export function useGetRecruitmentApplicationAnswer(recruitmentId: string, formId: string) {
  return useCustomQuery(applyKeys.getRecruitmentApplicationAnswer(recruitmentId, formId), () =>
    getRecruitmentApplicationAnswer(recruitmentId, formId),
  )
}

/** 모집 파트 목록 조회 */
export function useGetRecruitmentParts(recruitmentId: string) {
  return useCustomSuspenseQuery(applyKeys.getRecruitmentParts(recruitmentId), () =>
    getRecruitmentParts(recruitmentId),
  )
}

/** 모집 일정 조회 */
export function useGetRecruitmentSchedules(recruitmentId?: string) {
  const queryId = recruitmentId ?? ''
  return useCustomSuspenseQuery(applyKeys.getRecruitmentSchedules(queryId), () =>
    getRecruitmentSchedules(queryId),
  )
}

/** 모집 공지 조회 */
export function useGetRecruitmentNotice(recruitmentId?: string) {
  const queryId = recruitmentId ?? ''
  return useCustomSuspenseQuery(applyKeys.getRecruitmentNotice(queryId), () =>
    getRecruitmentNotice(queryId),
  )
}

/** 내 지원 상태 조회 */
export function useGetMyApplicationStatus(recruitmentId: string) {
  return useCustomSuspenseQuery(applyKeys.getMyApplicationStatus(recruitmentId), () =>
    getMyApplicationStatus(recruitmentId),
  )
}

type DocumentEvaluationApplicationQueryKey = ReturnType<
  typeof schoolKeys.getDocumentEvaluationApplicationDetail
>
type DocumentEvaluationApplicationResponse =
  CommonResponseDTO<GetDocumentEvaluationApplicationResponseDTO>
type DocumentEvaluationApplicationOptions = Parameters<
  typeof useCustomQuery<
    DocumentEvaluationApplicationResponse,
    unknown,
    DocumentEvaluationApplicationResponse,
    DocumentEvaluationApplicationQueryKey
  >
>[2]

/** 서류 평가용 지원서 상세 조회 */
export function useGetDocumentEvaluationApplicationDetail(
  recruitmentId: string,
  applicantId?: string | null,
  options?: DocumentEvaluationApplicationOptions,
) {
  const resolvedApplicantId = applicantId ?? ''
  const queryKey = schoolKeys.getDocumentEvaluationApplicationDetail(
    recruitmentId,
    resolvedApplicantId,
  )
  const enabled = options?.enabled ?? Boolean(applicantId)
  return useCustomQuery<
    DocumentEvaluationApplicationResponse,
    unknown,
    DocumentEvaluationApplicationResponse,
    DocumentEvaluationApplicationQueryKey
  >(queryKey, () => getDocumentEvaluationApplicationDetail(recruitmentId, resolvedApplicantId), {
    ...options,
    enabled,
  })
}
