import type { DocumentStatusType, FinalStatusType } from '@/features/apply/domain'
import type { PartType } from '@/features/auth/domain'

import type { RecruitingStepType, UserApplicationBadgeType } from './types'

export type GetMyApplicationResponseDTO = {
  nickName: string
  name: string
  current: {
    appliedParts: Array<PartType | '미정'>
    documentEvaluation: {
      status: DocumentStatusType
    }
    finalEvaluation: {
      status: FinalStatusType
    }
    progress: {
      currentStep: RecruitingStepType
      steps: Array<{
        step: RecruitingStepType
        label: string
        done: boolean
        active: boolean
      }>
      noticeType: string
      noticeDate: string
      nextRecruitmentMonth: string
    }
  }
  applications: Array<{
    recruitmentId: string
    formResponseId: string
    applicationId: string
    recruitmentTitle: string
    badge: UserApplicationBadgeType
    status: string
    submittedAt: string
  }>
}
