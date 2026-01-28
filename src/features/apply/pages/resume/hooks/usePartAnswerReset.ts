import { useMemo } from 'react'
import type { UseFormClearErrors, UseFormSetValue } from 'react-hook-form'

import type { RecruitingPart } from '@/shared/types/form'

import type { QuestionType } from '../../../domain/model'

/**
 * 파트 관련 답변을 초기화하는 훅
 * - 파트 변경 시 관련 질문 답변 리셋
 */
export function usePartAnswerReset(
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
  }>,
  setValue: UseFormSetValue<Record<string, unknown>>,
  clearErrors: UseFormClearErrors<Record<string, unknown>>,
) {
  const partQuestionIds = useMemo(
    () => pages.flatMap((page) => page.questions.map((question) => question.questionId)),
    [pages],
  )

  const resetPartQuestionAnswers = () => {
    pages.forEach((page) => {
      page.questions.forEach((question) => {
        setValue(String(question.questionId), null, { shouldDirty: true })
      })
    })
    if (partQuestionIds.length > 0) {
      clearErrors(partQuestionIds.map(String))
    }
  }

  return { resetPartQuestionAnswers }
}
