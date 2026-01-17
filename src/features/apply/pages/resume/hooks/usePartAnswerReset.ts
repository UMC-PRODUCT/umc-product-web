import { useMemo } from 'react'
import type { UseFormClearErrors, UseFormSetValue } from 'react-hook-form'

import type { QuestionUnion } from '../../../domain/model'

/**
 * 파트 관련 답변을 초기화하는 훅
 * - 파트 변경 시 관련 질문 답변 리셋
 */
export function usePartAnswerReset(
  partQuestions: Array<QuestionUnion>,
  setValue: UseFormSetValue<Record<string, unknown>>,
  clearErrors: UseFormClearErrors<Record<string, unknown>>,
) {
  const partQuestionIds = useMemo(
    () => partQuestions.map((question) => question.id),
    [partQuestions],
  )

  const resetPartQuestionAnswers = () => {
    partQuestions.forEach((question) => {
      setValue(String(question.id), question.answer, { shouldDirty: true })
    })
    if (partQuestionIds.length > 0) {
      clearErrors(partQuestionIds.map(String))
    }
  }

  return { resetPartQuestionAnswers }
}
