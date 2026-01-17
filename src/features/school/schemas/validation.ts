import dayjs from 'dayjs'
import { z } from 'zod/v3'

import type { RecruitingForms, RecruitingPartApi } from '@/shared/types/form'

type StepValues = Pick<
  RecruitingForms,
  'title' | 'recruitmentParts' | 'maxPreferredPartCount' | 'schedule' | 'noticeContent' | 'items'
>

const recruitmentPartEnum = z.enum([
  'PLAN',
  'DESIGN',
  'WEB',
  'IOS',
  'ANDROID',
  'SPRINGBOOT',
  'NODEJS',
] as [RecruitingPartApi, ...Array<RecruitingPartApi>])

export const step1Schema = z.object({
  title: z.string().trim().min(1, '모집 이름을 입력해 주세요.'),
  recruitmentParts: z.array(recruitmentPartEnum).min(1, '모집 파트를 선택해 주세요.'),
})

const interviewTimeTableSchema = z.object({
  dateRange: z.object({
    start: z.string(),
    end: z.string(),
  }),
  timeRange: z.object({
    start: z.string(),
    end: z.string(),
  }),
  slotMinutes: z.number().min(1),
  enabled: z.array(
    z.object({
      date: z.string(),
      time: z.array(z.string()),
    }),
  ),
})

const dateStringSchema = z
  .string({
    required_error: '날짜를 선택해 주세요.',
    invalid_type_error: '날짜를 선택해 주세요.',
  })
  .min(1, '날짜를 선택해 주세요.')

const baseScheduleSchema = z.object({
  applyStartAt: dateStringSchema,
  applyEndAt: dateStringSchema,
  docResultAt: dateStringSchema,
  interviewStartAt: dateStringSchema,
  interviewEndAt: dateStringSchema,
  finalResultAt: dateStringSchema,
  interviewTimeTable: interviewTimeTableSchema,
})

type DateOrderValues = {
  schedule?: {
    applyStartAt?: string | null
    applyEndAt?: string | null
    docResultAt?: string | null
    interviewStartAt?: string | null
    interviewEndAt?: string | null
    finalResultAt?: string | null
  }
}

const withDateOrderRules = <T extends z.ZodTypeAny>(schema: T) =>
  schema.superRefine((data, ctx) => {
    const values = (data as DateOrderValues).schedule
    if (!values) return

    if (
      values.applyStartAt &&
      values.applyEndAt &&
      dayjs(values.applyEndAt).isBefore(dayjs(values.applyStartAt))
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['schedule', 'applyEndAt'],
        message: '서류 모집 시작 이후로 선택해 주세요.',
      })
    }

    if (
      values.applyEndAt &&
      values.docResultAt &&
      dayjs(values.docResultAt).isBefore(dayjs(values.applyEndAt))
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['schedule', 'docResultAt'],
        message: '서류 모집 종료 이후로 선택해 주세요.',
      })
    }

    if (
      values.docResultAt &&
      values.interviewStartAt &&
      dayjs(values.interviewStartAt).isBefore(dayjs(values.docResultAt))
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['schedule', 'interviewStartAt'],
        message: '서류 결과 발표 이후로 선택해 주세요.',
      })
    }

    if (
      values.interviewStartAt &&
      values.interviewEndAt &&
      dayjs(values.interviewEndAt).isBefore(dayjs(values.interviewStartAt))
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['schedule', 'interviewEndAt'],
        message: '면접 평가 시작 이후로 선택해 주세요.',
      })
    }

    if (
      values.interviewEndAt &&
      values.finalResultAt &&
      dayjs(values.finalResultAt).isBefore(dayjs(values.interviewEndAt))
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['schedule', 'finalResultAt'],
        message: '면접 평가 종료 이후로 선택해 주세요.',
      })
    }
  })

export const step2Schema = withDateOrderRules(
  z.object({
    schedule: baseScheduleSchema.partial({
      applyStartAt: true,
      applyEndAt: true,
      docResultAt: true,
      interviewStartAt: true,
      interviewEndAt: true,
      finalResultAt: true,
    }),
  }),
)

const hasSlotsForAllDates = (
  dates: Array<string>,
  enabled: RecruitingForms['schedule']['interviewTimeTable']['enabled'],
) =>
  dates.length > 0 &&
  dates.every((date) => {
    const slotsForDate = enabled.find((slot) => slot.date === date)?.time ?? []
    return slotsForDate.length > 0
  })

export const getStepReady = (
  step: number,
  values: StepValues,
  options?: { interviewDates?: Array<string> },
) => {
  if (step === 1) return step1Schema.safeParse(values).success
  if (step === 2) {
    const isValid = step2Schema.safeParse(values).success
    if (!isValid) return false
    if (options?.interviewDates) {
      return hasSlotsForAllDates(options.interviewDates, values.schedule.interviewTimeTable.enabled)
    }
    return true
  }
  if (step === 3)
    return step3ItemsSchema.safeParse({
      items: values.items,
      recruitmentParts: values.recruitmentParts,
    }).success
  if (step === 4) return step4Schema.safeParse(values).success
  return true
}

export const step4Schema = z.object({
  noticeContent: z.string().trim().min(1, '공지 내용을 입력해 주세요.'),
})

const itemTargetSchema = z.union([
  z.object({ kind: z.literal('COMMON_PAGE'), pageNo: z.number() }),
  z.object({ kind: z.literal('PART'), part: z.string() }),
])

const itemQuestionSchema = z.object({
  type: z.string(),
  questionText: z.string(),
  required: z.boolean(),
  orderNo: z.number(),
  options: z
    .array(
      z.object({
        content: z.string(),
        orderNo: z.number(),
      }),
    )
    .optional(),
})

const itemsSchema = z.array(
  z.object({
    target: itemTargetSchema,
    question: itemQuestionSchema,
  }),
)

const itemsSchemaWithValidation = itemsSchema.superRefine((items, ctx) => {
  items.forEach((item, itemIndex) => {
    const type = item.question.type
    const options = item.question.options ?? []
    if (type === 'CHECKBOX' || type === 'RADIO') {
      if (options.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['items', itemIndex, 'question', 'options'],
          message: '선택지를 입력해 주세요.',
        })
        return
      }
      options.forEach((option, optionIndex) => {
        if (option.content.trim().length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['items', itemIndex, 'question', 'options', optionIndex, 'content'],
            message: '선택지를 입력해 주세요.',
          })
        }
      })
    }
  })
})

export const step3ItemsSchema = z
  .object({
    items: itemsSchemaWithValidation,
    recruitmentParts: z.array(recruitmentPartEnum),
  })
  .superRefine((data, ctx) => {
    const page2HasQuestions = data.items.some(
      (item) => item.target.kind === 'COMMON_PAGE' && item.target.pageNo === 2,
    )
    if (!page2HasQuestions) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['items'],
        message: '2페이지에 최소 1개의 문항을 입력해 주세요.',
      })
    }

    data.recruitmentParts.forEach((part) => {
      const hasPartQuestions = data.items.some(
        (item) => item.target.kind === 'PART' && item.target.part === part,
      )
      if (!hasPartQuestions) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['recruitmentParts', part],
          message: '파트별 문항을 입력해 주세요.',
        })
      }
    })
  })
export const recruitingFormSchema = withDateOrderRules(
  z.object({
    title: step1Schema.shape.title,
    recruitmentParts: step1Schema.shape.recruitmentParts,
    maxPreferredPartCount: z.number().min(1),
    schedule: z.object({
      applyStartAt: baseScheduleSchema.shape.applyStartAt.nullable(),
      applyEndAt: baseScheduleSchema.shape.applyEndAt.nullable(),
      docResultAt: baseScheduleSchema.shape.docResultAt.nullable(),
      interviewStartAt: baseScheduleSchema.shape.interviewStartAt.nullable(),
      interviewEndAt: baseScheduleSchema.shape.interviewEndAt.nullable(),
      finalResultAt: baseScheduleSchema.shape.finalResultAt.nullable(),
      interviewTimeTable: interviewTimeTableSchema,
    }),
    noticeContent: step4Schema.shape.noticeContent,
    status: z.enum(['DRAFT', 'OPEN', 'CLOSED']),
    items: itemsSchemaWithValidation,
  }),
)
