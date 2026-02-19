import dayjs from 'dayjs'
import { z } from 'zod/v3'

import type { PartType } from '@/features/auth/domain'
import type { RecruitingForms, RecruitingSchedule, RecruitingStatus } from '@/shared/types/form'

type ScheduleValidationContext = {
  initialSchedule: RecruitingSchedule | null
  now: string
  status: RecruitingStatus | null
  forceLockInDraft: boolean
}

let scheduleValidationContext: ScheduleValidationContext = {
  initialSchedule: null,
  now: dayjs().toISOString(),
  status: null,
  forceLockInDraft: false,
}

export const setScheduleValidationContext = (next: Partial<ScheduleValidationContext>) => {
  scheduleValidationContext = {
    ...scheduleValidationContext,
    ...next,
  }
}

type StepValues = Pick<
  RecruitingForms,
  'title' | 'recruitmentParts' | 'maxPreferredPartCount' | 'schedule' | 'noticeContent' | 'items'
>

type InterviewTimeTableWithEnabled = RecruitingForms['schedule']['interviewTimeTable'] & {
  enabledByDate?: Array<{ date: string; times?: Array<string> }>
}

const recruitmentPartEnum = z.enum([
  'PLAN',
  'DESIGN',
  'WEB',
  'IOS',
  'ANDROID',
  'SPRINGBOOT',
  'NODEJS',
] as [PartType, ...Array<PartType>])

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
  slotMinutes: z
    .string()
    .trim()
    .min(1, '면접 시간을 입력해 주세요.')
    .regex(/^\d+$/, '숫자만 입력해 주세요.')
    .refine((value) => Number(value) >= 10, '10분 이상으로 입력해 주세요.')
    .refine((value) => Number(value) <= 60, '60분 이하로 입력해 주세요.'),
  enabledByDate: z.array(
    z.object({
      date: z.string(),
      times: z.array(z.string()),
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

    const now = dayjs(scheduleValidationContext.now)
    const initial = scheduleValidationContext.initialSchedule
    const draftLockEnabled = scheduleValidationContext.forceLockInDraft
    const isDraft = scheduleValidationContext.status === 'DRAFT' && !draftLockEnabled

    const blockPast = (
      value: string | null | undefined,
      prevValue: string | null | undefined,
      path: Array<string>,
      label: string,
    ) => {
      if (!value) return
      // 이전 값과 동일하면 허용 (이미 지난 일정 수정 불가 정책과 충돌 방지)
      if (prevValue && dayjs(value).isSame(dayjs(prevValue), 'day')) return
      if (dayjs(value).isBefore(now, 'day')) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path,
          message: `${label}은(는) 오늘(${now.format('YYYY-MM-DD')}) 이전으로 설정할 수 없어요.`,
        })
      }
    }

    if (!isDraft) {
      // 과거 날짜 수정 불가 (동일 값은 허용)
      blockPast(
        values.applyStartAt,
        initial?.applyStartAt,
        ['schedule', 'applyStartAt'],
        '서류 모집 시작일',
      )
      blockPast(
        values.applyEndAt,
        initial?.applyEndAt,
        ['schedule', 'applyEndAt'],
        '서류 모집 종료일',
      )
      blockPast(
        values.docResultAt,
        initial?.docResultAt,
        ['schedule', 'docResultAt'],
        '서류 결과 발표일',
      )
      blockPast(
        values.interviewStartAt,
        initial?.interviewStartAt,
        ['schedule', 'interviewStartAt'],
        '면접 평가 시작일',
      )
      blockPast(
        values.interviewEndAt,
        initial?.interviewEndAt,
        ['schedule', 'interviewEndAt'],
        '면접 평가 종료일',
      )
      blockPast(
        values.finalResultAt,
        initial?.finalResultAt,
        ['schedule', 'finalResultAt'],
        '최종 결과 발표일',
      )
    }

    // 모집 시작 후 시작일 고정
    if (!isDraft && initial?.applyStartAt && values.applyStartAt) {
      const applyStarted = now.isAfter(dayjs(initial.applyStartAt), 'day')
      const changed = !dayjs(values.applyStartAt).isSame(dayjs(initial.applyStartAt), 'day')
      if (applyStarted && changed) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['schedule', 'applyStartAt'],
          message: '이미 모집이 시작되어 시작일을 수정할 수 없어요.',
        })
      }
    }

    // 단계 종료 후 수정 불가
    const lockIfEnded = (
      ended: string | null | undefined,
      newValue: string | null | undefined,
      path: Array<string>,
      label: string,
    ) => {
      if (!ended || !newValue) return
      if (now.isAfter(dayjs(ended), 'day')) {
        const changed = !dayjs(newValue).isSame(dayjs(ended), 'day')
        if (changed) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path,
            message: `${label}은(는) 이미 종료되어 수정할 수 없어요.`,
          })
        }
      }
    }

    if (!isDraft) {
      lockIfEnded(
        initial?.applyEndAt,
        values.applyEndAt,
        ['schedule', 'applyEndAt'],
        '서류 모집 기간',
      )
      lockIfEnded(
        initial?.interviewEndAt,
        values.interviewEndAt,
        ['schedule', 'interviewEndAt'],
        '면접 평가 기간',
      )
    }

    // 모집 마감일 단축 불가
    if (!isDraft && initial?.applyEndAt && values.applyEndAt) {
      if (dayjs(values.applyEndAt).isBefore(dayjs(initial.applyEndAt), 'day')) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['schedule', 'applyEndAt'],
          message: '모집 종료일을 기존보다 앞당길 수 없어요.',
        })
      }
    }

    // 면접 기간 단축 제한 (통보 후 앞당김 금지)
    if (!isDraft && initial?.interviewStartAt && values.interviewStartAt) {
      if (dayjs(values.interviewStartAt).isBefore(dayjs(initial.interviewStartAt), 'day')) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['schedule', 'interviewStartAt'],
          message: '이미 안내된 면접 시작일을 앞당길 수 없어요.',
        })
      }
    }
    if (!isDraft && initial?.interviewEndAt && values.interviewEndAt) {
      if (dayjs(values.interviewEndAt).isBefore(dayjs(initial.interviewEndAt), 'day')) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['schedule', 'interviewEndAt'],
          message: '이미 안내된 면접 종료일을 앞당길 수 없어요.',
        })
      }
    }

    if (
      values.applyStartAt &&
      values.applyEndAt &&
      dayjs(values.applyEndAt).isBefore(dayjs(values.applyStartAt), 'day')
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['schedule', 'applyEndAt'],
        message: '서류 모집 시작일 이후로 선택해 주세요.',
      })
    }

    if (
      values.applyEndAt &&
      values.docResultAt &&
      dayjs(values.docResultAt).isBefore(dayjs(values.applyEndAt), 'day')
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['schedule', 'docResultAt'],
        message: '서류 모집 종료일 이후로 선택해 주세요.',
      })
    }

    if (
      values.docResultAt &&
      values.interviewStartAt &&
      dayjs(values.interviewStartAt).isBefore(dayjs(values.docResultAt), 'day')
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['schedule', 'interviewStartAt'],
        message: '서류 결과 발표일 이후로 선택해 주세요.',
      })
    }

    if (
      values.interviewStartAt &&
      values.interviewEndAt &&
      dayjs(values.interviewEndAt).isBefore(dayjs(values.interviewStartAt), 'day')
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['schedule', 'interviewEndAt'],
        message: '면접 평가 시작일 이후로 선택해 주세요.',
      })
    }

    if (
      values.interviewEndAt &&
      values.finalResultAt &&
      dayjs(values.finalResultAt).isBefore(dayjs(values.interviewEndAt), 'day')
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['schedule', 'finalResultAt'],
        message: '면접 평가 종료일과 같거나 이후로 선택해 주세요.',
      })
    }
  })

export const step2Schema = withDateOrderRules(
  z.object({
    schedule: baseScheduleSchema,
  }),
)

const hasSlotsForEdgeDates = (
  dates: Array<string>,
  enabledSlots?: Array<{ date: string; times?: Array<string> }>,
) => {
  if (dates.length === 0) return true
  const startDate = dates[0]
  const endDate = dates[dates.length - 1]
  const hasSlotsForDate = (date: string) => {
    const slotsForDate = enabledSlots?.find((slot) => slot.date === date)?.times ?? []
    return slotsForDate.length > 0
  }
  return hasSlotsForDate(startDate) && hasSlotsForDate(endDate)
}

export const getStepReady = (
  step: number,
  values: StepValues,
  options?: { interviewDates?: Array<string>; skipInterviewSlotsValidation?: boolean },
) => {
  if (step === 1) return step1Schema.safeParse(values).success
  if (step === 2) {
    const isValid = step2Schema.safeParse(values).success
    if (!isValid) return false
    if (options?.interviewDates && !options.skipInterviewSlotsValidation) {
      return hasSlotsForEdgeDates(
        options.interviewDates,
        (values.schedule.interviewTimeTable as InterviewTimeTableWithEnabled).enabledByDate,
      )
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
  orderNo: z.string(),
  options: z
    .array(
      z.object({
        content: z.string(),
        orderNo: z.string(),
        optionId: z.string().optional(),
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
    maxPreferredPartCount: z.string().min(1),
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
