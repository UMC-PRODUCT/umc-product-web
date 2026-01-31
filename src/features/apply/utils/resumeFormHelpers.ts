import type { FieldErrors } from 'react-hook-form'

import type { PartType } from '@features/auth/domain'

import type { RecruitingForms } from '@/features/school/domain'
import type { pageType, question } from '@/shared/types/form'

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
} from '../domain/model'
import { findPartQuestion } from './findPartQuestion'
import { getSelectedPartsFromAnswer } from './getSelectedPartsFromAnswer'
import { isQuestionAnswerEmpty } from './isQuestionAnswerEmpty'
import { isOptionAnswerValue } from './optionAnswer'

type FormValues = Record<string, unknown>
type ScheduleQuestion = NonNullable<pageType['scheduleQuestion']>

const getAllPageQuestions = (page: pageType) => {
  const baseQuestions = Array.isArray(page.questions) ? page.questions : []
  const partQuestions = Array.isArray(page.partQuestions)
    ? page.partQuestions.flatMap((partGroup) =>
        Array.isArray(partGroup.questions) ? partGroup.questions : [],
      )
    : []
  return [...baseQuestions, ...partQuestions]
}

/**
 * 폼 에러 중 첫 번째 에러가 발생한 페이지 인덱스를 찾습니다.
 */
export function findFirstErrorPageIndex(
  formErrors: FieldErrors<FormValues>,
  pages: Array<pageType>,
): number {
  const errorFieldIds = Object.keys(formErrors)
  if (errorFieldIds.length === 0) return -1

  const firstErrorFieldId = errorFieldIds[0]
  return pages.findIndex((page: pageType) =>
    getAllPageQuestions(page).some(
      (question: question) => String(question.questionId) === firstErrorFieldId,
    ),
  )
}

/**
 * 모든 페이지에서 질문 필드 ID 목록을 추출합니다.
 */
export function getAllQuestionFieldIds(pages: Array<pageType>): Array<string> {
  return pages.flatMap((page) =>
    getAllPageQuestions(page).map((question: question) => String(question.questionId)),
  )
}

/**
 * 특정 페이지에서 필수 질문 필드 ID 목록을 추출합니다.
 */
export function getPageRequiredFieldIds(page: pageType | undefined): Array<string> {
  if (!page) return []
  const allQuestions = getAllPageQuestions(page)
  return allQuestions
    .filter((question: question) => question.required)
    .map((question: question) => String(question.questionId))
}

/**
 * 제출할 파트 목록을 추출합니다.
 */
export function getSelectedPartsForSubmission(
  questionData: RecruitingForms,
  formValues: FormValues,
): Array<PartType> {
  const partQuestion = findPartQuestion(questionData)
  if (!partQuestion) return []

  const partQuestionId = partQuestion.questionId
  const order: Array<1 | 2> = [1, 2]
  const maxSelectCountValue = Number(partQuestion.maxSelectCount ?? 0)
  const requiredCount = Math.max(!Number.isNaN(maxSelectCountValue) ? maxSelectCountValue : 0, 1)
  const effectiveOrder = order.slice(0, requiredCount)
  const answerValue = formValues[String(partQuestionId)]
  return getSelectedPartsFromAnswer(answerValue, effectiveOrder)
}

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

const extractFiles = (value: unknown): Array<{ id?: string }> => {
  if (value && typeof value === 'object' && Array.isArray((value as { files?: unknown }).files)) {
    return (value as { files: Array<{ id?: string }> }).files
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
    .filter((file): file is { id: string } => typeof file.id === 'string')
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

  const latest = preferredParts.at(-1)
  return latest ? { prefferedParts: [latest] } : null
}

const buildScheduleAnswer = (value: unknown): scheduleAnswer | null => {
  if (!isScheduleValuePresent(value)) return null

  const slots = value as Record<string, Array<string>>
  const selected = Object.entries(slots)
    .map(([date, times]) => ({
      date,
      times: Array.isArray(times) ? times.filter((t): t is string => typeof t === 'string') : [],
    }))
    .filter((entry) => entry.times.length > 0)

  return selected.length > 0 ? { selected } : null
}

const mapQuestionToAnswerItem = (question: question, value: unknown): AnswerItem | null => {
  if (value === undefined || isQuestionAnswerEmpty(question, value)) return null

  const questionId = String(question.questionId)
  const answeredType = question.type
  switch (question.type) {
    case 'SHORT_TEXT': {
      const answer = buildShortTextAnswer(value)
      return answer ? { questionId, answeredType, value: answer } : null
    }
    case 'LONG_TEXT': {
      const answer = buildLongTextAnswer(value)
      return answer ? { questionId, answeredType, value: answer } : null
    }
    case 'RADIO':
    case 'DROPDOWN': {
      const answer = buildRadioAnswer(value)
      return answer ? { questionId, answeredType, value: answer } : null
    }
    case 'CHECKBOX': {
      const answer = buildCheckboxAnswer(value)
      return answer ? { questionId, answeredType, value: answer } : null
    }
    case 'PORTFOLIO': {
      const answer = buildPortfolioAnswer(value)
      return answer ? { questionId, answeredType, value: answer } : null
    }
    case 'PREFERRED_PART': {
      const answer = buildPreferredPartAnswer(value)
      return answer ? { questionId, answeredType, value: answer } : null
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
  const answer = buildScheduleAnswer(value)
  return answer ? { questionId, answeredType: scheduleQuestion.type, value: answer } : null
}

/**
 * 제출 가능한 항목으로 변환합니다.
 */
export function getSubmissionItems(
  pages: Array<pageType> | undefined,
  formValues: FormValues,
  fallbackValues?: FormValues,
): Array<AnswerItem> {
  const pageList = Array.isArray(pages) ? pages : []
  const mergedValues = { ...(fallbackValues ?? {}), ...formValues }

  const questionItems = pageList
    .flatMap((page) => {
      const pageQuestions = Array.isArray(page.questions) ? page.questions : []
      const partQuestionGroups = Array.isArray(page.partQuestions) ? page.partQuestions : []
      const partQuestions = partQuestionGroups.flatMap((partGroup) =>
        Array.isArray(partGroup.questions) ? partGroup.questions : [],
      )
      return [...pageQuestions, ...partQuestions]
    })
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
 * 제출 가능한 값들만 필터링하여 반환합니다.
 */
export function getSubmissionFormValues(
  questionData: Array<pageType> | undefined,
  formValues: FormValues,
): FormValues {
  const pagesData = Array.isArray(questionData)
    ? questionData
    : (questionData as unknown as Array<pageType>)

  const baseQuestionIds = pagesData.flatMap((page) =>
    page.questions.map((question: question) => String(question.questionId)),
  )

  const scheduleQuestionIds = pagesData
    .filter((page) => page.scheduleQuestion !== null)
    .map((page) => String(page.scheduleQuestion!.questionId))

  const partQuestionIds = pagesData.flatMap((page) =>
    page.partQuestions.flatMap((partGroup: { questions: Array<question> }) =>
      partGroup.questions.map((question: question) => String(question.questionId)),
    ),
  )

  const allowedIds = new Set([...baseQuestionIds, ...scheduleQuestionIds, ...partQuestionIds])
  return Object.keys(formValues).reduce<FormValues>((acc, key) => {
    if (allowedIds.has(key)) {
      acc[key] = formValues[key]
    }
    return acc
  }, {})
}
