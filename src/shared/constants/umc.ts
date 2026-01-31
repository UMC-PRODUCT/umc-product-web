/**
 * UMC 공통 상수 (하위 호환성 유지)
 * 실제 상수는 각 feature의 domain에서 관리됨
 *
 * @deprecated 새 코드에서는 각 feature의 domain을 직접 import하세요
 * - Account/Part 관련: @features/auth/domain
 */

import type { AccountLevelType, PartType } from '@features/auth/domain'
import { ACCOUNT_LEVEL_LIST, PART_LIST } from '@features/auth/domain'

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
