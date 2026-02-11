import type { FormPage, RecruitmentApplicationForm } from '@/shared/types/form'

const sortByOrderNo = <T extends { orderNo?: string }>(items: Array<T>) =>
  [...items].sort((a, b) => {
    const aOrder = Number(a.orderNo)
    const bOrder = Number(b.orderNo)
    if (Number.isNaN(aOrder) || Number.isNaN(bOrder)) return 0
    return aOrder - bOrder
  })

const normalizePages = (pages: Array<FormPage>) =>
  [...pages]
    .sort((a, b) => Number(a.page) - Number(b.page))
    .map((page) => ({
      ...page,
      questions: sortByOrderNo(page.questions ?? []),
      partQuestions: (page.partQuestions ?? []).map((group) => ({
        ...group,
        questions: sortByOrderNo(group.questions),
      })),
    }))

export const normalizeRecruitmentApplicationForm = (
  form: RecruitmentApplicationForm,
): RecruitmentApplicationForm => ({
  ...form,
  pages: normalizePages(form.pages),
})
