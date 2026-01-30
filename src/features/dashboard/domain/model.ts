/**
 * Dashboard 도메인 모델
 * 대시보드, 지원 현황 관련 타입
 */

import type { DocumentStatusType, FinalStatusType } from '@features/apply/domain'
import type { PartType } from '@features/auth/domain'

/** 지원서 상태 타입 */
export type ResumeType = 'PREVIOUS' | 'NOW'

/** 지원 요약 정보 */
export interface ApplySummary {
  title: string
  resumeId: number
  state: ResumeType
}

/** 대시보드 진행 상태 */
export interface DashboardProgress {
  parts: Array<PartType | '미정'>
  document: DocumentStatusType | '미정'
  final: FinalStatusType | '미정'
}

/** 대시보드 사용자 정보 */
export interface DashboardUser {
  nickname: string
  fullName: string
}
