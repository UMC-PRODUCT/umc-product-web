/**
 * Apply 도메인 모델
 * 질문, 지원서 관련 타입 정의
 */

import type { PartType } from '@features/auth/domain'

import type { FILE_UPLOAD_STATUS, QUESTION_TYPE_CONFIG } from './constants'

// ============================================
// 질문 관련 타입
// ============================================

/** 질문 타입 */
export type QuestionType = keyof typeof QUESTION_TYPE_CONFIG

/** 파일 업로드 상태 */
export type FileUploadStatus = (typeof FILE_UPLOAD_STATUS)[keyof typeof FILE_UPLOAD_STATUS]

/** 서류 평가 상태 타입 (한글 레이블 - 기존 호환성) */
export type DocumentStatusType = '미정' | '평가 중' | '서류 합격' | '불합격'

/** 최종 평가 상태 타입 (한글 레이블 - 기존 호환성) */
export type FinalStatusType = '미정' | '예정' | '평가 중' | '최종 합격' | '불합격'

/** 업로드된 파일 */
export interface UploadedFile {
  id: string
  name: string
  size: number
  status: FileUploadStatus
  progress: number
  file: File
}

/** 파일 업로드 답변 */
export interface FileUploadAnswer {
  files: Array<UploadedFile>
  links: Array<string>
}

/** 시간표 슬롯 */
export type TimeTableSlots = Record<string, Array<string>>

// ============================================
// 질문 유니온 타입
// ============================================

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

export interface LongTextQuestion extends BaseQuestion {
  type: 'LONG_TEXT'
  answer: string
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'CHECKBOX'
  answer: Array<string>
  options: Array<string>
}

export interface ChoiceQuestion extends BaseQuestion {
  type: 'RADIO'
  answer: string
  options: Array<string>
}

export interface DropdownQuestion extends BaseQuestion {
  type: 'DROPDOWN'
  answer: string
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

export interface PartQuestion extends BaseQuestion {
  type: 'PART'
  answer: Array<{ id: number; answer: PartType }>
  options: Array<{ id: number; options: Array<PartType> }>
}

/** 질문 유니온 타입 */
export type QuestionUnion =
  | TextQuestion
  | LongTextQuestion
  | MultipleChoiceQuestion
  | ChoiceQuestion
  | DropdownQuestion
  | TimeTableQuestion
  | FileUploadQuestion
  | PartQuestion

/** 질문 답변 값 타입 */
export type QuestionAnswerValue =
  | string
  | Array<string>
  | Array<{ id: number; answer: PartType }>
  | TimeTableSlots
  | FileUploadAnswer
  | undefined

// ============================================
// 지원서 관련 타입
// ============================================

/** 질문 페이지 */
export interface QuestionPage {
  page: number
  questions?: Array<QuestionUnion>
}

/** 파트별 질문 은행 페이지 */
export interface PartQuestionBankPage {
  questions: Array<QuestionUnion>
}

/** 질문 목록 (전체 지원서 구조) */
export interface QuestionList {
  id: number
  title: string
  description: string
  lastSavedTime: string
  pages: Array<QuestionPage>
  partQuestionBank: Record<PartType, Array<PartQuestionBankPage>>
}

/** 지원서 데이터 */
export interface ResumeData {
  id: number
  description: string
  lastSavedTime: string
  pages: Array<QuestionPage>
}
