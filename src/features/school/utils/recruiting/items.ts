import type { RecruitingPartApi } from '@/shared/types/form'
import type { PartType } from '@/shared/types/umc'

export const mapPartToApi = (part: PartType): RecruitingPartApi =>
  ({
    Plan: 'PLAN',
    Design: 'DESIGN',
    Web: 'WEB',
    iOS: 'IOS',
    Android: 'ANDROID',
    SpringBoot: 'SPRINGBOOT',
    'Node.js': 'NODEJS',
  })[part]

export const mapApiPartToPartType = (part: RecruitingPartApi): PartType =>
  ({
    PLAN: 'Plan',
    DESIGN: 'Design',
    WEB: 'Web',
    IOS: 'iOS',
    ANDROID: 'Android',
    SPRINGBOOT: 'SpringBoot',
    NODEJS: 'Node.js',
  })[part]
