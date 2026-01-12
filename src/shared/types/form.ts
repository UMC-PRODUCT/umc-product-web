import type { Control, FieldErrors, UseFormClearErrors, UseFormSetValue } from 'react-hook-form'

import type { QuestionUnion } from './question'

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

export type QuestionMode = 'view' | 'edit'
