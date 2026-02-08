import { PART_LIST } from '@/shared/constants/part'
import type { PartType } from '@/shared/types/part'

// 하위 호환성을 위한 re-export
export const PART: Array<PartType> = [...PART_LIST]

export const FOOTER_INFO: { email: string; generation: number; master: string } = {
  email: 'email.umc@example.com',
  generation: 10,
  master: '전채운',
}

export type RECRUITING_SCHEDULE_TYPE =
  | 'APPLY_WINDOW'
  | 'DOC_REVIEW_WINDOW'
  | 'DOC_RESULT_AT'
  | 'INTERVIEW_WINDOW'
  | 'FINAL_REVIEW_WINDOW'
  | 'FINAL_RESULT_AT'

export type UserApplicationBadgeType = 'DRAFT' | 'SUBMITTED' | 'PREVIOUS'

export type LinkType = 'KAKAO' | 'YOUTUBE' | 'INSTAGRAM'
