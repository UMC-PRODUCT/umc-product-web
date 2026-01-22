import { useMemo, useState } from 'react'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

import { theme } from '@shared/styles/theme'
import ErrorMessage from '@shared/ui/common/ErrorMessage/ErrorMessage'
import Flex from '@shared/ui/common/Flex/Flex'
import TermModalLayout from '@shared/ui/modals/TermModalLayout/TermModalLayout'

import type { TermsResponseDTO } from '@/features/auth/domain/api'

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
  termsData?: Record<TermsAgreementKey, TermsResponseDTO>
  isTermsLoading?: boolean
  termsError?: string
}

type ModalType = TermsAgreementKey | null

const TERM_DEFINITIONS: Record<TermsAgreementKey, { defaultTitle: string; necessary: boolean }> = {
  SERVICE: { defaultTitle: '서비스이용약관', necessary: true },
  PRIVACY: { defaultTitle: '개인정보처리방침', necessary: true },
  MARKETING: { defaultTitle: '마케팅정보수신', necessary: false },
}

const MODAL_LOADING_MESSAGE = '약관 내용을 불러오는 중입니다...'
const MODAL_ERROR_MESSAGE = '약관 내용을 불러오지 못했습니다.'

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const SpinnerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  align-self: center;
  justify-self: center;
`

const LoadingSpinner = styled.span`
  width: 36px;
  height: 36px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: ${({ theme: styledTheme }) => styledTheme.colors.lime};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
  display: inline-flex;
`

export const TermsSection = ({
  terms,
  onToggleAll,
  onToggle,
  errors,
  termsData,
  isTermsLoading,
  termsError,
}: TermsSectionProps) => {
  const [openModal, setOpenModal] = useState<ModalType>(null)
  const hasError = !!errors?.serviceTerm || !!errors?.privacyTerm || !!errors?.marketingTerm

  const availableTerms = useMemo(() => {
    return (Object.keys(TERM_DEFINITIONS) as Array<TermsAgreementKey>).map((termKey) => {
      const payload = termsData?.[termKey]
      const definition = TERM_DEFINITIONS[termKey]
      return {
        key: termKey,
        title: payload?.title ?? definition.defaultTitle,
        necessary: payload?.isMandatory ?? definition.necessary,
      }
    })
  }, [termsData])

  const termContent = useMemo(() => {
    if (!openModal || !termsData) return undefined
    return termsData[openModal]
  }, [openModal, termsData])

  const closeModal = () => setOpenModal(null)

  const areAllChecked = availableTerms.every(({ key }) => terms[key])
  const isLoadingTermContent = isTermsLoading && !termContent
  const loadingChildren = !isLoadingTermContent ? (
    <SpinnerWrapper>
      <LoadingSpinner />
      <span css={{ color: theme.colors.gray[400], ...theme.typography.B4.Rg }}>
        {MODAL_LOADING_MESSAGE}
      </span>
    </SpinnerWrapper>
  ) : undefined

  return (
    <>
      <Flex flexDirection="column" alignItems="flex-start" gap="12px" width="100%" maxWidth="80vw">
        <Term onChange={onToggleAll} label="전체 동의" checked={areAllChecked} />
        {availableTerms.map(({ key, title, necessary }) => (
          <Term
            key={key}
            onChange={() => onToggle(key)}
            onClick={() => setOpenModal(key)}
            termTitle={title}
            label="동의"
            necessary={necessary}
            checked={terms[key]}
          />
        ))}
        {hasError && (
          <ErrorMessage errorMessage="모든 필수 항목에 동의하지 않을 경우 회원가입이 불가능합니다." />
        )}
        {termsError && <ErrorMessage errorMessage={termsError} />}
      </Flex>

      {openModal && (
        <TermModalLayout
          title={termContent?.title ?? TERM_DEFINITIONS[openModal].defaultTitle}
          content={isLoadingTermContent ? undefined : (termContent?.content ?? MODAL_ERROR_MESSAGE)}
          onClose={closeModal}
        >
          {loadingChildren}
        </TermModalLayout>
      )}
    </>
  )
}
