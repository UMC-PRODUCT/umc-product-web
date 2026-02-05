import type { Control, FieldErrors, UseFormClearErrors, UseFormSetValue } from 'react-hook-form'

import type { QuestionType } from '@/shared/types/apply'

import type { PartType } from './umc'

export type Option<T> = { label: T; id: string | number }

type RecruitingFormValues = Record<string, unknown>

export type FormOption = {
  optionId: string
  content: string
  isOther?: boolean
}
export type OptionAnswerValue = {
  selectedOptionIds: Array<string>
  otherText?: string
}
export type FormQuestion = {
  questionId: number
  type: QuestionType
  questionText: string
  required: boolean
  options: Array<FormOption>
  maxSelectCount: string | null
  preferredPartOptions: Array<{
    recruitmentPartId: number
    label: string
    value: PartType
  }>
}

export type FormPage = {
  page: number
  questions: Array<FormQuestion> | null
  scheduleQuestion: {
    questionId: number
    type: QuestionType
    questionText: string
    required: boolean
    schedule: {
      dateRange: DateRange
      timeRange: DateRange
      slotMinutes: string
      enabledByDate: Array<{ date: string; times: Array<string> }>
      disabledByDate: Array<{ date: string; times: Array<string> }>
    }
  } | null
  partQuestions: Array<{
    part: PartType
    label?: string
    questions: Array<FormQuestion>
  }> | null
}
export interface ResumeFormSectionProps {
  pages: Array<FormPage>
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
  recruitmentParts: Array<PartType>
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

export type RecruitingStatus = 'DRAFT' | 'OPEN' | 'CLOSED' | 'ONGOING' | 'SCHEDULED' | 'PUBLISHED'

export type DateRange = {
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
  dateRange: DateRange
  timeRange: DateRange
  slotMinutes: string
  enabledByDate: Array<{ date: string; times: Array<string> }>
  disabledByDate: Array<{ date: string; times: Array<string> }>
}

export type RecruitingItemQuestionType = Exclude<QuestionType, 'PART'> | 'PREFERRED_PART'

export type RecruitingItemTarget = {
  kind: 'COMMON_PAGE' | 'PART'
  pageNo: number
  part?: PartType
}

export type RecruitingItemOption = {
  content: string
  orderNo: number
  optionId?: string
  isOther?: boolean
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
export type PartQuestionBankPayload = Partial<Record<PartType, Array<RecruitingQuestion>>>

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
