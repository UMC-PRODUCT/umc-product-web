import type { FormQuestion } from '@/shared/types/form'
import type { PartType } from '@/shared/types/part'

import type { QuestionAnswerValue } from '../../domain/model'

type PartSelection = { id: number; answer: PartType }

const toPartSelections = (value: QuestionAnswerValue | null | undefined): Array<PartSelection> => {
  if (!Array.isArray(value)) return []
  return value.filter(
    (item): item is PartSelection =>
      typeof item === 'object' &&
      'id' in item &&
      'answer' in item &&
      typeof (item as { id?: unknown }).id === 'number',
  )
}

export const isPartSelectionEqual = (
  currentValue: QuestionAnswerValue | undefined,
  nextValue: QuestionAnswerValue,
) => {
  const currentSelections = toPartSelections(currentValue)
  const nextSelections = toPartSelections(nextValue)

  if (currentSelections.length !== nextSelections.length) return false

  return currentSelections.every((item) =>
    nextSelections.some(
      (candidate) => candidate.id === item.id && candidate.answer === item.answer,
    ),
  )
}

export const getChangedPartRanks = (
  currentValue: QuestionAnswerValue | null | undefined,
  nextValue: QuestionAnswerValue | null | undefined,
) => {
  const currentSelections = toPartSelections(currentValue)
  const nextSelections = toPartSelections(nextValue)

  const changedRanks = new Set<number>()

  currentSelections.forEach((item) => {
    const next = nextSelections.find((candidate) => candidate.id === item.id)
    if (!next || next.answer !== item.answer) {
      changedRanks.add(item.id)
    }
  })

  nextSelections.forEach((item) => {
    const current = currentSelections.find((candidate) => candidate.id === item.id)
    if (!current || current.answer !== item.answer) {
      changedRanks.add(item.id)
    }
  })

  return Array.from(changedRanks).sort((a, b) => a - b)
}

export const isAnswerEmpty = (question: FormQuestion, answerValue: unknown): boolean => {
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
    return timeTableValues.length === 0 || timeTableValues.every((slots) => slots.length === 0)
  }

  if (question.type === 'PORTFOLIO') {
    const v = answerValue as { files?: Array<unknown>; links?: Array<unknown> }
    const filesEmpty = !Array.isArray(v.files) || v.files.length === 0
    const linksEmpty = !Array.isArray(v.links) || v.links.length === 0
    return filesEmpty && linksEmpty
  }

  return false
}
