import Marketing from '@shared/assets/icons/marketing_icon.svg?react'
import Privacy from '@shared/assets/icons/privacy_icon.svg?react'
import Service from '@shared/assets/icons/service_icon.svg?react'

import { useTerms } from '@/features/auth/hooks/register/useTerms'
import { TabSubtitle, TabTitle } from '@/shared/styles/shared'
import AsyncBoundary from '@/shared/ui/common/AsyncBoundary/AsyncBoundary'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'

import * as S from './Term.style'

const TermContent = () => {
  const { data: serviceData } = useTerms({ termsType: 'SERVICE' })
  const { data: privacyData } = useTerms({ termsType: 'PRIVACY' })
  const { data: marketingData } = useTerms({ termsType: 'MARKETING' })

  return (
    <Flex flexDirection="column" alignItems="flex-start">
      <TabTitle>약관 관리</TabTitle>
      <TabSubtitle>서비스 약관을 수정할 수 있습니다.</TabSubtitle>
      <Flex flexDirection="column" margin={'30px 0 0 0 '} gap={30}>
        <S.TermCard>
          <Flex gap={20}>
            <S.Logo>
              <Service />
            </S.Logo>
            <Flex flexDirection="column" gap={4} alignItems="flex-start">
              <S.TermTitle>{serviceData?.result.title}</S.TermTitle>
            </Flex>
          </Flex>
          <Flex gap={21} width={'fit-content'}>
            <Button
              typo="C3.Md"
              tone="lime"
              label="내용 보기"
              css={{ width: '83px', height: '40px' }}
              onClick={() =>
                window.open(serviceData?.result.content, '_blank', 'noopener,noreferrer')
              }
            />
          </Flex>
        </S.TermCard>
        <S.TermCard>
          <Flex gap={20}>
            <S.Logo>
              <Privacy />
            </S.Logo>
            <Flex flexDirection="column" gap={4} alignItems="flex-start">
              <S.TermTitle>{privacyData?.result.title}</S.TermTitle>
            </Flex>
          </Flex>
          <Flex gap={21} width={'fit-content'}>
            <Button
              typo="C3.Md"
              tone="lime"
              label="내용 보기"
              css={{ width: '83px', height: '40px' }}
              onClick={() =>
                window.open(privacyData?.result.content, '_blank', 'noopener,noreferrer')
              }
            />
          </Flex>
        </S.TermCard>
        <S.TermCard>
          <Flex gap={20}>
            <S.Logo>
              <Marketing />
            </S.Logo>
            <Flex flexDirection="column" gap={4} alignItems="flex-start">
              <S.TermTitle>{marketingData?.result.title}</S.TermTitle>
            </Flex>
          </Flex>
          <Flex gap={21} width={'fit-content'}>
            <Button
              typo="C3.Md"
              tone="lime"
              label="내용 보기"
              css={{ width: '83px', height: '40px' }}
              onClick={() =>
                window.open(marketingData?.result.content, '_blank', 'noopener,noreferrer')
              }
            />
          </Flex>
        </S.TermCard>
      </Flex>
    </Flex>
  )
}

const Term = () => {
  return (
    <AsyncBoundary
      fallback={<SuspenseFallback label="약관 정보를 불러오는 중입니다." />}
      errorFallback={() => <div>약관 정보를 불러오는 중 오류가 발생했습니다.</div>}
    >
      <TermContent />
    </AsyncBoundary>
  )
}
export default Term
