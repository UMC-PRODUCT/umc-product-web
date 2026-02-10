import type { RecruitingProps } from '@/features/school/hooks/recruiting/types'
import { useRecruitingContentActions } from '@/features/school/hooks/recruiting/useRecruitingContentActions'
import { useRecruitingContentDraftSync } from '@/features/school/hooks/recruiting/useRecruitingContentDraftSync'
import { useRecruitingContentState } from '@/features/school/hooks/recruiting/useRecruitingContentState'

import {
  useGetRecruitmentApplicationFormDraft,
  useGetRecruitmentDraft,
} from './useRecruitingQueries'

export type { PartCompletionMap, RecruitingProps, RecruitmentPart } from './recruiting/types'

export const useRecruitingContentLogic = ({
  recruitingId,
  initialStepNumber,
  onStepNumberChange,
  forceLockedMode,
}: RecruitingProps) => {
  const state = useRecruitingContentState({
    initialStepNumber,
    onStepNumberChange,
    forceLockedMode,
  })
  const { data: recruitingData } = useGetRecruitmentDraft(recruitingId!)
  const { data: applicationData } = useGetRecruitmentApplicationFormDraft(recruitingId!)

  useRecruitingContentDraftSync({
    form: state.form,
    recruitingData,
    applicationData,
    setInitialSchedule: state.setInitialSchedule,
  })

  const actions = useRecruitingContentActions({
    recruitingId: recruitingId!,
    form: state.form,
    values: state.values,
    initialSchedule: state.initialSchedule,
    isEditLocked: state.isEditLocked,
    isSubmitting: state.isSubmitting,
    setIsSubmitting: state.setIsSubmitting,
    isDirty: state.isDirty,
    setModal: state.setModal,
    setIsBackConfirmOpen: state.setIsBackConfirmOpen,
    navigationBlocker: state.navigationBlocker,
    goToNextStep: state.goToNextStep,
  })

  return {
    // 기본 컨텐츠 정보
    recruitmentTitle: recruitingData.result.title,
    recruitmentForm: state.form,
    recruitingFormValues: state.values,
    initialRecruitmentSchedule: state.initialSchedule,
    recruitmentId: recruitingId!,
    scrollTopRef: state.scrollTopRef,
    // 단계 진행 관련
    currentStep: state.currentStep,
    setCurrentStep: state.setCurrentStep,
    canProceedToNextStep: state.canProceedToNextStep,
    goToPreviousStep: state.goToPreviousStep,
    handleNextStep: actions.handleNextStep,
    // 지원서 문항(3단계) 관리
    applicationPageNumber: state.applicationPageNumber,
    setApplicationPageNumber: state.setApplicationPageNumber,
    selectedQuestionPart: state.selectedQuestionPart,
    setSelectedQuestionPart: state.setSelectedQuestionPart,
    questionPartCompletionMap: state.partCompletionMap,
    setQuestionPartCompletionMap: state.setPartCompletionByPart,
    // 상단/하단 액션
    handleTempSave: actions.handleTempSave,
    openPreview: actions.openPreview,
    closePreview: actions.closePreview,
    openConfirmModal: actions.openConfirmModal,
    closeConfirmModal: actions.closeConfirmModal,
    handleConfirmSubmit: actions.handleConfirmSubmit,
    // 권한/로딩/모달 상태
    isEditLocked: state.isEditLocked,
    isSubmitting: state.isSubmitting,
    activeModal: state.modal,
    // 이탈 방지/네비게이션
    isBackConfirmModalOpen: state.isBackConfirmOpen,
    handleBackClick: actions.handleBackClick,
    handleBackStay: actions.handleBackStay,
    handleBackLeave: actions.handleBackLeave,
    unsavedChangesBlocker: state.navigationBlocker,
  }
}

export type RecruitingContentLogic = ReturnType<typeof useRecruitingContentLogic>
