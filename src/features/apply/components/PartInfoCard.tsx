import * as S from '@/features/apply/components/shared'
import { Badge } from '@/shared/ui/common/Badge'
import { Button } from '@/shared/ui/common/Button'

export default function PartInfoCard({
  part,
  state,
  ability,
}: {
  part: string
  state: string
  ability: Array<string>
}) {
  return (
    <S.PartInfoCardLayout>
      <S.PartInfo width={'fit-content'}>
        <S.ButtonWrapper>
          <Button label={state} tone={state === '모집 중' ? 'lime' : 'darkGray'} />
        </S.ButtonWrapper>
        {part}
      </S.PartInfo>
      <S.BadgeWrapper>
        {ability.map((skill) => (
          <Badge tone="lime" variant="outline" typo={'B4.Md'} key={skill}>
            {skill}
          </Badge>
        ))}
      </S.BadgeWrapper>
    </S.PartInfoCardLayout>
  )
}
