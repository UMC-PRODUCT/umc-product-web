import type { QuestionUnion } from '../domain/model'

export function isQuestionAnswerEmpty(question: QuestionUnion, answerValue: unknown): boolean {
  if (!question.necessary) return false

  if (answerValue === null || answerValue === undefined) return true

  if (typeof answerValue === 'string') {
    return answerValue.trim().length === 0
  }

  if (typeof answerValue === 'number' || typeof answerValue === 'boolean') {
    return false
  }

  if (Array.isArray(answerValue)) {
    return answerValue.length === 0
  }

  if (question.type === 'SCHEDULE') {
    if (typeof answerValue !== 'object') return true
    const timeTableValues = Object.values(answerValue as Record<string, Array<unknown>>)
    const hasNoSelectedSlots =
      timeTableValues.length === 0 || timeTableValues.every((slots) => slots.length === 0)
    return hasNoSelectedSlots
  }

  if (question.type === 'PORTFOLIO') {
    const v = answerValue as { files?: Array<unknown>; links?: Array<unknown> }
    const filesEmpty = !Array.isArray(v.files) || v.files.length === 0
    const linksEmpty = !Array.isArray(v.links) || v.links.length === 0
    return filesEmpty && linksEmpty
  }

  return false
}
