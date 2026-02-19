import type {
  AnswerItem,
  checkboxAnswer,
  longTextAnswer,
  portfolioAnswer,
  preferredPartAnswer,
  radioAnswer,
  scheduleAnswer,
  shortTextAnswer,
  TimeTableSlots,
} from '@/features/apply/domain/model'
import type { FormPage, FormQuestion } from '@/shared/types/form'
import type { PartType } from '@/shared/types/part'

import { isOptionAnswerValue, isQuestionAnswerEmpty } from './answerUtils'
import { getAllQuestionFieldIds, getPageQuestions } from './questionSelectors'

type FormValues = Record<string, unknown>
type ScheduleQuestion = NonNullable<FormPage['scheduleQuestion']>

const isScheduleValuePresent = (value: unknown): value is TimeTableSlots => {
  if (!value || typeof value !== 'object') return false
  const slots = Object.values(value as Record<string, Array<unknown>>)
  return slots.some((slot) => Array.isArray(slot) && slot.length > 0)
}

const buildShortTextAnswer = (value: unknown): shortTextAnswer | null => {
  if (typeof value !== 'string') return null
  const text = value.trim()
  return text ? { text } : null
}

const buildLongTextAnswer = (value: unknown): longTextAnswer | null => {
  if (typeof value !== 'string') return null
  const text = value.trim()
  return text ? { text } : null
}

const buildRadioAnswer = (value: unknown): radioAnswer | null => {
  if (!isOptionAnswerValue(value)) return null
  const [selectedOptionId] = value.selectedOptionIds
  if (!selectedOptionId) return null
  return {
    selectedOptionId,
    ...(value.otherText ? { otherText: value.otherText } : {}),
  }
}

const buildCheckboxAnswer = (value: unknown): checkboxAnswer | null => {
  if (!isOptionAnswerValue(value)) return null
  return {
    selectedOptionIds: value.selectedOptionIds,
    ...(value.otherText ? { otherText: value.otherText } : {}),
  }
}

const extractFiles = (value: unknown): Array<{ id?: string; status?: unknown }> => {
  if (value && typeof value === 'object' && Array.isArray((value as { files?: unknown }).files)) {
    return (value as { files: Array<{ id?: string; status?: unknown }> }).files
  }
  return []
}

const extractLinks = (value: unknown): Array<string> => {
  if (value && typeof value === 'object' && Array.isArray((value as { links?: unknown }).links)) {
    return (value as { links: Array<string> }).links
  }
  return []
}

const buildPortfolioAnswer = (value: unknown): portfolioAnswer | null => {
  if (!value || typeof value !== 'object') return null
  const files = extractFiles(value)
    .filter((file): file is { id: string; status?: unknown } => typeof file.id === 'string')
    .filter((file) => !file.status || file.status === 'success')
    .map((file) => ({ fileId: file.id }))
  const links = extractLinks(value).map((url) => ({ url }))
  if (files.length === 0 && links.length === 0) return null
  return { files, links }
}

const buildPreferredPartAnswer = (value: unknown): preferredPartAnswer | null => {
  if (!Array.isArray(value)) return null

  const preferredParts = value
    .map((entry) => {
      if (!entry || typeof entry !== 'object') return null
      const candidate = entry as { answer?: PartType }
      return candidate.answer ?? null
    })
    .filter((part): part is PartType => Boolean(part))

  return preferredParts.length > 0 ? { preferredParts } : null
}

const filterScheduleValue = (
  value: TimeTableSlots,
  schedule: ScheduleQuestion['schedule'],
): TimeTableSlots => {
  const disabledByDate = Array.isArray(schedule.disabledByDate) ? schedule.disabledByDate : []
  const enabledByDate = Array.isArray(schedule.enabledByDate) ? schedule.enabledByDate : []
  const disabledMap = disabledByDate.reduce<Partial<Record<string, Set<string>>>>((acc, slot) => {
    if (!slot.date || !Array.isArray(slot.times)) return acc
    acc[slot.date] = new Set(slot.times.filter((t): t is string => typeof t === 'string'))
    return acc
  }, {})
  const enabledMap = enabledByDate.reduce<Partial<Record<string, Set<string>>>>((acc, slot) => {
    if (!slot.date || !Array.isArray(slot.times)) return acc
    acc[slot.date] = new Set(slot.times.filter((t): t is string => typeof t === 'string'))
    return acc
  }, {})
  const hasEnabled = Object.keys(enabledMap).length > 0

  return Object.entries(value).reduce<TimeTableSlots>((acc, [date, times]) => {
    const safeTimes = Array.isArray(times)
      ? times.filter((t): t is string => typeof t === 'string')
      : []
    if (safeTimes.length === 0) return acc
    const enabledSet = enabledMap[date]
    const disabledSet = disabledMap[date]
    const filtered = safeTimes.filter((time) => {
      if (hasEnabled && (!enabledSet || !enabledSet.has(time))) return false
      if (disabledSet && disabledSet.has(time)) return false
      return true
    })
    if (filtered.length > 0) acc[date] = filtered
    return acc
  }, {})
}

const buildScheduleAnswer = (
  value: unknown,
  schedule: ScheduleQuestion['schedule'],
): scheduleAnswer | null => {
  if (!isScheduleValuePresent(value)) return null

  const slots = filterScheduleValue(value, schedule)
  const selected = Object.entries(slots)
    .map(([date, times]) => ({
      date,
      times: Array.isArray(times) ? times.filter((t): t is string => typeof t === 'string') : [],
    }))
    .filter((entry) => entry.times.length > 0)

  return selected.length > 0 ? { selected } : null
}

const mapQuestionToAnswerItem = (question: FormQuestion, value: unknown): AnswerItem | null => {
  if (value === undefined || isQuestionAnswerEmpty(question, value)) return null

  const questionId = String(question.questionId)
  const answeredAsType = question.type
  switch (question.type) {
    case 'SHORT_TEXT': {
      const answer = buildShortTextAnswer(value)
      return answer ? { questionId, answeredAsType, value: answer } : null
    }
    case 'LONG_TEXT': {
      const answer = buildLongTextAnswer(value)
      return answer ? { questionId, answeredAsType, value: answer } : null
    }
    case 'RADIO':
    case 'DROPDOWN': {
      const answer = buildRadioAnswer(value)
      return answer ? { questionId, answeredAsType, value: answer } : null
    }
    case 'CHECKBOX': {
      const answer = buildCheckboxAnswer(value)
      return answer ? { questionId, answeredAsType, value: answer } : null
    }
    case 'PORTFOLIO': {
      const answer = buildPortfolioAnswer(value)
      return answer ? { questionId, answeredAsType, value: answer } : null
    }
    case 'PREFERRED_PART': {
      const answer = buildPreferredPartAnswer(value)
      return answer ? { questionId, answeredAsType, value: answer } : null
    }
    default:
      return null
  }
}

const mapScheduleQuestionToAnswerItem = (
  scheduleQuestion: ScheduleQuestion,
  value: unknown,
): AnswerItem | null => {
  const questionId = String(scheduleQuestion.questionId)
  if (!isScheduleValuePresent(value)) return null
  const answer = buildScheduleAnswer(value, scheduleQuestion.schedule)
  return answer ? { questionId, answeredAsType: scheduleQuestion.type, value: answer } : null
}

/**
 * 제출 가능한 항목으로 변환합니다.
 */
export function getSubmissionItems(
  pages: Array<FormPage> | undefined,
  formValues: FormValues,
  fallbackValues?: FormValues,
): Array<AnswerItem> {
  const pageList = Array.isArray(pages) ? pages : []
  const mergedValues = { ...(fallbackValues ?? {}), ...formValues }

  const questionItems = pageList
    .flatMap((page) => getPageQuestions(page))
    .map((question) => mapQuestionToAnswerItem(question, mergedValues[String(question.questionId)]))
    .filter((item): item is AnswerItem => Boolean(item))

  const scheduleItems = pageList
    .map((page) => page.scheduleQuestion)
    .filter((scheduleQuestion): scheduleQuestion is ScheduleQuestion => Boolean(scheduleQuestion))
    .map((scheduleQuestion) =>
      mapScheduleQuestionToAnswerItem(
        scheduleQuestion,
        mergedValues[String(scheduleQuestion.questionId)],
      ),
    )
    .filter((item): item is AnswerItem => Boolean(item))

  return [...questionItems, ...scheduleItems]
}

/**
 * 제출 가능한 질문들만 필터링하여 반환합니다.
 */
export function getSubmissionFormValues(
  pages: Array<FormPage> | undefined,
  formValues: FormValues,
): FormValues {
  const pagesData = Array.isArray(pages) ? pages : []
  const allowedIds = new Set(getAllQuestionFieldIds(pagesData))
  return Object.keys(formValues).reduce<FormValues>((acc, key) => {
    if (allowedIds.has(key)) {
      acc[key] = formValues[key]
    }
    return acc
  }, {})
}
