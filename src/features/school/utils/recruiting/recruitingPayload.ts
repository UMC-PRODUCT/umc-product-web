import { isOtherOptionContent } from '@/features/school/constants/questionOption'
import type { RecruitmentEditable } from '@/features/school/domain/apiTypes'
import type { RecruitingForms, RecruitingItem, RecruitingSchedule } from '@/shared/types/form'

export const buildPublishedSchedulePayload = (
  schedule: RecruitingForms['schedule'],
  initial?: RecruitingSchedule | null,
) => {
  const result: Partial<RecruitmentEditable> = {}
  const pushIfChanged = (key: keyof RecruitmentEditable, value: string | null | undefined) => {
    const prev = initial?.[key as keyof RecruitingSchedule] as string | null | undefined
    if (value && value !== prev) {
      result[key] = value
    }
  }
  pushIfChanged('applyStartAt', schedule.applyStartAt)
  pushIfChanged('applyEndAt', schedule.applyEndAt)
  pushIfChanged('docResultAt', schedule.docResultAt)
  pushIfChanged('interviewStartAt', schedule.interviewStartAt)
  pushIfChanged('interviewEndAt', schedule.interviewEndAt)
  pushIfChanged('finalResultAt', schedule.finalResultAt)
  return result
}

export const buildQuestionsPayload = (items: Array<RecruitingItem>) =>
  items.map((item) => ({
    target: {
      kind: item.target.kind,
      pageNo: item.target.pageNo,
      part: item.target.part,
    },
    question: {
      questionId: item.question.questionId,
      type: item.question.type,
      questionText: item.question.questionText,
      required: item.question.required,
      orderNo: item.question.orderNo,
      options: item.question.options?.map((option) => ({
        content: option.content,
        orderNo: option.orderNo,
        optionId: option.optionId,
        isOther: option.isOther ?? isOtherOptionContent(option.content),
      })),
    },
  }))
