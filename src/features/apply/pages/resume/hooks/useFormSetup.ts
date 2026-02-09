import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

import type { GetRecruitmentApplicationAnswerResponseDTO } from '@/features/apply/domain/model'
import type { RecruitmentApplicationForm } from '@/shared/types/form'

import { buildDefaultValuesFromQuestions } from '../../../utils'
import type { ResumeFormValues } from '../../../utils/buildDefaultValuesFromQuestions'

/**
 * 폼 초기 설정을 담당하는 훅
 * - useForm 초기화
 * - 기본값 생성 및 리셋
 */
export function useFormSetup(
  questionData: RecruitmentApplicationForm,
  answerData?: GetRecruitmentApplicationAnswerResponseDTO,
) {
  const defaultValues = useMemo(
    () => buildDefaultValuesFromQuestions(questionData, answerData),
    [questionData, answerData],
  )

  const form = useForm<ResumeFormValues>({
    mode: 'onChange',
    defaultValues,
    shouldUnregister: false,
  })

  const { reset } = form

  // questionData 변경 시 폼 리셋 (기존 입력값 유지)
  useEffect(() => {
    reset(defaultValues, {
      keepDirtyValues: true,
      keepErrors: true,
      keepTouched: true,
    })
  }, [defaultValues, reset])

  return {
    ...form,
    defaultValues,
  }
}
