/**
 * Auth 도메인 상수
 * 상수에서 타입을 유도하여 타입-상수 동기화 보장
 */

/** 계정 상태 설정 */
export const ACCOUNT_STATE_CONFIG = {
  ACTIVE: { label: 'ACTIVE', description: '활성' },
  INACTIVE: { label: 'INACTIVE', description: '비활성' },
  PENDING: { label: 'PENDING', description: '대기중' },
} as const

/** 파트 설정 */
export const PART_CONFIG = {
  PLAN: { label: 'Plan', abilities: ['PM', 'Figma'] },
  DESIGN: { label: 'Design', abilities: ['UX/UI', 'Figma'] },
  WEB: { label: 'Web', abilities: ['Front-End', 'HTML', 'CSS', 'JavaScript'] },
  IOS: { label: 'iOS', abilities: ['Front-End', 'Swift'] },
  ANDROID: { label: 'Android', abilities: ['Front-End', 'Kotlin'] },
  SPRINGBOOT: { label: 'SpringBoot', abilities: ['Back-End', 'Java'] },
  NODEJS: { label: 'Node.js', abilities: ['Back-End', 'JavaScript'] },
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
