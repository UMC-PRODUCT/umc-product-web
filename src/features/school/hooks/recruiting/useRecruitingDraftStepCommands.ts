import { useCallback, useRef } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { useAutoSave } from '@/shared/hooks/useAutoSave'
import { schoolKeys } from '@/shared/queryKeys'
import type { RecruitingForms, RecruitingSchedule } from '@/shared/types/form'

import { convertApplicationFormToItems } from '../../utils/recruiting/applicationFormMapper'
import { buildSchedulePayload } from '../../utils/recruiting/buildInitialForm'
import {
  buildPublishedSchedulePayload,
  buildQuestionsPayload,
} from '../../utils/recruiting/recruitingPayload'
import { ensureRequiredItems } from '../../utils/recruiting/requiredItems'

type Params = {
  recruitingId: string
  form: UseFormReturn<RecruitingForms>
  values: RecruitingForms
  initialSchedule: RecruitingSchedule | null
  isEditLocked: boolean
  isExtensionMode: boolean
  isExtensionBaseMode: boolean
  currentStep: number
  baseRecruitmentId: string | null
  goToNextStep: () => Promise<boolean>
  navigationBlocker: { allowNextNavigationOnce: () => void }

  patchTempSaveRecruitmentMutate: (payload: any, options?: any) => void

  patchTempSavedRecruitQuestionsMutate: (payload: any, options?: any) => void
  isQuestionsPatchPending: boolean
  postRecruitmentExtensionMutateAsync: (payload: {
    recruitmentName: string
    parts: RecruitingForms['recruitmentParts']
  }) => Promise<{ result: { recruitmentId: string | number } }>

  patchPublishedRecruitmentMutate: (payload: any, options?: any) => void
}

export const useRecruitingDraftStepCommands = ({
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
}: Params) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const hasInjectedPartDefaultsRef = useRef(false)
  const hasRequestedRequiredQuestionCreationRef = useRef(false)

  const hasMissingRequiredQuestionId = (items: RecruitingForms['items']) =>
    items.some(
      (item) =>
        (item.question.type === 'PREFERRED_PART' || item.question.type === 'SCHEDULE') &&
        !item.question.questionId,
    )

  const hasMissingPartDefaults = (
    items: RecruitingForms['items'],
    parts: RecruitingForms['recruitmentParts'],
  ) =>
    parts.some(
      (part) => !items.some((item) => item.target.kind === 'PART' && item.target.part === part),
    )

  const buildLockedSchedulePayload = useCallback(() => {
    const payload = buildSchedulePayload(values.schedule)!
    if (!isExtensionMode || !initialSchedule) return payload
    return {
      ...payload,
      interviewStartAt: initialSchedule.interviewStartAt,
      interviewEndAt: initialSchedule.interviewEndAt,
      finalResultAt: initialSchedule.finalResultAt,
      interviewTimeTable: initialSchedule.interviewTimeTable,
    }
  }, [initialSchedule, isExtensionMode, values.schedule])

  const { handleSave } = useAutoSave({
    getValues: form.getValues,
    enabled: !isEditLocked && !isExtensionBaseMode,
    onSave: () => {
      if (isEditLocked || isExtensionBaseMode) return
      patchTempSaveRecruitmentMutate(
        {
          title: values.title,
          recruitmentParts: values.recruitmentParts,
          maxPreferredPartCount: values.maxPreferredPartCount,
          schedule: buildLockedSchedulePayload(),
          noticeContent: values.noticeContent,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: schoolKeys.getRecruitmentDraft(recruitingId),
            })
          },
          onError: (error: unknown) => {
            console.error('Failed to auto-save temp recruitment draft:', error)
          },
        },
      )
      if (isQuestionsPatchPending) return
      const missingRequiredId = hasMissingRequiredQuestionId(values.items)
      if (missingRequiredId && hasRequestedRequiredQuestionCreationRef.current) return
      if (missingRequiredId) hasRequestedRequiredQuestionCreationRef.current = true

      patchTempSavedRecruitQuestionsMutate(
        { items: buildQuestionsPayload(values.items) },
        {
          onSuccess: (data: { result: Parameters<typeof convertApplicationFormToItems>[0] }) => {
            const nextItems = convertApplicationFormToItems(data.result)
            form.setValue('items', nextItems, {
              shouldDirty: false,
              shouldTouch: false,
              shouldValidate: true,
            })
            if (!hasMissingRequiredQuestionId(nextItems)) {
              hasRequestedRequiredQuestionCreationRef.current = false
            }
            queryClient.invalidateQueries({
              queryKey: schoolKeys.getRecruitmentApplicationFormDraft(recruitingId),
            })
          },
          onError: (error: unknown) => {
            console.error('Failed to auto-save temp recruitment questions:', error)
          },
        },
      )
      form.reset(form.getValues(), { keepErrors: true, keepTouched: true })
    },
  })

  const handleNextStepInExtensionBaseMode = useCallback(async () => {
    const moved = await goToNextStep()
    if (!moved) return
    try {
      const data = await postRecruitmentExtensionMutateAsync({
        recruitmentName: values.title,
        parts: values.recruitmentParts,
      })
      const nextRecruitingId = String(data.result.recruitmentId)
      navigationBlocker.allowNextNavigationOnce()
      navigate({
        to: '/school/recruiting/$recruitingId',
        params: { recruitingId: nextRecruitingId },
        search: {
          source: 'extension',
          baseRecruitmentId: baseRecruitmentId ?? recruitingId,
          step: 2,
        },
        replace: true,
      })
    } catch (error) {
      console.error('Failed to create extension recruitment:', error)
      navigate({
        to: '/school/recruiting/$recruitingId',
        params: { recruitingId },
        search: {
          source: 'extension',
          baseRecruitmentId: baseRecruitmentId ?? recruitingId,
          step: 1,
        },
        replace: true,
      })
    }
  }, [
    baseRecruitmentId,
    goToNextStep,
    navigate,
    navigationBlocker,
    postRecruitmentExtensionMutateAsync,
    recruitingId,
    values.recruitmentParts,
    values.title,
  ])

  const handleNextStepInDefaultMode = useCallback(async () => {
    const moved = await goToNextStep()
    if (!moved) return

    if (
      !isEditLocked &&
      currentStep === 1 &&
      values.recruitmentParts.length > 0 &&
      !hasInjectedPartDefaultsRef.current &&
      hasMissingPartDefaults(values.items, values.recruitmentParts)
    ) {
      const withPartDefaults = ensureRequiredItems(values.items, values.recruitmentParts, {
        requireParts: values.recruitmentParts,
      })
      hasInjectedPartDefaultsRef.current = true
      patchTempSavedRecruitQuestionsMutate(
        { items: buildQuestionsPayload(withPartDefaults) },
        {
          onSuccess: (data: { result: Parameters<typeof convertApplicationFormToItems>[0] }) => {
            form.setValue('items', convertApplicationFormToItems(data.result), {
              shouldDirty: false,
              shouldTouch: false,
              shouldValidate: true,
            })
            queryClient.invalidateQueries({
              queryKey: schoolKeys.getRecruitmentApplicationFormDraft(recruitingId),
            })
          },
          onError: () => {
            hasInjectedPartDefaultsRef.current = false
          },
        },
      )
    }

    if (isEditLocked) {
      const payload = buildPublishedSchedulePayload(values.schedule, initialSchedule)
      if (Object.keys(payload).length > 0) patchPublishedRecruitmentMutate(payload)
      return
    }

    handleSave()
  }, [
    currentStep,
    form,
    goToNextStep,
    handleSave,
    initialSchedule,
    isEditLocked,
    patchPublishedRecruitmentMutate,
    patchTempSavedRecruitQuestionsMutate,
    queryClient,
    recruitingId,
    values.items,
    values.recruitmentParts,
    values.schedule,
  ])

  const handleNextStep = useCallback(async () => {
    if (isExtensionBaseMode && currentStep === 1) {
      await handleNextStepInExtensionBaseMode()
      return
    }
    await handleNextStepInDefaultMode()
  }, [
    currentStep,
    handleNextStepInDefaultMode,
    handleNextStepInExtensionBaseMode,
    isExtensionBaseMode,
  ])

  const handleTempSave = useCallback(() => {
    if (isExtensionBaseMode) return
    if (isEditLocked) {
      const payload = buildPublishedSchedulePayload(values.schedule, initialSchedule)
      if (Object.keys(payload).length > 0) patchPublishedRecruitmentMutate(payload)
      return
    }
    handleSave()
  }, [
    handleSave,
    initialSchedule,
    isEditLocked,
    isExtensionBaseMode,
    patchPublishedRecruitmentMutate,
    values.schedule,
  ])

  return {
    handleNextStep,
    handleTempSave,
    buildLockedSchedulePayload,
  }
}
