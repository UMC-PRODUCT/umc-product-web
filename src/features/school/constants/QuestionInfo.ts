import type { QuestionType } from '@/shared/types/question'

export const QUESTION_INFO: Array<{ label: string; id: QuestionType }> = [
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
    label: '면접 시간',
    id: 'SCHEDULE',
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
