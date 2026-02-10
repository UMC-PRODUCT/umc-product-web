/**
 * School 도메인 모델
 * 학교 대시보드, 지원/평가 현황 관련 타입
 */

import type { PartType } from '@features/auth/domain'
import type { EvaluationDocumentType, EvaluationFinalType } from '@features/management/domain'

import type { CommonResponseDTO } from '@/shared/types/api'
import type { RecruitingStatus, RecruitmentApplicationForm } from '@/shared/types/form'
import type { SelectionsSortType } from '@/shared/types/umc'

import type { ApplicationFormPayload, Phase, RecruitingDraft } from './types'

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

export type GetRecruitmentDraftResponseDTO = RecruitingDraft

export interface PostRecruitmentPublishRequestDTO {
  recruitmentDraft: RecruitingDraft
  applicationFormQuestions: ApplicationFormPayload
}

export type PatchRecruitmentDraftRequestDTO = Partial<RecruitingDraft>

export type PatchRecruitmentDraftResponseDTO = CommonResponseDTO<PatchRecruitmentDraftRequestDTO>

export type PostRecruitmentCreateRequestDTO = {
  recruitmentName?: string
  parts?: Array<PartType>
}

export type PostRecruitmentCreateResponseDTO = {
  recruitmentId?: number
  formId?: number
}
export type PatchRecruitmentApplicationFormDraftRequestDTO = ApplicationFormPayload

export type PatchRecruitmentApplicationFormDraftResponseDTO = RecruitmentApplicationFormResponseDTO

export type DeleteRecruitmentQuestionResponseDTO = RecruitmentApplicationFormResponseDTO
export type DeleteRecruitmentQuestionRequestDTO = {
  recruitmentId: string
  questionId: string
}
export type DeleteRecruitmentQuestionOptionRequestDTO = {
  recruitmentId: string
  questionId: string
  optionId: string
}

export type PatchRecruitmentPublishedRequestDTO = {
  recruitmentId: string
  requestBody: RecruitmentEditable
}

export type GetRecruitmentDashboardResponseDTO = {
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

export type RecruitmentApplicationFormResponseDTO = RecruitmentApplicationForm

export type DocumentEvaluationQuestionOption = {
  optionId: string
  content: string
  isOther: boolean
}

export type DocumentEvaluationAnswer = {
  answeredAsType: string
  displayText: string | null
  rawValue: Record<string, unknown>
}

export type DocumentEvaluationQuestion = {
  questionId: string
  orderNo: string
  type:
    | 'PREFERRED_PART'
    | 'SCHEDULE'
    | 'LONG_TEXT'
    | 'SHORT_TEXT'
    | 'RADIO'
    | 'CHECKBOX'
    | 'PORTFOLIO'
    | 'DROPDOWN'
  questionText: string
  required: boolean
  options: Array<DocumentEvaluationQuestionOption>
  answer: DocumentEvaluationAnswer | null
}

export type DocumentEvaluationFormPage = {
  pageNo: string
  questions: Array<DocumentEvaluationQuestion>
  partQuestions: Array<{
    part: string
    questions: Array<DocumentEvaluationQuestion>
  }>
}

export type GetDocumentEvaluationApplicationResponseDTO = {
  applicationId: string
  status: string
  applicant: {
    memberId: string
    name: string
    nickname: string
  }
  formPages: Array<DocumentEvaluationFormPage>
}

export type GetDocumentEvaluationAnswersResponseDTO = {
  recruitmentId: string
  applicationId: string
  avgDocScore: string
  docEvaluationSummaries: Array<DocEvaluationSummary>
}

export type DocEvaluationSummary = {
  evaluatorMemberId: string
  evaluatorName: string
  evaluatorNickname: string
  score: string
  comments: string
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

export type GetDocumentEvaluationApplicantsResponseDTO = {
  recruitmentId: string
  summary: {
    totalCount: string
    evaluatedCount: string
  }
  applicationSummaries: Array<DocumentEvaluationApplicantSummary>
  paination: {
    page: string
    size: string
    totalPages: string
    totalElements: string
  }
}
export type GetDocumentEvaluationApplicantsRequestDTO = {
  part: PartType | 'ALL'
  keyword: string
  page: string
  size: string
}
export type PatchDocumentEvaluationMyAnswerResponseDTO = {
  myEvaluation: MyEvaluation | null
}
export type PatchDocumentEvaluationMyAnswerRequestDTO = {
  score: string
  comments: string
  action: 'DRAFT_SAVE' | 'SUBMIT'
}

export type MyEvaluation = {
  applicationId: string
  evaluationId: string
  score: string
  comments: string
  submitted: boolean
  savedAt: string
}

export type GetDocumentEvaluationMyAnswerResponseDTO = {
  myEvaluation: MyEvaluation | null
}

export type DocumentEvaluationApplicantSummary = {
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
}

export type GetDocumentSelectedApplicantsResponseDTO = {
  summary: {
    totalCount: string
    selectedCount: string
  }
  sort: SelectionsSortType
  documentSelectionApplications: {
    content: Array<DocumentSelectionApplication>
    page: string
    size: string
    totalPages: string
    totalElements: string
    hasNext: boolean
    hasPrevious: boolean
  }
}
export type GetDocumentSelectedApplicantsRequestDTO = {
  part: PartType | 'ALL'
  page: string
  size: string
  sort: SelectionsSortType
}
export type PatchDocumentSelectionStatusRequestDTO = {
  decision: 'PASS' | 'FAIL' | 'WAIT'
}

export type DocumentSelectionApplication = {
  applicationId: string
  applicant: {
    nickname: string
    name: string
  }
  appliedParts: Array<{
    priority: string
    part: {
      key: PartType
      label: string
    }
  }>
  documentScore: string
  documentResult: {
    decision: 'WAIT' | 'PASS' | 'FAIL'
  }
}

export type InterviewQuestionType = {
  questionId: string
  orderNo: string
  questionText: string
}

export type GetInterviewQuestionsResponseDTO = {
  part: {
    key: PartType | 'COMMON'
    label: string
    questionCount: string
  }
  questions: Array<InterviewQuestionType>
}

export type GetInterviewAvailablePartsResponseDTO = {
  parts: Array<{
    key: PartType | 'COMMON'
    label: string
  }>
}

export type PostInterviewQuestionRequestDTO = {
  partKey: PartType | 'COMMON'
  questionText: string
}

export type PatchInterviewQuestionOrderRequestDTO = {
  partKey: PartType | 'COMMON'
  orderedQuestionIds: Array<string>
}

export type PatchInterviewQuestionRequestDTO = {
  questionText: string
}
