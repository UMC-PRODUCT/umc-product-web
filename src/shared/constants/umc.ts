import type { AccountLevelType, PartType } from '../types/umc'

export const PART: Array<PartType> = [
  'Plan',
  'Design',
  'Web',
  'iOS',
  'Android',
  'SpringBoot',
  'Node.js',
]

export const FOOTER_INFO: { email: string; generation: number; master: string } = {
  email: 'email.umc@example.com',
  generation: 10,
  master: '홍길동',
}

export const ACCOUNT_LEVEL: Array<{ id: number; label: AccountLevelType }> = [
  { id: 1, label: 'ADMIN' },
  { id: 2, label: 'MANAGER' },
  { id: 3, label: 'USER' },
]

export const PART_ABILITY: Record<PartType, Array<string>> = {
  Plan: ['PM', 'Figma'],
  Design: ['UX/UI', 'Figma'],
  Android: ['Front-End', 'Kotlin'],
  iOS: ['Front-End', 'Swift'],
  Web: ['Front-End', 'HTML', 'CSS', 'JavaScript'],
  SpringBoot: ['Back-End', 'Java'],
  'Node.js': ['Back-End', 'JavaScript'],
}
