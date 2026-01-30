/**
 * Apply 도메인 공개 API
 */

// 상수
export {
  DOCUMENT_STATUS_CONFIG,
  FILE_UPLOAD_STATUS,
  FINAL_STATUS_CONFIG,
  QUESTION_TYPE_CONFIG,
  RESUME_STATUS_CONFIG,
} from './constants'

// 타입
export type {
  ChoiceQuestion,
  DropdownQuestion,
  FileUploadAnswer,
  FileUploadQuestion,
  FileUploadStatus,
  LongTextQuestion,
  MultipleChoiceQuestion,
  PartQuestion,
  QuestionAnswerValue,
  QuestionList,
  QuestionType,
  TextQuestion,
  TimeTableQuestion,
  TimeTableSlots,
  UploadedFile,
} from './model'
export type { DocumentStatusType, FinalStatusType } from './types'
