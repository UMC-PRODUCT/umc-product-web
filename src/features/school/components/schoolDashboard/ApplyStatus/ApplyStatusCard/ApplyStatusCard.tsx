import CardTitle from '@/features/school/common/CardTitle'
import { theme } from '@/shared/styles/theme'
import type { PartType } from '@/shared/types/umc'
import Section from '@/shared/ui/common/Section/Section'

import * as S from './ApplyStatusCard.style'

const ApplyStatusCard = ({
  part,
  applyNum,
}: {
  part: PartType | '총 지원자'
  applyNum: number
}) => {
  const isPart = part !== '총 지원자'
  return (
    <Section
      variant={isPart ? 'both' : 'outline'}
      gap={5}
      alignItems="flex-start"
      padding={'18px 20px'}
      width={'100%'}
      css={{
        '&:hover': {
          borderColor: theme.colors.lime,
          boxShadow: `0 0 0 2px ${theme.colors.lime}`,
        },
      }}
    >
      <CardTitle title={part} />
      <S.ApplyNum color={isPart ? 'lime' : 'white'}>
        <div>{applyNum}</div>
        <span>명</span>
      </S.ApplyNum>
    </Section>
  )
}
export default ApplyStatusCard
