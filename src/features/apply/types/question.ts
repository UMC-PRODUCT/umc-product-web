/**
 * Apply feature 관련 질문 타입
 * 공통 타입은 shared에서 가져오고, apply 도메인 특화 타입만 여기에 정의
 */

import type { useForm } from 'react-hook-form'

import type { QuestionPage, QuestionUnion } from './question'

// 공통 질문 타입 re-export
export type {
  ChoiceQuestion,
  FileUploadAnswer,
  FileUploadQuestion,
  FileUploadStatus,
  MultipleChoiceQuestion,
  QuestionAnswerValue,
  QuestionList,
  QuestionPage,
  QuestionType,
  QuestionUnion,
  TextQuestion,
  TimeTableQuestion,
  TimeTableSlots,
  UploadedFile,
} from '@/shared/types/question'

// ResumeData를 ResumeType으로 alias하여 기존 코드 호환성 유지
export type { ResumeData as ResumeType } from '@/shared/types/question'

export interface UseResumeFormReturn {
  control: ReturnType<typeof useForm<ResumeFormValues>>['control']
  handleSubmit: ReturnType<typeof useForm<ResumeFormValues>>['handleSubmit']
  trigger: ReturnType<typeof useForm<ResumeFormValues>>['trigger']
  getValues: ReturnType<typeof useForm<ResumeFormValues>>['getValues']
  setValue: ReturnType<typeof useForm<ResumeFormValues>>['setValue']
  clearErrors: ReturnType<typeof useForm<ResumeFormValues>>['clearErrors']
  reset: ReturnType<typeof useForm<ResumeFormValues>>['reset']
  errors: ReturnType<typeof useForm<ResumeFormValues>>['formState']['errors']
  isDirty: boolean
  isFormIncomplete: boolean
  resolvedPages: Array<QuestionPage>
}

export type ResumeFormValues = Record<string, unknown>

export type PageType = {
  page: number
  questions: Array<QuestionUnion>
}
