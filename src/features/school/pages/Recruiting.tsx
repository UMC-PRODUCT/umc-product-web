import { useEffect, useMemo, useRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import LeaveConfirmModal from '@/features/apply/components/modals/CautionLeave'
import { useBeforeUnload } from '@/features/apply/hooks/useBeforeUnload'
import { useUnsavedChangesBlocker } from '@/features/apply/hooks/useUnsavedChangeBlocker'
import * as S from '@/features/school/components/common/common'
import { RecruitingProvider } from '@/features/school/components/Recruiting/RecruitingPage/RecruitingContext'
import RecruitingModals from '@/features/school/components/Recruiting/RecruitingPage/RecruitingModals'
import RecruitingStepActions from '@/features/school/components/Recruiting/RecruitingPage/RecruitingStepActions'
import RecruitingStepForm from '@/features/school/components/Recruiting/RecruitingPage/RecruitingStepForm'
import { useRecruitingForm } from '@/features/school/hooks/useRecruitingForm'
import { useRecruitingStepNavigation } from '@/features/school/hooks/useRecruitingStepNavigation'
import { useAutoSave } from '@/shared/hooks/useAutoSave'
import PageLayout from '@/shared/layout/PageLayout/PageLayout'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import type { RecruitingForms, RecruitingItem, RecruitingPart } from '@/shared/types/form'
import { Button } from '@/shared/ui/common/Button'
import Section from '@/shared/ui/common/Section/Section'

import type { GetApplicationFormResponseDTO } from '../domain'
import { recruiteKeys } from '../domain/queryKey'
import { useGetRecruitingData, useGetTempSavedApplicationData } from '../hooks/useGetRecruitingData'
import { useRecruitingMutation } from '../hooks/useRecruitingMutation'
import {
  buildQuestionsPayload,
  buildRecruitingInitialForm,
  buildSchedulePayload,
} from '../utils/recruiting/buildInitialForm'

type RecruitmentPart = RecruitingForms['recruitmentParts'][number]
type PartCompletionMap = Partial<Record<RecruitmentPart, boolean>>

type RecruitingProps = {
  recruitingId?: string
}

const toRecruitingItemOptions = (
  options: Array<{ content: string; orderNo?: number }> | undefined,
  fallbackOrder: number,
) =>
  options?.map((option, index) => ({
    content: option.content,
    orderNo: option.orderNo ?? fallbackOrder + index + 1,
  })) ?? []

const buildRecruitingItemFromQuestion = (
  question: {
    questionId: number
    type: string
    questionText: string
    required: boolean
    options?: Array<{ content: string; orderNo?: number }>
  },
  target:
    | { kind: 'COMMON_PAGE'; pageNo: number }
    | { kind: 'PART'; part: RecruitingPart; pageNo: number },
  orderIndex: number,
): RecruitingItem => ({
  target,
  question: {
    questionId: question.questionId,
    type: question.type as RecruitingItem['question']['type'],
    questionText: question.questionText,
    required: question.required,
    orderNo: orderIndex + 1,
    options: toRecruitingItemOptions(question.options, orderIndex),
  },
})

const convertApplicationFormToItems = (formData: GetApplicationFormResponseDTO) => {
  const items: Array<RecruitingItem> = []
  const pages = formData.pages

  pages.forEach((page) => {
    const questions = Array.isArray(page.questions) ? page.questions : []
    questions.forEach((question, index) =>
      items.push(
        buildRecruitingItemFromQuestion(
          question,
          { kind: 'COMMON_PAGE', pageNo: Number(page.page) },
          index,
        ),
      ),
    )

    if (page.scheduleQuestion) {
      items.push(
        buildRecruitingItemFromQuestion(
          page.scheduleQuestion,
          { kind: 'COMMON_PAGE', pageNo: Number(page.page) },
          questions.length,
        ),
      )
    }

    const partGroups = Array.isArray(page.partQuestions) ? page.partQuestions : []
    partGroups.forEach((partGroup) => {
      const groupQuestions = Array.isArray(partGroup.questions) ? partGroup.questions : []
      groupQuestions.forEach((question, index) =>
        items.push(
          buildRecruitingItemFromQuestion(
            question,
            { kind: 'PART', part: partGroup.part, pageNo: Number(page.page) },
            index,
          ),
        ),
      )
    })
  })

  return items
}

const Recruiting = ({ recruitingId }: RecruitingProps) => {
  const navigate = useNavigate()
  const scrollTopRef = useRef<HTMLDivElement | null>(null)
  const [partCompletionByPart, setPartCompletionByPart] = useState<PartCompletionMap>({})
  const { data: recruitingData } = useGetRecruitingData(recruitingId!)
  const { data: applicationData } = useGetTempSavedApplicationData(recruitingId!)
  const {
    usePatchTempSaveRecruitment,
    usePatchTempSavedRecruitQuestions,
    usePostPublishRecruitment,
  } = useRecruitingMutation()
  const { mutate: patchTempSaveRecruitmentMutate } = usePatchTempSaveRecruitment(recruitingId!)
  const { mutate: patchTempSavedRecruitQuestionsMutate } = usePatchTempSavedRecruitQuestions(
    recruitingId!,
  )
  const { mutate: postPublishRecruitmentMutate } = usePostPublishRecruitment(recruitingId!)

  const queryClient = useQueryClient()
  const applicationQuery = recruiteKeys.getTempSavedApplication(recruitingId!)
  const [modal, setModal] = useState({
    modalName: '',
    isOpen: false,
  })
  const [isBackConfirmOpen, setIsBackConfirmOpen] = useState(false)

  const { form, values, interviewDates } = useRecruitingForm()

  const {
    trigger,
    formState: { isDirty },
  } = form

  useEffect(() => {
    const result = recruitingData?.result
    if (!result) return
    form.reset(buildRecruitingInitialForm(result))
  }, [form, recruitingData?.result])

  useEffect(() => {
    const result = applicationData?.result
    if (!result?.pages.length) return

    form.setValue('items', convertApplicationFormToItems(result), { shouldDirty: false })
  }, [form, applicationData?.result])

  // 모집 파트별 완료 상태 관리
  const partCompletionMap = useMemo(() => {
    const next: PartCompletionMap = {}
    values.recruitmentParts.forEach((part) => {
      next[part] = partCompletionByPart[part] ?? false
    })
    return next
  }, [values.recruitmentParts, partCompletionByPart])

  // 화면 이탈 방지
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
  })

  // 임시저장 자동화
  const { handleSave } = useAutoSave({
    getValues: form.getValues,
    onSave: () => {
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
            console.log('[Recruiting] Auto-saved temp recruitment draft successfully.')
          },
          onError: (error) => {
            console.error('Failed to auto-save temp recruitment draft:', error)
          },
        },
      )
      patchTempSavedRecruitQuestionsMutate(
        { items: buildQuestionsPayload(values.items) },
        {
          onSuccess: () => {
            console.log('[Recruiting] Auto-saved temp recruitment questions successfully.')
            queryClient.invalidateQueries({ queryKey: applicationQuery.queryKey })
          },
          onError: (error) => {
            console.error('Failed to auto-save temp recruitment questions:', error)
          },
        },
      )
      form.reset(form.getValues(), { keepErrors: true, keepTouched: true })
    },
  })

  const handleNextStep = () => {
    goToNextStep()
  }

  // 폼 제작과 폼 질문을 다른 API로 보내야하여 분리함.
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

  // 모달 관련 함수
  const openPreview = () => setModal({ isOpen: true, modalName: 'recruitingPreview' })
  const closePreview = () => setModal({ isOpen: false, modalName: '' })
  const openConfirmModal = () => setModal({ isOpen: true, modalName: 'createRecruitingConfirm' })
  const closeConfirmModal = () => setModal({ isOpen: false, modalName: '' })

  // 폼 제출 함수
  const onConfirmSubmit = () => {
    console.log('[Recruiting] submit form payload:', submitFormPayload)
    console.log('[Recruiting] submit questions payload:', submitQuestionsPayload)
    postPublishRecruitmentMutate(
      {
        recruitmentDraft: {
          title: values.title,
          recruitmentParts: values.recruitmentParts,
          maxPreferredPartCount: values.maxPreferredPartCount,
          schedule: buildSchedulePayload(values.schedule)!,
          noticeContent: values.noticeContent,
          status: values.status,
        },
        applicationFormQuestions: submitQuestionsPayload,
      },
      {
        onSuccess: () => {
          console.log('[Recruiting] Published recruitment successfully.')
          navigationBlocker.allowNextNavigationOnce()
          navigate({
            to: '/school/recruiting',
            replace: true,
          })
        },
        onError: (error) => {
          console.error('Failed to publish recruitment:', error)
        },
      },
    )
  }

  const handleBackClick = () => {
    if (!isDirty) {
      navigate({
        to: '/school/recruiting',
        replace: true,
      })
      return
    }
    setIsBackConfirmOpen(true)
  }

  const handleBackStay = () => setIsBackConfirmOpen(false)

  const handleBackLeave = () => {
    setIsBackConfirmOpen(false)
    navigationBlocker.allowNextNavigationOnce()
    navigate({
      to: '/school/recruiting',
      replace: true,
    })
  }

  return (
    <PageLayout>
      <div ref={scrollTopRef} />
      <S.Header>
        <PageTitle title="새로운 모집 생성" />
        <Button
          typo="B4.Md"
          tone="lime"
          variant="outline"
          label="← 뒤로가기"
          onClick={handleBackClick}
        />
      </S.Header>
      <RecruitingProvider
        value={{
          form,
          values,
          step,
          setStep,
          step3PageNumber,
          setStep3PageNumber,
          step3SelectedPart,
          setStep3SelectedPart,
          partCompletionMap,
          setPartCompletionByPart,
        }}
      >
        <Section
          variant="outline"
          css={{
            padding: '30px 18px 18px 18px',
            [media.down(theme.breakPoints.tablet)]: { padding: '20px 10px' },
          }}
        >
          <RecruitingStepForm />
        </Section>
      </RecruitingProvider>
      <RecruitingStepActions
        step={step}
        canProceedStep={canProceedStep}
        onPrev={goToPreviousStep}
        onNext={handleNextStep}
        onTempSave={handleSave}
        onOpenPreview={openPreview}
        onOpenConfirm={openConfirmModal}
      />
      <RecruitingModals
        isOpen={modal.isOpen}
        modalName={modal.modalName}
        title={values.title}
        onClosePreview={closePreview}
        onCloseConfirm={closeConfirmModal}
        onConfirmSubmit={onConfirmSubmit}
        recruitingId={recruitingId!}
      />
      {navigationBlocker.isOpen && (
        <LeaveConfirmModal onClose={navigationBlocker.stay} onMove={navigationBlocker.leave} />
      )}
      {isBackConfirmOpen && <LeaveConfirmModal onClose={handleBackStay} onMove={handleBackLeave} />}
    </PageLayout>
  )
}

export default Recruiting
