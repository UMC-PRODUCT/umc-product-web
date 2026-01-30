import type { pageType } from '@/shared/types/form'

export function getAllQuestionsFromPages(pages: Array<pageType>) {
  return pages.flatMap((page) => page.questions)
}
