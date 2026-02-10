import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import dayjs from 'dayjs'

import { useBeforeUnload } from '@/features/apply/hooks/useBeforeUnload'
import { useUnsavedChangesBlocker } from '@/features/apply/hooks/useUnsavedChangeBlocker'
import { useRecruitingForm } from '@/features/school/hooks/useRecruitingForm'
import { useRecruitingStepNavigation } from '@/features/school/hooks/useRecruitingStepNavigation'
import { setScheduleValidationContext } from '@/features/school/schemas/validation'
import { useAutoSave } from '@/shared/hooks/useAutoSave'
import type {
  FormPage,
  FormQuestion,
  RecruitingForms,
  RecruitingSchedule,
} from '@/shared/types/form'

import { schoolKeys } from '../domain/queryKeys'
import { useRecruitingMutation } from '../hooks/useRecruitingMutation'
import { convertApplicationFormToItems } from '../utils/recruiting/applicationFormMapper'
import {
  buildRecruitingInitialForm,
  buildSchedulePayload,
} from '../utils/recruiting/buildInitialForm'
import {
  buildPublishedSchedulePayload,
  buildQuestionsPayload,
} from '../utils/recruiting/recruitingPayload'
import {
  useGetRecruitmentApplicationFormDraft,
  useGetRecruitmentDraft,
} from './useRecruitingQueries'

export type RecruitingProps = {
  recruitingId?: string
  initialStepNumber?: number
  onStepNumberChange?: (nextStep: number) => void
  forceLockedMode?: boolean
}

export type RecruitmentPart = RecruitingForms['recruitmentParts'][number]
export type PartCompletionMap = Partial<Record<RecruitmentPart, boolean>>

export const useRecruitingContentLogic = ({
  recruitingId,
  initialStepNumber,
  onStepNumberChange,
  forceLockedMode,
}: RecruitingProps) => {
  const navigate = useNavigate()
  const scrollTopRef = useRef<HTMLDivElement | null>(null)
  const { form, values, interviewDates } = useRecruitingForm()
  const [initialSchedule, setInitialSchedule] = useState<RecruitingSchedule | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
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
  const forceLockFromEnv = forceLockedMode ?? false
  const { data: recruitingData } = useGetRecruitmentDraft(recruitingId!)
  const { data: applicationData } = useGetRecruitmentApplicationFormDraft(recruitingId!)
  const {
    usePatchRecruitmentDraft,
    usePatchRecruitmentApplicationFormDraft,
    usePostRecruitmentPublish,
    usePatchRecruitmentPublished,
  } = useRecruitingMutation()
  const { mutate: patchTempSaveRecruitmentMutate } = usePatchRecruitmentDraft(recruitingId!)
  const { mutate: patchTempSavedRecruitQuestionsMutate } = usePatchRecruitmentApplicationFormDraft(
    recruitingId!,
  )
  const { mutate: postPublishRecruitmentMutate } = usePostRecruitmentPublish(recruitingId!)
  const { mutate: patchPublishedRecruitmentMutate } = usePatchRecruitmentPublished(recruitingId!)

  const queryClient = useQueryClient()

  const [modal, setModal] = useState({ modalName: '', isOpen: false })
  const [isBackConfirmOpen, setIsBackConfirmOpen] = useState(false)

  const isEditLocked = useMemo(
    () => forceLockFromEnv || values.status !== 'DRAFT',
    [forceLockFromEnv, values.status],
  )

  const {
    trigger,
    formState: { isDirty },
  } = form

  useEffect(() => {
    const result = recruitingData.result
    const initialForm = buildRecruitingInitialForm(result)
    form.reset(initialForm)
    setInitialSchedule(initialForm.schedule)
    setScheduleValidationContext({
      initialSchedule: initialForm.schedule,
      now: dayjs().toISOString(),
      status: initialForm.status,
    })
  }, [form, recruitingData.result])

  useEffect(() => {
    const result = applicationData.result
    if (!result.pages.length) return
    const nextItems = convertApplicationFormToItems(result)
    const preferredQuestion = result.pages
      .flatMap((page: FormPage) => page.questions ?? [])
      .find((question: FormQuestion) => question.type === 'PREFERRED_PART')
    const nextMaxPreferredCount = preferredQuestion?.maxSelectCount
      ? Number(preferredQuestion.maxSelectCount)
      : undefined
    form.reset(
      {
        ...form.getValues(),
        items: nextItems,
        ...(nextMaxPreferredCount
          ? { maxPreferredPartCount: nextMaxPreferredCount.toString() }
          : {}),
      },
      { keepErrors: true, keepTouched: true, keepDirty: false },
    )
  }, [form, applicationData.result])

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
              queryKey: schoolKeys.getRecruitmentDraft(recruitingId!).queryKey,
            })
          },
          onError: (error) => {
            console.error('Failed to auto-save temp recruitment draft:', error)
          },
        },
      )
      patchTempSavedRecruitQuestionsMutate(
        { items: buildQuestionsPayload(values.items) },
        {
          onSuccess: (data) => {
            form.setValue('items', convertApplicationFormToItems(data.result), {
              shouldDirty: false,
              shouldTouch: false,
              shouldValidate: true,
            })
            queryClient.invalidateQueries({
              queryKey: schoolKeys.getRecruitmentApplicationFormDraft(recruitingId!).queryKey,
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

  const handleNextStep = async () => {
    const moved = await goToNextStep()
    if (moved) {
      if (isEditLocked) {
        const payload = buildPublishedSchedulePayload(values.schedule, initialSchedule)
        if (Object.keys(payload).length > 0) {
          patchPublishedRecruitmentMutate(payload)
        }
      } else {
        handleSave()
      }
    }
  }

  const handleTempSave = () => {
    if (isEditLocked) {
      const payload = buildPublishedSchedulePayload(values.schedule, initialSchedule)
      if (Object.keys(payload).length > 0) {
        patchPublishedRecruitmentMutate(payload)
      }
      return
    }
    handleSave()
  }

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

  const openPreview = () => {
    queryClient.invalidateQueries({
      queryKey: schoolKeys.getRecruitmentApplicationForm(recruitingId!).queryKey,
    })
    setModal({ isOpen: true, modalName: 'recruitingPreview' })
  }
  const closePreview = () => setModal({ isOpen: false, modalName: '' })
  const openConfirmModal = () => {
    if (isEditLocked) {
      onConfirmSubmit()
      return
    }
    setModal({ isOpen: true, modalName: 'createRecruitingConfirm' })
  }
  const closeConfirmModal = () => setModal({ isOpen: false, modalName: '' })

  const onConfirmSubmit = () => {
    if (isSubmitting) return
    setIsSubmitting(true)
    if (isEditLocked) {
      const payload = buildPublishedSchedulePayload(values.schedule, initialSchedule)
      patchPublishedRecruitmentMutate(payload, {
        onSuccess: () => {
          navigationBlocker.allowNextNavigationOnce()
          queryClient.invalidateQueries({
            queryKey: schoolKeys.getRecruitmentDraft(recruitingId!).queryKey,
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
  }

  const handleBackClick = () => {
    if (!isDirty) {
      navigate({ to: '/school/recruiting', replace: true })
      return
    }
    setIsBackConfirmOpen(true)
  }

  const handleBackStay = () => setIsBackConfirmOpen(false)

  const handleBackLeave = () => {
    setIsBackConfirmOpen(false)
    navigationBlocker.allowNextNavigationOnce()
    navigate({ to: '/school/recruiting', replace: true })
  }

  return {
    recruitingTitle: recruitingData.result.title,
    form,
    values,
    initialSchedule,
    step,
    setStep,
    step3PageNumber,
    setStep3PageNumber,
    step3SelectedPart,
    setStep3SelectedPart,
    partCompletionMap,
    setPartCompletionByPart,
    canProceedStep,
    goToPreviousStep,
    handleNextStep,
    handleTempSave,
    openPreview,
    closePreview,
    openConfirmModal,
    closeConfirmModal,
    onConfirmSubmit,
    isEditLocked,
    isSubmitting,
    modal,
    isBackConfirmOpen,
    handleBackClick,
    handleBackStay,
    handleBackLeave,
    navigationBlocker,
    recruitingId: recruitingId!,
    scrollTopRef,
  }
}

export type RecruitingContentLogic = ReturnType<typeof useRecruitingContentLogic>
