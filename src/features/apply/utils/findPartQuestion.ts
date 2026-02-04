import type { RecruitingForms } from '@/features/school/domain'
import type { question } from '@/shared/types/form'

export function findPartQuestion(
  questionData: RecruitingForms,
  sourceQuestionId?: number,
): question | undefined {
  for (const page of questionData.pages) {
    if (!page.questions) continue
    for (const question of page.questions) {
      if (
        question.type === 'PREFERRED_PART' &&
        (sourceQuestionId == null || question.questionId === sourceQuestionId)
      ) {
        return question
      }
    }
  }
  return undefined
}
