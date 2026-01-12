export type PartType = 'Plan' | 'Design' | 'Web' | 'iOS' | 'Android' | 'SpringBoot' | 'Node.js'
export type AccountLevelType = 'ADMIN' | 'MANAGER' | 'USER' | 'CHALLENGER'

export type DocumentStatusType = '미정' | '평가 중' | '서류 합격' | '불합격'
export type FinalStatusType = '미정' | '예정' | '평가 중' | '최종 합격' | '불합격'

export type SchoolStateType = 'ACTIVE' | 'INACTIVE'

export type AccountStateType = 'ACTIVE' | 'INACTIVE' | 'PENDING'

export type ResumeType = 'PREVIOUS' | 'NOW'

export type RecruitingType = 'OPEN' | 'CLOSED'

export type EvaluationDocumentType =
  | '서류 평가 전'
  | '서류 평가 중'
  | '서류 평가 완료'
  | '서류 평가 예정'

export type EvaluationFinalType =
  | '면접 평가 예정'
  | '면접 평가 중'
  | '면접 평가 완료'
  | '면접 평가 전'
