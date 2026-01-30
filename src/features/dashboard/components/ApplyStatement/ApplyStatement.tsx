import type { DocumentStatusType, FinalStatusType } from '@/features/apply/domain'
import { DOCUMENT_STATUS_CONFIG, FINAL_STATUS_CONFIG } from '@/features/apply/domain'
import type { PartType } from '@/features/auth/domain'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import { Badge } from '@/shared/ui/common/Badge'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'
import { mappingRecruitingColor } from '@/shared/utils/mappingColor'

import { spanStyle } from './ApplyStatement.style'

interface ApplyStatementProps {
  current:
    | {
        appliedParts: Array<PartType | '미정'>
        documentEvaluation: { status: DocumentStatusType }
        finalEvaluation: { status: FinalStatusType }
      }
    | null
    | undefined
}

const ApplyStatement = ({ current }: ApplyStatementProps) => {
  const appliedParts = current?.appliedParts ?? []
  const hasAppliedParts = appliedParts.length > 0
  const documentEvaluationStatus: DocumentStatusType | undefined =
    current?.documentEvaluation.status
  const finalEvaluationStatus: FinalStatusType | undefined = current?.finalEvaluation.status

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
          {appliedParts.map((part, index) => (
            <Button
              key={index}
              variant="solid"
              tone={part === '미정' ? 'gray' : 'lime'}
              label={part}
              onClick={() => {}}
              typo="B5.Md"
              css={{ width: 'fit-content', height: '24px' }}
            />
          ))}
          {!hasAppliedParts && (
            <Button
              key={0}
              variant="solid"
              tone="gray"
              label="미정"
              onClick={() => {}}
              typo="B5.Md"
              css={{ width: 'fit-content', height: '24px' }}
            />
          )}
        </Flex>
      </Flex>
      <Flex flexDirection="row" gap={26}>
        <Flex flexDirection="column" alignItems="flex-start" gap={8}>
          <span css={spanStyle}>서류 평가</span>
          <Badge
            tone={mappingRecruitingColor(documentEvaluationStatus)}
            variant="outline"
            typo="B5.Md"
          >
            {documentEvaluationStatus
              ? DOCUMENT_STATUS_CONFIG[documentEvaluationStatus].label
              : '미정'}
          </Badge>
        </Flex>
        <Flex flexDirection="column" alignItems="flex-start" gap={8}>
          <span css={spanStyle}>최종 평가</span>
          <Badge
            tone={mappingRecruitingColor(finalEvaluationStatus)}
            variant="outline"
            typo="B5.Md"
          >
            {finalEvaluationStatus ? FINAL_STATUS_CONFIG[finalEvaluationStatus].label : '미정'}
          </Badge>
        </Flex>
      </Flex>
    </Section>
  )
}

export default ApplyStatement
