import { theme } from '@/shared/styles/theme'
import { Badge } from '@/shared/ui/common/Badge'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'

import * as S from './PreviewSection.style'

const PreviewSection = ({
  title,
  step,
  setStep,
  children,
  showEdit = true,
}: {
  title: string
  step: number
  setStep: (step: number) => void
  children: React.ReactNode
  showEdit?: boolean
}) => {
  return (
    <Section
      gap={17}
      variant="both"
      padding={'14px 20px'}
      css={{ backgroundColor: theme.colors.gray[700] }}
    >
      <Flex justifyContent="space-between">
        <S.Title>{title}</S.Title>
        {showEdit ? (
          <Badge tone="lime" variant="outline" typo="B4.Md" onClick={() => setStep(step)}>
            수정
          </Badge>
        ) : null}
      </Flex>
      {children}
    </Section>
  )
}

export default PreviewSection
