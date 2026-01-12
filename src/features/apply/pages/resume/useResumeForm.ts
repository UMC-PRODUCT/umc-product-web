import { useEffect, useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import { createValidationRules } from '@/features/apply/schemas/applySchemas'
import type {
  QuestionList,
  QuestionPage,
  QuestionUnion,
  ResumeFormValues,
  UseResumeFormReturn,
} from '@/features/apply/types/question'
import {
  buildDefaultValuesFromQuestions,
  getAllQuestionsFromPages,
  isQuestionAnswerEmpty,
  resolvePagesWithSlots,
} from '@/features/apply/utils'

export function useResumeForm(questionData: QuestionList): UseResumeFormReturn {
  const defaultValues = useMemo(() => buildDefaultValuesFromQuestions(questionData), [questionData])

  const {
    control,
    handleSubmit,
    trigger,
    getValues,
    setValue,
    clearErrors,
    register,
    reset,
    formState: { errors, isDirty },
  } = useForm<ResumeFormValues>({
    mode: 'onChange',
    defaultValues,
    shouldUnregister: false,
  })

  const watchedFormValues = useWatch({
    control,
    defaultValue: defaultValues as Record<string, {} | undefined>,
  })
  const currentFormValues = watchedFormValues as ResumeFormValues
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
        const validationRules = createValidationRules(question)

        register(String(question.id), validationRules)
      })
    })
  }, [resolvedPages, register])

  return {
    control,
    handleSubmit,
    trigger,
    getValues,
    setValue,
    clearErrors,
    reset,
    errors,
    isDirty,
    isFormIncomplete,
    resolvedPages,
  }
}
