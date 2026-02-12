import { useMemo } from 'react'

import ErrorMessage from '@/shared/ui/common/ErrorMessage/ErrorMessage'
import Flex from '@/shared/ui/common/Flex/Flex'

import type { GetTermsResponseDTO } from '../../domain/types'
import type { TermsAgreementKey } from '../../hooks/register'
import { Term } from './Term'

type TermsState = Record<TermsAgreementKey, boolean>

type TermErrors = Partial<
  Record<'serviceTerm' | 'privacyTerm' | 'marketingTerm', string | undefined>
>

type TermsSectionProps = {
  terms: TermsState
  onToggleAll: () => void
  onToggle: (key: TermsAgreementKey) => void
  errors?: TermErrors
  termsData?: Record<TermsAgreementKey, GetTermsResponseDTO>
  isTermsLoading?: boolean
  termsError?: string
}

const TERM_DEFINITIONS: Record<TermsAgreementKey, { defaultTitle: string; necessary: boolean }> = {
  SERVICE: { defaultTitle: '서비스이용약관', necessary: true },
  PRIVACY: { defaultTitle: '개인정보처리방침', necessary: true },
  MARKETING: { defaultTitle: '마케팅정보수신', necessary: false },
}

export const TermsSection = ({
  terms,
  onToggleAll,
  onToggle,
  errors,
  termsData,
  termsError,
}: TermsSectionProps) => {
  const hasError = !!errors?.serviceTerm || !!errors?.privacyTerm || !!errors?.marketingTerm
  const isDisabled = !!termsError

  const availableTerms = useMemo(() => {
    return (Object.keys(TERM_DEFINITIONS) as Array<TermsAgreementKey>).map((termKey) => {
      const payload = termsData?.[termKey]
      const definition = TERM_DEFINITIONS[termKey]
      return {
        key: termKey,
        title: payload?.title ?? definition.defaultTitle,
        necessary: payload?.isMandatory ?? definition.necessary,
        link: payload?.content,
      }
    })
  }, [termsData])

  const areAllChecked = availableTerms.every(({ key }) => terms[key])

  return (
    <>
      <Flex flexDirection="column" alignItems="flex-start" gap="12px" width="100%" maxWidth="80vw">
        <Term
          onChange={onToggleAll}
          label="전체 동의"
          checked={areAllChecked}
          disabled={isDisabled}
        />
        {availableTerms.map(({ key, title, necessary, link }) => (
          <Term
            key={key}
            onChange={() => onToggle(key)}
            onClick={() => {
              if (!link) return
              window.open(link, '_blank', 'noopener,noreferrer')
            }}
            termTitle={title}
            label="동의"
            necessary={necessary}
            checked={terms[key]}
            disabled={isDisabled}
          />
        ))}
        {hasError && (
          <ErrorMessage errorMessage="모든 필수 항목에 동의하지 않을 경우 회원가입이 불가능합니다." />
        )}
        {termsError && <ErrorMessage errorMessage={termsError} />}
      </Flex>
    </>
  )
}
