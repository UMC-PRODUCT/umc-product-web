import type { OptionAnswerValue } from '@/shared/types/form'

export const isOptionAnswerValue = (value: unknown): value is OptionAnswerValue =>
  typeof value === 'object' &&
  value !== null &&
  Array.isArray((value as OptionAnswerValue).selectedOptionIds)
