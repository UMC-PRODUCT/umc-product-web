import type { RecruitingForms } from '@/features/school/domain'
import type { question } from '@/shared/types/form'

export function findPartQuestion(
  questionData: RecruitingForms,
  sourceQuestionId: number,
): question | undefined {
  for (const page of questionData.pages) {
    for (const question of page.questions) {
      if (question.questionId === sourceQuestionId && question.type === 'PREFERRED_PART') {
        return question
      }
    }
  }
  return undefined
}
