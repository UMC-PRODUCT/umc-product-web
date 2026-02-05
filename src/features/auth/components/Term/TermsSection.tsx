import { useMemo, useState } from 'react'

import { theme } from '@/shared/styles/theme'
import ErrorMessage from '@/shared/ui/common/ErrorMessage/ErrorMessage'
import Flex from '@/shared/ui/common/Flex/Flex'
import Loading from '@/shared/ui/common/Loading/Loading'
import TermModalLayout from '@/shared/ui/modals/TermModalLayout/TermModalLayout'

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

type ModalType = TermsAgreementKey | null

const TERM_DEFINITIONS: Record<TermsAgreementKey, { defaultTitle: string; necessary: boolean }> = {
  SERVICE: { defaultTitle: '서비스이용약관', necessary: true },
  PRIVACY: { defaultTitle: '개인정보처리방침', necessary: true },
  MARKETING: { defaultTitle: '마케팅정보수신', necessary: false },
}

const MODAL_LOADING_MESSAGE = '약관 내용을 불러오는 중입니다...'
const MODAL_ERROR_MESSAGE = '약관 내용을 불러오지 못했습니다.'

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
    <Loading label={MODAL_LOADING_MESSAGE} labelColor={theme.colors.gray[400]} />
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
