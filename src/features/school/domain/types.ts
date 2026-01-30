import type { QuestionType } from '@/features/apply/domain'
import type { PartType } from '@/features/auth/domain'
import type {
  pageType,
  RecruitingInterviewTimeTable,
  RecruitingItem,
  RecruitingSchedule,
  RecruitingStatus,
} from '@/shared/types/form'

export type QuestionOption = {
  content: string
  orderNo: number
  isOther?: boolean
}

export type ScheduleSlot = {
  date?: string
  times?: Array<string>
}

export type InterviewTimeTableWithDisabled = RecruitingInterviewTimeTable & {
  disabledByDate: Array<{ date: string; times: Array<string> }>
}

export type RecruitingDraft = {
  title: string
  recruitmentParts: Array<PartType>
  maxPreferredPartCount: number
  schedule?: RecruitingSchedule
  noticeContent: string
  status: RecruitingStatus
}

export interface ApplicationFormQuestion {
  questionId?: number
  type: QuestionType
  questionText: string
  required: boolean
  orderNo: number
  options?: Array<QuestionOption>
}

export interface ApplicationFormPayload {
  items: Array<RecruitingItem>
}

export type QuestionSummary = {
  questionId: number
  type: QuestionType
  questionText: string
  required: boolean
  options: Array<QuestionOption>
}

export type RequiredSchedule = RecruitingSchedule & {
  interviewTimeTable: RecruitingInterviewTimeTable
}

export type RequiredScheduleWithDisabled = RecruitingSchedule & {
  interviewTimeTable: InterviewTimeTableWithDisabled
}

export type RecruitingForms = {
  recruitmentid: number
  formId: number
  status: string
  recruitmentFormTitle: string
  noticeTitle: string
  noticeContent: string
  pages: Array<pageType>
}

export type Phase =
  | 'BEFORE_APPLY'
  | 'APPLY_OPEN'
  | 'DOC_REVIEWING'
  | 'DOC_RESULT_PUBLISHED'
  | 'INTERVIEW_WAITING'
  | 'FINAL_REVIEWING'
  | 'FINAL_RESULT_PUBLISHED'
  | 'CLOSED'
