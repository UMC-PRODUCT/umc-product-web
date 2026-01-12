import { useEffect, useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import type { PartQuestionBankPage } from '@/shared/types/question'
import type { PartType } from '@/shared/types/umc'

import type { QuestionList, QuestionPage, QuestionUnion } from '../../types/question'

type FormValues = Record<string, unknown>

const REQUIRED_FIELD_MESSAGE = '응답 필수 항목입니다.'

interface UseResumeFormReturn {
  control: ReturnType<typeof useForm<FormValues>>['control']
  handleSubmit: ReturnType<typeof useForm<FormValues>>['handleSubmit']
  trigger: ReturnType<typeof useForm<FormValues>>['trigger']
  getValues: ReturnType<typeof useForm<FormValues>>['getValues']
  reset: ReturnType<typeof useForm<FormValues>>['reset']
  errors: ReturnType<typeof useForm<FormValues>>['formState']['errors']
  isDirty: boolean
  isFormIncomplete: boolean
  resolvedPages: Array<QuestionPage>
}

function buildDefaultValuesFromQuestions(questionData: QuestionList): FormValues {
  const defaultValues: FormValues = {}

  questionData.pages.forEach((page: QuestionPage) => {
    ;(page.questions ?? []).forEach((question: QuestionUnion) => {
      defaultValues[String(question.id)] = question.answer
    })
  })

  return defaultValues
}

function getAllQuestionsFromPages(pages: Array<QuestionPage>): Array<QuestionUnion> {
  return pages.flatMap((page) => page.questions ?? [])
}

function getSelectedPartsFromAnswer(answerValue: unknown, order: Array<1 | 2>): Array<PartType> {
  if (!Array.isArray(answerValue)) return []

  const entries = answerValue as Array<{ id?: number; answer?: PartType }>
  return order
    .map((orderId) => entries.find((entry) => entry.id === orderId)?.answer)
    .filter((part): part is PartType => Boolean(part))
}

function resolvePagesWithSlots(
  questionData: QuestionList,
  formValues: FormValues,
): Array<QuestionPage> {
  const resolvedPages: Array<QuestionPage> = []

  questionData.pages.forEach((page) => {
    if (page.type === 'static') {
      resolvedPages.push(page)
      return
    }

    if (page.slotId === 'PART_PAGES' && page.insert) {
      const answerValue = formValues[String(page.insert.sourceQuestionId)]
      const selectedParts = getSelectedPartsFromAnswer(answerValue, page.insert.order)

      selectedParts.forEach((part) => {
        const partPages = questionData.partQuestionBank[part]
        partPages.forEach((partPage: PartQuestionBankPage) => {
          resolvedPages.push({
            page: 0,
            type: 'static',
            questions: partPage.questions,
          })
        })
      })
    }
  })

  return resolvedPages.map((page, index) => ({ ...page, page: index + 1 }))
}

function isQuestionAnswerEmpty(question: QuestionUnion, answerValue: unknown): boolean {
  // Only validate required questions
  if (!question.necessary) return false

  // Treat null/undefined as empty
  if (answerValue === null || answerValue === undefined) return true

  // Strings: empty/whitespace is empty
  if (typeof answerValue === 'string') {
    return answerValue.trim().length === 0
  }

  // Numbers/booleans are valid values even if falsy (0/false)
  if (typeof answerValue === 'number' || typeof answerValue === 'boolean') {
    return false
  }

  // Arrays: empty array is empty
  if (Array.isArray(answerValue)) {
    return answerValue.length === 0
  }

  // Timetable: expect a map of date -> selected slots array
  if (question.type === 'timeTable') {
    if (typeof answerValue !== 'object') return true
    const timeTableValues = Object.values(answerValue as Record<string, Array<unknown>>)
    const hasNoSelectedSlots =
      timeTableValues.length === 0 || timeTableValues.every((slots) => slots.length === 0)
    return hasNoSelectedSlots
  }

  // File upload: expect { files: [], links: [] }
  if (question.type === 'fileUpload') {
    const v = answerValue as { files?: Array<unknown>; links?: Array<unknown> }
    const filesEmpty = !Array.isArray(v.files) || v.files.length === 0
    const linksEmpty = !Array.isArray(v.links) || v.links.length === 0
    return filesEmpty && linksEmpty
  }

  // Fallback: for objects we generally assume "not empty" unless the question type has a known empty-shape
  return false
}

export function useResumeForm(questionData: QuestionList): UseResumeFormReturn {
  const defaultValues = useMemo(() => buildDefaultValuesFromQuestions(questionData), [questionData])

  const {
    control,
    handleSubmit,
    trigger,
    getValues,
    register,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues,
    shouldUnregister: false,
  })

  const watchedFormValues = useWatch({
    control,
    defaultValue: defaultValues as Record<string, {} | undefined>,
  })
  const currentFormValues = watchedFormValues as FormValues
  const resolvedPages = useMemo(
    () => resolvePagesWithSlots(questionData, currentFormValues),
    [questionData, currentFormValues],
  )

  useEffect(() => {
    reset(defaultValues, {
      keepDirtyValues: true,
      keepErrors: true,
      keepTouched: true,
    })
  }, [defaultValues, reset])

  const isFormIncomplete = useMemo(() => {
    const allQuestions = getAllQuestionsFromPages(resolvedPages)

    return allQuestions.some((question) => {
      const answerValue = currentFormValues[String(question.id)]
      return isQuestionAnswerEmpty(question, answerValue)
    })
  }, [currentFormValues, resolvedPages])

  useEffect(() => {
    resolvedPages.forEach((page: QuestionPage) => {
      ;(page.questions ?? []).forEach((question: QuestionUnion) => {
        const validationRules =
          question.type === 'part'
            ? {
                required: false,
                validate: (value: unknown) => {
                  const selections = Array.isArray(value) ? value : []
                  const first = selections.find((item) => item?.id === 1)?.answer
                  const second = selections.find((item) => item?.id === 2)?.answer

                  if (question.necessary && (!first || !second)) {
                    return REQUIRED_FIELD_MESSAGE
                  }

                  if (first && second && first === second) {
                    return '같은 파트를 중복 선택할 수 없습니다.'
                  }

                  return true
                },
              }
            : {
                required: question.necessary ? REQUIRED_FIELD_MESSAGE : false,
              }

        register(String(question.id), validationRules)
      })
    })
  }, [resolvedPages, register])

  return {
    control,
    handleSubmit,
    trigger,
    getValues,
    reset,
    errors,
    isDirty,
    isFormIncomplete,
    resolvedPages,
  }
}
