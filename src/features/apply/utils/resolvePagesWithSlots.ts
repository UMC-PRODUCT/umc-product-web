import { PART } from '@/shared/constants/umc'

import type {
  PartQuestionBankPage,
  QuestionList,
  QuestionPage,
  QuestionUnion,
} from '../domain/model'
import type { ResumeFormValues } from './buildDefaultValuesFromQuestions'
import { findPartQuestion } from './findPartQuestion'
import { getSelectedPartsFromAnswer } from './getSelectedPartsFromAnswer'

export function resolvePagesWithSlots(
  questionData: QuestionList,
  formValues: ResumeFormValues,
): Array<QuestionPage> {
  const partQuestionId = 3
  const partOrder: Array<1 | 2> = [1, 2]

  const answerValue = formValues[String(partQuestionId)]
  const partQuestion = findPartQuestion(questionData, partQuestionId)
  const requiredCount = Math.max(partQuestion?.options.length ?? 0, 1)
  const effectiveOrder = partOrder.slice(0, requiredCount)
  const selectedParts = getSelectedPartsFromAnswer(answerValue, effectiveOrder)
  const fallbackParts = PART.slice(0, requiredCount)
  const partsForQuestions = effectiveOrder
    .map((_, index) => selectedParts[index] ?? fallbackParts[index])
    .filter(Boolean)
  const mergedQuestions = partsForQuestions.flatMap((part, index) => {
    const label = `${index + 1}지망 - ${part}`
    return questionData.partQuestionBank[part].flatMap((partPage: PartQuestionBankPage) =>
      partPage.questions.map(
        (question) => ({ ...question, __partLabel: label }) as unknown as QuestionUnion,
      ),
    )
  })

  const resolvedPages = questionData.pages.map((page) => {
    const isPartQuestionPage = page.page === 3

    if (!isPartQuestionPage) {
      return page
    }

    return {
      ...page,
      questions: mergedQuestions,
    }
  })

  return resolvedPages.map((page, index) => ({ ...page, page: index + 1 }))
}
