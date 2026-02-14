import type { InfiniteData } from '@tanstack/react-query'

import {
  getRecruitmentApplicationAnswer,
  getRecruitmentApplicationForm,
} from '@/features/apply/domain/api'
import {
  useCustomInfiniteQuery,
  useCustomQuery,
  useCustomSuspenseQuery,
} from '@/shared/hooks/customQuery'
import { applyKeys, schoolKeys } from '@/shared/queryKeys'
import type { PartType, RecruitmentStatusType, SelectionsSortType } from '@/shared/types/umc'
import { normalizeRecruitmentApplicationForm } from '@/shared/utils'

import {
  getAvailableInterviewParts,
  getDocumentEvaluationAnswers,
  getDocumentEvaluationApplicants,
  getDocumentEvaluationApplicationDetail,
  getDocumentEvaluationMyAnswer,
  getDocumentSelectedApplicants,
  getFinalSelectionApplications,
  getInterviewAssignments,
  getInterviewEvaluationMyAnswer,
  getInterviewEvaluationOptions,
  getInterviewEvaluationSummary,
  getInterviewEvaluationView,
  getInterviewLiveQuestions,
  getInterviewQuestions,
  getInterviewSchedulingSlotApplicants,
  getInterviewSchedulingSummary,
  getInterviewSlotAssignments,
  getInterviewSlots,
  getRecruitmentApplicationFormDraft,
  getRecruitmentDashboardSummary,
  getRecruitmentDraft,
  getRecruitments,
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

/** 면접 질문지(사전 질문) 조회 */
export const useGetInterviewQuestions = (recruitmentId: string, part: PartType | 'COMMON') => {
  return useCustomQuery(
    schoolKeys.evaluation.interview.getQuestions(recruitmentId, part),
    () => getInterviewQuestions(recruitmentId, part),
    { enabled: Boolean(recruitmentId) },
  )
}

/** 추가 질문(즉석 질문) 조회 */
export const useGetInterviewLiveQuestions = (recruitmentId: string, assignmentId: string) => {
  const queryKey = schoolKeys.evaluation.interview.getLiveQuestions(recruitmentId, assignmentId)
  const enabled = Boolean(recruitmentId) && Boolean(assignmentId)
  return useCustomQuery(queryKey, () => getInterviewLiveQuestions(recruitmentId, assignmentId), {
    enabled,
  })
}

/** 실시간 평가 현황 조회(평균/리스트) */
export const useGetInterviewEvaluationSummary = (recruitmentId: string, assignmentId: string) => {
  const queryKey = schoolKeys.evaluation.interview.getSummary(recruitmentId, assignmentId)
  const enabled = Boolean(recruitmentId) && Boolean(assignmentId)
  return useCustomQuery(
    queryKey,
    () => getInterviewEvaluationSummary(recruitmentId, assignmentId),
    { enabled },
  )
}

/** 실시간 면접 평가 상세 화면 초기 진입 */
export const useGetInterviewEvaluationView = (recruitmentId: string, assignmentId: string) => {
  const queryKey = schoolKeys.evaluation.interview.getView(recruitmentId, assignmentId)
  const enabled = Boolean(recruitmentId) && Boolean(assignmentId)
  return useCustomQuery(queryKey, () => getInterviewEvaluationView(recruitmentId, assignmentId), {
    enabled,
  })
}

/** 실시간 면접 평가 대상 리스트 조회 */
export const useGetInterviewAssignments = (
  recruitmentId: string,
  params?: { date?: string; part?: PartType | 'ALL' },
) => {
  return useCustomQuery(
    schoolKeys.evaluation.interview.getAssignments(recruitmentId, params ?? {}),
    () => getInterviewAssignments(recruitmentId, params ?? {}),
    { enabled: Boolean(recruitmentId) },
  )
}

/** 실시간 면접 평가용 드롭다운 옵션 조회 */
export const useGetInterviewEvaluationOptions = (recruitmentId: string) => {
  return useCustomQuery(
    schoolKeys.evaluation.interview.getOptions(recruitmentId),
    () => getInterviewEvaluationOptions(recruitmentId),
    { enabled: Boolean(recruitmentId) },
  )
}

/** 내 면접 평가 조회 */
export const useGetInterviewEvaluationMyAnswer = (recruitmentId: string, assignmentId: string) => {
  const queryKey = schoolKeys.evaluation.interview.getMyAnswer(recruitmentId, assignmentId)
  const enabled = Boolean(recruitmentId) && Boolean(assignmentId)
  return useCustomQuery(
    queryKey,
    () => getInterviewEvaluationMyAnswer(recruitmentId, assignmentId),
    { enabled },
  )
}

/** 면접 질문지 작성 가능 파트 조회 */
export const useGetAvailableInterviewParts = (recruitmentId: string) => {
  return useCustomSuspenseQuery(
    schoolKeys.evaluation.interview.getAvailableParts(recruitmentId),
    () => getAvailableInterviewParts(recruitmentId),
  )
}
/** 특정 슬롯에 배정 가능한 지원자 / 이미 배정된 지원자 조회 */
export const useGetInterviewSlotApplicants = (
  recruitmentId: string,
  slotId: string | undefined,
) => {
  const resolvedSlotId = slotId ?? ''
  const queryKey = schoolKeys.evaluation.interview.getSlotApplicants(recruitmentId, resolvedSlotId)
  const enabled = Boolean(resolvedSlotId)
  return useCustomQuery(
    queryKey,
    () => getInterviewSchedulingSlotApplicants(recruitmentId, resolvedSlotId),
    {
      enabled,
    },
  )
}
/** 면접 슬롯 목록 조회 */
export const useGetInterviewSlots = (
  recruitmentId: string,
  date?: string,
  part?: PartType | 'ALL',
) => {
  const resolvedDate = date ?? ''
  const resolvedPart = part ?? 'ALL'
  return useCustomSuspenseQuery(
    schoolKeys.evaluation.interview.getSlots(recruitmentId, resolvedDate, resolvedPart),
    () => getInterviewSlots(recruitmentId, resolvedDate, resolvedPart),
  )
}

/** 면접 스케줄링 요약 조회 */
export const useGetInterviewSchedulingSummary = (recruitmentId: string) => {
  return useCustomSuspenseQuery(
    schoolKeys.evaluation.interview.getSchedulingSummary(recruitmentId),
    () => getInterviewSchedulingSummary(recruitmentId),
  )
}

/** 특정 면접 슬롯에 배정된 지원자 조회 */
export const useGetInterviewSlotAssignments = (recruitmentId: string, slotId: string) => {
  return useCustomSuspenseQuery(
    schoolKeys.evaluation.interview.getSlotAssignments(recruitmentId, slotId),
    () => getInterviewSlotAssignments(recruitmentId, slotId),
  )
}
