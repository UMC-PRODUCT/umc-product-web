import { useCallback, useRef } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { useAutoSave } from '@/shared/hooks/useAutoSave'
import type { RecruitingForms, RecruitingSchedule } from '@/shared/types/form'

import { schoolKeys } from '../../domain/queryKeys'
import { useRecruitingMutation } from '../../hooks/useRecruitingMutation'
import { convertApplicationFormToItems } from '../../utils/recruiting/applicationFormMapper'
import { buildSchedulePayload } from '../../utils/recruiting/buildInitialForm'
import {
  buildPublishedSchedulePayload,
  buildQuestionsPayload,
} from '../../utils/recruiting/recruitingPayload'
import { ensureRequiredItems } from '../../utils/recruiting/requiredItems'

type RecruitingContentActionsParams = {
  recruitingId: string
  form: UseFormReturn<RecruitingForms>
  values: RecruitingForms
  initialSchedule: RecruitingSchedule | null
  isEditLocked: boolean
  isSubmitting: boolean
  setIsSubmitting: (next: boolean) => void
  isDirty: boolean
  setModal: (next: { modalName: string; isOpen: boolean }) => void
  setIsBackConfirmOpen: (next: boolean) => void
  navigationBlocker: {
    allowNextNavigationOnce: () => void
  }
  goToNextStep: () => Promise<boolean>
  currentStep: number
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
}: RecruitingContentActionsParams) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const {
    usePatchRecruitmentDraft,
    usePatchRecruitmentApplicationFormDraft,
    usePostRecruitmentPublish,
    usePatchRecruitmentPublished,
  } = useRecruitingMutation()
  const { mutate: patchTempSaveRecruitmentMutate } = usePatchRecruitmentDraft(recruitingId)
  const { mutate: patchTempSavedRecruitQuestionsMutate, isPending: isQuestionsPatchPending } =
    usePatchRecruitmentApplicationFormDraft(recruitingId)
  const { mutate: postPublishRecruitmentMutate } = usePostRecruitmentPublish(recruitingId)
  const { mutate: patchPublishedRecruitmentMutate } = usePatchRecruitmentPublished(recruitingId)

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

  // 자동 저장 (편집 가능일 때만)
  const { handleSave } = useAutoSave({
    getValues: form.getValues,
    enabled: !isEditLocked,
    onSave: () => {
      if (isEditLocked) return
      patchTempSaveRecruitmentMutate(
        {
          title: values.title,
          recruitmentParts: values.recruitmentParts,
          maxPreferredPartCount: values.maxPreferredPartCount,
          schedule: buildSchedulePayload(values.schedule)!,
          noticeContent: values.noticeContent,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: schoolKeys.getRecruitmentDraft(recruitingId).queryKey,
            })
          },
          onError: (error) => {
            console.error('Failed to auto-save temp recruitment draft:', error)
          },
        },
      )
      if (isQuestionsPatchPending) return
      const missingRequiredId = hasMissingRequiredQuestionId(values.items)
      if (missingRequiredId && hasRequestedRequiredQuestionCreationRef.current) return
      if (missingRequiredId) {
        hasRequestedRequiredQuestionCreationRef.current = true
      }

      patchTempSavedRecruitQuestionsMutate(
        { items: buildQuestionsPayload(values.items) },
        {
          onSuccess: (data) => {
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
              queryKey: schoolKeys.getRecruitmentApplicationFormDraft(recruitingId).queryKey,
            })
          },
          onError: (error) => {
            console.error('Failed to auto-save temp recruitment questions:', error)
          },
        },
      )
      form.reset(form.getValues(), { keepErrors: true, keepTouched: true })
    },
  })

  // 다음 단계 이동 시 저장/게시 반영
  const handleNextStep = useCallback(async () => {
    const moved = await goToNextStep()
    if (moved) {
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
            onSuccess: (data) => {
              form.setValue('items', convertApplicationFormToItems(data.result), {
                shouldDirty: false,
                shouldTouch: false,
                shouldValidate: true,
              })
              queryClient.invalidateQueries({
                queryKey: schoolKeys.getRecruitmentApplicationFormDraft(recruitingId).queryKey,
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
        if (Object.keys(payload).length > 0) {
          patchPublishedRecruitmentMutate(payload)
        }
      } else {
        handleSave()
      }
    }
  }, [
    goToNextStep,
    handleSave,
    initialSchedule,
    isEditLocked,
    patchPublishedRecruitmentMutate,
    values.schedule,
    values.items,
    values.recruitmentParts,
    currentStep,
    form,
    patchTempSavedRecruitQuestionsMutate,
    queryClient,
    recruitingId,
  ])

  // 상단 임시저장 버튼
  const handleTempSave = useCallback(() => {
    if (isEditLocked) {
      const payload = buildPublishedSchedulePayload(values.schedule, initialSchedule)
      if (Object.keys(payload).length > 0) {
        patchPublishedRecruitmentMutate(payload)
      }
      return
    }
    handleSave()
  }, [handleSave, initialSchedule, isEditLocked, patchPublishedRecruitmentMutate, values.schedule])

  // 게시 제출 payload 구성
  const submitFormPayload = {
    title: values.title,
    recruitmentParts: values.recruitmentParts,
    maxPreferredPartCount: values.maxPreferredPartCount,
    schedule: buildSchedulePayload(values.schedule)!,
    noticeContent: values.noticeContent,
    status: values.status,
  }

  const submitQuestionsPayload = {
    items: values.items,
  }

  // 게시/수정 확정 처리
  const handleConfirmSubmit = useCallback(() => {
    if (isSubmitting) return
    setIsSubmitting(true)
    if (isEditLocked) {
      const payload = buildPublishedSchedulePayload(values.schedule, initialSchedule)
      patchPublishedRecruitmentMutate(payload, {
        onSuccess: () => {
          navigationBlocker.allowNextNavigationOnce()
          queryClient.invalidateQueries({
            queryKey: schoolKeys.getRecruitmentDraft(recruitingId).queryKey,
          })
          navigate({ to: '/school/recruiting', replace: true })
        },
        onError: (error) => {
          console.error('Failed to update published recruitment:', error)
        },
        onSettled: () => setIsSubmitting(false),
      })
      return
    }

    postPublishRecruitmentMutate(
      {
        recruitmentDraft: submitFormPayload,
        applicationFormQuestions: submitQuestionsPayload,
      },
      {
        onSuccess: () => {
          navigationBlocker.allowNextNavigationOnce()
          navigate({ to: '/school/recruiting', replace: true })
        },
        onError: (error) => {
          console.error('Failed to publish recruitment:', error)
        },
        onSettled: () => setIsSubmitting(false),
      },
    )
  }, [
    initialSchedule,
    isEditLocked,
    isSubmitting,
    navigate,
    navigationBlocker,
    patchPublishedRecruitmentMutate,
    postPublishRecruitmentMutate,
    queryClient,
    recruitingId,
    setIsSubmitting,
    submitFormPayload,
    submitQuestionsPayload,
    values.schedule,
  ])

  // 미리보기 모달
  const openPreview = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: schoolKeys.getRecruitmentApplicationForm(recruitingId).queryKey,
    })
    setModal({ isOpen: true, modalName: 'recruitingPreview' })
  }, [queryClient, recruitingId, setModal])

  const closePreview = useCallback(() => setModal({ isOpen: false, modalName: '' }), [setModal])

  const openConfirmModal = useCallback(() => {
    if (isEditLocked) {
      handleConfirmSubmit()
      return
    }
    setModal({ isOpen: true, modalName: 'createRecruitingConfirm' })
  }, [handleConfirmSubmit, isEditLocked, setModal])

  const closeConfirmModal = useCallback(
    () => setModal({ isOpen: false, modalName: '' }),
    [setModal],
  )

  // 뒤로가기 처리 (변경사항 있을 경우 확인)
  const handleBackClick = useCallback(() => {
    if (!isDirty) {
      navigate({ to: '/school/recruiting', replace: true })
      return
    }
    setIsBackConfirmOpen(true)
  }, [isDirty, navigate, setIsBackConfirmOpen])

  const handleBackStay = useCallback(() => setIsBackConfirmOpen(false), [setIsBackConfirmOpen])

  const handleBackLeave = useCallback(() => {
    setIsBackConfirmOpen(false)
    navigationBlocker.allowNextNavigationOnce()
    navigate({ to: '/school/recruiting', replace: true })
  }, [navigationBlocker, navigate, setIsBackConfirmOpen])

  return {
    handleNextStep,
    handleTempSave,
    openPreview,
    closePreview,
    openConfirmModal,
    closeConfirmModal,
    handleConfirmSubmit,
    handleBackClick,
    handleBackStay,
    handleBackLeave,
  }
}
