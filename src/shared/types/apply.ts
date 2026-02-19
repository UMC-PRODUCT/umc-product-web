import type { PartType } from './part'

export type DocumentStatusType = 'PENDING' | 'EVALUATING' | 'PASS' | 'FAIL'
export type FinalStatusType = 'WAITING' | 'IN_PROGRESS' | 'EVALUATING' | 'PENDING' | 'DONE' | 'NONE'

export type QuestionType =
  | 'SHORT_TEXT'
  | 'LONG_TEXT'
  | 'CHECKBOX'
  | 'RADIO'
  | 'DROPDOWN'
  | 'SCHEDULE'
  | 'PORTFOLIO'
  | 'PREFERRED_PART'

export type FileUploadStatus = 'loading' | 'success' | 'error'

export interface UploadedFile {
  id: string
  name: string
  size: number
  status: FileUploadStatus
  progress: number
  file: File
  errorMessage?: string
}

export interface FileUploadAnswer {
  files: Array<UploadedFile>
  links: Array<string>
}

export type TimeTableSlots = Record<string, Array<string>>

export type QuestionAnswerValue =
  | string
  | Array<string>
  | {
      selectedOptionIds: Array<string>
      otherText?: string
    }
  | Array<{ id: number; answer: PartType }>
  | TimeTableSlots
  | FileUploadAnswer
  | undefined
