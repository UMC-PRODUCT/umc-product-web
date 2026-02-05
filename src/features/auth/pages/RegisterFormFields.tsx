import styled from '@emotion/styled'

import { LabelTextField } from '@/shared/ui/form/LabelTextField/LabelTextField'

import SchoolSelect from '../components/SchoolSelect/SchoolSelect'
import { TermsSection } from '../components/Term/TermsSection'
import type { GetTermsResponseDTO } from '../domain/types'
import type { SchoolOption, TermsAgreementKey } from '../hooks/register'
import type { RegistrationFieldValues, UseRegisterFormReturn } from '../hooks/useRegisterForm'

type FieldButtonConfig = {
  label: string
  onClick: () => void
  isLoading: boolean
  completed: boolean
}

type RegisterFormFieldsProps = {
  register: UseRegisterFormReturn['register']
  errors: UseRegisterFormReturn['formState']['errors']
  formFieldValues: RegistrationFieldValues
  selectedSchool: SchoolOption
  onSchoolSelect: (option: SchoolOption) => void
  emailButton: FieldButtonConfig
  verificationButton: FieldButtonConfig
  termsAgreement: Record<TermsAgreementKey, boolean>
  toggleTermAgreement: (key: TermsAgreementKey) => void
  toggleAllTermsAgreement: () => void
  termsData?: Record<TermsAgreementKey, GetTermsResponseDTO>
  isTermsLoading?: boolean
  termsError?: string
}

export const RegisterFormFields = ({
  register,
  errors,
  formFieldValues,
  selectedSchool,
  onSchoolSelect,
  emailButton,
  verificationButton,
  termsAgreement,
  toggleTermAgreement,
  toggleAllTermsAgreement,
  termsData,
  isTermsLoading,
  termsError,
}: RegisterFormFieldsProps) => {
  const termErrors = {
    serviceTerm: errors.serviceTerm?.message,
    privacyTerm: errors.privacyTerm?.message,
    marketingTerm: errors.marketingTerm?.message,
  }
  return (
    <FormFieldsContainer>
      <SchoolSelect
        value={selectedSchool}
        onChange={onSchoolSelect}
        error={{
          error: !!errors.school,
          errorMessage: errors.school?.message || '',
        }}
      />

      <LabelTextField
        autoComplete="name"
        type="text"
        label="이름"
        placeholder="이름을 입력해주세요."
        error={{
          error: !!errors.name,
          errorMessage: errors.name?.message || '',
        }}
        value={formFieldValues.name}
        {...register('name')}
      />

      <LabelTextField
        autoComplete="nickname"
        type="text"
        placeholder="1~5글자 한글 닉네임을 입력해 주세요."
        label="닉네임"
        error={{
          error: !!errors.nickname,
          errorMessage: errors.nickname?.message || '',
        }}
        value={formFieldValues.nickname}
        {...register('nickname')}
      />

      <LabelTextField
        autoComplete="email"
        type="email"
        placeholder="이메일 주소를 입력해주세요."
        label="이메일 주소"
        error={{
          error: !!errors.email,
          errorMessage: errors.email?.message || '',
        }}
        button={{
          buttonMessage: emailButton.label,
          buttonClick: emailButton.onClick,
          validation: emailButton.completed,
          isLoading: emailButton.isLoading,
        }}
        value={formFieldValues.email}
        {...register('email')}
      />

      <LabelTextField
        autoComplete="none"
        type="text"
        placeholder="인증번호 6자리를 입력해 주세요."
        label="인증번호"
        error={{
          error: !!errors.emailVerificationCode,
          errorMessage: errors.emailVerificationCode?.message || '',
        }}
        button={{
          buttonMessage: verificationButton.label,
          buttonClick: verificationButton.onClick,
          validation: verificationButton.completed,
          isLoading: verificationButton.isLoading,
        }}
        value={formFieldValues.emailVerificationCode}
        {...register('emailVerificationCode')}
      />

      <TermsSection
        terms={termsAgreement}
        onToggleAll={toggleAllTermsAgreement}
        onToggle={toggleTermAgreement}
        errors={termErrors}
        termsData={termsData}
        isTermsLoading={isTermsLoading}
        termsError={termsError}
      />
    </FormFieldsContainer>
  )
}

const FormFieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;

  .submit-button {
    height: 45px;
  }
`
