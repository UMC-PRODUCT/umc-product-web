import type {
  QuestionList,
  QuestionPage,
  QuestionUnion,
  ResumeFormValues,
} from '@/features/apply/types/question'
import { PART } from '@/shared/constants/umc'
import type { PartQuestionBankPage } from '@/shared/types/question'
import type { PartType } from '@/shared/types/umc'

import { findPartQuestion } from './findPartQuestion'
import { getSelectedPartsFromAnswer } from './getSelectedPartsFromAnswer'

export function resolvePagesWithSlots(
  questionData: QuestionList,
  formValues: ResumeFormValues,
  options?: { labelMode?: 'ranked' | 'part'; showAllParts?: boolean },
): Array<QuestionPage> {
  const partQuestionId = 3
  const partOrder: Array<1 | 2> = [1, 2]
  const labelMode = options?.labelMode ?? 'ranked'
  const showAllParts = options?.showAllParts ?? false

  const answerValue = formValues[String(partQuestionId)]
  const partQuestion = findPartQuestion(questionData, partQuestionId)
  const availableParts = Object.keys(questionData.partQuestionBank) as Array<PartType>
  if (!partQuestion || showAllParts) {
    const mergedQuestions = availableParts.flatMap((part, index) => {
      const label = labelMode === 'part' ? `${part} 파트 질문` : `${index + 1}지망 - ${part}`
      const partPages = questionData.partQuestionBank[part]
      return partPages.flatMap((partPage: PartQuestionBankPage) =>
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
  const requiredCount = Math.max(partQuestion.options.length, 1)
  const effectiveOrder = partOrder.slice(0, requiredCount)
  const selectedParts = getSelectedPartsFromAnswer(answerValue, effectiveOrder)
  const fallbackParts = PART.slice(0, requiredCount)
  const partsForQuestions = effectiveOrder.map(
    (_, index) => selectedParts[index] ?? fallbackParts[index],
  )
  const mergedQuestions = partsForQuestions.flatMap((part, index) => {
    const label = labelMode === 'part' ? `${part} 질문` : `${index + 1}지망 - ${part}`
    const partPages = questionData.partQuestionBank[part]
    return partPages.flatMap((partPage: PartQuestionBankPage) =>
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
