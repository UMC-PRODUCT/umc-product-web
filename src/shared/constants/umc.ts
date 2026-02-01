import { PART_LIST } from '@/shared/constants/part'
import type { PartType } from '@/shared/types/part'
import type { AccountLevelType } from '@/shared/types/umc'

const ACCOUNT_LEVEL_CONFIG: Record<
  AccountLevelType,
  { id: number; label: AccountLevelType; description: string }
> = {
  ADMIN: { id: 1, label: 'ADMIN', description: '관리자' },
  MANAGER: { id: 2, label: 'MANAGER', description: '매니저' },
  CHALLENGER: { id: 3, label: 'CHALLENGER', description: '챌린저' },
  USER: { id: 4, label: 'USER', description: '일반 회원' },
}

const ACCOUNT_LEVEL_LIST = Object.values(ACCOUNT_LEVEL_CONFIG)

// 하위 호환성을 위한 re-export
export const PART: Array<PartType> = [...PART_LIST]

export const FOOTER_INFO: { email: string; generation: number; master: string } = {
  email: 'email.umc@example.com',
  generation: 10,
  master: '홍길동',
}

// 하위 호환성을 위해 기존 형태 유지
export const ACCOUNT_LEVEL: Array<{ id: number; label: AccountLevelType }> = ACCOUNT_LEVEL_LIST.map(
  (item) => ({
    id: item.id,
    label: item.label,
  }),
)

export type RECRUITING_SCHEDULE_TYPE =
  | 'APPLY_WINDOW'
  | 'DOC_REVIEW_WINDOW'
  | 'DOC_RESULT_AT'
  | 'INTERVIEW_WINDOW'
  | 'FINAL_REVIEW_WINDOW'
  | 'FINAL_RESULT_AT'

export type UserApplicationBadgeType = 'DRAFT' | 'SUBMITTED' | 'PREVIOUS'
