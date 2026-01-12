import type { QuestionList, QuestionPage, QuestionUnion, ResumeFormValues } from '../types/question'

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
