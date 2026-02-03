import { useMemo } from 'react'

import type { ResumeFormValues } from '@/features/apply/utils/buildDefaultValuesFromQuestions'
import type { pageType } from '@/shared/types/form'

import { getAllQuestionsFromPages, isQuestionAnswerEmpty } from '../../../utils'

/**
 * 폼 완성도를 검증하는 훅
 * - 모든 필수 질문 답변 여부 확인
 */
export function useFormCompleteness(
  currentFormValues: ResumeFormValues,
  resolvedPages: Array<pageType>,
) {
  const isFormIncomplete = useMemo(() => {
    const allQuestions = getAllQuestionsFromPages(resolvedPages)

    return allQuestions.some((question) => {
      if (!question) return false
      const answerValue = currentFormValues[String(question.questionId)]
      return isQuestionAnswerEmpty(question, answerValue)
    })
  }, [currentFormValues, resolvedPages])

  return { isFormIncomplete }
}
