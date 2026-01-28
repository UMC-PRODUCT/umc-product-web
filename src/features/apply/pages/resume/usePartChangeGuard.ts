import type { UseFormClearErrors, UseFormSetValue } from 'react-hook-form'

import type { RecruitingPart } from '@/shared/types/form'

import type { QuestionType } from '../../domain'
import { usePartAnswerReset, usePartChangeModalState, usePartSelectionChange } from './hooks'

type UsePartChangeGuardArgs = {
  pages: Array<{
    part: RecruitingPart
    questions: Array<{
      questionId: number
      type: QuestionType
      questionText: string
      required: boolean
      options?: Array<{
        optionId: string
        content: string
      }>
    }>
  }>
  setValue: UseFormSetValue<Record<string, unknown>>
  clearErrors: UseFormClearErrors<Record<string, unknown>>
  hasPartAnswers: boolean
}

/**
 * 파트 변경 시 확인 가드 훅 (Composed)
 *
 * 분해된 훅들을 조합하여 사용:
 * - usePartChangeModalState: 모달 상태 관리
 * - usePartAnswerReset: 파트 답변 초기화
 * - usePartSelectionChange: 파트 선택 변경 처리
 */
export const usePartChangeGuard = ({
  pages,
  setValue,
  clearErrors,
  hasPartAnswers,
}: UsePartChangeGuardArgs) => {
  // 1. 모달 상태 관리
  const {
    isOpen: isPartChangeModalOpen,
    pending,
    partChangeRanksText,
    openModal,
    closeModal,
  } = usePartChangeModalState()

  // 2. 파트 답변 초기화 로직
  const { resetPartQuestionAnswers } = usePartAnswerReset(pages, setValue, clearErrors)

  // 3. 파트 선택 변경 처리
  const { requestPartChange, handleConfirmPartChange, handleCancelPartChange } =
    usePartSelectionChange({
      hasPartAnswers,
      openModal,
      closeModal,
      pending,
      setValue,
      resetPartQuestionAnswers,
    })

  return {
    isPartChangeModalOpen,
    partChangeRanksText,
    requestPartChange,
    handleConfirmPartChange,
    handleCancelPartChange,
  }
}
