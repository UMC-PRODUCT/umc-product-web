import type { RecruitingPartApi } from '@/shared/types/form'
import type { PartType } from '@/shared/types/umc'

const partToApiMap = {
  Plan: 'PLAN',
  Design: 'DESIGN',
  Web: 'WEB',
  iOS: 'IOS',
  Android: 'ANDROID',
  SpringBoot: 'SPRINGBOOT',
  'Node.js': 'NODEJS',
} as const satisfies Record<PartType, RecruitingPartApi>

const apiToPartMap = {
  PLAN: 'Plan',
  DESIGN: 'Design',
  WEB: 'Web',
  IOS: 'iOS',
  ANDROID: 'Android',
  SPRINGBOOT: 'SpringBoot',
  NODEJS: 'Node.js',
} as const satisfies Record<RecruitingPartApi, PartType>

export const mapPartToApi = (part: PartType): RecruitingPartApi => partToApiMap[part]

export const mapApiPartToPartType = (part: RecruitingPartApi): PartType => apiToPartMap[part]
