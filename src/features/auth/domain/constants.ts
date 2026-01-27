/**
 * Auth 도메인 상수
 * 상수에서 타입을 유도하여 타입-상수 동기화 보장
 */

/** 계정 레벨 설정 */
export const ACCOUNT_LEVEL_CONFIG = {
  ADMIN: { id: 1, label: 'ADMIN', description: '관리자' },
  MANAGER: { id: 2, label: 'MANAGER', description: '매니저' },
  CHALLENGER: { id: 3, label: 'CHALLENGER', description: '챌린저' },
  USER: { id: 4, label: 'USER', description: '일반 회원' },
} as const

/** 계정 상태 설정 */
export const ACCOUNT_STATE_CONFIG = {
  ACTIVE: { label: 'ACTIVE', description: '활성' },
  INACTIVE: { label: 'INACTIVE', description: '비활성' },
  PENDING: { label: 'PENDING', description: '대기중' },
} as const

/** 파트 설정 */
export const PART_CONFIG = {
  Plan: { label: 'Plan', abilities: ['PM', 'Figma'] },
  Design: { label: 'Design', abilities: ['UX/UI', 'Figma'] },
  Web: { label: 'Web', abilities: ['Front-End', 'HTML', 'CSS', 'JavaScript'] },
  iOS: { label: 'iOS', abilities: ['Front-End', 'Swift'] },
  Android: { label: 'Android', abilities: ['Front-End', 'Kotlin'] },
  SpringBoot: { label: 'SpringBoot', abilities: ['Back-End', 'Java'] },
  'Node.js': { label: 'Node.js', abilities: ['Back-End', 'JavaScript'] },
} as const

/** 배열 형태의 파트 목록 (순서 보장) */
export const PART_LIST = [
  'PLAN',
  'DESIGN',
  'WEB',
  'IOS',
  'ANDROID',
  'SPRINGBOOT',
  'NODEJS',
] as const

/** 배열 형태의 계정 레벨 목록 (UI용) */
export const ACCOUNT_LEVEL_LIST = Object.values(ACCOUNT_LEVEL_CONFIG)
