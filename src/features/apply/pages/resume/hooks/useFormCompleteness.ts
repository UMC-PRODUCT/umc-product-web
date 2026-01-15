import { useMemo } from 'react'

import type { QuestionPage } from '../../../domain/model'
import { getAllQuestionsFromPages, isQuestionAnswerEmpty } from '../../../utils'
import type { ResumeFormValues } from '../../../utils/buildDefaultValuesFromQuestions'

/**
 * 폼 완성도를 검증하는 훅
 * - 모든 필수 질문 답변 여부 확인
 */
export function useFormCompleteness(
  currentFormValues: ResumeFormValues,
  resolvedPages: Array<QuestionPage>,
) {
  const isFormIncomplete = useMemo(() => {
    const allQuestions = getAllQuestionsFromPages(resolvedPages)

    return allQuestions.some((question) => {
      const answerValue = currentFormValues[String(question.id)]
      return isQuestionAnswerEmpty(question, answerValue)
    })
  }, [currentFormValues, resolvedPages])

  return { isFormIncomplete }
}
