import type { FormQuestion, RecruitingSchedule } from '@/shared/types/form'

import { isOptionAnswerValue } from './optionAnswer'

type SharedQuestionOptions = Omit<FormQuestion, 'maxSelectCount' | 'preferredPartOptions'> &
  Partial<Pick<FormQuestion, 'maxSelectCount' | 'preferredPartOptions'>>

export type ResumeQuestion =
  | FormQuestion
  | (SharedQuestionOptions & { schedule?: RecruitingSchedule })

const isQuestionRequired = (question: ResumeQuestion): boolean =>
  'necessary' in question ? question.required : 'required' in question ? question.required : false

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
