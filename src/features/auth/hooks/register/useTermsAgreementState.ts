// 약관 동의 상태를 관리하는 훅
import { useState } from 'react'
import type { UseFormSetValue } from 'react-hook-form'

import type { RegisterForm } from '../../schemas/register'

export type TermsAgreementKey = 'service' | 'privacy' | 'marketing'

type TermsAgreementState = Record<TermsAgreementKey, boolean>

const INITIAL_TERMS_STATE: TermsAgreementState = {
  service: false,
  privacy: false,
  marketing: false,
}

const TERM_TO_FORM_FIELD_MAP: Record<TermsAgreementKey, keyof RegisterForm> = {
  service: 'serviceTerm',
  privacy: 'privacyTerm',
  marketing: 'marketingTerm',
}

const ALL_TERM_KEYS: Array<TermsAgreementKey> = ['service', 'privacy', 'marketing']

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
      termsAgreement.service && termsAgreement.privacy && termsAgreement.marketing

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
