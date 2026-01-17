/**
 * School 도메인 - 진실의 원천 (Source of Truth)
 *
 * 학교 관련 모든 타입과 상수는 이 모듈에서 export합니다.
 * 다른 곳에서 학교 관련 타입이 필요하면 이 모듈에서 import하세요.
 *
 * @example
 * import type { PartApplyStatus, PartEvaluationStatus } from '@features/school/domain'
 */

export * from './model'

// constants.ts는 현재 상수가 없으므로 export하지 않음
// 추후 상수가 추가되면 export * from './constants' 추가
