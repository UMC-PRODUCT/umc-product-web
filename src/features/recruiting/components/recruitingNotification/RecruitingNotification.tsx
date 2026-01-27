import styled from '@emotion/styled'
import { useNavigate } from '@tanstack/react-router'

import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import { theme } from '@/shared/styles/theme'
import type { RecruitingPart } from '@/shared/types/form'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'

import PartBadge from './PartBadge'

const RecruitingNotification = ({
  parts,
  title,
  content,
}: {
  title: string
  parts: Array<RecruitingPart>
  content: string
}) => {
  const navigate = useNavigate()
  return (
    <Flex flexDirection="column" gap="24px">
      <PageTitle title="모집 공지" />
      <Section variant="solid" alignItems="flex-start" gap="24px">
        <PageTitle title={title} />
        <P>{content}</P>
        <Span>모집 파트</Span>
        <Flex
          gap="15px"
          flexWrap="wrap"
          css={{ borderBottom: `1px solid ${theme.colors.gray[700]}`, paddingBottom: '20px' }}
        >
          {parts.map((part) => (
            <PartBadge key={part} partName={part} />
          ))}
        </Flex>
        <div css={{ height: '28px', width: '100px' }}>
          <Button
            tone="lime"
            label="지원하기"
            typo="B3.Sb"
            onClick={() => {
              navigate({ to: '/apply' })
            }}
          />
        </div>
      </Section>
    </Flex>
  )
}
const P = styled.p`
  width: 100%;
  justify-self: flex-start;
  color: ${theme.colors.gray[300]};
  white-space: pre-line;
  border-bottom: 1px solid ${theme.colors.gray[700]};
  border-top: 1px solid ${theme.colors.gray[700]};
  padding: 24px 0;
  margin: 0;
  ${theme.typography.B3.Rg}
`

const Span = styled.span`
  ${theme.typography.B3.Md}
  color: ${theme.colors.white};
`

export default RecruitingNotification
