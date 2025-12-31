import { Term } from './Term'
import type { TermKey } from '@/hooks/useRegisterForm'
import Flex from '@/components/common/Flex/Flex'
import ErrorMessage from '@/components/auth/ErrorMessage/ErrorMessage'
import useModalStore from '@/store/useModalStore'
import { MODAL_TYPES } from '@/components/common/Modal/ModalProvider'

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

export function TermsSection({
  terms,
  onToggleAll,
  onToggle,
  errors,
}: TermsSectionProps) {
  const hasError =
    !!errors?.serviceTerm || !!errors?.privacyTerm || !!errors?.marketingTerm
  const { openModal } = useModalStore()
  return (
    <Flex direction="column" alignItems="flex-start" gap="12px">
      <Term
        toggleCheck={onToggleAll}
        title="전체 동의"
        value={terms.service && terms.privacy && terms.marketing}
      ></Term>
      <Term
        toggleCheck={() => onToggle('service')}
        onClick={() => openModal(MODAL_TYPES.ServiceTerm)}
        termTitle="서비스이용약관"
        title="동의"
        necessary={true}
        value={terms.service}
      ></Term>
      <Term
        toggleCheck={() => onToggle('privacy')}
        onClick={() => openModal(MODAL_TYPES.PrivacyTerm)}
        termTitle="개인정보처리방침"
        title="동의"
        necessary={true}
        value={terms.privacy}
      ></Term>
      <Term
        toggleCheck={() => onToggle('marketing')}
        onClick={() => openModal(MODAL_TYPES.MarketingTerm)}
        termTitle="마케팅정보수신"
        title="동의"
        necessary={false}
        value={terms.marketing}
      ></Term>
      {hasError && (
        <ErrorMessage errorMessage="모든 필수 항목에 동의하지 않을 경우 회원가입이 불가능합니다."></ErrorMessage>
      )}
    </Flex>
  )
}
