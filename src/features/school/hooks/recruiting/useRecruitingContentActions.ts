import type { Dispatch, SetStateAction } from 'react'
import type { UseFormReturn } from 'react-hook-form'

import type { RecruitingForms, RecruitingSchedule } from '@/shared/types/form'

import { useRecruitingMutation } from '../../hooks/mutations/useRecruitingMutation'
import { useRecruitingDraftStepCommands } from './useRecruitingDraftStepCommands'
import { useRecruitingSubmitNavigationCommands } from './useRecruitingSubmitNavigationCommands'

type RecruitingContentActionsParams = {
  recruitingId: string
  form: UseFormReturn<RecruitingForms>
  values: RecruitingForms
  initialSchedule: RecruitingSchedule | null
  isEditLocked: boolean
  isSubmitting: boolean
  setIsSubmitting: (next: boolean) => void
  isDirty: boolean
  setModal: Dispatch<SetStateAction<{ modalName: string; isOpen: boolean; message?: string }>>
  setIsBackConfirmOpen: (next: boolean) => void
  navigationBlocker: {
    allowNextNavigationOnce: () => void
  }
  goToNextStep: () => Promise<boolean>
  currentStep: number
  isExtensionMode: boolean
  isExtensionBaseMode: boolean
  baseRecruitmentId: string | null
}

export const useRecruitingContentActions = ({
  recruitingId,
  form,
  values,
  initialSchedule,
  isEditLocked,
  isSubmitting,
  setIsSubmitting,
  isDirty,
  setModal,
  setIsBackConfirmOpen,
  navigationBlocker,
  goToNextStep,
  currentStep,
  isExtensionMode,
  isExtensionBaseMode,
  baseRecruitmentId,
}: RecruitingContentActionsParams) => {
  const {
    usePatchRecruitmentDraft,
    usePatchRecruitmentApplicationFormDraft,
    usePostRecruitmentPublish,
    usePostRecruitmentExtension,
    usePatchRecruitmentPublished,
  } = useRecruitingMutation()
  const { mutate: patchTempSaveRecruitmentMutate } = usePatchRecruitmentDraft(recruitingId)
  const { mutate: patchTempSavedRecruitQuestionsMutate, isPending: isQuestionsPatchPending } =
    usePatchRecruitmentApplicationFormDraft(recruitingId)
  const { mutate: postPublishRecruitmentMutate } = usePostRecruitmentPublish(recruitingId)
  const { mutateAsync: postRecruitmentExtensionMutateAsync } =
    usePostRecruitmentExtension(recruitingId)
  const { mutate: patchPublishedRecruitmentMutate } = usePatchRecruitmentPublished(recruitingId)

  const draftStepCommands = useRecruitingDraftStepCommands({
    recruitingId,
    form,
    values,
    initialSchedule,
    isEditLocked,
    isExtensionMode,
    isExtensionBaseMode,
    currentStep,
    baseRecruitmentId,
    goToNextStep,
    navigationBlocker,
    patchTempSaveRecruitmentMutate,
    patchTempSavedRecruitQuestionsMutate,
    isQuestionsPatchPending,
    postRecruitmentExtensionMutateAsync,
    patchPublishedRecruitmentMutate,
  })

  const submitAndNavCommands = useRecruitingSubmitNavigationCommands({
    recruitingId,
    values,
    initialSchedule,
    isEditLocked,
    isSubmitting,
    isExtensionBaseMode,
    isDirty,
    setIsSubmitting,
    setModal,
    setIsBackConfirmOpen,
    navigationBlocker,
    buildLockedSchedulePayload: draftStepCommands.buildLockedSchedulePayload,
    postPublishRecruitmentMutate,
    patchPublishedRecruitmentMutate,
  })

  return {
    handleNextStep: draftStepCommands.handleNextStep,
    handleTempSave: draftStepCommands.handleTempSave,
    ...submitAndNavCommands,
  }
}
