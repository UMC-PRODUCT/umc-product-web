import type { InfiniteData } from '@tanstack/react-query'

import { applyKeys } from '@/features/apply/domain/queryKeys'
import type { PartType } from '@/features/auth/domain'
import {
  useCustomInfiniteQuery,
  useCustomQuery,
  useCustomSuspenseQuery,
} from '@/shared/hooks/customQuery'
import type { RecruitmentStatusType, SelectionsSortType } from '@/shared/types/umc'

import { getDocumentAllApplicants, getDocumentSelectedApplicants } from '../domain/api'
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
    part: PartType | 'ALL'
    keyword: string
    size: string
  },
) => {
  return useCustomInfiniteQuery<
    Awaited<ReturnType<typeof getDocumentAllApplicants>>,
    unknown,
    InfiniteData<Awaited<ReturnType<typeof getDocumentAllApplicants>>, number>,
    Array<string | typeof params>,
    number
  >(
    ['docsEvaluationApplicants', recruitingId, params],
    ({ pageParam = 0 }) =>
      getDocumentAllApplicants(recruitingId, {
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

export const useGetDocumentSelectedApplicants = (
  recruitingId: string,
  params: {
    part: PartType | 'ALL'
    size: string
    sort: SelectionsSortType
  },
) => {
  return useCustomInfiniteQuery<
    Awaited<ReturnType<typeof getDocumentSelectedApplicants>>,
    unknown,
    InfiniteData<Awaited<ReturnType<typeof getDocumentSelectedApplicants>>, number>,
    Array<string | typeof params>,
    number
  >(
    ['documentSelectedApplicants', recruitingId, params],
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

export const useGetDocumentEvaluationApplication = (recruitingId: string, applicantId: string) => {
  const { queryKey, queryFn } = schoolKeys.getDocumentEvaluationApplication(
    recruitingId,
    applicantId,
  )
  return useCustomSuspenseQuery(queryKey, queryFn)
}

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

export const useGetDocumentEvaluationAnswerMe = (
  recruitingId: string | null,
  applicantId: string | null,
) => {
  const resolvedRecruitingId = recruitingId ?? ''
  const resolvedApplicantId = applicantId ?? ''
  const { queryKey, queryFn } = schoolKeys.getDocumentEvaluationAnswerMe(
    resolvedRecruitingId,
    resolvedApplicantId,
  )
  const enabled = Boolean(recruitingId) && Boolean(applicantId)
  return useCustomQuery(queryKey, queryFn, { enabled })
}
