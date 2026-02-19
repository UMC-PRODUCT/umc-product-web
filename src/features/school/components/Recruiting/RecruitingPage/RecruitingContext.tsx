import type { PropsWithChildren } from 'react'
import { createContext, useContext } from 'react'
import type { UseFormReturn } from 'react-hook-form'

import type { RecruitingForms } from '@/shared/types/form'

type RecruitingContextValue = {
  recruitmentForm: UseFormReturn<RecruitingForms>
  recruitingFormValues: RecruitingForms
  initialRecruitmentSchedule: RecruitingForms['schedule'] | null
  extensionAllowedParts: Array<RecruitingForms['recruitmentParts'][number]>
  currentStep: number
  setCurrentStep: (nextStep: number) => void
  applicationPageNumber: number
  setApplicationPageNumber: (nextPage: number) => void
  selectedQuestionPart: RecruitingForms['recruitmentParts'][number] | null
  setSelectedQuestionPart: (nextPart: RecruitingForms['recruitmentParts'][number] | null) => void
  questionPartCompletionMap: Partial<Record<RecruitingForms['recruitmentParts'][number], boolean>>
  setQuestionPartCompletionMap: (
    next: Partial<Record<RecruitingForms['recruitmentParts'][number], boolean>>,
  ) => void
  isExtensionMode: boolean
  isExtensionBaseMode: boolean
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
