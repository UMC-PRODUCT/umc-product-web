/**
 * 질문 관련 공통 타입 정의
 * shared 컴포넌트에서 사용되는 Question 관련 타입들
 */

export type QuestionType = 'text' | 'multipleChoice' | 'timeTable' | 'fileUpload' | 'choice'

export type FileUploadStatus = 'loading' | 'success' | 'error'

export interface UploadedFile {
  id: string
  name: string
  size: number
  status: FileUploadStatus
  progress: number
  file?: File
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
  type: 'text'
  answer: string
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multipleChoice'
  answer: Array<string>
  options: Array<string>
}

export interface TimeTableQuestion extends BaseQuestion {
  type: 'timeTable'
  dates: Array<string>
  timeRange: [string, string]
  disabled?: TimeTableSlots
  answer: TimeTableSlots
}

export interface FileUploadQuestion extends BaseQuestion {
  type: 'fileUpload'
  answer: FileUploadAnswer
}

export interface ChoiceQuestion extends BaseQuestion {
  type: 'choice'
  answer: string
  options: Array<string>
}

export type QuestionUnion =
  | TextQuestion
  | MultipleChoiceQuestion
  | TimeTableQuestion
  | FileUploadQuestion
  | ChoiceQuestion

/**
 * 질문 답변 값 타입
 * Question 컴포넌트에서 사용하는 답변 값들의 유니온 타입
 */
export type QuestionAnswerValue =
  | string
  | Array<string>
  | TimeTableSlots
  | FileUploadAnswer
  | undefined

export interface QuestionPage {
  page: number
  questions: Array<QuestionUnion>
}

export interface QuestionList {
  id: number
  title: string
  description: string
  pages: Array<QuestionPage>
}

export interface ResumeData {
  id: number
  title: string
  description: string
  lastSavedTime: string
  pages: Array<QuestionPage>
}
