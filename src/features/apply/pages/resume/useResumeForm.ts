import { useEffect, useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import type { QuestionList, QuestionUnion } from '../../type/question'

type FormValues = Record<string, unknown>

export const useResumeForm = (data: QuestionList) => {
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
    defaultValues: useMemo(() => {
      const values: FormValues = {}
      data.pages.forEach((p) =>
        p.questions.forEach((q: QuestionUnion) => {
          values[q.id] = q.answer
        }),
      )
      return values
    }, [data]),
    shouldUnregister: false,
  })

  // 실시간 값 감시
  const allValues = useWatch({ control })

  const isFormIncomplete = useMemo(() => {
    return data.pages
      .flatMap((p) => p.questions)
      .some((q) => {
        if (!q.necessary) return false
        const val = allValues[q.id]

        if (!val) return true

        if (Array.isArray(val) && val.length === 0) return true

        if (q.type === 'timeTable') {
          const timeValues = Object.values(val as Record<string, Array<unknown>>)
          return timeValues.every((v) => v.length === 0)
        }

        return false
      })
  }, [allValues, data])

  useEffect(() => {
    data.pages.forEach((p) => {
      p.questions.forEach((q: QuestionUnion) => {
        register(`${q.id}`, { required: q.necessary })
      })
    })
  }, [data, register])

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
