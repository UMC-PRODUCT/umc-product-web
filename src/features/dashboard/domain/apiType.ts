import type { PartType } from '@/features/auth/domain'

export type GetMyApplicationResponseDTO = {
  nickName: string
  name: string
  current: {
    appliedParts: Array<PartType | '미정'>
    documentEvaluation: {
      status: string
    }
    finalEvaluation: {
      status: string
    }
    progress: {
      currentStep: string
      steps: Array<{
        step: string
        label: string
        done: boolean
        active: boolean
      }>
      resultAnnounceAt: string
    }
  }
  applications: Array<{
    recruitmentId: string
    formResponseId: string
    applicationId: string
    recruitmentTitle: string
    badge: string
    status: string
    submittedAt: string
  }>
}
