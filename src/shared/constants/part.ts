import type { PartSmallType, PartType } from '@/shared/types/part'

export const PART_CONFIG: Record<
  PartType,
  {
    label: PartSmallType
    abilities: Array<string>
  }
> = {
  PLAN: { label: 'Plan', abilities: ['PM', 'Figma'] },
  DESIGN: { label: 'Design', abilities: ['UX/UI', 'Figma'] },
  WEB: { label: 'Web', abilities: ['Front-End', 'HTML', 'CSS', 'JavaScript'] },
  IOS: { label: 'iOS', abilities: ['Front-End', 'Swift'] },
  ANDROID: { label: 'Android', abilities: ['Front-End', 'Kotlin'] },
  SPRINGBOOT: { label: 'SpringBoot', abilities: ['Back-End', 'Java'] },
  NODEJS: { label: 'Node.js', abilities: ['Back-End', 'JavaScript'] },
}

export const PART_LIST: ReadonlyArray<PartType> = [
  'PLAN',
  'DESIGN',
  'WEB',
  'IOS',
  'ANDROID',
  'SPRINGBOOT',
  'NODEJS',
] as const

export const PART_TYPE_TO_SMALL_PART: Record<PartType, PartSmallType> = {
  PLAN: 'Plan',
  DESIGN: 'Design',
  WEB: 'Web',
  IOS: 'iOS',
  ANDROID: 'Android',
  SPRINGBOOT: 'SpringBoot',
  NODEJS: 'Node.js',
}

export const SMALL_PART_TO_PART_TYPE: Record<PartSmallType, PartType> = {
  Plan: 'PLAN',
  Design: 'DESIGN',
  Web: 'WEB',
  iOS: 'IOS',
  Android: 'ANDROID',
  SpringBoot: 'SPRINGBOOT',
  'Node.js': 'NODEJS',
}

export const DEFAULT_RECRUITING_PARTS: ReadonlyArray<PartType> = PART_LIST
