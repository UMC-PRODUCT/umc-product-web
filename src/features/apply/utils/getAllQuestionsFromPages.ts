import type { FormPage } from '@/shared/types/form'

export function getAllQuestionsFromPages(pages: Array<FormPage>) {
  return pages.flatMap((page) => page.questions)
}
