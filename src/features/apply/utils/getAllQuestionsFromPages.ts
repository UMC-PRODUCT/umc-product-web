import type { QuestionPage, QuestionUnion } from '@/features/apply/types/question'

export function getAllQuestionsFromPages(pages: Array<QuestionPage>): Array<QuestionUnion> {
  return pages.flatMap((page) => page.questions ?? [])
}
