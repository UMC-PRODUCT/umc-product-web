import type { QuestionList, QuestionPage, QuestionUnion } from '../domain/model'

export type ResumeFormValues = Record<string, unknown>

export function buildDefaultValuesFromQuestions(questionData: QuestionList): ResumeFormValues {
  const defaultValues: ResumeFormValues = {}

  questionData.pages.forEach((page: QuestionPage) => {
    ;(page.questions ?? []).forEach((question: QuestionUnion) => {
      defaultValues[String(question.id)] = question.answer
    })
  })

  Object.values(questionData.partQuestionBank).forEach((partPages) => {
    partPages.forEach((partPage) => {
      partPage.questions.forEach((question: QuestionUnion) => {
        defaultValues[String(question.id)] = question.answer
      })
    })
  })

  return defaultValues
}
