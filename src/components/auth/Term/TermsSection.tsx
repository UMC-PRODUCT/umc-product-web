import { useState } from 'react'

import ErrorMessage from '@/components/auth/ErrorMessage/ErrorMessage'
import Flex from '@/components/common/Flex/Flex'
import MarketingTerm from '@/components/Modal/TermModal/MarketingTerm/MarketingTerm'
import PrivacyTerm from '@/components/Modal/TermModal/PrivacyTerm/PrivacyTerm'
import ServiceTerm from '@/components/Modal/TermModal/ServiceTerm/ServiceTerm'
import type { TermKey } from '@/hooks/useRegisterForm'

import { Term } from './Term'

type TermsState = Record<TermKey, boolean>

type TermErrors = Partial<
  Record<'serviceTerm' | 'privacyTerm' | 'marketingTerm', string | undefined>
>

type TermsSectionProps = {
  terms: TermsState
  onToggleAll: () => void
  onToggle: (key: TermKey) => void
  errors?: TermErrors
}

type ModalType = 'service' | 'privacy' | 'marketing' | null

export function TermsSection({ terms, onToggleAll, onToggle, errors }: TermsSectionProps) {
  const hasError = !!errors?.serviceTerm || !!errors?.privacyTerm || !!errors?.marketingTerm
  const [openModal, setOpenModal] = useState<ModalType>(null)

  const closeModal = () => setOpenModal(null)

  return (
    <>
      <Flex flexDirection="column" alignItems="flex-start" gap="12px" width="100%" maxWidth="80vw">
        <Term
          onChange={onToggleAll}
          label="전체 동의"
          checked={terms.service && terms.privacy && terms.marketing}
        />
        <Term
          onChange={() => onToggle('service')}
          onClick={() => setOpenModal('service')}
          termTitle="서비스이용약관"
          label="동의"
          necessary={true}
          checked={terms.service}
        />
        <Term
          onChange={() => onToggle('privacy')}
          onClick={() => setOpenModal('privacy')}
          termTitle="개인정보처리방침"
          label="동의"
          necessary={true}
          checked={terms.privacy}
        />
        <Term
          onChange={() => onToggle('marketing')}
          onClick={() => setOpenModal('marketing')}
          termTitle="마케팅정보수신"
          label="동의"
          necessary={false}
          checked={terms.marketing}
        />
        {hasError && (
          <ErrorMessage errorMessage="모든 필수 항목에 동의하지 않을 경우 회원가입이 불가능합니다." />
        )}
      </Flex>

      {openModal === 'service' && <ServiceTerm onClose={closeModal} />}
      {openModal === 'privacy' && <PrivacyTerm onClose={closeModal} />}
      {openModal === 'marketing' && <MarketingTerm onClose={closeModal} />}
    </>
  )
}
