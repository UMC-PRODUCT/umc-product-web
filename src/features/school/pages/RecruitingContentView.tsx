import LeaveConfirmModal from '@/features/apply/components/modals/CautionLeave'
import * as S from '@/features/school/components/common/common'
import { RecruitingProvider } from '@/features/school/components/Recruiting/RecruitingPage/RecruitingContext'
import RecruitingModals from '@/features/school/components/Recruiting/RecruitingPage/RecruitingModals'
import RecruitingStepActions from '@/features/school/components/Recruiting/RecruitingPage/RecruitingStepActions'
import RecruitingStepForm from '@/features/school/components/Recruiting/RecruitingPage/RecruitingStepForm'
import PageLayout from '@/shared/layout/PageLayout/PageLayout'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import { Button } from '@/shared/ui/common/Button'
import Section from '@/shared/ui/common/Section/Section'

import type { RecruitingContentLogic } from '../hooks/useRecruitingContentLogic'

export const RecruitingContentView = ({
  scrollTopRef,
  recruitingTitle,
  handleBackClick,
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
  openConfirmModal,
  isEditLocked,
  isSubmitting,
  modal,
  closePreview,
  closeConfirmModal,
  onConfirmSubmit,
  recruitingId,
  isBackConfirmOpen,
  handleBackStay,
  handleBackLeave,
}: RecruitingContentLogic) => {
  return (
    <PageLayout>
      <div ref={scrollTopRef} />
      <S.Header>
        <PageTitle title={recruitingTitle} />
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
          initialSchedule,
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
        onTempSave={handleTempSave}
        onOpenPreview={openPreview}
        onOpenConfirm={openConfirmModal}
        isLocked={isEditLocked}
        isSubmitting={isSubmitting}
      />
      <RecruitingModals
        isOpen={modal.isOpen}
        modalName={modal.modalName}
        title={values.title}
        onClosePreview={closePreview}
        onCloseConfirm={closeConfirmModal}
        onConfirmSubmit={onConfirmSubmit}
        recruitingId={recruitingId}
      />
      {isBackConfirmOpen && <LeaveConfirmModal onClose={handleBackStay} onMove={handleBackLeave} />}
    </PageLayout>
  )
}
