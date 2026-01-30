import { useCallback, useEffect, useMemo, useState } from 'react'
import styled from '@emotion/styled'
import { useNavigate } from '@tanstack/react-router'

import Logo from '@shared/assets/brand_logo.svg?react'
import { media } from '@shared/styles/media'
import { theme } from '@shared/styles/theme'
import { Button } from '@shared/ui/common/Button/Button'
import ErrorMessage from '@shared/ui/common/ErrorMessage/ErrorMessage'

import AsyncBoundary from '@/shared/components/AsyncBoundary/AsyncBoundary'
import { useLocalStorage } from '@/shared/hooks/useLocalStorage'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'

import AuthSection from '../components/AuthSection/AuthSection'
import EmailSendModal from '../components/modals/EmailSendModal/EmailSendModal'
import { useSchoolSelection, useTermsAgreement } from '../hooks/register'
import { useTerms } from '../hooks/register/useTermsIdsQuery'
import { useRegisterForm } from '../hooks/useRegisterForm'
import { useRegistrationWorkflow } from '../hooks/useRegistrationWorkflow'
import type { RegisterForm } from '../schemas/register'
import { RegisterFormFields } from './RegisterFormFields'

type RegisterPageProps = {
  oAuthVerificationToken?: string
  email?: string
}

const RegisterPageContent = ({ oAuthVerificationToken, email }: RegisterPageProps) => {
  const { getItem: getAccessToken } = useLocalStorage('accessToken')
  const [isEmailVerificationModalOpen, setIsEmailVerificationModalOpen] = useState(false)
  const accessToken = getAccessToken()
  const navigate = useNavigate()
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

  const serviceTerm = useTerms({ termsType: 'SERVICE' })
  const privacyTerm = useTerms({ termsType: 'PRIVACY' })
  const marketingTerm = useTerms({ termsType: 'MARKETING' })

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
    terms: {
      SERVICE: serviceTerm.data,
      PRIVACY: privacyTerm.data,
      MARKETING: marketingTerm.data,
    },
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

  const hasLoadedTerms = serviceTerm.isSuccess && privacyTerm.isSuccess && marketingTerm.isSuccess

  const requiredTerms = useMemo(() => {
    if (!hasLoadedTerms) {
      return []
    }
    const termsEntries = [
      ['MARKETING', marketingTerm.data],
      ['PRIVACY', privacyTerm.data],
      ['SERVICE', serviceTerm.data],
    ] as const
    return termsEntries
      .filter(([, content]) => Boolean(content.result.isMandatory))
      .map(([termKey]) => termKey)
  }, [hasLoadedTerms, serviceTerm.data, privacyTerm.data, marketingTerm.data])

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
    termsData: {
      SERVICE: serviceTerm.data,
      PRIVACY: privacyTerm.data,
      MARKETING: marketingTerm.data,
    },
    isTermsLoading: serviceTerm.isFetching || privacyTerm.isFetching || marketingTerm.isFetching,
    termsError:
      serviceTerm.error?.message || privacyTerm.error?.message || marketingTerm.error?.message,
  }

  const closeEmailVerificationModal = () => {
    setIsEmailVerificationModalOpen(false)
  }

  if (accessToken) {
    navigate({ to: '/', replace: true })
    return null
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

export const RegisterPage = (props: RegisterPageProps) => (
  <AsyncBoundary fallback={<SuspenseFallback label="약관 정보를 불러오는 중입니다." />}>
    <RegisterPageContent {...props} />
  </AsyncBoundary>
)

const ResponsiveLogo = styled(Logo)`
  width: 264px;
  height: auto;
  ${media.down(theme.breakPoints.mobile)} {
    width: 200px;
  }
`
