import type { Control, FieldErrors, UseFormClearErrors, UseFormSetValue } from 'react-hook-form'

import type { QuestionType } from '@features/apply/domain/model'

export type Option<T> = { label: T; id: string | number }

type RecruitingFormValues = Record<string, unknown>

export type option = {
  optionId: number
  content: string
}
export type question = {
  questionId: number
  type: QuestionType
  questionText: string
  required: boolean
  options: Array<option>
  maxSelectCount: number | null
  preferredPartOptions: Array<{
    recruitmentPartId: number
    label: string
    value: RecruitingPart
  }>
}

export type pageType = {
  page: number
  questions: Array<question>
  scheduleQuestion: {
    questionId: number
    type: QuestionType
    questionText: string
    required: boolean
    schedule: RecruitingSchedule
  } | null
  partQuestions: Array<{
    part: RecruitingPart
    questions: Array<question>
  }>
}
export interface ResumeFormSectionProps {
  pages: Array<pageType>
  control: Control<RecruitingFormValues>
  setValue: UseFormSetValue<RecruitingFormValues>
  clearErrors: UseFormClearErrors<RecruitingFormValues>
  errors: FieldErrors<RecruitingFormValues>
  currentPage: number
  totalPages: number
  isSubmitDisabled: boolean
  onOpenSubmitModal: () => void
  onPageChange: (nextPage: number) => void
  isEdit?: boolean
}
export interface RecruitingForms {
  title: string
  recruitmentParts: Array<RecruitingPart>
  maxPreferredPartCount: number
  schedule: RecruitingSchedule
  noticeContent: string
  status: RecruitingStatus
  items: Array<RecruitingItem>
}

export type QuestionMode = 'view' | 'edit'

export interface RecruitingQuestion {
  questionId: number
  question: string
  type: QuestionType
  necessary: boolean
  options: Array<string>
  partSinglePick: boolean
  isPartQuestion: boolean
}

export interface RecruitingQuestionPage {
  page: number
  questions: Array<RecruitingQuestion>
}

export type RecruitingPart = 'PLAN' | 'DESIGN' | 'WEB' | 'IOS' | 'ANDROID' | 'SPRINGBOOT' | 'NODEJS'

export type RecruitingStatus = 'DRAFT' | 'OPEN' | 'CLOSED' | 'ONGOING' | 'SCHEDULED'

export type range = {
  start: string
  end: string
}

export type RecruitingSchedule = {
  applyStartAt: string | null
  applyEndAt: string | null
  docResultAt: string | null
  interviewStartAt: string | null
  interviewEndAt: string | null
  finalResultAt: string | null
  interviewTimeTable: RecruitingInterviewTimeTable
}

export type RecruitingInterviewTimeTable = {
  dateRange: range
  timeRange: range
  slotMinutes: string
  enabledByDate: Array<{ date: string; time: Array<string> }>
  disabledByDate: Array<{ date: string; times: Array<string> }>
}

export type RecruitingItemQuestionType = Exclude<QuestionType, 'PART'> | 'PREFERRED_PART'

export type RecruitingItemTarget = {
  kind: 'COMMON_PAGE' | 'PART'
  pageNo: number
  part?: RecruitingPart
}

export type RecruitingItemOption = {
  content: string
  orderNo: number
}

export type RecruitingItemQuestion = {
  questionId?: number
  type: RecruitingItemQuestionType
  questionText: string
  required: boolean
  orderNo: number
  options?: Array<RecruitingItemOption>
}

export type RecruitingItem = {
  target: RecruitingItemTarget
  question: RecruitingItemQuestion
}

export type PartQuestionBank = Partial<Record<string, Array<RecruitingQuestion>>>
export type PartQuestionBankPayload = Partial<Record<RecruitingPart, Array<RecruitingQuestion>>>

export type PartCompletion = '진행 중' | '모집 종료' | '모집 예정'

export type RecruitePhase =
  | 'BEFORE_APPLY'
  | 'APPLY_OPEN'
  | 'DOC_REVIEWING'
  | 'DOC_RESULT_PUBLISHED'
  | 'INTERVIEW_WAITING'
  | 'FINAL_REVIEWING'
  | 'FINAL_RESULT_PUBLISHED'
  | 'CLOSED'
