/**
 * 질문 관련 공통 타입 정의
 * shared 컴포넌트에서 사용되는 Question 관련 타입들
 */

import type { PartType } from './umc'

export type QuestionType =
  | 'SHORT_TEXT'
  | 'CHECKBOX'
  | 'SCHEDULE'
  | 'PORTFOLIO'
  | 'RADIO'
  | 'LONG_TEXT'
  | 'PART'
  | 'DROPDOWN'

export type FileUploadStatus = 'loading' | 'success' | 'error'

export interface UploadedFile {
  id: string
  name: string
  size: number
  status: FileUploadStatus
  progress: number
  file: File
}

export interface FileUploadAnswer {
  files: Array<UploadedFile>
  links: Array<string>
}

export type TimeTableSlots = Record<string, Array<string>>

interface BaseQuestion {
  id: number
  question: string
  questionNumber: number
  necessary: boolean
}

export interface TextQuestion extends BaseQuestion {
  type: 'SHORT_TEXT'
  answer: string
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'CHECKBOX'
  answer: Array<string>
  options: Array<string>
}

export interface TimeTableQuestion extends BaseQuestion {
  type: 'SCHEDULE'
  dates: Array<string>
  timeRange: [string, string]
  disabled?: TimeTableSlots
  answer: TimeTableSlots
}

export interface FileUploadQuestion extends BaseQuestion {
  type: 'PORTFOLIO'
  answer: FileUploadAnswer
}

export interface ChoiceQuestion extends BaseQuestion {
  type: 'RADIO'
  answer: string
  options: Array<string>
}
export interface LongTextQuestion extends BaseQuestion {
  type: 'LONG_TEXT'
  answer: string
}

export interface PartQuestion extends BaseQuestion {
  type: 'PART'
  answer: Array<{ id: number; answer: PartType }>
  options: Array<{ id: number; options: Array<PartType> }>
}

export type QuestionUnion =
  | TextQuestion
  | MultipleChoiceQuestion
  | TimeTableQuestion
  | FileUploadQuestion
  | ChoiceQuestion
  | LongTextQuestion
  | PartQuestion

export type QuestionAnswerValue =
  | string
  | Array<string>
  | Array<{ id: number; answer: PartType }>
  | TimeTableSlots
  | FileUploadAnswer
  | undefined

export interface QuestionPage {
  page: number
  questions?: Array<QuestionUnion>
}

export interface QuestionList {
  id: number
  title: string
  description: string
  lastSavedTime: string
  pages: Array<QuestionPage>
  partQuestionBank: Record<PartType, Array<PartQuestionBankPage>>
}

export interface ResumeData {
  id: number
  title: string
  description: string
  lastSavedTime: string
  pages: Array<QuestionPage>
}

export interface PartQuestionBankPage {
  questions: Array<QuestionUnion>
}
