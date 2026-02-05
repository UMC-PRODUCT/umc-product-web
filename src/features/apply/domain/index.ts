/**
 * Apply 도메인 공개 API
 *
 * @example
 * import { applyKeys } from '@features/apply/domain'
 * import type { QuestionType, UploadedFile } from '@features/apply/domain'
 */

// API
export * from './api'

// Query Keys
export { applyKeys } from './queryKeys'

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
  DocumentStatusType,
  DropdownQuestion,
  FileUploadAnswer,
  FileUploadQuestion,
  FileUploadStatus,
  FinalStatusType,
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
