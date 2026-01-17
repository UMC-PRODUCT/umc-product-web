import { useMemo, useRef, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

import LeaveConfirmModal from '@/features/apply/components/modals/CautionLeave'
import { useBeforeUnload } from '@/features/apply/hooks/useBeforeUnload'
import { useUnsavedChangesBlocker } from '@/features/apply/hooks/useUnsavedChangeBlocker'
import { MOCKFORMSDATA_WITH_NO_ANSWER } from '@/features/apply/mocks/questions'
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
import type { RecruitingForms } from '@/shared/types/form'
import type { QuestionList } from '@features/apply/domain'
import { Button } from '@/shared/ui/common/Button'
import Section from '@/shared/ui/common/Section/Section'

type RecruitmentPart = RecruitingForms['recruitmentParts'][number]
type PartCompletionMap = Partial<Record<RecruitmentPart, boolean>>

const Recruiting = () => {
  const navigate = useNavigate()
  const scrollTopRef = useRef<HTMLDivElement | null>(null)
  const [partCompletionByPart, setPartCompletionByPart] = useState<PartCompletionMap>({})
  const [modal, setModal] = useState({
    modalName: '',
    isOpen: false,
  })

  const { form, values, interviewDates } = useRecruitingForm()
  const {
    trigger,
    formState: { isDirty },
  } = form

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
  const { handleSave: handleAutoSave } = useAutoSave({
    getValues: form.getValues,
    onSave: () => {
      console.log('[Recruiting] submit form payload:', submitFormPayload)
      console.log('[Recruiting] submit questions payload:', submitQuestionsPayload)
      form.reset(form.getValues(), { keepErrors: true, keepTouched: true })
    },
  })

  // TODO: 질문 데이터 - 실제 API 연동 필요
  const questionData: QuestionList = MOCKFORMSDATA_WITH_NO_ANSWER

  // 폼 제작과 폼 질문을 다른 API로 보내야하여 분리함.
  const submitFormPayload = {
    title: values.title,
    recruitmentParts: values.recruitmentParts,
    maxPreferredPartCount: values.maxPreferredPartCount,
    schedule: {
      applyStartAt: values.schedule.applyStartAt,
      applyEndAt: values.schedule.applyEndAt,
      docResultAt: values.schedule.docResultAt,
      interviewStartAt: values.schedule.interviewStartAt,
      interviewEndAt: values.schedule.interviewEndAt,
      finalResultAt: values.schedule.finalResultAt,
      interviewTimeTable: values.schedule.interviewTimeTable,
    },
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
          onClick={() =>
            navigate({
              to: '/school/recruiting',
              replace: true,
            })
          }
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
            [media.down(theme.breakPoints.tablet)]: { padding: '0px' },
          }}
        >
          <RecruitingStepForm />
        </Section>
      </RecruitingProvider>
      <RecruitingStepActions
        step={step}
        canProceedStep={canProceedStep}
        onPrev={goToPreviousStep}
        onNext={goToNextStep}
        onTempSave={handleAutoSave}
        onOpenPreview={openPreview}
        onOpenConfirm={openConfirmModal}
      />
      <RecruitingModals
        isOpen={modal.isOpen}
        modalName={modal.modalName}
        title={values.title}
        questionData={questionData}
        onClosePreview={closePreview}
        onCloseConfirm={closeConfirmModal}
        onConfirmSubmit={onConfirmSubmit}
      />
      {navigationBlocker.isOpen && (
        <LeaveConfirmModal onClose={navigationBlocker.stay} onMove={navigationBlocker.leave} />
      )}
    </PageLayout>
  )
}

export default Recruiting
