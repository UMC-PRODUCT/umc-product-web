import type { PartType } from '@/shared/types/part'

export type AccountLevelType = 'ADMIN' | 'MANAGER' | 'CHALLENGER' | 'USER'
export type AccountStateType = 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'WITHDRAWN'

export type SchoolStateType = 'ACTIVE' | 'INACTIVE'
export type RecruitingType = 'OPEN' | 'CLOSED'

export type EvaluationDocumentType =
  | '서류 평가 전'
  | '서류 평가 예정'
  | '서류 평가 중'
  | '서류 평가 완료'

export type EvaluationFinalType =
  | '면접 평가 전'
  | '면접 평가 예정'
  | '면접 평가 중'
  | '면접 평가 완료'

export type ResumeType = 'PREVIOUS' | 'NOW'

export type TermsType = 'SERVICE' | 'PRIVACY' | 'MARKETING'

export type { PartType }
