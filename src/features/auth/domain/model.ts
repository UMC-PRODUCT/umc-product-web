/**
 * Auth 도메인 모델
 * 상수에서 타입을 유도하여 타입 안전성 보장
 */

import type { PartListType, PartSmallType, PartType } from '@/shared/types/part'

import type { ACCOUNT_STATE_CONFIG } from './constants'

/** 계정 상태 타입 (상수에서 유도) */
export type AccountStateType = keyof typeof ACCOUNT_STATE_CONFIG

/** 파트 타입 (공용 타입 사용) */
export type { PartListType, PartSmallType, PartType }
