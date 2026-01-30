import type { PartSmallType, PartType } from '@/features/auth/domain/model'

const partToApiMap = {
  Plan: 'PLAN',
  Design: 'DESIGN',
  Web: 'WEB',
  iOS: 'IOS',
  Android: 'ANDROID',
  SpringBoot: 'SPRINGBOOT',
  'Node.js': 'NODEJS',
} as const satisfies Record<PartSmallType, PartType>

const apiToPartMap = {
  PLAN: 'Plan',
  DESIGN: 'Design',
  WEB: 'Web',
  IOS: 'iOS',
  ANDROID: 'Android',
  SPRINGBOOT: 'SpringBoot',
  NODEJS: 'Node.js',
} as const satisfies Record<PartType, PartSmallType>

export const mapPartToApi = (part: PartSmallType): PartType => partToApiMap[part]

export const mapApiPartToPartType = (part: PartType): PartSmallType => apiToPartMap[part]
