import type { RecruitingForms } from '@/features/school/domain'
import type { OptionAnswerValue } from '@/shared/types/form'

import type { GetApplicationAnswerResponseDTO } from '../domain/apiTypes'
import { isOptionAnswerValue } from './optionAnswer'

export type ResumeFormValues = Record<string, unknown>

export function buildDefaultValuesFromQuestions(
  questionData: RecruitingForms,
  answerData?: GetApplicationAnswerResponseDTO,
): ResumeFormValues {
  const defaultValues: ResumeFormValues = {}
  const answers = Array.isArray(answerData?.answer) ? answerData.answer : []

  const findAnswerEntry = (questionId: number) =>
    answers.find((entry) => entry.questionId === questionId)

  const normalizeOptionAnswerValue = (value: OptionAnswerValue): OptionAnswerValue => ({
    ...value,
    selectedOptionIds: value.selectedOptionIds.map(String),
  })

  const resolveAnswerValue = (questionId: number) => {
    const entry = findAnswerEntry(questionId)
    if (!entry) return undefined
    const answerValue = entry.value
    if (isOptionAnswerValue(answerValue)) {
      return normalizeOptionAnswerValue(answerValue)
    }
    return answerValue
  }

  const pages = Array.isArray(questionData.pages) ? questionData.pages : []
  pages.forEach((page) => {
    const questions = Array.isArray(page.questions) ? page.questions : []
    questions.forEach((question) => {
      defaultValues[String(question.questionId)] = resolveAnswerValue(question.questionId)
    })

    if (page.scheduleQuestion) {
      defaultValues[String(page.scheduleQuestion.questionId)] = resolveAnswerValue(
        page.scheduleQuestion.questionId,
      )
    }

    const partQuestions = Array.isArray(page.partQuestions) ? page.partQuestions : []
    partQuestions.forEach((partQuestionGroup) => {
      const nestedQuestions = Array.isArray(partQuestionGroup.questions)
        ? partQuestionGroup.questions
        : []
      nestedQuestions.forEach((question) => {
        defaultValues[String(question.questionId)] = resolveAnswerValue(question.questionId)
      })
    })
  })

  return defaultValues
}
