/**
 * Auth 도메인 모델
 * 상수에서 타입을 유도하여 타입 안전성 보장
 */

import type { ACCOUNT_STATE_CONFIG, PART_LIST } from './constants'

/** 계정 상태 타입 (상수에서 유도) */
export type AccountStateType = keyof typeof ACCOUNT_STATE_CONFIG

/** 파트 타입 (상수에서 유도) */
export type PartType = 'PLAN' | 'DESIGN' | 'WEB' | 'IOS' | 'ANDROID' | 'SPRINGBOOT' | 'NODEJS'
export type PartSmallType = 'Plan' | 'Design' | 'Web' | 'iOS' | 'Android' | 'SpringBoot' | 'Node.js'
/** 파트 목록 타입 */
export type PartListType = typeof PART_LIST
