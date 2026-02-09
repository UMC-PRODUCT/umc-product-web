import type { FormQuestion, RecruitmentApplicationForm } from '@/shared/types/form'

export function findPartQuestion(
  questionData: RecruitmentApplicationForm,
  sourceQuestionId?: number,
): FormQuestion | undefined {
  for (const page of questionData.pages) {
    const questions = page.questions ?? []
    if (questions.length === 0) continue
    for (const question of questions) {
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
