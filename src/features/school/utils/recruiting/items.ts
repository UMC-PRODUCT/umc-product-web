import type { RecruitingPart } from '@/shared/types/form'
import type { PartType } from '@/shared/types/umc'

const partToApiMap = {
  Plan: 'PLAN',
  Design: 'DESIGN',
  Web: 'WEB',
  iOS: 'IOS',
  Android: 'ANDROID',
  SpringBoot: 'SPRINGBOOT',
  'Node.js': 'NODEJS',
} as const satisfies Record<PartType, RecruitingPart>

const apiToPartMap = {
  PLAN: 'Plan',
  DESIGN: 'Design',
  WEB: 'Web',
  IOS: 'iOS',
  ANDROID: 'Android',
  SPRINGBOOT: 'SpringBoot',
  NODEJS: 'Node.js',
} as const satisfies Record<RecruitingPart, PartType>

export const mapPartToApi = (part: PartType): RecruitingPart => partToApiMap[part]

export const mapApiPartToPartType = (part: RecruitingPart): PartType => apiToPartMap[part]
