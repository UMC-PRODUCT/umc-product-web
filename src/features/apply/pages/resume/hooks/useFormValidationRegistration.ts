import { useEffect } from 'react'
import type { UseFormRegister } from 'react-hook-form'

import type { ResumeFormValues } from '@/features/apply/utils'
import type { FormPage, FormQuestion } from '@/shared/types/form'

import { createValidationRules } from '../../../schemas/applySchemas'

/**
 * 동적 검증 규칙을 등록하는 훅
 * - 페이지 변경 시 검증 규칙 자동 등록
 */
export function useFormValidationRegistration(
  resolvedPages: Array<FormPage>,
  register: UseFormRegister<ResumeFormValues>,
) {
  useEffect(() => {
    resolvedPages.forEach((page) => {
      if (!page.questions) return
      page.questions.forEach((question: FormQuestion) => {
        const validationRules = createValidationRules(question)
        register(String(question.questionId), validationRules)
      })
    })
  }, [resolvedPages, register])
}
