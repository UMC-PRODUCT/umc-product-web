import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'

import { useBeforeUnload } from '@/features/apply/hooks/useBeforeUnload'
import { useUnsavedChangesBlocker } from '@/features/apply/hooks/useUnsavedChangeBlocker'
import { useRecruitingForm } from '@/features/school/hooks/useRecruitingForm'
import { useRecruitingStepNavigation } from '@/features/school/hooks/useRecruitingStepNavigation'
import type { RecruitingForms, RecruitingSchedule } from '@/shared/types/form'

import type { PartCompletionMap, RecruitingProps } from './types'

type RecruitingContentStateParams = Pick<
  RecruitingProps,
  'initialStepNumber' | 'onStepNumberChange' | 'forceLockedMode'
> & {
  isExtensionMode?: boolean
  isExtensionBaseMode?: boolean
}

type RecruitingContentState = {
  scrollTopRef: React.MutableRefObject<HTMLDivElement | null>
  form: UseFormReturn<RecruitingForms>
  values: RecruitingForms
  interviewDates: ReturnType<typeof useRecruitingForm>['interviewDates']
  initialSchedule: RecruitingSchedule | null
  setInitialSchedule: React.Dispatch<React.SetStateAction<RecruitingSchedule | null>>
  isSubmitting: boolean
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>
  partCompletionMap: PartCompletionMap
  setPartCompletionByPart: (next: PartCompletionMap) => void
  modal: { modalName: string; isOpen: boolean }
  setModal: React.Dispatch<React.SetStateAction<{ modalName: string; isOpen: boolean }>>
  isBackConfirmOpen: boolean
  setIsBackConfirmOpen: React.Dispatch<React.SetStateAction<boolean>>
  isEditLocked: boolean
  isExtensionMode: boolean
  isExtensionBaseMode: boolean
  isDirty: boolean
  navigationBlocker: ReturnType<typeof useUnsavedChangesBlocker>
  currentStep: number
  setCurrentStep: (nextStep: number) => void
  applicationPageNumber: number
  setApplicationPageNumber: (nextPage: number) => void
  selectedQuestionPart: RecruitingForms['recruitmentParts'][number] | null
  setSelectedQuestionPart: (nextPart: RecruitingForms['recruitmentParts'][number] | null) => void
  canProceedToNextStep: boolean
  goToPreviousStep: () => void
  goToNextStep: () => Promise<boolean>
}

export const useRecruitingContentState = ({
  initialStepNumber,
  onStepNumberChange,
  forceLockedMode,
  isExtensionMode = false,
  isExtensionBaseMode = false,
}: RecruitingContentStateParams): RecruitingContentState => {
  // 라우팅/스크롤/폼 상태 기본 설정
  const scrollTopRef = useRef<HTMLDivElement | null>(null)
  const { form, values, interviewDates } = useRecruitingForm()
  const [initialSchedule, setInitialSchedule] = useState<RecruitingSchedule | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 파트별 작성 완료 상태 (스텝 진행 제어용)
  const [partCompletionMap, setPartCompletionMap] = useState<PartCompletionMap>(() => {
    const next: PartCompletionMap = {}
    values.recruitmentParts.forEach((part) => {
      next[part] = false
    })
    return next
  })
  const setPartCompletionByPart = useCallback((next: PartCompletionMap) => {
    setPartCompletionMap((prev) => ({ ...prev, ...next }))
  }, [])

  // 강제 잠금(조회 전용) 여부
  const forceLockFromEnv = forceLockedMode ?? false

  // 모달/뒤로가기 확인 상태
  const [modal, setModal] = useState({ modalName: '', isOpen: false })
  const [isBackConfirmOpen, setIsBackConfirmOpen] = useState(false)

  // 게시 상태면 편집 잠금
  const isEditLocked = useMemo(
    () => forceLockFromEnv || (!isExtensionBaseMode && values.status !== 'DRAFT'),
    [forceLockFromEnv, isExtensionBaseMode, values.status],
  )

  const {
    trigger,
    formState: { isDirty },
  } = form

  // 파트 목록 변경 시 완료 상태 유지/보정
  useEffect(() => {
    setPartCompletionMap((prev) => {
      const next: PartCompletionMap = {}
      values.recruitmentParts.forEach((part) => {
        const defaultValue = isEditLocked ? true : false
        next[part] = prev[part] ?? defaultValue
      })
      return next
    })
  }, [values.recruitmentParts, isEditLocked])

  // 편집 잠금 시 모든 파트 완료 처리
  useEffect(() => {
    if (!isEditLocked) return
    setPartCompletionMap((prev) => {
      const next: PartCompletionMap = {}
      values.recruitmentParts.forEach((part) => {
        next[part] = prev[part] ?? true
      })
      return next
    })
  }, [isEditLocked, values.recruitmentParts])

  useBeforeUnload(isDirty)
  const navigationBlocker = useUnsavedChangesBlocker(isDirty)

  // 단계 이동/검증 로직
  const {
    step,
    setStep,
    step3PageNumber,
    setStep3PageNumber,
    step3SelectedPart,
    setStep3SelectedPart,
    canProceedStep,
    goToPreviousStep,
    goToNextStep,
  } = useRecruitingStepNavigation({
    values,
    interviewDates,
    trigger,
    partCompletion: partCompletionMap,
    scrollToTop: () => scrollTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
    initialStepNumber,
    onStepNumberChange,
    skipInterviewSlotsValidation: isEditLocked,
  })

  return {
    scrollTopRef,
    form,
    values,
    interviewDates,
    initialSchedule,
    setInitialSchedule,
    isSubmitting,
    setIsSubmitting,
    partCompletionMap,
    setPartCompletionByPart,
    modal,
    setModal,
    isBackConfirmOpen,
    setIsBackConfirmOpen,
    isEditLocked,
    isExtensionMode,
    isExtensionBaseMode,
    isDirty,
    navigationBlocker,
    currentStep: step,
    setCurrentStep: setStep,
    applicationPageNumber: step3PageNumber,
    setApplicationPageNumber: setStep3PageNumber,
    selectedQuestionPart: step3SelectedPart,
    setSelectedQuestionPart: setStep3SelectedPart,
    canProceedToNextStep: canProceedStep,
    goToPreviousStep,
    goToNextStep,
  }
}
