import { z } from 'zod/v3'

import { PART } from '@/shared/constants/umc'
import type { RecruitingForms } from '@/shared/types/form'
import type { PartType } from '@/shared/types/umc'

type StepValues = Pick<
  RecruitingForms,
  | 'recruitingName'
  | 'recruitingPart'
  | 'documentStartDate'
  | 'documentEndDate'
  | 'documentResultDate'
  | 'interviewStartDate'
  | 'interviewEndDate'
  | 'finalResultDate'
  | 'interviewTimeSlots'
  | 'noticeTitle'
  | 'noticeContent'
  | 'questionPages'
>

const interviewSlotsSchema = z.record(z.array(z.string())).superRefine((value, ctx) => {
  const dateKeys = Object.keys(value)
  if (dateKeys.length === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: '면접 가능 시간을 선택해 주세요.',
    })
    return
  }

  const hasEmptyDate = dateKeys.some((key) => {
    const slots = value[key] ?? []
    return !Array.isArray(slots) || slots.length === 0
  })

  if (hasEmptyDate) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: '모든 면접 날짜에 최소 1개의 시간을 선택해 주세요.',
    })
  }
})

const partEnum = z.enum([...PART] as [PartType, ...Array<PartType>])
const questionTypeEnum = z.enum([
  'SHORT_TEXT',
  'CHECKBOX',
  'SCHEDULE',
  'PORTFOLIO',
  'RADIO',
  'LONG_TEXT',
  'PART',
  'DROPDOWN',
])

export const step1Schema = z.object({
  recruitingName: z.string().trim().min(1, '모집 이름을 입력해 주세요.'),
  recruitingPart: z.array(partEnum).min(1, '모집 파트를 선택해 주세요.'),
})

const baseStep2Schema = z.object({
  documentStartDate: z.date({
    required_error: '날짜를 선택해 주세요.',
    invalid_type_error: '날짜를 선택해 주세요.',
  }),
  documentEndDate: z.date({
    required_error: '날짜를 선택해 주세요.',
    invalid_type_error: '날짜를 선택해 주세요.',
  }),
  documentResultDate: z.date({
    required_error: '날짜를 선택해 주세요.',
    invalid_type_error: '날짜를 선택해 주세요.',
  }),
  interviewStartDate: z.date({
    required_error: '날짜를 선택해 주세요.',
    invalid_type_error: '날짜를 선택해 주세요.',
  }),
  interviewEndDate: z.date({
    required_error: '날짜를 선택해 주세요.',
    invalid_type_error: '날짜를 선택해 주세요.',
  }),
  finalResultDate: z.date({
    required_error: '날짜를 선택해 주세요.',
    invalid_type_error: '날짜를 선택해 주세요.',
  }),
  interviewTimeSlots: interviewSlotsSchema,
})

type DateOrderValues = {
  documentStartDate?: Date | null
  documentEndDate?: Date | null
  documentResultDate?: Date | null
  interviewStartDate?: Date | null
  interviewEndDate?: Date | null
  finalResultDate?: Date | null
}

const withDateOrderRules = <T extends z.ZodTypeAny>(schema: T) =>
  schema.superRefine((data, ctx) => {
    const values = data as DateOrderValues

    if (
      values.documentStartDate &&
      values.documentEndDate &&
      values.documentEndDate < values.documentStartDate
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['documentEndDate'],
        message: '서류 모집 시작 이후로 선택해 주세요.',
      })
    }

    if (
      values.documentEndDate &&
      values.documentResultDate &&
      values.documentResultDate < values.documentEndDate
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['documentResultDate'],
        message: '서류 모집 종료 이후로 선택해 주세요.',
      })
    }

    if (
      values.documentResultDate &&
      values.interviewStartDate &&
      values.interviewStartDate < values.documentResultDate
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['interviewStartDate'],
        message: '서류 결과 발표 이후로 선택해 주세요.',
      })
    }

    if (
      values.interviewStartDate &&
      values.interviewEndDate &&
      values.interviewEndDate < values.interviewStartDate
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['interviewEndDate'],
        message: '면접 평가 시작 이후로 선택해 주세요.',
      })
    }

    if (
      values.interviewEndDate &&
      values.finalResultDate &&
      values.finalResultDate < values.interviewEndDate
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['finalResultDate'],
        message: '면접 평가 종료 이후로 선택해 주세요.',
      })
    }
  })

export const step2Schema = withDateOrderRules(
  baseStep2Schema.partial({
    documentStartDate: true,
    documentEndDate: true,
    documentResultDate: true,
    interviewStartDate: true,
    interviewEndDate: true,
    finalResultDate: true,
  }),
)

const hasSlotsForAllDates = (dates: Array<string>, slots: RecruitingForms['interviewTimeSlots']) =>
  dates.length > 0 &&
  dates.every((date) => {
    const slotsForDate = slots[date] ?? []
    return Array.isArray(slotsForDate) && slotsForDate.length > 0
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
      return hasSlotsForAllDates(options.interviewDates, values.interviewTimeSlots)
    }
    return true
  }
  if (step === 3) return step3Schema.safeParse(values).success
  if (step === 4) return step4Schema.safeParse(values).success
  return true
}

export const step4Schema = z.object({
  noticeTitle: z.string().trim().min(1, '공지 제목을 입력해 주세요.'),
  noticeContent: z.string().trim().min(1, '공지 내용을 입력해 주세요.'),
})

const questionPagesSchema = z
  .array(
    z.object({
      page: z.number(),
      questions: z.array(
        z.object({
          questionId: z.number(),
          question: z.string(),
          type: questionTypeEnum,
          necessary: z.boolean(),
          options: z.array(z.string()),
          partSinglePick: z.boolean(),
          isPartQuestion: z.boolean(),
        }),
      ),
    }),
  )
  .superRefine((pages, ctx) => {
    pages.forEach((page, pageIndex) => {
      page.questions.forEach((question, questionIndex) => {
        if (question.question.trim().length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [pageIndex, 'questions', questionIndex, 'question'],
            message: '질문 내용을 입력해 주세요.',
          })
        }

        const isPart = question.type === 'PART' || question.isPartQuestion
        if (isPart && question.options.length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [pageIndex, 'questions', questionIndex, 'options'],
            message: '모집할 파트를 선택해 주세요.',
          })
        }

        if (question.type === 'RADIO' || question.type === 'CHECKBOX') {
          if (question.options.length === 0) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: [pageIndex, 'questions', questionIndex, 'options'],
              message: '선택지를 입력해 주세요.',
            })
            return
          }
          question.options.forEach((option, optionIndex) => {
            if (option.trim().length === 0) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: [pageIndex, 'questions', questionIndex, 'options', optionIndex],
                message: '선택지를 입력해 주세요.',
              })
            }
          })
        }
      })
    })
  })

export const step3Schema = z.object({
  questionPages: questionPagesSchema,
})

export const recruitingFormSchema = withDateOrderRules(
  z.object({
    recruitingName: step1Schema.shape.recruitingName,
    recruitingPart: step1Schema.shape.recruitingPart,
    documentStartDate: baseStep2Schema.shape.documentStartDate.nullable(),
    documentEndDate: baseStep2Schema.shape.documentEndDate.nullable(),
    documentResultDate: baseStep2Schema.shape.documentResultDate.nullable(),
    interviewStartDate: baseStep2Schema.shape.interviewStartDate.nullable(),
    interviewEndDate: baseStep2Schema.shape.interviewEndDate.nullable(),
    finalResultDate: baseStep2Schema.shape.finalResultDate.nullable(),
    interviewTimeSlots: baseStep2Schema.shape.interviewTimeSlots,
    noticeTitle: step4Schema.shape.noticeTitle,
    noticeContent: step4Schema.shape.noticeContent,
    questionPages: questionPagesSchema,
  }),
)
