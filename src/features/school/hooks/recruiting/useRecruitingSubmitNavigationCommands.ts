import type { Dispatch, SetStateAction } from 'react'
import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { schoolKeys } from '@/shared/queryKeys'
import type { RecruitingForms, RecruitingSchedule } from '@/shared/types/form'

import { buildPublishedSchedulePayload } from '../../utils/recruiting/recruitingPayload'

const getErrorCode = (error: unknown): string | undefined => {
  if (!error || typeof error !== 'object') return undefined
  const maybeResponse = error as { response?: { data?: { code?: unknown } } }
  const code = maybeResponse.response?.data?.code
  return typeof code === 'string' ? code : undefined
}

const getErrorMessage = (error: unknown): string | undefined => {
  if (!error || typeof error !== 'object') {
    return error instanceof Error ? error.message : undefined
  }
  const maybeResponse = error as { response?: { data?: { message?: unknown } } }
  const message = maybeResponse.response?.data?.message
  if (typeof message === 'string') return message
  return error instanceof Error ? error.message : undefined
}

type Params = {
  recruitingId: string
  values: RecruitingForms
  initialSchedule: RecruitingSchedule | null
  isEditLocked: boolean
  isSubmitting: boolean
  isExtensionBaseMode: boolean
  isDirty: boolean
  setIsSubmitting: (next: boolean) => void
  setModal: Dispatch<SetStateAction<{ modalName: string; isOpen: boolean; message?: string }>>
  setIsBackConfirmOpen: (next: boolean) => void
  navigationBlocker: { allowNextNavigationOnce: () => void }
  buildLockedSchedulePayload: () => any
  postPublishRecruitmentMutate: (payload: any, options?: any) => void
  patchPublishedRecruitmentMutate: (payload: any, options?: any) => void
}

export const useRecruitingSubmitNavigationCommands = ({
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
  buildLockedSchedulePayload,
  postPublishRecruitmentMutate,
  patchPublishedRecruitmentMutate,
}: Params) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const submitFormPayload = {
    title: values.title,
    recruitmentParts: values.recruitmentParts,
    maxPreferredPartCount: values.maxPreferredPartCount,
    schedule: buildLockedSchedulePayload(),
    noticeContent: values.noticeContent,
    status: values.status,
  }

  const submitQuestionsPayload = { items: values.items }

  const handleConfirmSubmitInLockedMode = useCallback(() => {
    const payload = buildPublishedSchedulePayload(values.schedule, initialSchedule)
    patchPublishedRecruitmentMutate(payload, {
      onSuccess: () => {
        navigationBlocker.allowNextNavigationOnce()
        queryClient.invalidateQueries({
          queryKey: schoolKeys.getRecruitmentDraft(recruitingId),
        })
        navigate({ to: '/school/recruiting', replace: true })
      },
      onError: (error: unknown) => {
        console.error('Failed to update published recruitment:', error)
        setModal({
          isOpen: true,
          modalName: 'submitRecruitingError',
          message: getErrorMessage(error),
        })
      },
      onSettled: () => setIsSubmitting(false),
    })
  }, [
    buildLockedSchedulePayload,
    initialSchedule,
    navigate,
    navigationBlocker,
    patchPublishedRecruitmentMutate,
    queryClient,
    recruitingId,
    setIsSubmitting,
    setModal,
    values.schedule,
  ])

  const handleConfirmSubmitInDraftMode = useCallback(() => {
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
        onError: (error: unknown) => {
          if (getErrorCode(error) === 'RECRUITMENT-006') {
            setModal({ isOpen: true, modalName: 'publishBlockedRecruitment' })
            return
          }
          console.error('Failed to publish recruitment:', error)
          setModal({
            isOpen: true,
            modalName: 'submitRecruitingError',
            message: getErrorMessage(error),
          })
        },
        onSettled: () => setIsSubmitting(false),
      },
    )
  }, [
    navigate,
    navigationBlocker,
    postPublishRecruitmentMutate,
    setIsSubmitting,
    setModal,
    submitFormPayload,
    submitQuestionsPayload,
  ])

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

  const openPreview = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: schoolKeys.getRecruitmentApplicationForm(recruitingId),
    })
    setModal({ isOpen: true, modalName: 'recruitingPreview' })
  }, [queryClient, recruitingId, setModal])

  const closeModal = useCallback(
    () => setModal({ isOpen: false, modalName: '', message: undefined }),
    [setModal],
  )

  const openConfirmModal = useCallback(() => {
    if (isExtensionBaseMode) return
    if (isEditLocked) {
      handleConfirmSubmit()
      return
    }
    setModal({ isOpen: true, modalName: 'createRecruitingConfirm' })
  }, [handleConfirmSubmit, isEditLocked, isExtensionBaseMode, setModal])

  const confirmPublishBlockedModal = useCallback(() => {
    closeModal()
    navigationBlocker.allowNextNavigationOnce()
    navigate({ to: '/school/recruiting', replace: true })
  }, [closeModal, navigate, navigationBlocker])

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
    openPreview,
    closePreview: closeModal,
    openConfirmModal,
    closeConfirmModal: closeModal,
    closePublishBlockedModal: closeModal,
    closeSubmitErrorModal: closeModal,
    confirmPublishBlockedModal,
    handleConfirmSubmit,
    handleBackClick,
    handleBackStay,
    handleBackLeave,
  }
}
