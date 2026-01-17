/**
 * UMC 공통 상수 (하위 호환성 유지)
 * 실제 상수는 각 feature의 domain에서 관리됨
 *
 * @deprecated 새 코드에서는 각 feature의 domain을 직접 import하세요
 * - Account/Part 관련: @features/auth/domain
 */

import type { AccountLevelType, PartType } from '@features/auth/domain'
import { ACCOUNT_LEVEL_LIST, PART_CONFIG, PART_LIST } from '@features/auth/domain'

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

// PART_ABILITY는 PART_CONFIG에서 유도
export const PART_ABILITY: Record<PartType, Array<string>> = {
  Plan: [...PART_CONFIG.Plan.abilities],
  Design: [...PART_CONFIG.Design.abilities],
  Web: [...PART_CONFIG.Web.abilities],
  iOS: [...PART_CONFIG.iOS.abilities],
  Android: [...PART_CONFIG.Android.abilities],
  SpringBoot: [...PART_CONFIG.SpringBoot.abilities],
  'Node.js': [...PART_CONFIG['Node.js'].abilities],
}
