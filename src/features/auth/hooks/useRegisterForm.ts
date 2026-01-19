import { useMemo } from 'react'

import type { RegisterForm } from '../schemas/register'
import {
  useEmailVerification,
  useEmailVerificationSync,
  useRegisterFormSetup,
  useSchoolSelection,
  useTermsAgreement,
} from './register'

// 타입 재export
export type { TermsAgreementKey } from './register'

interface FormFieldValues {
  name: string
  nickname: string
  email: string
}

/**
 * 회원가입 폼 관리 훅 (Composed)
 *
 * 분해된 훅들을 조합하여 사용:
 * - useRegisterFormSetup: 폼 기본 설정
 * - useEmailVerification: 이메일 인증 상태
 * - useEmailVerificationSync: 이메일 변경 감시
 * - useSchoolSelection: 학교 선택 상태
 * - useTermsAgreement: 약관 동의 상태
 */
export function useRegisterForm() {
  // 1. 폼 기본 설정
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid: isFormValid, errors: formErrors },
  } = useRegisterFormSetup()

  // 2. 이메일 인증 상태
  const {
    isVerified: isEmailVerified,
    toggleVerification,
    resetVerification,
  } = useEmailVerification()

  // 3. 폼 값 감시
  const [watchedName, watchedNickname, watchedEmail] = watch(['name', 'nickname', 'email'])

  // 4. 이메일 변경 시 인증 초기화
  useEmailVerificationSync(watchedEmail, resetVerification)

  // 5. 학교 선택 상태
  const { selectedSchool, handleSchoolSelect } = useSchoolSelection(setValue)

  // 6. 약관 동의 상태
  const { termsAgreement, toggleTermAgreement, toggleAllTermsAgreement } =
    useTermsAgreement(setValue)

  // 제출 핸들러
  const handleFormSubmit = (formData: RegisterForm) => {
    console.log('회원가입 제출 데이터:', formData)
  }

  // 이메일 인증 상태 객체
  const emailVerification = useMemo(
    () => ({
      isVerified: isEmailVerified,
      toggleVerification,
    }),
    [isEmailVerified, toggleVerification],
  )

  const isRegistrationValid = isFormValid && isEmailVerified

  const formFieldValues: FormFieldValues = {
    name: watchedName,
    nickname: watchedNickname,
    email: watchedEmail,
  }

  return {
    register,
    handleSubmit,
    errors: formErrors,
    isValid: isRegistrationValid,
    emailVerification,
    selectedSchool,
    handleSchoolSelect,
    termsAgreement,
    toggleTermAgreement,
    toggleAllTermsAgreement,
    onSubmit: handleFormSubmit,
    formFieldValues,
    setValue,
  }
}
