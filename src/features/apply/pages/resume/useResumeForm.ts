import type { useForm } from 'react-hook-form'

import type { FormPage, RecruitmentApplicationForm } from '@/shared/types/form'

import type { GetRecruitmentApplicationAnswerResponseDTO } from '../../domain/model'
import type { ResumeFormValues } from '../../utils/buildDefaultValuesFromQuestions'
import {
  useFormCompleteness,
  useFormSetup,
  useFormValidationRegistration,
  useFormValuesWatch,
} from './hooks'

export interface UseResumeFormReturn {
  control: ReturnType<typeof useForm<ResumeFormValues>>['control']
  handleSubmit: ReturnType<typeof useForm<ResumeFormValues>>['handleSubmit']
  trigger: ReturnType<typeof useForm<ResumeFormValues>>['trigger']
  getValues: ReturnType<typeof useForm<ResumeFormValues>>['getValues']
  setValue: ReturnType<typeof useForm<ResumeFormValues>>['setValue']
  clearErrors: ReturnType<typeof useForm<ResumeFormValues>>['clearErrors']
  reset: ReturnType<typeof useForm<ResumeFormValues>>['reset']
  errors: ReturnType<typeof useForm<ResumeFormValues>>['formState']['errors']
  isDirty: boolean
  isFormIncomplete: boolean
  resolvedPages: Array<FormPage>
  defaultValues: ResumeFormValues
}

/**
 * 지원서 폼 관리 훅 (Composed)
 *
 * 분해된 훅들을 조합하여 사용:
 * - useFormSetup: 폼 초기 설정
 * - useFormValuesWatch: 폼 값 감시 및 동적 페이지 해석
 * - useFormCompleteness: 폼 완성도 검증
 * - useFormValidationRegistration: 동적 검증 규칙 등록
 */
export function useResumeForm(
  questionData?: RecruitmentApplicationForm,
  answerData?: GetRecruitmentApplicationAnswerResponseDTO,
  options?: { labelMode?: 'ranked' | 'part'; showAllParts?: boolean },
): UseResumeFormReturn {
  const defaultQuestionData: RecruitmentApplicationForm = {
    recruitmentId: 0,
    formId: 0,
    status: 'DRAFT',
    title: '',
    recruitmentFormTitle: '',
    noticeTitle: '',
    noticeContent: '',
    pages: [],
  }
  const effectiveQuestionData = questionData ?? defaultQuestionData

  // 1. 폼 초기 설정
  const {
    control,
    handleSubmit,
    trigger,
    getValues,
    setValue,
    clearErrors,
    register,
    reset,
    defaultValues,
    formState: { errors, isDirty },
  } = useFormSetup(effectiveQuestionData, answerData)

  // 2. 폼 값 감시 및 동적 페이지 해석
  const { currentFormValues, resolvedPages } = useFormValuesWatch(
    control,
    effectiveQuestionData,
    defaultValues,
    options,
  )

  // 3. 폼 완성도 검증
  const { isFormIncomplete } = useFormCompleteness(currentFormValues, resolvedPages)

  // 4. 동적 검증 규칙 등록
  useFormValidationRegistration(resolvedPages, register)

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
    defaultValues,
  }
}
