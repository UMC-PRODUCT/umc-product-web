import type { RecruitingForms } from '@/features/school/domain'

import type { GetApplicationAnswerResponseDTO } from '../domain/apiTypes'

export type ResumeFormValues = Record<string, unknown>

export function buildDefaultValuesFromQuestions(
  questionData: RecruitingForms,
  answerData?: GetApplicationAnswerResponseDTO,
): ResumeFormValues {
  const defaultValues: ResumeFormValues = {}
  const answers = Array.isArray(answerData?.answer) ? answerData.answer : []

  const findAnswerEntry = (questionId: number) =>
    answers.find((entry) => entry.questionId === questionId)

  const resolveAnswerValue = (questionId: number) => {
    const entry = findAnswerEntry(questionId)
    if (!entry) return undefined
    return entry.value
  }

  const pages = Array.isArray(questionData.pages) ? questionData.pages : []
  pages.forEach((page) => {
    page.questions.forEach((question) => {
      defaultValues[String(question.questionId)] = resolveAnswerValue(question.questionId)
    })
    if (page.scheduleQuestion) {
      defaultValues[String(page.scheduleQuestion.questionId)] = resolveAnswerValue(
        page.scheduleQuestion.questionId,
      )
    }
    page.partQuestions.forEach((partQuestionGroup) => {
      partQuestionGroup.questions.forEach((question) => {
        defaultValues[String(question.questionId)] = resolveAnswerValue(question.questionId)
      })
    })
  })

  return defaultValues
}
