import type { FieldErrors } from 'react-hook-form'

import type { PartType } from '@features/auth/domain'

import type { QuestionList, QuestionPage, QuestionUnion } from '../domain/model'
import { findPartQuestion } from './findPartQuestion'
import { getSelectedPartsFromAnswer } from './getSelectedPartsFromAnswer'

type FormValues = Record<string, unknown>

/**
 * 폼 에러 중 첫 번째 에러가 발생한 페이지 인덱스를 찾습니다.
 */
export function findFirstErrorPageIndex(
  formErrors: FieldErrors<FormValues>,
  pages: Array<QuestionPage>,
): number {
  const errorFieldIds = Object.keys(formErrors)
  if (errorFieldIds.length === 0) return -1

  const firstErrorFieldId = errorFieldIds[0]
  return pages.findIndex((page: QuestionPage) =>
    (page.questions ?? []).some(
      (question: QuestionUnion) => String(question.id) === firstErrorFieldId,
    ),
  )
}

/**
 * 모든 페이지에서 질문 필드 ID 목록을 추출합니다.
 */
export function getAllQuestionFieldIds(pages: Array<QuestionPage>): Array<string> {
  return pages.flatMap((page) =>
    (page.questions ?? []).map((question: QuestionUnion) => String(question.id)),
  )
}

/**
 * 특정 페이지에서 필수 질문 필드 ID 목록을 추출합니다.
 */
export function getPageRequiredFieldIds(page: QuestionPage | undefined): Array<string> {
  if (!page?.questions) return []
  return page.questions
    .filter((question: QuestionUnion) => question.necessary)
    .map((question: QuestionUnion) => String(question.id))
}

/**
 * 제출할 파트 목록을 추출합니다.
 */
export function getSelectedPartsForSubmission(
  questionData: QuestionList,
  formValues: FormValues,
): Array<PartType> {
  const partQuestionId = 3
  const partQuestion = findPartQuestion(questionData, partQuestionId)
  if (!partQuestion) return []

  const order: Array<1 | 2> = [1, 2]
  const requiredCount = Math.max(partQuestion.options.length, 1)
  const effectiveOrder = order.slice(0, requiredCount)
  const answerValue = formValues[String(partQuestionId)]
  return getSelectedPartsFromAnswer(answerValue, effectiveOrder)
}

/**
 * 제출 가능한 값들만 필터링하여 반환합니다.
 */
export function getSubmissionValues(
  questionData: QuestionList,
  formValues: FormValues,
): FormValues {
  const baseQuestionIds = questionData.pages.flatMap((page) =>
    (page.questions ?? []).map((question) => String(question.id)),
  )
  const selectedParts = getSelectedPartsForSubmission(questionData, formValues)
  const partQuestionIds = selectedParts.flatMap((part) =>
    questionData.partQuestionBank[part].flatMap((partPage) =>
      partPage.questions.map((question) => String(question.id)),
    ),
  )

  const allowedIds = new Set([...baseQuestionIds, ...partQuestionIds])
  return Object.keys(formValues).reduce<FormValues>((acc, key) => {
    if (allowedIds.has(key)) {
      acc[key] = formValues[key]
    }
    return acc
  }, {})
}
