import type { Control, FieldErrors, UseFormClearErrors, UseFormSetValue } from 'react-hook-form'

import type { QuestionType, QuestionUnion, TimeTableSlots } from './question'
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
}
export interface RecruitingForms {
  recruitingName: string
  recruitingPart: Array<PartType>
  documentStartDate: Date | null
  documentEndDate: Date | null
  documentResultDate: Date | null
  interviewStartDate: Date | null
  interviewEndDate: Date | null
  finalResultDate: Date | null
  interviewTimeSlots: TimeTableSlots
  noticeTitle: string
  noticeContent: string
  questionPages: Array<RecruitingQuestionPage>
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
