import * as S from '@/features/apply/components/ApplyPage.style'
import { Badge } from '@/shared/ui/common/Badge'
import { Button } from '@/shared/ui/common/Button'

interface PartInfoCardProps {
  partName: string
  recruitmentState: string
  requiredAbilities: Array<string>
}

const RECRUITMENT_STATE = {
  OPEN: '모집 중',
} as const

const PartInfoCard = ({ partName, recruitmentState, requiredAbilities }: PartInfoCardProps) => {
  const isRecruiting = recruitmentState === RECRUITMENT_STATE.OPEN
  const buttonTone = isRecruiting ? 'lime' : 'darkGray'

  return (
    <S.PartInfoCardContainer>
      <S.PartInfoContent width="fit-content">
        <S.PartButtonWrapper>
          <Button label={recruitmentState} tone={buttonTone} />
        </S.PartButtonWrapper>
        {partName}
      </S.PartInfoContent>

      <S.BadgeGroup>
        {requiredAbilities.map((ability) => (
          <Badge tone="lime" variant="outline" typo="B4.Md" key={ability}>
            {ability}
          </Badge>
        ))}
      </S.BadgeGroup>
    </S.PartInfoCardContainer>
  )
}

export default PartInfoCard
