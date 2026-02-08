import { useCallback, useEffect, useMemo, useState } from 'react'
import type { UseFormClearErrors, UseFormSetError, UseFormSetValue } from 'react-hook-form'
import { useNavigate } from '@tanstack/react-router'
import { isAxiosError } from 'axios'

import type { CommonResponseDTO } from '@/shared/types/api'

import type { GetTermsResponseDTO } from '../domain/types'
import type { RegisterForm } from '../schemas/register'
import type { TermsAgreementKey } from './register/useTermsAgreement'
import { useAuthMutation } from './useAuthMutations'

type TermsAgreementState = Record<TermsAgreementKey, boolean>

type TermsContentRecord = Record<TermsAgreementKey, CommonResponseDTO<GetTermsResponseDTO>>

interface RegistrationWorkflowProps {
  watchedEmail: string
  setValue: UseFormSetValue<RegisterForm>
  setError: UseFormSetError<RegisterForm>
  clearErrors: UseFormClearErrors<RegisterForm>
  onEmailSent: () => void
  terms?: TermsContentRecord
}

export const useRegistrationWorkflow = ({
  watchedEmail,
  setValue,
  setError,
  clearErrors,
  onEmailSent,
  terms,
}: RegistrationWorkflowProps) => {
  const { useSendEmail, useVerifyCode, useRegister } = useAuthMutation()
  const { mutate: sendEmailMutate } = useSendEmail()
  const { mutate: verifyCodeMutate } = useVerifyCode()
  const { mutate: registerMutate } = useRegister()

  const [emailVerificationId, setEmailVerificationId] = useState<string | null>(null)
  const [hasEmailBeenSent, setHasEmailBeenSent] = useState(false)
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [isVerifyingCode, setIsVerifyingCode] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)
  const [registrationError, setRegistrationError] = useState<string | null>(null)

  const getApiErrorMessage = useCallback((error: unknown, fallback: string) => {
    if (isAxiosError(error)) {
      const message = error.response?.data?.message
      if (typeof message === 'string') {
        return message
      }
    }

    if (error instanceof Error && error.message) {
      return error.message
    }

    return fallback
  }, [])

  useEffect(() => {
    setEmailVerificationId(null)
    setHasEmailBeenSent(false)
    setIsEmailVerified(false)
  }, [watchedEmail])

  const handleSendVerificationEmail = useCallback(
    (email?: string) => {
      if (!email) return

      clearErrors('email')
      setIsSendingEmail(true)
      sendEmailMutate(
        { email },
        {
          onSuccess: (response) => {
            if (response.emailVerificationId) {
              setEmailVerificationId(response.emailVerificationId)
            }
            setHasEmailBeenSent(true)
            onEmailSent()
          },
          onError: (error) => {
            setError('email', {
              type: 'server',
              message: getApiErrorMessage(error, '이메일 인증 요청에 실패했습니다.'),
            })
          },
          onSettled: () => {
            setIsSendingEmail(false)
          },
        },
      )
    },
    [clearErrors, getApiErrorMessage, onEmailSent, sendEmailMutate, setError],
  )

  const handleVerifyCode = useCallback(
    (code?: string) => {
      if (!emailVerificationId || !code) return

      clearErrors('emailVerificationCode')
      setIsVerifyingCode(true)
      verifyCodeMutate(
        {
          emailVerificationId,
          verificationCode: code,
        },
        {
          onSuccess: (response) => {
            clearErrors('emailVerificationCode')
            if (response.emailVerificationToken) {
              setValue('emailVerificationToken', response.emailVerificationToken)
            }
            setIsEmailVerified(true)
          },
          onError: (error) => {
            setError('emailVerificationCode', {
              type: 'server',
              message: getApiErrorMessage(error, '인증번호 확인에 실패했습니다.'),
            })
          },
          onSettled: () => {
            setIsVerifyingCode(false)
          },
        },
      )
    },
    [clearErrors, emailVerificationId, getApiErrorMessage, setError, setValue, verifyCodeMutate],
  )
  const navigate = useNavigate()
  const handleRegisterSubmit = useCallback(
    (formData: RegisterForm, schoolId: number | undefined, termsAgreement: TermsAgreementState) => {
      setRegistrationError(null)

      const mappedTermsAgreements =
        terms && Object.keys(terms).length > 0
          ? (
              Object.entries(terms) as Array<
                [TermsAgreementKey, CommonResponseDTO<GetTermsResponseDTO>]
              >
            )
              .map(([termKey, termContent]) => {
                const rawId = termContent.result.id
                const termsId = typeof rawId === 'number' ? rawId : Number(rawId)
                if (!Number.isFinite(termsId)) return null
                return {
                  termsId,
                  isAgreed: Boolean(termsAgreement[termKey]),
                }
              })
              .filter((term): term is { termsId: number; isAgreed: boolean } => term !== null)
          : undefined

      setIsRegistering(true)
      registerMutate(
        {
          name: formData.name,
          nickname: formData.nickname,
          emailVerificationToken: formData.emailVerificationToken,
          oAuthVerificationToken: formData.oAuthVerificationToken || undefined,
          schoolId,
          ...(mappedTermsAgreements && mappedTermsAgreements.length
            ? { termsAgreements: mappedTermsAgreements }
            : {}),
        },
        {
          onSuccess: () => {
            setRegistrationError(null)

            navigate({
              to: '/auth/login',
            })
          },
          onError: (error) => {
            setRegistrationError(getApiErrorMessage(error, '회원가입에 실패했습니다.'))
          },
          onSettled: () => {
            setIsRegistering(false)
          },
        },
      )
    },
    [getApiErrorMessage, registerMutate, terms],
  )

  const emailRequestState = useMemo(
    () => ({
      isSent: hasEmailBeenSent,
    }),
    [hasEmailBeenSent],
  )

  const verificationState = useMemo(
    () => ({
      isVerified: isEmailVerified,
    }),
    [isEmailVerified],
  )

  return {
    handleSendVerificationEmail,
    handleVerifyCode,
    handleRegisterSubmit,
    isSendingEmail,
    isVerifyingCode,
    isRegistering,
    registrationError,
    emailRequestState,
    verificationState,
  }
}
