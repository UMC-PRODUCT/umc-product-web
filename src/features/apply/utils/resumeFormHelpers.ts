import type { FieldErrors } from 'react-hook-form'

import type { PartType } from '@features/auth/domain'

import type { RecruitingForms } from '@/features/school/domain'
import type { pageType, question } from '@/shared/types/form'

import { findPartQuestion } from './findPartQuestion'
import { getSelectedPartsFromAnswer } from './getSelectedPartsFromAnswer'

type FormValues = Record<string, unknown>

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

/**
 * 제출 가능한 값들만 필터링하여 반환합니다.
 */
export function getSubmissionValues(
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
