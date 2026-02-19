import { useCustomQuery, useCustomSuspenseQuery } from '@/shared/hooks/customQuery'
import { schoolKeys } from '@/shared/queryKeys'
import type { PartType } from '@/shared/types/part'

import {
  getAvailableInterviewParts,
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
} from '../domain/api'

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
