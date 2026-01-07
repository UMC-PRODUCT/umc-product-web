import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import type { Part } from '@/shared/types/umc/part'
import { Badge } from '@/shared/ui/common/Badge'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'

import { spanStyle } from './ApplyStatement.style'

interface ApplyStatementProps {
  parts: Array<Part | '미정'>
  document: '미정' | '평가 중' | '서류 합격' | '불합격'
  final: '미정' | '예정' | '평가 중' | '최종 합격' | '불합격'
}

export default function ApplyStatement({ parts, document, final }: ApplyStatementProps) {
  const documentColor =
    document === '미정'
      ? 'gray'
      : document === '평가 중'
        ? 'white'
        : document === '서류 합격'
          ? 'lime'
          : 'necessary'

  const finalColor =
    final === '미정' || final === '예정'
      ? 'gray'
      : final === '평가 중'
        ? 'white'
        : final === '최종 합격'
          ? 'lime'
          : 'necessary'
  return (
    <Section
      variant="solid"
      padding={'20px 16px'}
      gap={28}
      css={{ [media.down(theme.breakPoints.tablet)]: { flexDirection: 'row' } }}
    >
      <Flex flexDirection="column" alignItems="flex-start" gap={8}>
        <span css={spanStyle}>지원 파트</span>
        <Flex
          gap={10}
          alignItems="flex-start"
          css={{
            [media.down(theme.breakPoints.tablet)]: {
              flexDirection: 'column',
            },
          }}
        >
          {parts.map((part, index) => (
            <Button
              key={index}
              variant="solid"
              tone={part == '미정' ? 'gray' : 'lime'}
              label={part}
              onClick={() => {}}
              typo="B5.Md"
              css={{ width: 'fit-content', height: '24px' }}
            />
          ))}
        </Flex>
      </Flex>
      <Flex flexDirection="row" gap={26}>
        <Flex flexDirection="column" alignItems="flex-start" gap={8}>
          <span css={spanStyle}>서류 평가</span>
          <Badge tone={documentColor} variant="outline" typo="B5.Md">
            {document}
          </Badge>
        </Flex>
        <Flex flexDirection="column" alignItems="flex-start" gap={8}>
          <span css={spanStyle}>최종 평가</span>
          <Badge tone={finalColor} variant="outline" typo="B5.Md">
            {final}
          </Badge>
        </Flex>
      </Flex>
    </Section>
  )
}
