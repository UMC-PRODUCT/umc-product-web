import type { RecruitingForms } from '@/shared/types/form'

export type RecruitingProps = {
  recruitingId?: string
  initialStepNumber?: number
  onStepNumberChange?: (nextStep: number) => void
  forceLockedMode?: boolean
}

export type RecruitmentPart = RecruitingForms['recruitmentParts'][number]
export type PartCompletionMap = Partial<Record<RecruitmentPart, boolean>>
