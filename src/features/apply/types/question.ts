/**
 * Apply feature 관련 질문 타입
 * 공통 타입은 shared에서 가져오고, apply 도메인 특화 타입만 여기에 정의
 */

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
