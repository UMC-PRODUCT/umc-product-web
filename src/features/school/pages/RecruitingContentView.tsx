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
  recruitmentTitle,
  extensionAllowedParts,
  handleBackClick,
  recruitmentForm,
  recruitingFormValues,
  initialRecruitmentSchedule,
  currentStep,
  setCurrentStep,
  applicationPageNumber,
  setApplicationPageNumber,
  selectedQuestionPart,
  setSelectedQuestionPart,
  questionPartCompletionMap,
  setQuestionPartCompletionMap,
  canProceedToNextStep,
  goToPreviousStep,
  handleNextStep,
  handleTempSave,
  openPreview,
  openConfirmModal,
  isEditLocked,
  isExtensionMode,
  isExtensionBaseMode,
  isSubmitting,
  activeModal,
  closePreview,
  closeConfirmModal,
  closePublishBlockedModal,
  closeSubmitErrorModal,
  confirmPublishBlockedModal,
  handleConfirmSubmit,
  recruitmentId,
  isBackConfirmModalOpen,
  handleBackStay,
  handleBackLeave,
  unsavedChangesBlocker,
}: RecruitingContentLogic) => {
  return (
    <PageLayout>
      <div ref={scrollTopRef} />
      <S.Header>
        <PageTitle title={recruitmentTitle} />
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
          recruitmentForm,
          recruitingFormValues,
          initialRecruitmentSchedule,
          extensionAllowedParts,
          currentStep,
          setCurrentStep,
          applicationPageNumber,
          setApplicationPageNumber,
          selectedQuestionPart,
          setSelectedQuestionPart,
          questionPartCompletionMap,
          setQuestionPartCompletionMap,
          isExtensionMode,
          isExtensionBaseMode,
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
        step={currentStep}
        canProceedStep={canProceedToNextStep}
        onPrev={goToPreviousStep}
        onNext={handleNextStep}
        onTempSave={handleTempSave}
        onOpenPreview={openPreview}
        onOpenConfirm={openConfirmModal}
        isLocked={isEditLocked}
        isSubmitting={isSubmitting}
      />
      <RecruitingModals
        isOpen={activeModal.isOpen}
        modalName={activeModal.modalName}
        submitErrorMessage={activeModal.message}
        title={recruitingFormValues.title}
        onClosePreview={closePreview}
        onCloseConfirm={closeConfirmModal}
        onClosePublishBlocked={closePublishBlockedModal}
        onCloseSubmitError={closeSubmitErrorModal}
        onConfirmPublishBlocked={confirmPublishBlockedModal}
        onConfirmSubmit={handleConfirmSubmit}
        recruitingId={recruitmentId}
      />
      {isBackConfirmModalOpen && (
        <LeaveConfirmModal onClose={handleBackStay} onMove={handleBackLeave} />
      )}
      {unsavedChangesBlocker.isOpen && (
        <LeaveConfirmModal
          onClose={unsavedChangesBlocker.stay}
          onMove={unsavedChangesBlocker.leave}
        />
      )}
    </PageLayout>
  )
}
