import type { Control, FieldErrors, UseFormClearErrors, UseFormSetValue } from 'react-hook-form'

import type { QuestionType, QuestionUnion } from './question'
import type { PartType } from './umc'

export type Option<T> = { label: T; id: string | number }

type RecruitingFormValues = Record<string, unknown>
export interface ResumeFormSectionProps {
  questions: Array<QuestionUnion>
  partQuestions: Array<QuestionUnion>
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
  recruitmentParts: Array<RecruitingPartApi>
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

export type RecruitingPartApi =
  | 'PLAN'
  | 'DESIGN'
  | 'WEB'
  | 'IOS'
  | 'ANDROID'
  | 'SPRINGBOOT'
  | 'NODEJS'

export type RecruitingStatus = 'DRAFT' | 'OPEN' | 'CLOSED'

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
  dateRange: { start: string; end: string }
  timeRange: { start: string; end: string }
  slotMinutes: number
  enabled: Array<{ date: string; time: Array<string> }>
}

export type RecruitingItemQuestionType = Exclude<QuestionType, 'PART'> | 'PREFERRED_PART'

export type RecruitingItemTarget =
  | { kind: 'COMMON_PAGE'; pageNo: number }
  | { kind: 'PART'; part: RecruitingPartApi }

export type RecruitingItemOption = {
  content: string
  orderNo: number
}

export type RecruitingItemQuestion = {
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
