import { useMemo, useState } from 'react'
import type { UseFormClearErrors, UseFormSetValue } from 'react-hook-form'

import type { QuestionAnswerValue, QuestionUnion } from '@/shared/types/question'

import { getChangedPartRanks, isPartSelectionEqual } from './ResumeFormSection.helpers'

type UsePartChangeGuardArgs = {
  partQuestions: Array<QuestionUnion>
  setValue: UseFormSetValue<Record<string, unknown>>
  clearErrors: UseFormClearErrors<Record<string, unknown>>
  hasPartAnswers: boolean
}

type PartChangeRequest = {
  questionId: number
  currentValue: QuestionAnswerValue | undefined
  nextValue: QuestionAnswerValue
}

export const usePartChangeGuard = ({
  partQuestions,
  setValue,
  clearErrors,
  hasPartAnswers,
}: UsePartChangeGuardArgs) => {
  // 파트 변경 시 답변 초기화 전에 확인 모달을 띄우기 위한 임시 상태.
  const [isPartChangeModalOpen, setIsPartChangeModalOpen] = useState(false)
  const [pendingPartSelection, setPendingPartSelection] = useState<QuestionAnswerValue | null>(null)
  const [pendingCurrentSelection, setPendingCurrentSelection] =
    useState<QuestionAnswerValue | null>(null)
  const [pendingPartQuestionId, setPendingPartQuestionId] = useState<number | null>(null)

  const partQuestionIds = useMemo(
    () => partQuestions.map((question) => question.id),
    [partQuestions],
  )

  // 변경 확정 시 파트별 질문 답변을 모두 초기화.
  const resetPartQuestionAnswers = () => {
    partQuestions.forEach((question) => {
      setValue(String(question.id), question.answer, { shouldDirty: true })
    })
    if (partQuestionIds.length > 0) {
      clearErrors(partQuestionIds.map(String))
    }
  }

  const handleConfirmPartChange = () => {
    if (pendingPartQuestionId === null || pendingPartSelection === null) return
    setValue(String(pendingPartQuestionId), pendingPartSelection, {
      shouldDirty: true,
      shouldTouch: true,
    })
    resetPartQuestionAnswers()
    setPendingPartSelection(null)
    setPendingCurrentSelection(null)
    setPendingPartQuestionId(null)
    setIsPartChangeModalOpen(false)
  }

  const handleCancelPartChange = () => {
    setPendingPartSelection(null)
    setPendingCurrentSelection(null)
    setPendingPartQuestionId(null)
    setIsPartChangeModalOpen(false)
  }

  const partChangeRanksText = useMemo(() => {
    const changedRanks = getChangedPartRanks(pendingCurrentSelection, pendingPartSelection)
    return changedRanks.length > 0 ? `${changedRanks.join(', ')}지망` : '선택'
  }, [pendingPartSelection, pendingCurrentSelection])

  // 변경을 막고 확인 모달을 띄울지 판단.
  const requestPartChange = ({ questionId, currentValue, nextValue }: PartChangeRequest) => {
    const isSameSelection = isPartSelectionEqual(currentValue, nextValue)
    if (hasPartAnswers && !isSameSelection) {
      setPendingPartSelection(nextValue)
      setPendingCurrentSelection(currentValue ?? null)
      setPendingPartQuestionId(questionId)
      setIsPartChangeModalOpen(true)
      return true
    }
    return false
  }

  return {
    isPartChangeModalOpen,
    partChangeRanksText,
    requestPartChange,
    handleConfirmPartChange,
    handleCancelPartChange,
  }
}
