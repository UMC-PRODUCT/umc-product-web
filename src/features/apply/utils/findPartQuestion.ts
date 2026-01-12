import type { PartQuestion } from '@/shared/types/question'

import type { QuestionList } from '../types/question'

export function findPartQuestion(
  questionData: QuestionList,
  sourceQuestionId: number,
): PartQuestion | undefined {
  for (const page of questionData.pages) {
    for (const question of page.questions ?? []) {
      if (question.id === sourceQuestionId && question.type === 'PART') {
        return question
      }
    }
  }
  return undefined
}
