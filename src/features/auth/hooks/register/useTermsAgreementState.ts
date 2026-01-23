// 약관 동의 상태를 관리하는 훅
import { useState } from 'react'
import type { UseFormSetValue } from 'react-hook-form'

import type { TermsType } from '@/shared/types/umc'

import type { RegisterForm } from '../../schemas/register'

export type TermsAgreementKey = TermsType

type TermsAgreementState = Record<TermsAgreementKey, boolean>

const INITIAL_TERMS_STATE: TermsAgreementState = {
  SERVICE: false,
  PRIVACY: false,
  MARKETING: false,
}

const TERM_TO_FORM_FIELD_MAP: Record<TermsAgreementKey, keyof RegisterForm> = {
  SERVICE: 'serviceTerm',
  PRIVACY: 'privacyTerm',
  MARKETING: 'marketingTerm',
}

const ALL_TERM_KEYS: Array<TermsAgreementKey> = ['SERVICE', 'PRIVACY', 'MARKETING']
/**
 * 약관 동의 상태를 관리하는 훅
 */
export function useTermsAgreement(setValue: UseFormSetValue<RegisterForm>) {
  const [termsAgreement, setTermsAgreement] = useState<TermsAgreementState>(INITIAL_TERMS_STATE)

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
      termsAgreement.SERVICE && termsAgreement.PRIVACY && termsAgreement.MARKETING

    const nextAgreementValue = !areAllTermsAgreed

    ALL_TERM_KEYS.forEach((termKey) => {
      updateTermAgreement(termKey, nextAgreementValue)
    })
  }

  return {
    termsAgreement,
    toggleTermAgreement,
    toggleAllTermsAgreement,
  }
}
