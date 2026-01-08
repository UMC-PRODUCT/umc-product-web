import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { RegisterForm } from '@features/auth/schemas/register'
import { registerSchema } from '@features/auth/schemas/register'

export type TermsAgreementKey = 'service' | 'privacy' | 'marketing'

interface SchoolOption {
  id: string | number
  label: string
}

type TermsAgreementState = Record<TermsAgreementKey, boolean>

const INITIAL_TERMS_STATE: TermsAgreementState = {
  service: false,
  privacy: false,
  marketing: false,
}

const EMPTY_SCHOOL: SchoolOption = { id: '', label: '' }

const TERM_TO_FORM_FIELD_MAP: Record<TermsAgreementKey, keyof RegisterForm> = {
  service: 'serviceTerm',
  privacy: 'privacyTerm',
  marketing: 'marketingTerm',
}

const ALL_TERM_KEYS: Array<TermsAgreementKey> = ['service', 'privacy', 'marketing']

interface EmailVerificationState {
  isVerified: boolean
  toggleVerification: () => void
}

interface FormFieldValues {
  name: string
  nickname: string
  email: string
}

export function useRegisterForm() {
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [selectedSchool, setSelectedSchool] = useState<SchoolOption>(EMPTY_SCHOOL)
  const [termsAgreement, setTermsAgreement] = useState<TermsAgreementState>(INITIAL_TERMS_STATE)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid: isFormValid, errors: formErrors },
  } = useForm<RegisterForm>({
    mode: 'onChange',
    resolver: zodResolver(registerSchema),
    defaultValues: {
      school: '',
      name: '',
      nickname: '',
      email: '',
      serviceTerm: false,
      privacyTerm: false,
      marketingTerm: false,
    },
  })

  useEffect(() => {
    register('school')
    register('serviceTerm')
    register('privacyTerm')
    register('marketingTerm')
  }, [register])

  const handleFormSubmit = (formData: RegisterForm) => {
    console.log('회원가입 제출 데이터:', formData)
  }

  const [watchedName, watchedNickname, watchedEmail] = watch(['name', 'nickname', 'email'])

  // 이메일이 변경되면 인증 상태 초기화
  useEffect(() => {
    setIsEmailVerified(false)
  }, [watchedEmail])

  const handleSchoolSelect = ({ id, label }: SchoolOption) => {
    setSelectedSchool({ id, label })
    setValue('school', label, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  const updateTermAgreement = (termKey: TermsAgreementKey, isAgreed: boolean) => {
    setTermsAgreement((previousState) => ({
      ...previousState,
      [termKey]: isAgreed,
    }))

    const formFieldName = TERM_TO_FORM_FIELD_MAP[termKey]
    setValue(formFieldName, isAgreed, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  const toggleTermAgreement = (termKey: TermsAgreementKey) => {
    const currentValue = termsAgreement[termKey]
    updateTermAgreement(termKey, !currentValue)
  }

  const toggleAllTermsAgreement = () => {
    const areAllTermsAgreed =
      termsAgreement.service && termsAgreement.privacy && termsAgreement.marketing

    const nextAgreementValue = !areAllTermsAgreed

    ALL_TERM_KEYS.forEach((termKey) => {
      updateTermAgreement(termKey, nextAgreementValue)
    })
  }

  const emailVerification: EmailVerificationState = useMemo(
    () => ({
      isVerified: isEmailVerified,
      toggleVerification: () => setIsEmailVerified((previous) => !previous),
    }),
    [isEmailVerified],
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
  }
}
