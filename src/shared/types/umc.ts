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

export type RoleType =
  | 'SUPER_ADMIN'
  | 'CENTRAL_PRESIDENT'
  | 'CENTRAL_VICE_PRESIDENT'
  | 'CENTRAL_OPERATING_TEAM_MEMBER'
  | 'CENTRAL_EDUCATION_TEAM_MEMBER'
  | 'CHAPTER_PRESIDENT'
  | 'SCHOOL_PRESIDENT'
  | 'SCHOOL_VICE_PRESIDENT'
  | 'SCHOOL_PART_LEADER'
  | 'SCHOOL_ETC_ADMIN'

export type OrganizationType = 'CENTRAL' | 'CHAPTER' | 'SCHOOL'

export type RecruitmentStatusType = 'ONGOING' | 'SCHEDULED' | 'CLOSED' | 'DRAFT'

export type FinalSelectionsSortType = 'SCORE_DESC' | 'SCORE_ASC' | 'EVALUATED_AT_ASC'

export type PostFileType = 'PROFILE_IMAGE' | 'SCHOOL_LOGO' | 'PORTFOLIO' | 'ETC'

export type FinalStatusType = 'PASS' | 'WAIT'

export type DocumentStatusType =
  | 'APPLIED'
  | 'DOC_PASSED'
  | 'DOC_FAILED'
  | 'INTERVIEW_SCHEDULED'
  | 'INTERVIEW_PASSED'
  | 'INTERVIEW_FAILED'
  | 'FINAL_ACCEPTED'
  | 'FINAL_REJECTED'
  | 'WITHDRAWN'

export type MyEvaluationStatusType = 'DRAFT_SAVE' | 'SUBMIT'
