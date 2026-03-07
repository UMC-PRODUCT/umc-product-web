/**
 * School 도메인 모델
 * 학교 대시보드, 지원/평가 현황 관련 타입
 */

import type {
  CommonPagingResponseDTO,
  CommonResponseDTO,
  CommonSearchParams,
  PaginationInfo,
} from '@/shared/types/api'
import type { DateRange, RecruitingStatus, RecruitmentApplicationForm } from '@/shared/types/form'
import type { EvaluationDocumentType, EvaluationFinalType } from '@/shared/types/management'
import type { CommonPartType, PartFilterType, PartType } from '@/shared/types/part'
import type { ApplicationFormPayload, Phase, RecruitingDraft } from '@/shared/types/recruiting'
import type {
  ApplicantMember,
  DocumentEvaluationAnswer,
  DocumentEvaluationQuestion,
  GetDocumentEvaluationApplicationResponseDTO,
} from '@/shared/types/school'
import type {
  EvaluationProgressStatusType,
  EvaluationStatusType,
  SelectionDecisionType,
  SelectionsSortType,
  SubmissionActionType,
} from '@/shared/types/umc'

// ============================================
// Shared building blocks
// ============================================

type PersonName = {
  name: string
  nickname: string
}

type PartKeyLabel = {
  key: PartType
  label: string
}

type PartLabel = {
  part: PartType
  label: string
}

export type ProgressRate = {
  progressRate: string
  completed: string
  total: string
}

type InterviewRules = {
  slotMinutes: string
  timeRange: DateRange
}

type InterviewPartOption = {
  part: PartFilterType
  label: string
  done: boolean
}

type InterviewScheduleContext = {
  date: string
  part: PartFilterType
}

type InterviewSummary = {
  progress: InterviewProgress
  dateOptions: Array<string>
  partOptions: Array<InterviewPartOption>
  rules: InterviewRules
  context: InterviewScheduleContext
}

/** 파트별 지원 현황 */
export interface PartApplyStatus {
  part: PartType | '총 지원자'
  applyNum: string
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
    applicantCount: string
    phase: Phase
    listBadge: string
    editable: boolean
    status: RecruitingStatus
    updatedAt: string
  }>
}

export type GetRecruitmentExtensionBasesResponseDTO = {
  recruitments: Array<{
    recruitmentId: string
    title: string
    isRoot: boolean
    startDate: string
    endDate: string
  }>
}

export type GetRecruitmentNoticesResponseDTO = {
  recruitmentId: string
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

export type PostRecruitmentCreateResponseDTO = {
  recruitmentId?: string
  formId?: string
}

export type PostRecruitmentExtensionRequestDTO = {
  recruitmentName: string
  parts: Array<PartType>
}

export type PostRecruitmentExtensionResponseDTO = {
  recruitmentId: string
  formId: string
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
  progress: SchoolLeaderProgressType
  applicationStatus: ApplicationStatus
  evaluationStatus: EvaluationStatus
}

export type SchoolLeaderProgressType = {
  currentStep: string
  steps: Array<{
    step: Phase
    label: string
    done: boolean
    active: boolean
  }>
  noticeType: string
  noticeDate: string
}

export type RecruitmentEditable = {
  applyStartAt?: string
  applyEndAt?: string
  docResultAt?: string
  interviewStartAt?: string
  interviewEndAt?: string
  finalResultAt?: string
  interviewTimeTable?: {
    dateRange: { start: string; end: string }
    timeRange: { start: string; end: string }
    slotMinutes: string
    enabledByDate: Array<{ date: string; times: Array<string> }>
    disabledByDate: Array<{ date: string; times: Array<string> }>
  }
}

export type RecruitmentApplicationFormResponseDTO = RecruitmentApplicationForm

export type {
  DocumentEvaluationAnswer,
  DocumentEvaluationQuestion,
  GetDocumentEvaluationApplicationResponseDTO,
}

export type GetDocumentEvaluationAnswersResponseDTO = {
  recruitmentId: string
  applicationId: string
  avgDocScore: string
  docEvaluationSummaries: Array<DocEvaluationSummary>
}

type DocEvaluationSummary = {
  evaluatorMemberId: string
  evaluatorName: string
  evaluatorNickname: string
  score: string
  comments: string
}

export type ScheduleSummary = {
  phaseTitle: string
  dDay: string
  dateRange: DateRange
  todayInterviews: Array<{
    interviewTime: string
    nickName: string
    name: string
    message: string
  }>
}

export type RecruitmentProgress = {
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
  documentEvaluation: ProgressRate
  interviewEvaluation: ProgressRate
  partStatuses: Array<PartStatus>
}

export type PartStatus = {
  part: PartType
  documentStatus: EvaluationStatusType
  interviewStatus: EvaluationStatusType
}

export type RecruitingTab = 'ONGOING' | 'CLOSED' | 'SCHEDULED'

export type GetDocumentEvaluationApplicantsResponseDTO = {
  recruitmentId: string
  summary: {
    totalCount: string
    evaluatedCount: string
  }
  applicationSummaries: Array<DocumentEvaluationApplicantSummary>
  pagination?: PaginationInfo
  paination?: PaginationInfo
}
export type GetDocumentEvaluationApplicantsRequestDTO = CommonSearchParams & {
  part?: PartFilterType
  keyword?: string
}
export type PatchDocumentEvaluationMyAnswerResponseDTO = {
  myEvaluation: MyEvaluation | null
}
export type PatchDocumentEvaluationMyAnswerRequestDTO = {
  score: string
  comments: string
  action: SubmissionActionType
}

export type PatchInterviewEvaluationMyAnswerRequestDTO = {
  score: string
  comments: string
}

export type InterviewMyEvaluation = {
  evaluationId: string
  score: string
  comments: string
  submittedAt: string
}

export type PatchInterviewEvaluationMyAnswerResponseDTO = {
  myEvaluation: InterviewMyEvaluation
}

export type GetInterviewEvaluationMyAnswerResponseDTO = {
  myEvaluation: InterviewMyEvaluation | null
}

export type InterviewEvaluationSummary = {
  evaluator: ApplicantMember
  score: string
  comments: string
}

export type GetInterviewEvaluationSummaryResponseDTO = {
  avgScore: string
  interviewEvaluationSummaries: Array<InterviewEvaluationSummary>
}

export type InterviewEvaluationViewQuestion = {
  questionId: string
  orderNo: string
  text: string
}

export type InterviewEvaluationViewLiveQuestion = {
  liveQuestionId: string
  orderNo: string
  text: string
  createdBy: ApplicantMember
  canEdit: boolean
}

export type InterviewEvaluationViewQuestions = {
  common: Array<InterviewEvaluationViewQuestion>
  firstChoice: Array<InterviewEvaluationViewQuestion>
  secondChoice: Array<InterviewEvaluationViewQuestion>
  live: Array<InterviewEvaluationViewLiveQuestion>
}

export type InterviewEvaluationViewAppliedPart = {
  priority: string
  key: PartType
  label: string
}

export type InterviewEvaluationViewResponseDTO = {
  assignmentId: string
  applicationId: string
  application: {
    applicant: PersonName
    appliedParts: Array<InterviewEvaluationViewAppliedPart>
  }
  questions: InterviewEvaluationViewQuestions
  liveEvaluations: {
    avgScore: string
    items: Array<InterviewEvaluationSummary>
  }
  myEvaluation: InterviewMyEvaluation | null
}

export type InterviewAssignmentSlot = {
  assignmentId: string
  slot: {
    slotId: string
    date: string
    start: string
    end: string
  }
  applicationId: string
  applicant: PersonName
  appliedParts: Array<InterviewEvaluationViewAppliedPart>
  documentScore: string
  evaluationProgressStatus: EvaluationProgressStatusType
}

export type GetInterviewAssignmentsResponseDTO = {
  serverNow: string
  selectedDate: string
  selectedPart: PartFilterType
  interviewAssignmentTimeGroups: Array<{
    start: string
    end: string
    interviewAssignmentSlots: Array<{
      assignmentId: string
      slot: {
        slotId: string
        date: string
        start: string
        end: string
      }
      applicationId: string
      applicant: {
        nickname: string
        name: string
      }
      appliedParts: Array<{
        priority: string
        key: PartType
        label: string
      }>
      documentScore: string
      evaluationProgressStatus: EvaluationProgressStatusType
    }>
  }>
}

export type GetInterviewEvaluationOptionsResponseDTO = {
  dates: Array<string>
  parts: Array<{
    key: CommonPartType
    label: string
  }>
}

export type FinalSelectionSummaryByPart = {
  total: string
  selected: string
}

export type FinalSelectionPartLabel = {
  key: CommonPartType
  label: string
}

export type FinalSelectionApplication = {
  applicationId: string
  applicant: ApplicantMember
  appliedParts: Array<{
    priority: string
    part: FinalSelectionPartLabel
  }>
  documentScore: string
  interviewScore: string
  finalScore: string
  selection: {
    status: SelectionDecisionType
    selectedPart: FinalSelectionPartLabel | null
  }
}

export type GetFinalSelectionApplicationsRequestDTO = {
  part: PartFilterType
  sort: SelectionsSortType
  page: string
  size: string
}

export type GetFinalSelectionApplicationsResponseDTO = {
  summary: {
    totalCount: string
    selectedCount: string
  }
  sort: SelectionsSortType
  finalSelectionApplications: CommonPagingResponseDTO<FinalSelectionApplication>
}

export type PatchFinalSelectionStatusRequestDTO = {
  decision: SelectionDecisionType
  selectedPart?: PartType
}

export type PatchFinalSelectionStatusResponseDTO = {
  applicationId: string
  finalResult: {
    decision: SelectionDecisionType
    selectedPart: FinalSelectionPartLabel
  }
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

type DocumentEvaluationApplicantSummary = {
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
  documentSelectionApplications: CommonPagingResponseDTO<DocumentSelectionApplication>
}
export type GetDocumentSelectedApplicantsRequestDTO = CommonSearchParams & {
  part?: PartFilterType
  sort?: SelectionsSortType
}
export type PatchDocumentSelectionStatusRequestDTO = {
  decision: SelectionDecisionType
}

export type DocumentSelectionApplication = {
  applicationId: string
  applicant: PersonName
  appliedParts: Array<{
    priority: string
    part: PartKeyLabel
  }>
  documentScore: string
  documentResult: {
    decision: SelectionDecisionType
  }
}

type InterviewQuestionType = {
  questionId: string
  orderNo: string
  questionText: string
}

export type InterviewLiveQuestion = {
  liveQuestionId: string
  orderNo: string
  text: string
  createdBy: ApplicantMember
  canEdit: boolean
}

export type GetInterviewLiveQuestionsResponseDTO = {
  liveQuestionResponses: Array<InterviewLiveQuestion>
}

export type GetInterviewQuestionsResponseDTO = {
  part: {
    key: CommonPartType
    label: string
    questionCount: string
  }
  questions: Array<InterviewQuestionType>
}

export type GetInterviewAvailablePartsResponseDTO = {
  parts: Array<{
    key: CommonPartType
    label: string
  }>
}

export type PostInterviewQuestionRequestDTO = {
  partKey: CommonPartType
  questionText: string
}

export type PostInterviewLiveQuestionRequestDTO = {
  text: string
}

export type PatchInterviewLiveQuestionRequestDTO = {
  text: string
}

export type PatchInterviewLiveQuestionResponseDTO = {
  liveQuestionId: string
  text: string
}

export type PatchInterviewQuestionOrderRequestDTO = {
  partKey: CommonPartType
  orderedQuestionIds: Array<string>
}

export type PatchInterviewQuestionRequestDTO = {
  questionText: string
}

export type GetInterviewSlotAssignmentsResponseDTO = {
  assignments: Array<Assignment>
}

export type Assignment = {
  assignmentId: string
  applicationId: string
  nickname: string
  name: string
  firstPart: PartLabel
  secondPart: PartLabel | null
  documentScore: string
}

type InterviewProgress = {
  scope: string
  part: PartFilterType
  total: string
  scheduled: string
}

export type GetInterviewSchedulingSummaryResponseDTO = {
  progress: InterviewProgress
  dateOptions: Array<string>
  partOptions: Array<InterviewPartOption>
  rules: InterviewRules
  context: InterviewScheduleContext
}

export type Slot = {
  slotId: string
  start: string
  end: string
  availableCount: string
  done: boolean
}

export type GetInterviewSlotsResponseDTO = {
  date: string
  part: PartFilterType
  slots: Array<Slot>
}

export type GetInterviewSchedulingSlotApplicantsResponseDTO = {
  available: Array<Assignment>
  alreadyScheduled: Array<
    Assignment & {
      scheduledSlot: {
        date: string
        start: string
        end: string
      }
    }
  >
}

export type PostInterviewAssignApplicantsResponseDTO = {
  assigned: {
    assignmentId: string
    applicationId: string
    slot: {
      slotId: string
      start: string
      end: string
      date: string
    }
  }
  summary: InterviewSummary
}

export type DeleteInterviewAssignApplicantsResponseDTO = {
  unassigned: {
    applicationId: string
  }
  summary: InterviewSummary
}

export type GetRecruitmentsDocumentEvaluationResponseDTO = {
  evaluatingRecruitments: Array<{
    recruitmentId: string
    rootRecruitmentId: string
    title: string
    docReviewStartDate: string
    docReviewEndDate: string
    totalApplicantCount: string
    openParts: Array<{
      key: CommonPartType
      label: string
    }>
  }>
  completeRecruitments: Array<{
    recruitmentId: string
    rootRecruitmentId: string
    title: string
    docReviewStartDate: string
    docReviewEndDate: string
    totalApplicantCount: string
    openParts: Array<{
      key: CommonPartType
      label: string
    }>
  }>
}
