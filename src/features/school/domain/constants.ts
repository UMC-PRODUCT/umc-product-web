import type { RecruitingItemQuestionType } from '@/shared/types/form'

import type { Phase } from './types'

export const PAGE_INFO = [
  {
    page: 1,
    title: '지원자 정보 및 희망 파트 선택',
  },
  {
    page: 2,
    title: '공통 문항',
  },
  {
    page: 3,
    title: '파트별 문항',
  },
] as const

export const QUESTION_INFO: Array<{ label: string; id: RecruitingItemQuestionType }> = [
  {
    label: '장문형',
    id: 'LONG_TEXT',
  },
  {
    label: '단답형',
    id: 'SHORT_TEXT',
  },
  {
    label: '단일 선택',
    id: 'RADIO',
  },
  {
    label: '복수 선택',
    id: 'CHECKBOX',
  },
  {
    label: '파일 첨부',
    id: 'PORTFOLIO',
  },
]

export const RESPONSE_INFO: Array<{ label: string; value: boolean }> = [
  {
    label: '필수 문항',
    value: true,
  },
  {
    label: '선택 문항',
    value: false,
  },
]

export const STEP_NAME = [
  {
    step: 1,
    name: '기본 정보 입력',
  },
  {
    step: 2,
    name: '기간 설정',
  },
  {
    step: 3,
    name: '지원서 문항 작성',
  },
  {
    step: 4,
    name: '공지 작성',
  },
  {
    step: 5,
    name: '최종 검토',
  },
] as const

export const PHASE: Array<Phase> = [
  'BEFORE_APPLY',
  'APPLY_OPEN',
  'DOC_REVIEWING',
  'DOC_RESULT_PUBLISHED',
  'INTERVIEW_WAITING',
  'FINAL_REVIEWING',
  'FINAL_RESULT_PUBLISHED',
  'CLOSED',
] as const

export const EVALUATION_TAB = [
  { value: 'docs', label: '서류 전형' },
  { value: 'interview', label: '면접 전형' },
  { value: 'final', label: '최종 평가' },
] as const
