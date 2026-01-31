import type { PropsWithChildren } from 'react'
import { createContext, useContext } from 'react'
import type { UseFormReturn } from 'react-hook-form'

import type { RecruitingForms } from '@/shared/types/form'

type RecruitingContextValue = {
  form: UseFormReturn<RecruitingForms>
  values: RecruitingForms
  initialSchedule: RecruitingForms['schedule'] | null
  step: number
  setStep: (nextStep: number) => void
  step3PageNumber: number
  setStep3PageNumber: (nextPage: number) => void
  step3SelectedPart: RecruitingForms['recruitmentParts'][number] | null
  setStep3SelectedPart: (nextPart: RecruitingForms['recruitmentParts'][number] | null) => void
  partCompletionMap: Partial<Record<RecruitingForms['recruitmentParts'][number], boolean>>
  setPartCompletionByPart: (
    next: Partial<Record<RecruitingForms['recruitmentParts'][number], boolean>>,
  ) => void
}

const RecruitingContext = createContext<RecruitingContextValue | null>(null)

export const RecruitingProvider = ({
  children,
  value,
}: PropsWithChildren<{ value: RecruitingContextValue }>) => {
  return <RecruitingContext.Provider value={value}>{children}</RecruitingContext.Provider>
}

export const useRecruitingContext = () => {
  const context = useContext(RecruitingContext)
  if (!context) {
    throw new Error('RecruitingContext is missing')
  }
  return context
}
