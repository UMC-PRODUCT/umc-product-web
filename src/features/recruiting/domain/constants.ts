/**
 * Recruiting 도메인 상수
 */

import type { PartType } from '@/shared/types/part'

/** 파트별 필수 스킬 */
export const PART_REQUIRED_SKILL: Record<PartType, string> = {
  PLAN: 'Figma 기초',
  DESIGN: 'Figma 기초',
  WEB: 'HTML, CSS, JavaScript 기초',
  IOS: 'Swift 기초',
  ANDROID: 'Kotlin 기초',
  SPRINGBOOT: 'Java 기초',
  NODEJS: 'JavaScript 기초',
} as const
