import * as S from '@/features/apply/components/ApplyPage.style'
import type { PartSmallType } from '@/features/auth/domain/model'
import { Badge } from '@/shared/ui/common/Badge'
import { Button } from '@/shared/ui/common/Button'

interface PartInfoCardProps {
  partName: PartSmallType
  recruitmentState: string
  requiredAbilities: ReadonlyArray<string>
}

const PartInfoCard = ({ partName, recruitmentState, requiredAbilities }: PartInfoCardProps) => {
  const isRecruiting = recruitmentState === '모집 중'
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
