/**
 * School 도메인 모델
 * 학교 대시보드, 지원/평가 현황 관련 타입
 */

import type { PartType } from '@features/auth/domain'
import type { EvaluationDocumentType, EvaluationFinalType } from '@features/management/domain'

/** 파트별 지원 현황 */
export interface PartApplyStatus {
  part: PartType | '총 지원자'
  applyNum: number
}

/** 파트별 평가 현황 */
export interface PartEvaluationStatus {
  part: PartType
  document: EvaluationDocumentType
  interview: EvaluationFinalType
}

/** 면접 대상자 정보 */
export interface InterviewCandidate {
  time: string
  name: string
  nickname: string
}

/** 리크루팅 진행 단계 */
export interface RecruitingProgressStep {
  label: string
}

/** 진행률 정보 */
export interface ProgressInfo {
  total: number
  complete: number
}

/** 면접 일정 정보 */
export interface InterviewSchedule {
  date: string
  time: string
  location: string
  interviewerCount: number
}

/** 일정 요약 */
export interface ScheduleSummary {
  currentStep: string
  nextStep: string
  deadline: string
}
