import { useCallback, useRef } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { useAutoSave } from '@/shared/hooks/useAutoSave'
import { schoolKeys } from '@/shared/queryKeys'
import type { RecruitingForms, RecruitingSchedule } from '@/shared/types/form'

import { useRecruitingMutation } from '../../hooks/useRecruitingMutation'
import { convertApplicationFormToItems } from '../../utils/recruiting/applicationFormMapper'
import { buildSchedulePayload } from '../../utils/recruiting/buildInitialForm'
import {
  buildPublishedSchedulePayload,
  buildQuestionsPayload,
} from '../../utils/recruiting/recruitingPayload'
import { ensureRequiredItems } from '../../utils/recruiting/requiredItems'

const getErrorCode = (error: unknown): string | undefined => {
  if (!error || typeof error !== 'object') return undefined
  const maybeResponse = error as { response?: { data?: { code?: unknown } } }
  const code = maybeResponse.response?.data?.code
  return typeof code === 'string' ? code : undefined
}

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
  const navigate = useNavigate()
  const queryClient = useQueryClient()
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

  // 추가모집(isRoot=false)에서는 일부 일정(면접/최종발표/타임테이블)을 고정값으로 유지
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

  // 자동 저장 (편집 가능일 때만)
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
              queryKey: schoolKeys.getRecruitmentApplicationFormDraft(recruitingId),
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

  const handleNextStepInExtensionBaseMode = useCallback(async () => {
    // 추가모집 최초 생성 전 단계:
    // Step1 검증 후 POST /recruitments/{baseId}/extensions 호출
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
          // 생성 완료 후에도 source/baseRecruitmentId를 유지해 제약 로직 일관성 확보
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
    // 일반 흐름:
    // 다음 단계 이동 후 필요 시 필수 파트 문항 자동 주입 + 저장/수정 반영
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
          onSuccess: (data) => {
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
      if (Object.keys(payload).length > 0) {
        patchPublishedRecruitmentMutate(payload)
      }
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

  // 다음 단계 이동 시 저장/게시 반영
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

  const handleTempSaveInLockedMode = useCallback(() => {
    // 게시 상태 수정 모드: 변경 가능한 일정만 PATCH /published 전송
    const payload = buildPublishedSchedulePayload(values.schedule, initialSchedule)
    if (Object.keys(payload).length > 0) {
      patchPublishedRecruitmentMutate(payload)
    }
  }, [initialSchedule, patchPublishedRecruitmentMutate, values.schedule])

  const handleTempSaveInDraftMode = useCallback(() => {
    handleSave()
  }, [handleSave])

  // 상단 임시저장 버튼
  const handleTempSave = useCallback(() => {
    if (isExtensionBaseMode) return
    if (isEditLocked) {
      handleTempSaveInLockedMode()
      return
    }
    handleTempSaveInDraftMode()
  }, [handleTempSaveInDraftMode, handleTempSaveInLockedMode, isEditLocked, isExtensionBaseMode])

  // 게시 제출 payload 구성
  const submitFormPayload = {
    title: values.title,
    recruitmentParts: values.recruitmentParts,
    maxPreferredPartCount: values.maxPreferredPartCount,
    schedule: buildLockedSchedulePayload(),
    noticeContent: values.noticeContent,
    status: values.status,
  }

  const submitQuestionsPayload = {
    items: values.items,
  }

  const handleConfirmSubmitInLockedMode = useCallback(() => {
    // 게시 상태 확정 수정
    const payload = buildPublishedSchedulePayload(values.schedule, initialSchedule)
    patchPublishedRecruitmentMutate(payload, {
      onSuccess: () => {
        navigationBlocker.allowNextNavigationOnce()
        queryClient.invalidateQueries({
          queryKey: schoolKeys.getRecruitmentDraft(recruitingId),
        })
        navigate({ to: '/school/recruiting', replace: true })
      },
      onError: (error) => {
        console.error('Failed to update published recruitment:', error)
      },
      onSettled: () => setIsSubmitting(false),
    })
  }, [
    initialSchedule,
    navigate,
    navigationBlocker,
    patchPublishedRecruitmentMutate,
    queryClient,
    recruitingId,
    setIsSubmitting,
    values.schedule,
  ])

  const handleConfirmSubmitInDraftMode = useCallback(() => {
    // DRAFT 상태 확정 생성(게시)
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
          if (getErrorCode(error) === 'RECRUITMENT-006') {
            setModal({ isOpen: true, modalName: 'publishBlockedRecruitment' })
            return
          }
          console.error('Failed to publish recruitment:', error)
        },
        onSettled: () => setIsSubmitting(false),
      },
    )
  }, [
    navigate,
    navigationBlocker,
    postPublishRecruitmentMutate,
    setIsSubmitting,
    submitFormPayload,
    submitQuestionsPayload,
  ])

  // 게시/수정 확정 처리
  const handleConfirmSubmit = useCallback(() => {
    if (isSubmitting || isExtensionBaseMode) return
    setIsSubmitting(true)
    if (isEditLocked) {
      handleConfirmSubmitInLockedMode()
      return
    }
    handleConfirmSubmitInDraftMode()
  }, [
    handleConfirmSubmitInDraftMode,
    handleConfirmSubmitInLockedMode,
    isEditLocked,
    isExtensionBaseMode,
    isSubmitting,
    setIsSubmitting,
  ])

  // 미리보기 모달
  const openPreview = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: schoolKeys.getRecruitmentApplicationForm(recruitingId),
    })
    setModal({ isOpen: true, modalName: 'recruitingPreview' })
  }, [queryClient, recruitingId, setModal])

  const closePreview = useCallback(() => setModal({ isOpen: false, modalName: '' }), [setModal])

  const openConfirmModal = useCallback(() => {
    if (isExtensionBaseMode) return
    if (isEditLocked) {
      handleConfirmSubmit()
      return
    }
    setModal({ isOpen: true, modalName: 'createRecruitingConfirm' })
  }, [handleConfirmSubmit, isEditLocked, isExtensionBaseMode, setModal])

  const closeConfirmModal = useCallback(
    () => setModal({ isOpen: false, modalName: '' }),
    [setModal],
  )

  const closePublishBlockedModal = useCallback(
    () => setModal({ isOpen: false, modalName: '' }),
    [setModal],
  )

  const confirmPublishBlockedModal = useCallback(() => {
    setModal({ isOpen: false, modalName: '' })
    navigationBlocker.allowNextNavigationOnce()
    navigate({ to: '/school/recruiting', replace: true })
  }, [navigate, navigationBlocker, setModal])

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
    closePublishBlockedModal,
    confirmPublishBlockedModal,
    handleConfirmSubmit,
    handleBackClick,
    handleBackStay,
    handleBackLeave,
  }
}
