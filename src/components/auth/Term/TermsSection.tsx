import { Term } from './Term'
import type { TermKey } from '@/hooks/useRegisterForm'
import Flex from '@/components/common/Flex/Flex'
import ErrorMessage from '@/components/auth/ErrorMessage/ErrorMessage'

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

  return (
    <Flex direction="column" alignItems="flex-start" gap="12px">
      <Term
        onClick={onToggleAll}
        title="전체 동의"
        value={terms.service && terms.privacy && terms.marketing}
      ></Term>
      <Term
        onClick={() => onToggle('service')}
        termTitle="서비스이용약관"
        title="동의"
        necessary={true}
        value={terms.service}
      ></Term>
      <Term
        onClick={() => onToggle('privacy')}
        termTitle="개인정보처리방침"
        title="동의"
        necessary={true}
        value={terms.privacy}
      ></Term>
      <Term
        onClick={() => onToggle('marketing')}
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
