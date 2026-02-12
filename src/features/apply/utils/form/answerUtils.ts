import type { FormPage, FormQuestion, OptionAnswerValue } from '@/shared/types/form'

type ScheduleQuestion = NonNullable<FormPage['scheduleQuestion']>

export type ResumeQuestion = FormQuestion | ScheduleQuestion

/**
 * 옵션형 답변(체크박스/라디오 등)인지 확인합니다.
 */
export const isOptionAnswerValue = (value: unknown): value is OptionAnswerValue =>
  typeof value === 'object' &&
  value !== null &&
  Array.isArray((value as OptionAnswerValue).selectedOptionIds)

const isQuestionRequired = (question: ResumeQuestion): boolean =>
  'necessary' in question ? question.required : 'required' in question ? question.required : false

/**
 * 질문 타입별로 "비어있는 답변"인지 판별합니다.
 */
export function isQuestionAnswerEmpty(question: ResumeQuestion, answerValue: unknown): boolean {
  if (!isQuestionRequired(question)) return false

  if (answerValue === null || answerValue === undefined) return true

  if (isOptionAnswerValue(answerValue)) {
    return answerValue.selectedOptionIds.length === 0
  }

  if (typeof answerValue === 'string') {
    return answerValue.trim().length === 0
  }

  if (typeof answerValue === 'number' || typeof answerValue === 'boolean') {
    return false
  }

  if (Array.isArray(answerValue)) {
    return answerValue.length === 0
  }

  const questionType = question.type
  if (questionType === 'SCHEDULE') {
    if (typeof answerValue !== 'object') return true
    const timeTableValues = Object.values(answerValue as Record<string, Array<unknown>>)
    const hasNoSelectedSlots =
      timeTableValues.length === 0 || timeTableValues.every((slots) => slots.length === 0)
    return hasNoSelectedSlots
  }

  if (questionType === 'PORTFOLIO') {
    const v = answerValue as { files?: Array<unknown>; links?: Array<unknown> }
    const filesEmpty = !Array.isArray(v.files) || v.files.length === 0
    const linksEmpty = !Array.isArray(v.links) || v.links.length === 0
    return filesEmpty && linksEmpty
  }

  return false
}
