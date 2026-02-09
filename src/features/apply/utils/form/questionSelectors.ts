import type { FieldErrors } from 'react-hook-form'

import type { FormPage, FormQuestion } from '@/shared/types/form'

type ScheduleQuestion = NonNullable<FormPage['scheduleQuestion']>
export type PageQuestion = FormQuestion | ScheduleQuestion

const getBaseQuestions = (page: FormPage): Array<FormQuestion> => page.questions ?? []

const getPartQuestions = (page: FormPage): Array<FormQuestion> =>
  (page.partQuestions ?? []).flatMap((partGroup) => partGroup.questions)

/**
 * 특정 페이지에서 기본 + 파트 질문만 모아 반환합니다. (스케줄 질문 제외)
 */
export const getPageQuestions = (page: FormPage): Array<FormQuestion> => [
  ...getBaseQuestions(page),
  ...getPartQuestions(page),
]

/**
 * 특정 페이지의 모든 질문(기본 + 파트 + 스케줄)을 모아 반환합니다.
 */
export const getPageQuestionsWithSchedule = (page: FormPage): Array<PageQuestion> => {
  const baseQuestions = getPageQuestions(page)
  return page.scheduleQuestion ? [...baseQuestions, page.scheduleQuestion] : baseQuestions
}

/**
 * 모든 페이지에서 질문을 평탄화합니다. (스케줄 포함)
 */
export const getAllQuestionsFromPages = (pages: Array<FormPage>): Array<PageQuestion> =>
  pages.flatMap(getPageQuestionsWithSchedule)

/**
 * 모든 질문의 questionId를 문자열 배열로 반환합니다. (스케줄 포함)
 */
export const getAllQuestionFieldIds = (pages: Array<FormPage>): Array<string> =>
  getAllQuestionsFromPages(pages).map((question) => String(question.questionId))

/**
 * 특정 페이지의 필수 질문 ID 목록을 추출합니다. (스케줄 포함)
 */
export const getPageRequiredFieldIds = (page: FormPage | undefined): Array<string> => {
  if (!page) return []
  return getPageQuestionsWithSchedule(page)
    .filter((question) => question.required)
    .map((question) => String(question.questionId))
}

/**
 * 폼 에러 중 첫 번째 에러가 발생한 페이지 인덱스를 찾습니다.
 */
export const findFirstErrorPageIndex = (
  formErrors: FieldErrors<Record<string, unknown>>,
  pages: Array<FormPage>,
): number => {
  const errorFieldIds = Object.keys(formErrors)
  if (errorFieldIds.length === 0) return -1

  const firstErrorFieldId = errorFieldIds[0]
  return pages.findIndex((page) =>
    getPageQuestionsWithSchedule(page).some(
      (question) => String(question.questionId) === firstErrorFieldId,
    ),
  )
}
