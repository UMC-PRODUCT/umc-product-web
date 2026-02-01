import type { PartType } from '@/features/auth/domain'
import { isOtherOptionContent } from '@/features/school/constants/questionOption'
import type { GetApplicationFormResponseDTO } from '@/features/school/domain'
import type { RecruitingItem } from '@/shared/types/form'

const toRecruitingItemOptions = (
  options:
    | Array<{ content: string; orderNo?: number; optionId?: string; isOther?: boolean }>
    | undefined,
  fallbackOrder: number,
) =>
  options?.map((option, index) => ({
    content: option.content,
    orderNo: option.orderNo ?? fallbackOrder + index + 1,
    optionId: option.optionId,
    isOther: option.isOther ?? isOtherOptionContent(option.content),
  })) ?? []

const buildRecruitingItemFromQuestion = (
  question: {
    questionId: number
    type: string
    questionText: string
    required: boolean
    options?: Array<{ content: string; orderNo?: number; optionId?: string }>
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
    orderNo: orderIndex + 1,
    options: toRecruitingItemOptions(question.options, orderIndex),
  },
})

export const convertApplicationFormToItems = (formData: GetApplicationFormResponseDTO) => {
  const items: Array<RecruitingItem> = []
  const pages = formData.pages

  pages.forEach((page) => {
    const questions = Array.isArray(page.questions) ? page.questions : []
    questions.forEach((question, index) =>
      items.push(
        buildRecruitingItemFromQuestion(
          question,
          { kind: 'COMMON_PAGE', pageNo: Number(page.page) },
          index,
        ),
      ),
    )

    if (page.scheduleQuestion) {
      items.push(
        buildRecruitingItemFromQuestion(
          page.scheduleQuestion,
          { kind: 'COMMON_PAGE', pageNo: Number(page.page) },
          questions.length,
        ),
      )
    }

    const partGroups = Array.isArray(page.partQuestions) ? page.partQuestions : []
    partGroups.forEach((partGroup) => {
      const groupQuestions = Array.isArray(partGroup.questions) ? partGroup.questions : []
      groupQuestions.forEach((question, index) =>
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
