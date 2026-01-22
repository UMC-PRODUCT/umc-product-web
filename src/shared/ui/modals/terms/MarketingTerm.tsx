import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

import type { TermsResponseDTO } from '@/features/auth/domain/api'
import { getTermsId } from '@/features/auth/domain/api'
import { useCustomQuery } from '@/shared/hooks/customQuery'
import { theme } from '@/shared/styles/theme'
import TermModalLayout from '@/shared/ui/modals/TermModalLayout/TermModalLayout'

type TermModalProps = {
  onClose: () => void
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Spinner = styled.span`
  width: 36px;
  height: 36px;
  border: 3px solid rgba(255, 255, 255, 0.25);
  border-top-color: ${theme.colors.lime};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`

const SpinnerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding-top: 40px;
`

const ErrorText = styled.p`
  margin: 0;
  color: ${theme.colors.red[400]};
  ${theme.typography.B4.Rg}
`

const fetchMarketingTerm = () => getTermsId({ termsType: 'MARKETING' })

const MarketingTerm = ({ onClose }: TermModalProps) => {
  const { data, isLoading, error } = useCustomQuery<TermsResponseDTO, Error>(
    ['term-detail', 'marketing'],
    fetchMarketingTerm,
    { retry: false },
  )

  let loadingFallback: JSX.Element | null = null
  if (isLoading) {
    loadingFallback = (
      <SpinnerWrapper>
        <Spinner />
        <span css={{ color: theme.colors.gray[300], ...theme.typography.B4.Rg }}>
          약관을 불러오는 중입니다...
        </span>
      </SpinnerWrapper>
    )
  } else if (error) {
    loadingFallback = (
      <SpinnerWrapper>
        <ErrorText>{error.message || '약관을 가져오지 못했습니다.'}</ErrorText>
      </SpinnerWrapper>
    )
  }

  return (
    <TermModalLayout
      title={data?.title ?? '마케팅 이용약관'}
      content={data?.content}
      onClose={onClose}
    >
      {loadingFallback}
    </TermModalLayout>
  )
}

export default MarketingTerm
