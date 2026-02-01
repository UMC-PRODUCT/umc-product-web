import type { PartType } from './part'

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
