import type { PartSmallType } from '@/features/auth/domain/model'
import type { RecruitingPart } from '@/shared/types/form'

const partToApiMap = {
  Plan: 'PLAN',
  Design: 'DESIGN',
  Web: 'WEB',
  iOS: 'IOS',
  Android: 'ANDROID',
  SpringBoot: 'SPRINGBOOT',
  'Node.js': 'NODEJS',
} as const satisfies Record<PartSmallType, RecruitingPart>

const apiToPartMap = {
  PLAN: 'Plan',
  DESIGN: 'Design',
  WEB: 'Web',
  IOS: 'iOS',
  ANDROID: 'Android',
  SPRINGBOOT: 'SpringBoot',
  NODEJS: 'Node.js',
} as const satisfies Record<RecruitingPart, PartSmallType>

export const mapPartToApi = (part: PartSmallType): RecruitingPart => partToApiMap[part]

export const mapApiPartToPartType = (part: RecruitingPart): PartSmallType => apiToPartMap[part]
