/**
 * Recruiting 도메인 상수
 */

import type { PartType } from '@features/auth/domain'

/** 파트별 필수 스킬 */
export const PART_REQUIRED_SKILL: Record<PartType, string> = {
  Plan: 'Figma 기초',
  Design: 'Figma 기초',
  Web: 'HTML, CSS, JavaScript 기초',
  iOS: 'Swift 기초',
  Android: 'Kotlin 기초',
  SpringBoot: 'Java 기초',
  'Node.js': 'JavaScript 기초',
} as const
