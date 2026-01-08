export type QuestionType = 'text' | 'multipleChoice' | 'timeTable' | 'fileUpload' | 'choice'

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
  disabled?: Record<string, Array<string>> // { [date: string]: string[] }
  answer: Record<string, Array<string>> // { [date: string]: string[] } 와 동일하지만 더 깔끔함
}

export interface FileUploadQuestion extends BaseQuestion {
  type: 'fileUpload'
  answer: {
    files: Array<{
      id: number
      name: string
      size: number
      status: 'loading' | 'success' | 'error'
      progress: number
      file: File
    }>
    links: Array<string>
  }
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

export type QuestionPage = {
  page: number
  questions: Array<QuestionUnion>
}

export type QuestionList = {
  id: number
  title: string
  description: string
  pages: Array<QuestionPage>
}

export type ResumeType = {
  id: number
  title: string
  description: string
  lastSavedTime: string
  pages: Array<QuestionPage>
}
