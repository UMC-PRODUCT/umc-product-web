import { useCallback, useEffect, useMemo, useState } from 'react'
import styled from '@emotion/styled'

import Logo from '@shared/assets/brand_logo.svg?react'
import { media } from '@shared/styles/media'
import { theme } from '@shared/styles/theme'
import { Button } from '@shared/ui/common/Button/Button'
import ErrorMessage from '@shared/ui/common/ErrorMessage/ErrorMessage'

import type { TermsResponseDTO } from '@/shared/api/terms'

import AuthSection from '../components/AuthSection/AuthSection'
import EmailSendModal from '../components/modals/EmailSendModal/EmailSendModal'
import type { TermsAgreementKey } from '../hooks/register'
import { useSchoolSelection, useTermsAgreement } from '../hooks/register'
import { useTermsIds } from '../hooks/register/useTermsIdsQuery'
import { useRegisterForm } from '../hooks/useRegisterForm'
import { useRegistrationWorkflow } from '../hooks/useRegistrationWorkflow'
import type { RegisterForm } from '../schemas/register'
import { RegisterFormFields } from './RegisterFormFields'

type RegisterPageProps = {
  oAuthVerificationToken?: string
  email?: string
}

export const RegisterPage = ({ oAuthVerificationToken, email }: RegisterPageProps) => {
  const [isEmailVerificationModalOpen, setIsEmailVerificationModalOpen] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formFieldValues,
    watchedEmail,
    formState,
  } = useRegisterForm()
  const { errors, isValid } = formState
  const { selectedSchool, handleSchoolSelect } = useSchoolSelection(setValue)
  const { termsAgreement, toggleTermAgreement, toggleAllTermsAgreement } =
    useTermsAgreement(setValue)
  const termsIdsQuery = useTermsIds()

  const {
    handleSendVerificationEmail,
    handleVerifyCode,
    handleRegisterSubmit,
    isSendingEmail,
    isVerifyingCode,
    isRegistering,
    registrationError,
    emailRequestState,
    verificationState,
  } = useRegistrationWorkflow({
    watchedEmail,
    setValue,
    setError,
    clearErrors,
    onEmailSent: () => setIsEmailVerificationModalOpen(true),
    terms: termsIdsQuery.data,
  })

  useEffect(() => {
    if (email) {
      setValue('email', email)
    }
  }, [email, setValue])

  useEffect(() => {
    if (oAuthVerificationToken) {
      setValue('oAuthVerificationToken', oAuthVerificationToken)
    }
  }, [oAuthVerificationToken, setValue])

  const handleTriggerSendEmail = useCallback(
    () => handleSendVerificationEmail(formFieldValues.email),
    [formFieldValues.email, handleSendVerificationEmail],
  )

  const handleTriggerVerifyCode = useCallback(
    () => handleVerifyCode(formFieldValues.emailVerificationCode),
    [formFieldValues.emailVerificationCode, handleVerifyCode],
  )

  const handleFormSubmit = (formData: RegisterForm) => {
    const hasSchoolId = selectedSchool.id !== ''
    const schoolId = hasSchoolId ? Number(selectedSchool.id) : undefined

    handleRegisterSubmit(formData, schoolId, termsAgreement)
  }

  const hasLoadedTerms = termsIdsQuery.isSuccess && Boolean(termsIdsQuery.data)
  const requiredTerms = useMemo(() => {
    if (!hasLoadedTerms) {
      return []
    }

    const termsData = termsIdsQuery.data

    return (Object.entries(termsData) as Array<[TermsAgreementKey, TermsResponseDTO]>)
      .filter(([, content]) => Boolean(content.isMandatory))
      .map(([termKey]) => termKey)
  }, [hasLoadedTerms, termsIdsQuery.data])
  const areTermsAgreed =
    requiredTerms.length === 0 || requiredTerms.every((termKey) => termsAgreement[termKey])

  const emailButtonLabel = emailRequestState.isSent ? '발송 완료' : '메일 인증'
  const verificationButtonLabel = verificationState.isVerified ? '인증 완료' : '번호 확인'
  const canSubmit = isValid && verificationState.isVerified && !isRegistering && areTermsAgreed

  const registerFieldsConfig = {
    register,
    errors,
    formFieldValues,
    selectedSchool,
    onSchoolSelect: handleSchoolSelect,
    emailButton: {
      label: emailButtonLabel,
      onClick: handleTriggerSendEmail,
      isLoading: isSendingEmail,
      completed: emailRequestState.isSent,
    },
    verificationButton: {
      label: verificationButtonLabel,
      onClick: handleTriggerVerifyCode,
      isLoading: isVerifyingCode,
      completed: verificationState.isVerified,
    },
    termsAgreement,
    toggleTermAgreement,
    toggleAllTermsAgreement,
    termsData: termsIdsQuery.data,
    isTermsLoading: termsIdsQuery.isLoading,
    termsError: termsIdsQuery.error?.message,
  }

  const closeEmailVerificationModal = () => {
    setIsEmailVerificationModalOpen(false)
  }

  return (
    <AuthSection size="lg">
      <ResponsiveLogo />
      <form onSubmit={handleSubmit(handleFormSubmit)} css={{ width: '100%' }}>
        <RegisterFormFields {...registerFieldsConfig} />
        {registrationError && (
          <ErrorMessage
            errorMessage={registrationError}
            typo="B4.Md"
            responsiveTypo={{ tablet: 'B4.Md' }}
          />
        )}
        <Button
          className="submit-button"
          type="submit"
          label="회원가입"
          tone="lime"
          typo="B3.Sb"
          variant="solid"
          disabled={!canSubmit}
          isLoading={isRegistering}
          css={{ marginTop: '32px' }}
        />
      </form>

      {isEmailVerificationModalOpen && (
        <EmailSendModal onClose={closeEmailVerificationModal} onClick={handleTriggerSendEmail} />
      )}
    </AuthSection>
  )
}

const ResponsiveLogo = styled(Logo)`
  width: 264px;
  height: auto;
  ${media.down(theme.breakPoints.mobile)} {
    width: 200px;
  }
`
