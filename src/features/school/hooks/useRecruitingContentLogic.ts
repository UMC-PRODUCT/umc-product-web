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
  source,
  baseRecruitmentId,
}: RecruitingProps) => {
  // 추가모집 "최초 생성 전" 화면인지 판단:
  // source=extension 이면서 현재 recruitingId가 baseRecruitmentId와 동일한 상태
  const isExtensionBaseMode =
    source === 'extension' && Boolean(baseRecruitmentId) && recruitingId === baseRecruitmentId

  // 기준 API: GET /recruitments/{recruitmentId}
  // isRoot=false 이면 "추가모집(Extension)"으로 간주
  const { data: recruitingData } = useGetRecruitmentDraft(recruitingId!)
  const { data: applicationData } = useGetRecruitmentApplicationFormDraft(recruitingId!)
  const isExtensionRecruitment = recruitingData.result.isRoot === false

  // 상태 훅에는 "추가모집 여부(isRoot)"와 "추가모집 최초 생성 전 모드"를 함께 전달
  const state = useRecruitingContentState({
    initialStepNumber,
    onStepNumberChange,
    forceLockedMode,
    isExtensionMode: isExtensionRecruitment,
    isExtensionBaseMode,
  })

  useRecruitingContentDraftSync({
    form: state.form,
    recruitingData,
    applicationData,
    setInitialSchedule: state.setInitialSchedule,
    // Base 모집 화면(step1)에서는 잠금 해제를 위해 상태를 DRAFT처럼 다룸
    forceDraftStatus: isExtensionBaseMode,
  })

  // 액션 훅에서 모드별(기본/추가모집/추가모집-최초생성전) 처리
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
    currentStep: state.currentStep,
    isExtensionMode: isExtensionRecruitment,
    isExtensionBaseMode,
    baseRecruitmentId: baseRecruitmentId ?? null,
  })

  return {
    // 기본 컨텐츠 정보
    recruitmentTitle: recruitingData.result.title,
    extensionAllowedParts: isExtensionBaseMode ? recruitingData.result.recruitmentParts : [],
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
    closePublishBlockedModal: actions.closePublishBlockedModal,
    closeSubmitErrorModal: actions.closeSubmitErrorModal,
    confirmPublishBlockedModal: actions.confirmPublishBlockedModal,
    handleConfirmSubmit: actions.handleConfirmSubmit,
    // 권한/로딩/모달 상태
    isEditLocked: state.isEditLocked,
    isExtensionMode: state.isExtensionMode,
    isExtensionBaseMode: state.isExtensionBaseMode,
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
