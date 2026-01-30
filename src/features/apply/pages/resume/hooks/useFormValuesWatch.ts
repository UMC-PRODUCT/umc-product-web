import { useMemo } from 'react'
import type { Control } from 'react-hook-form'
import { useWatch } from 'react-hook-form'

import type { RecruitingForms } from '@/features/school/domain'
import type { pageType } from '@/shared/types/form'

import { resolvePagesWithSlots } from '../../../utils'
import type { ResumeFormValues } from '../../../utils/buildDefaultValuesFromQuestions'

/**
 * 폼 값 변화를 감시하고 동적 페이지를 해석하는 훅
 * - 폼 값 실시간 감시
 * - 조건부 질문 페이지 해석
 */
export function useFormValuesWatch(
  control: Control<ResumeFormValues>,
  questionData: RecruitingForms,
  defaultValues: ResumeFormValues,
  options?: { labelMode?: 'ranked' | 'part'; showAllParts?: boolean },
) {
  const watchedFormValues = useWatch({
    control,
    defaultValue: defaultValues as Record<string, {} | undefined>,
  })

  const currentFormValues = watchedFormValues as ResumeFormValues

  const resolvedPages: Array<pageType> = useMemo(
    () => resolvePagesWithSlots(questionData, currentFormValues, options),
    [questionData, currentFormValues, options],
  )

  return {
    currentFormValues,
    resolvedPages,
  }
}
