/**
 * School 도메인 모델
 * 학교 대시보드, 지원/평가 현황 관련 타입
 */

import type { PartType } from '@features/auth/domain'
import type { EvaluationDocumentType, EvaluationFinalType } from '@features/management/domain'

import type { CommonResponseDTO } from '@/shared/types/api'
import type { RecruitingStatus } from '@/shared/types/form'

import type { ApplicationFormPayload, Phase, RecruitingDraft, RecruitingForms } from './types'

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

export type GetRecruitmentsRequestDTO = {
  status: RecruitingStatus
}

export type GetRecruitmentsResponseDTO = {
  recruitments: Array<{
    schoolName: string
    gisu: string
    recruitmentId: string
    recruitmentName: string
    startDate: string
    endDate: string
    applicantCount: number
    phase: Phase
    listBadge: string
    editable: boolean
    status: RecruitingStatus
    updatedAt: string
  }>
}

export type GetRecruitmentNoticesResponseDTO = {
  recruitmentId: number
  title: string
  content: string
  parts: Array<PartType>
}

export type GetTempSavedRecruitmentResponseDTO = RecruitingDraft

export interface PostRecruitmentRequestPublishDTO {
  recruitmentDraft: RecruitingDraft
  applicationFormQuestions: ApplicationFormPayload
}

export type PatchTempSaveRecruitmentRequestDTO = Partial<RecruitingDraft>

export type PatchTempSaveRecruitmentResponseDTO =
  CommonResponseDTO<PatchTempSaveRecruitmentRequestDTO>

export type PostFirstRecruitmentRequestDTO = {
  recruitmentName?: string
  parts?: Array<PartType>
}

export type PostFirstRecruitmentResponseDTO = {
  recruitmentId?: number
  formId?: number
}
export type PatchTempSavedRecruitQuestionsRequestDTO = ApplicationFormPayload

export type GetApplicationFormResponseDTO = RecruitingForms
export type PatchTempSavedRecruitQuestionsResponseDTO = RecruitingForms

export type DeleteSingleQuestionResponseDTO = RecruitingForms

export type patchPublishedRecruitmentRequestDTO = {
  recruitmentId: string
  requestBody: RecruitmentEditable
}

export type GetDashboardResponseDTO = {
  recruitmentId: string
  scheduleSummary: ScheduleSummary
  progress: Progress
  applicationStatus: ApplicationStatus
  evaluationStatus: EvaluationStatus
}

export type RecruitmentEditable = {
  applyStartAt?: string
  applyEndAt?: string
  docResultAt?: string
  interviewStartAt?: string
  interviewEndAt?: string
  finalResultAt?: string
}

export type ScheduleSummary = {
  phaseTitle: string
  dDay: string
  dateRange: {
    start: string
    end: string
  }
  todayInterview: {
    interviewTime: string
    nickname: string
    name: string
    message: string
  }
}

export type Progress = {
  currentStep: string
  steps: Array<{
    step: string
    label: string
    done: boolean
    active: boolean
  }>
  resultAnnounceAt: string
}

export type ApplicationStatus = {
  totalApplicants: string
  partCounts: Array<{
    part: PartType
    count: string
  }>
}
export type EvaluationStatus = {
  documentEvaluation: {
    progressRate: string
    completed: string
    total: string
  }
  interviewEvaluation: {
    progressRate: string
    completed: string
    total: string
  }
  partStatuses: Array<{
    part: PartType
    documentStatusText: string
    interviewStatusText: string
  }>
}

export type RecruitingTab = 'ONGOING' | 'CLOSED' | 'SCHEDULED'

export type GetAllDocsApplicantsResponseDTO = {
  recruitmentId: string
  summary: {
    totalCount: string
    evaluatedCount: string
  }
  applicationSummaries: Array<{
    applicationId: string
    applicantMemberId: string
    applicantName: string
    applicantNickname: string
    preferredParts: Array<{
      priority: string
      part: PartType
      label: string
    }>
    isEvaluated: boolean
  }>
  paination: {
    page: string
    size: string
    totalPages: string
    totalElements: string
  }
}
export type PatchDocsMyEvaluationResponseDTO = {
  myEvaluation: MyEvaluation | null
}

export type MyEvaluation = {
  applicationId: string
  evaluationId: string
  score: string
  comments: string
  submitted: boolean
  savedAt: string
}

export type GetDocsMyEvaluationResponseDTO = {
  myEvaluation: MyEvaluation | null
}
