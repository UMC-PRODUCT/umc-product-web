import type { DocumentStatusType, FinalStatusType } from '@/features/apply/domain'
import type { PartType } from '@/features/auth/domain'
import type { UserApplicationBadgeType } from '@/shared/constants/umc'

export type RecruitingStepType =
  | 'BEFORE_APPLY'
  | 'DOC_REVIEWING'
  | 'DOC_RESULT_PUBLISHED'
  | 'INTERVIEW_WAITING'
  | 'FINAL_REVIEWING'
  | 'FINAL_RESULT_PUBLISHED'

export type GetMyApplicationResponseDTO = {
  nickName: string
  name: string
  current: Current | null
  applications: Array<Application>
}

export type Step = {
  step: RecruitingStepType
  label: string
  done: boolean
  active: boolean
}

export type Current = {
  appliedParts: Array<PartType | '미정'>
  documentEvaluation: {
    status: DocumentStatusType
  }
  finalEvaluation: {
    status: FinalStatusType
  }
  progress: Progress
}

export type Progress = {
  currentStep: RecruitingStepType
  steps: Array<Step>
  noticeType: string
  noticeDate: string
  nextRecruitmentMonth: string
}

export type Application = {
  recruitmentId: string
  formResponseId: string
  applicationId: string
  recruitmentTitle: string
  badge: UserApplicationBadgeType
  status: string
  submittedAt: string
}
