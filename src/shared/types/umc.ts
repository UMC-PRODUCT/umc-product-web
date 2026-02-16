import type { PartType } from '@/shared/types/part'

export type AccountLevelType = 'ADMIN' | 'MANAGER' | 'CHALLENGER' | 'USER'
export type AccountStateType = 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'WITHDRAWN'

export type SchoolStateType = 'ACTIVE' | 'INACTIVE'

export type ResumeType = 'PREVIOUS' | 'NOW'

export type TermsType = 'SERVICE' | 'PRIVACY' | 'MARKETING'

export type { PartType }

export type RoleType =
  | 'SUPER_ADMIN' // 슈퍼 계정
  | 'CENTRAL_PRESIDENT' // 총괄
  | 'CENTRAL_VICE_PRESIDENT' // 부총괄
  | 'CENTRAL_OPERATING_TEAM_MEMBER' // 중앙운영사무국 운영국원
  | 'CENTRAL_EDUCATION_TEAM_MEMBER' // 중앙운영사무국 교육국원
  | 'CHAPTER_PRESIDENT' // 지부장
  | 'SCHOOL_PRESIDENT' // 회장
  | 'SCHOOL_VICE_PRESIDENT' // 부회장
  | 'SCHOOL_PART_LEADER' // 교내 파트장
  | 'SCHOOL_ETC_ADMIN' // 기타 교내 운영진

export type OrganizationType = 'CENTRAL' | 'CHAPTER' | 'SCHOOL'

export type RecruitmentStatusType = 'ONGOING' | 'SCHEDULED' | 'CLOSED' | 'DRAFT'

export type SelectionsSortType = 'SCORE_DESC' | 'SCORE_ASC' | 'EVALUATED_AT_ASC'

export type PostFileType =
  | 'PROFILE_IMAGE'
  | 'POST_IMAGE'
  | 'POST_ATTACHMENT'
  | 'WORKBOOK_SUBMISSION'
  | 'SCHOOL_LOGO'
  | 'PORTFOLIO'
  | 'ETC'

export type EvaluationStatusType = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'
