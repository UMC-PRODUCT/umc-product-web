import type { Dispatch, SetStateAction } from 'react'

import type { PartType } from '@/features/auth/domain'
import type { QuestionSummary, RequiredScheduleWithDisabled } from '@/features/school/domain/types'
import type { RECRUITING_SCHEDULE_TYPE } from '@/shared/constants/umc'
import type { OptionAnswerValue, RecruitmentApplicationForm } from '@/shared/types/form'

import type { FILE_UPLOAD_STATUS, QUESTION_TYPE_CONFIG } from './constants'

/**
 * 지원서 관련 Apply 도메인 모델
 * 질문/응답, 파일 업로드, 제출 상태 등을 다루는 타입을 모아둡니다.
 */

// ============================================
// 질문 관련 타입
// ============================================

/** 문서 평가 상태 */
export type DocumentStatusType = 'PENDING' | 'EVALUATING' | 'PASS' | 'FAIL'
/** 최종 평가 상태 */
export type FinalStatusType = 'WAITING' | 'IN_PROGRESS' | 'EVALUATING' | 'PENDING'

/** 설정한 QUESTION_TYPE_CONFIG의 키를 기반으로 하는 질문 유형 */
export type QuestionType = keyof typeof QUESTION_TYPE_CONFIG

/** 파일 업로드 상태 열거 */
export type FileUploadStatus = (typeof FILE_UPLOAD_STATUS)[keyof typeof FILE_UPLOAD_STATUS]

/** 실제 업로드된 파일 메타데이터 */
export interface UploadedFile {
  id: string
  name: string
  size: number
  status: FileUploadStatus
  progress: number
  file: File
  errorMessage?: string
}

/** 파일 업로드 응답으로 전달하는 데이터 */
export interface FileUploadAnswer {
  files: Array<UploadedFile>
  links: Array<string>
}

/** 날짜별 시간 슬롯 시간표 (키: 날짜, 값: 가능한 시간 배열) */
export type TimeTableSlots = Record<string, Array<string>>

// ============================================
// 질문 유니온 타입
// ============================================

/** 모든 질문이 공통으로 갖는 속성 */
interface BaseQuestion {
  id: number
  question: string
  questionNumber: number
  necessary: boolean
}

/** 짧은 텍스트 질문 */
export interface TextQuestion extends BaseQuestion {
  type: 'SHORT_TEXT'
  answer: string
}

/** 긴 텍스트 질문 */
export interface LongTextQuestion extends BaseQuestion {
  type: 'LONG_TEXT'
  answer: string
}

/** 복수 선택형 질문 */
export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'CHECKBOX'
  answer: OptionAnswerValue
  options: Array<string>
}

/** 단일 선택형 질문 */
export interface ChoiceQuestion extends BaseQuestion {
  type: 'RADIO'
  answer: OptionAnswerValue
  options: Array<string>
}

/** 드롭다운 질문 */
export interface DropdownQuestion extends BaseQuestion {
  type: 'DROPDOWN'
  answer: string
  options: Array<string>
}

/** 일정 질문 (시간표) */
export interface TimeTableQuestion extends BaseQuestion {
  type: 'SCHEDULE'
  dates: Array<string>
  timeRange: [string, string]
  disabled?: TimeTableSlots
  answer: TimeTableSlots
}

/** 포트폴리오 업로드 질문 */
export interface FileUploadQuestion extends BaseQuestion {
  type: 'PORTFOLIO'
  answer: FileUploadAnswer
}

/** 파트 선호도 질문 */
export interface PartQuestion extends BaseQuestion {
  type: 'PREFERRED_PART'
  answer: Array<{ id: number; answer: PartType }>
  options: Array<{ id: number; options: Array<PartType> }>
}

/** 질문의 답변으로 가능한 값의 집합 */
export type QuestionAnswerValue =
  | string
  | Array<string>
  | OptionAnswerValue
  | Array<{ id: number; answer: PartType }>
  | TimeTableSlots
  | FileUploadAnswer
  | undefined

// ============================================
// 지원서 관련 타입
// ============================================

/** 전체 지원서 구조 */
export interface QuestionList {
  recruitmentId: number
  noticeTitle: string
  noticeContent: string
  lastSavedTime?: string
  pages: Array<{
    page: number
    questions: Array<QuestionSummary>
    scheduleQuestion: QuestionSummary & {
      schedule: RequiredScheduleWithDisabled
    }
    partQuestions: Array<{
      part: PartType
      questions: Array<QuestionSummary>
    }>
  }>
}

/** 파일 업로드 상태값 */
export interface FileUploadValue {
  files: Array<UploadedFile>
  links?: Array<string>
}

/** 파일 업로드 훅 옵션 */
export interface UseFileUploadOptions {
  initialFiles: Array<UploadedFile>
  value: FileUploadValue | undefined
  onChange: ((newValue: FileUploadValue) => void) | undefined
}

/** 파일 업로드 훅 반환값 */
export interface UseFileUploadReturn {
  uploadedFiles: Array<UploadedFile>
  setUploadedFiles: Dispatch<SetStateAction<Array<UploadedFile>>>
  processFiles: (fileList: FileList | null) => void
  simulateUpload: (fileId: string, file: File) => void
  updateFileStatus: (fileId: string, status: FileUploadStatus, progress: number) => void
}

/** 페이지 이동 차단 결과 */
export interface NavigationBlockerResult {
  isOpen: boolean
  allowNextNavigationOnce: () => void
  stay: () => void
  leave: () => void
}

/** 지원서 폼 조회 응답 */
export type GetRecruitmentApplicationFormResponseDTO = RecruitmentApplicationForm

/** 지원서 답변 조회 응답 */
export type GetRecruitmentApplicationAnswerResponseDTO = {
  recruitmentId: string
  formId: string
  formResponseId: string
  status: string // TODO: enum 으로 변경
  lastSavedAt: string
  submittedAt: string | null
  answers: Array<AnswerItem>
}

/** 일정 조회 응답 */
export type GetRecruitmentSchedulesResponseDTO = {
  recruitmentId: string
  schedules: Array<{
    type: RECRUITING_SCHEDULE_TYPE
    kind: string
    startDate: string
    endDate: string
  }>
}
/** 초안 리셋 응답 */
export type PostRecruitmentApplicationDraftResetResponseDTO = RecruitmentForm
/** 초안 생성 응답 */
export type PostRecruitmentApplicationDraftResponseDTO = RecruitmentForm
/** 제출된 지원서 메타 정보 */
export type RecruitmentForm = {
  recruitmentId: string
  formId: string
  formResponseId: string
  createdAt: string
}
/** 제출 응답 */
export type PostRecruitmentApplicationSubmitResponseDTO = {
  recruitmentId: string
  formResponseId: string
  applicationId: string
  status: string
}
/** 보드에 연결된 지원자 현재 상태 */
export type GetMyApplicationStatusResponseDTO = {
  nickname: string
  name: string
  current: {
    appliedParts: Array<PartType>
    documentEvaluation: Array<string>
    finalEvaluation: Array<string>
    progress: {
      currentStep: string
      steps: Array<{
        step: string
        label: string
        done: boolean
        active: boolean
      }>
      resultAnnounceAt: string
    }
  }
  applications: Array<{
    recruitmentId: string
    formResponseId: string
    applicationId: string
    recruitmentTitle: string
    badge: string
    status: string
    submittedAt: string
  }>
}
/** 공고 정보 */
export type GetRecruitmentNoticeResponseDTO = {
  recruitmentId: string
  title: string
  content: string
  parts: Array<PartType>
}
/** 특정 파트 모집 정보 */
export type GetRecruitmentPartsResponseDTO = {
  recruitmentId: string
  title: string
  recruitmentPeriod: {
    startsAt: string
    endsAt: string
  } | null
  activityPeriod: {
    startsAt: string
    endsAt: string
  } | null
  description: string
  parts: Array<{
    recruitmentPartId: string
    part: PartType
    status: string
  }>
  myApplication: {
    status: 'DRAFT' | 'NONE' | 'SUBMITTED'
    draftFormResponseId: string
    applicationId: string
  }
}
export type AnswerItem = {
  questionId: string
  answeredAsType: QuestionType
  value:
    | shortTextAnswer
    | longTextAnswer
    | radioAnswer
    | checkboxAnswer
    | portfolioAnswer
    | preferredPartAnswer
    | scheduleAnswer
}

export type shortTextAnswer = {
  text: string
}

export type longTextAnswer = {
  text: string
}

export type radioAnswer = {
  selectedOptionId: string
  otherText?: string
}

export type checkboxAnswer = {
  selectedOptionIds: Array<string>
  otherText?: string
}

export type portfolioAnswer = {
  files: Array<{
    fileId: string
  }>
  links: Array<{
    url: string
  }>
}

export type preferredPartAnswer = {
  preferredParts: Array<PartType>
}

export type scheduleAnswer = {
  selected: Array<{
    date: string
    times: Array<string>
  }>
}

export type PatchRecruitmentApplicationAnswersRequestDTO = {
  recruitmentId: string
  formResponseId: string
  items: Array<AnswerItem>
}

export type PatchRecruitmentApplicationAnswersResponseDTO = {
  formResponseId: string
  savedQuestionIds: Array<string>
}
