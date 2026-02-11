import type { PartType } from '@/features/auth/domain'
import type { RecruitmentApplicationFormResponseDTO } from '@/features/school/domain/model'
import { isOtherOptionContent } from '@/features/school/utils/questionOption'
import type { FormPage, FormQuestion, RecruitingItem } from '@/shared/types/form'

const toRecruitingItemOptions = (
  options:
    | Array<{ content: string; orderNo?: string; optionId?: string; isOther?: boolean }>
    | undefined,
  fallbackOrder: number,
) =>
  options?.map((option, index) => ({
    content: option.content,
    orderNo: String(option.orderNo ?? fallbackOrder + index + 1),
    optionId: option.optionId,
    isOther: option.isOther ?? isOtherOptionContent(option.content),
  })) ?? []

const buildRecruitingItemFromQuestion = (
  question: {
    questionId: number
    type: string
    questionText: string
    required: boolean
    orderNo?: string
    options?: Array<{ content: string; orderNo?: string; optionId?: string }>
  },
  target:
    | { kind: 'COMMON_PAGE'; pageNo: number }
    | { kind: 'PART'; part: PartType; pageNo: number },
  orderIndex: number,
): RecruitingItem => ({
  target,
  question: {
    questionId: question.questionId,
    type: question.type as RecruitingItem['question']['type'],
    questionText: question.questionText,
    required: question.required,
    orderNo: String(question.orderNo ?? orderIndex + 1),
    options: toRecruitingItemOptions(question.options, orderIndex),
  },
})

const sortByOrderNo = <T extends { orderNo?: string }>(items: Array<T>) =>
  [...items].sort((a, b) => {
    const aOrder = Number(a.orderNo)
    const bOrder = Number(b.orderNo)
    if (Number.isNaN(aOrder) || Number.isNaN(bOrder)) return 0
    return aOrder - bOrder
  })

export const convertApplicationFormToItems = (formData: RecruitmentApplicationFormResponseDTO) => {
  const items: Array<RecruitingItem> = []
  const pages = formData.pages

  pages.forEach((page: FormPage) => {
    const questions: Array<FormQuestion> = Array.isArray(page.questions) ? page.questions : []
    const hasScheduleInQuestions = questions.some((question) => question.type === 'SCHEDULE')
    const commonQuestions = hasScheduleInQuestions
      ? questions
      : page.scheduleQuestion
        ? [...questions, page.scheduleQuestion]
        : questions

    sortByOrderNo(commonQuestions).forEach((question, index) =>
      items.push(
        buildRecruitingItemFromQuestion(
          question,
          { kind: 'COMMON_PAGE', pageNo: Number(page.page) },
          index,
        ),
      ),
    )

    const partGroups = Array.isArray(page.partQuestions) ? page.partQuestions : []
    partGroups.forEach((partGroup) => {
      const groupQuestions: Array<FormQuestion> = Array.isArray(partGroup.questions)
        ? partGroup.questions
        : []
      sortByOrderNo(groupQuestions).forEach((question, index) =>
        items.push(
          buildRecruitingItemFromQuestion(
            question,
            { kind: 'PART', part: partGroup.part, pageNo: Number(page.page) },
            index,
          ),
        ),
      )
    })
  })

  return items
}
