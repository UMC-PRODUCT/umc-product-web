import type { QuestionType } from '@/features/apply/domain'
import type { PartType } from '@/features/auth/domain'
import type {
  RecruitingInterviewTimeTable,
  RecruitingItem,
  RecruitingSchedule,
  RecruitingStatus,
} from '@/shared/types/form'

export type QuestionOption = {
  content: string
  orderNo: string
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
  maxPreferredPartCount: string
  // true: 일반(루트) 모집, false: 추가모집(Extension)
  isRoot?: boolean
  schedule?: RecruitingSchedule
  noticeContent: string
  status: RecruitingStatus
}

export interface ApplicationFormQuestion {
  questionId?: number
  type: QuestionType
  questionText: string
  required: boolean
  orderNo: string
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

export type Phase =
  | 'BEFORE_APPLY'
  | 'APPLY_OPEN'
  | 'DOC_REVIEWING'
  | 'DOC_RESULT_PUBLISHED'
  | 'INTERVIEW_WAITING'
  | 'FINAL_REVIEWING'
  | 'FINAL_RESULT_PUBLISHED'
  | 'CLOSED'
