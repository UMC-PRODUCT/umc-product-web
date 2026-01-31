import type { PartType } from '@/features/auth/domain'
import type { RecruitingForms } from '@/features/school/domain'
import type { OptionAnswerValue, pageType, question } from '@/shared/types/form'

import type {
  FileUploadAnswer,
  GetApplicationAnswerResponseDTO,
  preferredPartAnswer,
} from '../domain/model'
import { isOptionAnswerValue } from './optionAnswer'

export type ResumeFormValues = Record<string, unknown>

type DefaultQuestion = question | NonNullable<pageType['scheduleQuestion']>

export function buildDefaultValuesFromQuestions(
  questionData: RecruitingForms,
  answerData?: GetApplicationAnswerResponseDTO,
): ResumeFormValues {
  const defaultValues: ResumeFormValues = {}
  const answers = Array.isArray(answerData?.answers) ? answerData.answers : []

  const findAnswerEntry = (questionId: number) =>
    answers.find((entry) => entry.questionId === questionId)

  const normalizeOptionAnswerValue = (value: OptionAnswerValue): OptionAnswerValue => ({
    ...value,
    selectedOptionIds: value.selectedOptionIds.map(String),
  })

  const getEntryValue = (questionId: number) => findAnswerEntry(questionId)?.value

  const extractTextValue = (value: unknown) => {
    if (typeof value === 'string') return value
    if (value && typeof value === 'object' && 'text' in value) {
      const candidate = (value as { text?: unknown }).text
      if (typeof candidate === 'string') return candidate
    }
    return undefined
  }

  const extractOptionValue = (value: unknown) => {
    if (!value || typeof value !== 'object') return undefined

    if (isOptionAnswerValue(value)) {
      return normalizeOptionAnswerValue(value)
    }

    const candidate = value as {
      selectedOptionIds?: Array<string | number>
      selectedOptionId?: string | number
      otherText?: string
    }

    if (Array.isArray(candidate.selectedOptionIds)) {
      return normalizeOptionAnswerValue({
        selectedOptionIds: candidate.selectedOptionIds.map(String),
        ...(candidate.otherText ? { otherText: candidate.otherText } : {}),
      })
    }

    if (candidate.selectedOptionId) {
      return normalizeOptionAnswerValue({
        selectedOptionIds: [String(candidate.selectedOptionId)],
        ...(candidate.otherText ? { otherText: candidate.otherText } : {}),
      })
    }

    return undefined
  }

  const deduplicatePartSelections = (items: Array<{ id: number; answer: PartType }>) => {
    const ordered = new Map<number, PartType>()
    items.forEach((item) => {
      ordered.set(item.id, item.answer)
    })
    return Array.from(ordered.entries()).map(([id, answer]) => ({ id, answer }))
  }

  const normalizePreferredPartValue = (value: unknown) => {
    let rawSelections: unknown
    if (Array.isArray(value)) {
      rawSelections = value
    } else if (value && typeof value === 'object') {
      const candidate = value as preferredPartAnswer & { preferredParts?: Array<PartType> }
      if (Array.isArray(candidate.preferredParts)) {
        rawSelections = candidate.preferredParts.map((part, index) => ({
          id: index + 1,
          answer: part,
        }))
      } else {
        rawSelections = candidate.selections
      }
    }

    if (!Array.isArray(rawSelections)) {
      return undefined
    }

    const normalizedSelections: Array<{ id: number; answer: PartType }> = rawSelections
      .map((selection) => {
        if (!selection || typeof selection !== 'object') return undefined
        const { id, answer } = selection as { id?: number | string; answer?: PartType }
        if (!answer) return undefined
        const parsedId =
          typeof id === 'number' ? id : typeof id === 'string' ? Number(id) : undefined
        if (parsedId === undefined || Number.isNaN(parsedId)) return undefined
        return { id: parsedId, answer }
      })
      .filter((entry): entry is { id: number; answer: PartType } => Boolean(entry))

    const deduped = deduplicatePartSelections(normalizedSelections)
    return deduped.length > 0 ? deduped : undefined
  }

  const normalizeScheduleValue = (value: unknown) => {
    if (!value || typeof value !== 'object') return undefined

    // 신규 포맷: { selected: [{ date, times: [...] }]}
    if ('selected' in value && Array.isArray((value as { selected?: unknown }).selected)) {
      const selected = (value as { selected: Array<{ date?: string; times?: Array<unknown> }> })
        .selected
      const slots = selected.reduce<Record<string, Array<string>>>((acc, cur) => {
        if (!cur.date || !Array.isArray(cur.times)) return acc
        const times = cur.times.filter((t): t is string => typeof t === 'string')
        if (times.length > 0) {
          acc[cur.date] = times
        }
        return acc
      }, {})
      return slots
    }

    const candidateSlots = 'slots' in value ? (value as { slots?: unknown }).slots : value

    if (!candidateSlots || typeof candidateSlots !== 'object') return undefined
    return candidateSlots as Record<string, Array<string>>
  }

  const normalizePortfolioValue = (value: unknown): FileUploadAnswer => {
    const empty: FileUploadAnswer = { files: [], links: [] }
    if (!value || typeof value !== 'object') return empty

    const candidateAsUpload = value as { links?: unknown }
    if (
      Array.isArray(candidateAsUpload.links) &&
      candidateAsUpload.links.every((link) => typeof link === 'string')
    ) {
      return { files: [], links: candidateAsUpload.links }
    }

    const candidateLinks = Array.isArray((value as { links?: unknown }).links)
      ? (value as { links: Array<unknown> }).links
      : []
    const normalizedLinks = candidateLinks
      .map((link) =>
        link && typeof link === 'object' ? (link as { url?: unknown }).url : undefined,
      )
      .filter((url): url is string => typeof url === 'string')

    return { files: [], links: normalizedLinks }
  }

  const resolveDefaultValue = (currentQuestion: DefaultQuestion) => {
    const entryValue = getEntryValue(currentQuestion.questionId)
    if (entryValue === undefined) return undefined
    switch (currentQuestion.type) {
      case 'SHORT_TEXT':
      case 'LONG_TEXT':
        return extractTextValue(entryValue)
      case 'CHECKBOX':
      case 'RADIO':
      case 'DROPDOWN':
        return extractOptionValue(entryValue)
      case 'PREFERRED_PART':
        return normalizePreferredPartValue(entryValue)
      case 'PORTFOLIO':
        return normalizePortfolioValue(entryValue)
      case 'SCHEDULE':
        return normalizeScheduleValue(entryValue)
      default:
        return entryValue
    }
  }

  const pages = Array.isArray(questionData.pages) ? questionData.pages : []
  pages.forEach((page) => {
    const questions = Array.isArray(page.questions) ? page.questions : []
    questions.forEach((question) => {
      defaultValues[String(question.questionId)] = resolveDefaultValue(question)
    })

    if (page.scheduleQuestion) {
      defaultValues[String(page.scheduleQuestion.questionId)] = resolveDefaultValue(
        page.scheduleQuestion,
      )
    }

    const partQuestions = Array.isArray(page.partQuestions) ? page.partQuestions : []
    partQuestions.forEach((partQuestionGroup) => {
      const nestedQuestions = Array.isArray(partQuestionGroup.questions)
        ? partQuestionGroup.questions
        : []
      nestedQuestions.forEach((question) => {
        defaultValues[String(question.questionId)] = resolveDefaultValue(question)
      })
    })
  })

  return defaultValues
}
