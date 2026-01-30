import type { RecruitingStepType } from '../domain/types'

export function getRecruitingStep(step: RecruitingStepType): number {
  switch (step) {
    case 'BEFORE_APPLY':
      return 0
    case 'DOC_REVIEWING':
      return 1
    case 'DOC_RESULT_PUBLISHED':
      return 2
    case 'INTERVIEW_WAITING':
      return 3
    case 'FINAL_REVIEWING':
      return 4
    case 'FINAL_RESULT_PUBLISHED':
      return 5
    default:
      return -1
  }
}
