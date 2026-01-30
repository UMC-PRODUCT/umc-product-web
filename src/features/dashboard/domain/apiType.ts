import type { DocumentStatusType, FinalStatusType } from '@/features/apply/domain'
import type { PartType } from '@/features/auth/domain'

import type { RecruitingStepType, UserApplicationBadgeType } from './types'

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
