import { useMemo } from 'react'
import type { Control } from 'react-hook-form'
import { useWatch } from 'react-hook-form'

import type { QuestionList, QuestionPage } from '../../../domain/model'
import { resolvePagesWithSlots } from '../../../utils'
import type { ResumeFormValues } from '../../../utils/buildDefaultValuesFromQuestions'

/**
 * 폼 값 변화를 감시하고 동적 페이지를 해석하는 훅
 * - 폼 값 실시간 감시
 * - 조건부 질문 페이지 해석
 */
export function useFormValuesWatch(
  control: Control<ResumeFormValues>,
  questionData: QuestionList,
  defaultValues: ResumeFormValues,
) {
  const watchedFormValues = useWatch({
    control,
    defaultValue: defaultValues as Record<string, {} | undefined>,
  })

  const currentFormValues = watchedFormValues as ResumeFormValues

  const resolvedPages = useMemo<Array<QuestionPage>>(
    () => resolvePagesWithSlots(questionData, currentFormValues),
    [questionData, currentFormValues],
  )

  return {
    currentFormValues,
    resolvedPages,
  }
}
