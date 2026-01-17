import type { UseFormSetValue } from 'react-hook-form'

import type { QuestionAnswerValue } from '../../../domain/model'
import { isPartSelectionEqual } from '../ResumeFormSection.helpers'
import type { PartChangePending } from './usePartChangeModalState'

type PartChangeRequest = {
  questionId: number
  currentValue: QuestionAnswerValue | undefined
  nextValue: QuestionAnswerValue
}

interface UsePartSelectionChangeOptions {
  hasPartAnswers: boolean
  openModal: (data: PartChangePending) => void
  closeModal: () => void
  pending: PartChangePending | null
  setValue: UseFormSetValue<Record<string, unknown>>
  resetPartQuestionAnswers: () => void
}

/**
 * 파트 선택 변경을 처리하는 훅
 * - 변경 요청 시 모달 표시 여부 판단
 * - 확정/취소 처리
 */
export function usePartSelectionChange({
  hasPartAnswers,
  openModal,
  closeModal,
  pending,
  setValue,
  resetPartQuestionAnswers,
}: UsePartSelectionChangeOptions) {
  // 변경을 막고 확인 모달을 띄울지 판단
  const requestPartChange = ({ questionId, currentValue, nextValue }: PartChangeRequest) => {
    const isSameSelection = isPartSelectionEqual(currentValue, nextValue)
    if (hasPartAnswers && !isSameSelection) {
      openModal({
        questionId,
        currentValue: currentValue ?? null,
        nextValue,
      })
      return true
    }
    return false
  }

  const handleConfirmPartChange = () => {
    if (!pending) return
    setValue(String(pending.questionId), pending.nextValue, {
      shouldDirty: true,
      shouldTouch: true,
    })
    resetPartQuestionAnswers()
    closeModal()
  }

  const handleCancelPartChange = () => {
    closeModal()
  }

  return {
    requestPartChange,
    handleConfirmPartChange,
    handleCancelPartChange,
  }
}
