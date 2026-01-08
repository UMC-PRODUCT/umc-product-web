import { useEffect, useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import type { QuestionList, QuestionPage, QuestionUnion } from '../../types/question'

type FormValues = Record<string, unknown>

interface UseResumeFormReturn {
  control: ReturnType<typeof useForm<FormValues>>['control']
  handleSubmit: ReturnType<typeof useForm<FormValues>>['handleSubmit']
  trigger: ReturnType<typeof useForm<FormValues>>['trigger']
  getValues: ReturnType<typeof useForm<FormValues>>['getValues']
  reset: ReturnType<typeof useForm<FormValues>>['reset']
  errors: ReturnType<typeof useForm<FormValues>>['formState']['errors']
  isDirty: boolean
  isFormIncomplete: boolean
}

function buildDefaultValuesFromQuestions(questionData: QuestionList): FormValues {
  const defaultValues: FormValues = {}

  questionData.pages.forEach((page: QuestionPage) => {
    page.questions.forEach((question: QuestionUnion) => {
      defaultValues[question.id] = question.answer
    })
  })

  return defaultValues
}

function getAllQuestions(questionData: QuestionList): Array<QuestionUnion> {
  return questionData.pages.flatMap((page) => page.questions)
}

function isQuestionAnswerEmpty(question: QuestionUnion, answerValue: unknown): boolean {
  if (!question.necessary) {
    return false
  }

  if (!answerValue) {
    return true
  }

  if (Array.isArray(answerValue) && answerValue.length === 0) {
    return true
  }

  if (question.type === 'timeTable') {
    const timeTableValues = Object.values(answerValue as Record<string, Array<unknown>>)
    const hasNoSelectedSlots = timeTableValues.every((slots) => slots.length === 0)
    return hasNoSelectedSlots
  }

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

  const watchedFormValues = useWatch({ control })

  const isFormIncomplete = useMemo(() => {
    const allQuestions = getAllQuestions(questionData)

    return allQuestions.some((question) => {
      const answerValue = watchedFormValues[question.id]
      return isQuestionAnswerEmpty(question, answerValue)
    })
  }, [watchedFormValues, questionData])

  useEffect(() => {
    questionData.pages.forEach((page: QuestionPage) => {
      page.questions.forEach((question: QuestionUnion) => {
        register(String(question.id), { required: question.necessary })
      })
    })
  }, [questionData, register])

  return {
    control,
    handleSubmit,
    trigger,
    getValues,
    reset,
    errors,
    isDirty,
    isFormIncomplete,
  }
}
