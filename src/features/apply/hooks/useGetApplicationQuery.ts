import { schoolKeys } from '@/features/school/domain'
import type { GetDocumentEvaluationApplicationResponseDTO } from '@/features/school/domain/model'
import { useCustomQuery, useCustomSuspenseQuery } from '@/shared/hooks/customQuery'
import type { CommonResponseDTO } from '@/shared/types/api'
import type { FormPage, RecruitmentApplicationForm } from '@/shared/types/form'
import { normalizeRecruitmentApplicationForm } from '@/shared/utils'

import { getActiveRecruitmentId } from '../domain/api'
import { applyKeys } from '../domain/queryKeys'

/** 활성 모집 ID 조회 */
export function useGetActiveRecruitmentId() {
  return useCustomSuspenseQuery(applyKeys.getActiveRecruitmentId().queryKey, getActiveRecruitmentId)
}

/** 지원서 폼 조회 */
export function useGetRecruitmentApplicationForm(recruitmentId: string) {
  type RecruitmentApplicationFormResponse = CommonResponseDTO<RecruitmentApplicationForm>
  return useCustomSuspenseQuery(
    applyKeys.getRecruitmentApplicationForm(recruitmentId).queryKey,
    applyKeys.getRecruitmentApplicationForm(recruitmentId).queryFn,
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
  return useCustomQuery(
    applyKeys.getRecruitmentApplicationAnswer(recruitmentId, formId).queryKey,
    applyKeys.getRecruitmentApplicationAnswer(recruitmentId, formId).queryFn,
  )
}

/** 모집 파트 목록 조회 */
export function useGetRecruitmentParts(recruitmentId: string) {
  return useCustomSuspenseQuery(
    applyKeys.getRecruitmentParts(recruitmentId).queryKey,
    applyKeys.getRecruitmentParts(recruitmentId).queryFn,
  )
}

/** 모집 일정 조회 */
export function useGetRecruitmentSchedules(recruitmentId?: string) {
  const queryId = recruitmentId ?? ''
  const query = applyKeys.getRecruitmentSchedules(queryId)
  return useCustomSuspenseQuery(query.queryKey, query.queryFn)
}

/** 모집 공지 조회 */
export function useGetRecruitmentNotice(recruitmentId?: string) {
  const queryId = recruitmentId ?? ''
  const query = applyKeys.getRecruitmentNotice(queryId)
  return useCustomSuspenseQuery(query.queryKey, query.queryFn)
}

/** 내 지원 상태 조회 */
export function useGetMyApplicationStatus(recruitmentId: string) {
  return useCustomSuspenseQuery(
    applyKeys.getMyApplicationStatus(recruitmentId).queryKey,
    applyKeys.getMyApplicationStatus(recruitmentId).queryFn,
  )
}

type DocumentEvaluationApplicationQueryKey = ReturnType<
  typeof schoolKeys.getDocumentEvaluationApplicationDetail
>['queryKey']
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
  const { queryKey, queryFn } = schoolKeys.getDocumentEvaluationApplicationDetail(
    recruitmentId,
    resolvedApplicantId,
  )
  const enabled = options?.enabled ?? Boolean(applicantId)
  return useCustomQuery<
    DocumentEvaluationApplicationResponse,
    unknown,
    DocumentEvaluationApplicationResponse,
    DocumentEvaluationApplicationQueryKey
  >(queryKey, queryFn, { ...options, enabled })
}
