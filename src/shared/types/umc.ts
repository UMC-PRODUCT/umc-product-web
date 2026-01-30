/**
 * UMC 공통 타입 (하위 호환성 유지)
 * 실제 타입은 각 feature의 domain에서 관리됨
 *
 * @deprecated 새 코드에서는 각 feature의 domain을 직접 import하세요
 * - Account 관련: @features/auth/domain
 * - Question 관련: @features/apply/domain
 * - Management 관련: @features/management/domain
 */

// Auth 도메인에서 re-export
export type { AccountLevelType, AccountStateType, PartType } from '@features/auth/domain'

// Management 도메인에서 re-export
export type {
  EvaluationDocumentType,
  EvaluationFinalType,
  RecruitingType,
  SchoolStateType,
} from '@features/management/domain'

// Dashboard 도메인에서 re-export
export type { ResumeType } from '@features/dashboard/domain'

export type TermsType = 'SERVICE' | 'PRIVACY' | 'MARKETING'
