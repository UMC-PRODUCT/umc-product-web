import type { InfiniteData } from '@tanstack/react-query'

import {
  useCustomInfiniteQuery,
  useCustomQuery,
  useCustomSuspenseQuery,
} from '@/shared/hooks/customQuery'
import { schoolKeys } from '@/shared/queryKeys'
import type { PartType } from '@/shared/types/part'
import type { SelectionsSortType } from '@/shared/types/umc'

import {
  getDocumentEvaluationAnswers,
  getDocumentEvaluationApplicants,
  getDocumentEvaluationApplicationDetail,
  getDocumentEvaluationMyAnswer,
  getDocumentSelectedApplicants,
  getFinalSelectionApplications,
} from '../domain/api'

/** 서류 평가 대상자 목록 */
export const useGetDocumentEvaluationApplicants = (
  recruitingId: string,
  params: {
    part: PartType | 'ALL'
    keyword: string
    size: string
  },
) => {
  const queryKey = schoolKeys.evaluation.document.getApplicants(recruitingId, {
    ...params,
    page: '0',
  })
  type DocumentEvaluationApplicantsQueryKey = typeof queryKey
  return useCustomInfiniteQuery<
    Awaited<ReturnType<typeof getDocumentEvaluationApplicants>>,
    unknown,
    InfiniteData<Awaited<ReturnType<typeof getDocumentEvaluationApplicants>>, number>,
    DocumentEvaluationApplicantsQueryKey,
    number
  >(
    queryKey,
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

/** 최종 선발 대상 리스트 조회 */
export const useGetFinalSelectionApplications = (
  recruitingId: string,
  params: {
    part: PartType | 'ALL'
    sort: SelectionsSortType
    size: string
  },
) => {
  const queryKey = schoolKeys.evaluation.finalSelection.getApplications(recruitingId, {
    ...params,
    page: '0',
  })

  return useCustomInfiniteQuery(
    queryKey,
    ({ pageParam = 0 }) =>
      getFinalSelectionApplications(recruitingId, {
        ...params,
        page: String(pageParam),
      }),
    {
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        const page = Number(lastPage.result.finalSelectionApplications.page)
        const totalPages = Number(lastPage.result.finalSelectionApplications.totalPages)
        if (Number.isNaN(page) || Number.isNaN(totalPages)) return undefined
        return lastPage.result.finalSelectionApplications.hasNext ? page + 1 : undefined
      },
    },
  )
}

/** 서류 합격 대상자 목록 */
export const useGetDocumentSelectedApplicants = (
  recruitingId: string,
  params: {
    part?: PartType | 'ALL'
    size?: string
    sort?: SelectionsSortType
  },
) => {
  const queryKey = schoolKeys.evaluation.document.getSelectedApplicants(recruitingId, {
    ...params,
    page: '0',
  })

  return useCustomInfiniteQuery(
    queryKey,
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
  return useCustomSuspenseQuery(
    schoolKeys.evaluation.document.getApplicationDetail(recruitingId, applicantId),
    () => getDocumentEvaluationApplicationDetail(recruitingId, applicantId),
  )
}

/** 서류 평가 답변 목록 */
export const useGetDocumentEvaluationAnswers = (
  recruitingId?: string | null,
  applicantId?: string | null,
) => {
  const resolvedRecruitingId = recruitingId ?? ''
  const resolvedApplicantId = applicantId ?? ''
  const queryKey = schoolKeys.evaluation.document.getAnswers(
    resolvedRecruitingId,
    resolvedApplicantId,
  )
  const enabled = Boolean(recruitingId) && Boolean(applicantId)
  return useCustomQuery(
    queryKey,
    () => getDocumentEvaluationAnswers(resolvedRecruitingId, resolvedApplicantId),
    { enabled },
  )
}

/** 내 서류 평가 조회 */
export const useGetDocumentEvaluationMyAnswer = (
  recruitingId: string | null,
  applicantId: string | null,
) => {
  const resolvedRecruitingId = recruitingId ?? ''
  const resolvedApplicantId = applicantId ?? ''
  const queryKey = schoolKeys.evaluation.document.getMyAnswer(
    resolvedRecruitingId,
    resolvedApplicantId,
  )
  const enabled = Boolean(recruitingId) && Boolean(applicantId)
  return useCustomQuery(
    queryKey,
    () => getDocumentEvaluationMyAnswer(resolvedRecruitingId, resolvedApplicantId),
    { enabled },
  )
}
