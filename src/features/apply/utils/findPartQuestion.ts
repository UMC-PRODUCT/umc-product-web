import type { PartQuestion, QuestionList } from '../domain/model'

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
