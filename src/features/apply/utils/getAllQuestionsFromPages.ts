import type { QuestionPage, QuestionUnion } from '../domain/model'

export function getAllQuestionsFromPages(pages: Array<QuestionPage>): Array<QuestionUnion> {
  return pages.flatMap((page) => page.questions ?? [])
}
