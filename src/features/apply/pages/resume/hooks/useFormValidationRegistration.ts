import { useEffect } from 'react'
import type { UseFormRegister } from 'react-hook-form'

import type { QuestionPage } from '@/features/apply/domain'

import { createValidationRules } from '../../../schemas/applySchemas'
import type { ResumeFormValues } from '../../../utils/buildDefaultValuesFromQuestions'

/**
 * 동적 검증 규칙을 등록하는 훅
 * - 페이지 변경 시 검증 규칙 자동 등록
 */
export function useFormValidationRegistration(
  resolvedPages: Array<QuestionPage>,
  register: UseFormRegister<ResumeFormValues>,
) {
  useEffect(() => {
    resolvedPages.forEach((page) => {
      ;(page.questions ?? []).forEach((question) => {
        const validationRules = createValidationRules(question)
        register(String(question.id), validationRules)
      })
    })
  }, [resolvedPages, register])
}
