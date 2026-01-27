/**
 * Auth 도메인 모델
 * 상수에서 타입을 유도하여 타입 안전성 보장
 */

import type {
  ACCOUNT_LEVEL_CONFIG,
  ACCOUNT_STATE_CONFIG,
  PART_CONFIG,
  PART_LIST,
} from './constants'

/** 계정 레벨 타입 (상수에서 유도) */
export type AccountLevelType = keyof typeof ACCOUNT_LEVEL_CONFIG

/** 계정 상태 타입 (상수에서 유도) */
export type AccountStateType = keyof typeof ACCOUNT_STATE_CONFIG

/** 파트 타입 (상수에서 유도) */
export type PartType = keyof typeof PART_CONFIG
export type PartSmallType = 'Plan' | 'Design' | 'Web' | 'iOS' | 'Android' | 'SpringBoot' | 'Node.js'
/** 파트 목록 타입 */
export type PartListType = typeof PART_LIST

/** 계정 레벨 설정 아이템 */
export interface AccountLevelItem {
  id: number
  label: AccountLevelType
  description: string
}

/** 계정 정보 */
export interface Account {
  id: number
  email: string
  name: string
  level: AccountLevelType
  state: AccountStateType
  part?: PartType
  universityId?: number
  createdAt: string
  updatedAt: string
}

/** 로그인 요청 */
export interface LoginRequest {
  email: string
  password: string
}

/** 회원가입 요청 */
export interface RegisterRequest {
  email: string
  password: string
  name: string
  universityId: number
  part: PartType
}

/** 인증 응답 */
export interface AuthResponse {
  accessToken: string
  refreshToken: string
  account: Account
}
