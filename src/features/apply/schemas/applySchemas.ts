import type { question } from '@/shared/types/form'

const REQUIRED_FIELD_MESSAGE = '응답 필수 항목입니다.'

export const createPartValidation = (question: question) => (value: unknown) => {
  if (question.type !== 'PREFERRED_PART') return true
  const selections = Array.isArray(value) ? value : []
  const first = selections.find((item) => item?.id === 1)?.answer
  const second = selections.find((item) => item?.id === 2)?.answer
  const requiredCount = Math.max(question.options.length, 1)

  if (question.required) {
    if (!first) return REQUIRED_FIELD_MESSAGE
    if (requiredCount > 1 && !second) return REQUIRED_FIELD_MESSAGE
  }

  if (first && second && first === second) {
    return '같은 파트를 중복 선택할 수 없습니다.'
  }

  return true
}

export const createValidationRules = (question: question) => ({
  required:
    question.type === 'PREFERRED_PART' ? false : question.required ? REQUIRED_FIELD_MESSAGE : false,
  ...(question.type === 'PREFERRED_PART'
    ? {
        validate: createPartValidation(question),
      }
    : question.type === 'SCHEDULE'
      ? {
          validate: (value: unknown) => {
            if (!question.required) return true
            if (typeof value !== 'object' || value === null) return REQUIRED_FIELD_MESSAGE
            const timeTableValues = Object.values(value as Record<string, Array<unknown>>)
            const hasNoSelectedSlots =
              timeTableValues.length === 0 || timeTableValues.every((slots) => slots.length === 0)
            return hasNoSelectedSlots ? REQUIRED_FIELD_MESSAGE : true
          },
        }
      : {}),
})
