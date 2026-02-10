import type { InfiniteData } from '@tanstack/react-query'

import { applyKeys } from '@/features/apply/domain/queryKeys'
import type { PartType } from '@/features/auth/domain'
import {
  useCustomInfiniteQuery,
  useCustomQuery,
  useCustomSuspenseQuery,
} from '@/shared/hooks/customQuery'
import type { CommonResponseDTO } from '@/shared/types/api'
import type { RecruitmentStatusType, SelectionsSortType } from '@/shared/types/umc'

import { getDocumentEvaluationApplicants, getDocumentSelectedApplicants } from '../domain/api'
import type { GetInterviewQuestionsResponseDTO } from '../domain/model'
import { schoolKeys } from '../domain/queryKeys'

/** 모집 임시저장 조회 */
export const useGetRecruitmentDraft = (recruitingId: string) => {
  const { queryKey, queryFn } = schoolKeys.getRecruitmentDraft(recruitingId)
  return useCustomSuspenseQuery(queryKey, queryFn)
}

/** 지원서 폼 조회 */
export const useGetRecruitmentApplicationForm = (recruitingId: string) => {
  const { queryKey, queryFn } = schoolKeys.getRecruitmentApplicationForm(recruitingId)
  return useCustomSuspenseQuery(queryKey, queryFn)
}

/** 지원서 폼 임시저장 조회 */
export const useGetRecruitmentApplicationFormDraft = (recruitingId: string) => {
  const { queryKey, queryFn } = schoolKeys.getRecruitmentApplicationFormDraft(recruitingId)
  return useCustomSuspenseQuery(queryKey, queryFn)
}

/** 모집 리스트 조회 */
export const useGetRecruitmentsList = (status: RecruitmentStatusType) => {
  const { queryKey, queryFn } = schoolKeys.getRecruitments({ status })
  return useCustomSuspenseQuery(queryKey, queryFn)
}

/** 지원서 답변 조회 */
export const useGetRecruitmentApplicationAnswer = (recruitmentId: string, formId: string) => {
  const { queryKey, queryFn } = applyKeys.getRecruitmentApplicationAnswer(recruitmentId, formId)
  return useCustomSuspenseQuery(queryKey, queryFn)
}

/** 모집 대시보드 요약 조회 */
export const useGetRecruitmentDashboardSummary = (recruitingId: string) => {
  const { queryKey, queryFn } = schoolKeys.getRecruitmentDashboardSummary(recruitingId)
  return useCustomSuspenseQuery(queryKey, queryFn)
}

/** 서류 평가 대상자 목록 */
export const useGetDocumentEvaluationApplicants = (
  recruitingId: string,
  params: {
    part: PartType | 'ALL'
    keyword: string
    size: string
  },
) => {
  type DocumentEvaluationApplicantsQueryKey = Array<
    string | { recruitingId: string; part: PartType | 'ALL'; keyword: string; size: string }
  >
  return useCustomInfiniteQuery<
    Awaited<ReturnType<typeof getDocumentEvaluationApplicants>>,
    unknown,
    InfiniteData<Awaited<ReturnType<typeof getDocumentEvaluationApplicants>>, number>,
    DocumentEvaluationApplicantsQueryKey,
    number
  >(
    ['documentEvaluationApplicants', { recruitingId, ...params }],
    ({ pageParam = 0 }) =>
      getDocumentEvaluationApplicants(recruitingId, {
        ...params,
        page: String(pageParam),
      }),
    {
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        const pagination =
          (lastPage.result as { pagination?: { page: string; totalPages: string } }).pagination ??
          (lastPage.result as { paination?: { page: string; totalPages: string } }).paination
        const page = Number(pagination?.page)
        const totalPages = Number(pagination?.totalPages)
        if (Number.isNaN(page) || Number.isNaN(totalPages)) return undefined
        return page + 1 < totalPages ? page + 1 : undefined
      },
    },
  )
}

/** 서류 합격 대상자 목록 */
export const useGetDocumentSelectedApplicants = (
  recruitingId: string,
  params: {
    part: PartType | 'ALL'
    size: string
    sort: SelectionsSortType
  },
) => {
  type DocumentSelectedApplicantsQueryKey = Array<
    | string
    | { recruitingId: string; part: PartType | 'ALL'; size: string; sort: SelectionsSortType }
  >
  return useCustomInfiniteQuery<
    Awaited<ReturnType<typeof getDocumentSelectedApplicants>>,
    unknown,
    InfiniteData<Awaited<ReturnType<typeof getDocumentSelectedApplicants>>, number>,
    DocumentSelectedApplicantsQueryKey,
    number
  >(
    ['documentSelectedApplicants', { recruitingId, ...params }],
    ({ pageParam = 0 }) =>
      getDocumentSelectedApplicants(recruitingId, {
        ...params,
        page: String(pageParam),
      }),
    {
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        const page = Number(lastPage.result.documentSelectionApplications.page)
        if (Number.isNaN(page)) return undefined
        return lastPage.result.documentSelectionApplications.hasNext ? page + 1 : undefined
      },
    },
  )
}

/** 서류 평가용 지원서 상세 조회 */
export const useGetDocumentEvaluationApplicationDetail = (
  recruitingId: string,
  applicantId: string,
) => {
  const { queryKey, queryFn } = schoolKeys.getDocumentEvaluationApplicationDetail(
    recruitingId,
    applicantId,
  )
  return useCustomSuspenseQuery(queryKey, queryFn)
}

/** 서류 평가 답변 목록 */
export const useGetDocumentEvaluationAnswers = (
  recruitingId?: string | null,
  applicantId?: string | null,
) => {
  const resolvedRecruitingId = recruitingId ?? ''
  const resolvedApplicantId = applicantId ?? ''
  const { queryKey, queryFn } = schoolKeys.getDocumentEvaluationAnswers(
    resolvedRecruitingId,
    resolvedApplicantId,
  )
  const enabled = Boolean(recruitingId) && Boolean(applicantId)
  return useCustomQuery(queryKey, queryFn, { enabled })
}

/** 내 서류 평가 조회 */
export const useGetDocumentEvaluationMyAnswer = (
  recruitingId: string | null,
  applicantId: string | null,
) => {
  const resolvedRecruitingId = recruitingId ?? ''
  const resolvedApplicantId = applicantId ?? ''
  const { queryKey, queryFn } = schoolKeys.getDocumentEvaluationMyAnswer(
    resolvedRecruitingId,
    resolvedApplicantId,
  )
  const enabled = Boolean(recruitingId) && Boolean(applicantId)
  return useCustomQuery(queryKey, queryFn, { enabled })
}

/** 면접 질문지(사전 질문) 조회 */
export const useGetInterviewQuestions = (recruitmentId: string, part: PartType | 'COMMON') => {
  const { queryKey, queryFn } = schoolKeys.getInterviewQuestions(recruitmentId, part)
  type InterviewQuestionsQueryKey = typeof queryKey
  return useCustomQuery<
    CommonResponseDTO<GetInterviewQuestionsResponseDTO>,
    unknown,
    CommonResponseDTO<GetInterviewQuestionsResponseDTO> | undefined,
    InterviewQuestionsQueryKey
  >(queryKey, queryFn, { enabled: Boolean(recruitmentId) })
}

/** 면접 질문지 작성 가능 파트 조회 */
export const useGetAvailableInterviewParts = (recruitmentId: string) => {
  const { queryKey, queryFn } = schoolKeys.getAvailableInterviewParts(recruitmentId)
  return useCustomSuspenseQuery(queryKey, queryFn)
}
