import type { RecruitingForms } from '@/features/school/domain'
import type { FormQuestion } from '@/shared/types/form'

export function findPartQuestion(
  questionData: RecruitingForms,
  sourceQuestionId?: number,
): FormQuestion | undefined {
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
