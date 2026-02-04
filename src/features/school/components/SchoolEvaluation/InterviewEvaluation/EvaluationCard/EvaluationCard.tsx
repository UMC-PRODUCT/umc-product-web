import type { FinalStatusType } from '@/features/apply/domain'
import type { PartType } from '@/features/auth/domain'
import { PART_TYPE_TO_SMALL_PART } from '@/shared/constants/part'
import { Badge } from '@/shared/ui/common/Badge'
import { Button } from '@/shared/ui/common/Button'

import { FINAL_STATUS_CONFIG } from '../../../../../apply/domain/constants'
import * as S from './EvaluationCard.style'

const EvaluationCard = ({
  handleStartEval,
  time,
  name,
  nickname,
  score,
  tags,
  status,
}: {
  handleStartEval: (user: { name: string }) => void
  time: string
  name: string
  nickname: string
  score: number
  tags: Array<PartType>
  status: FinalStatusType
}) => {
  return (
    <S.ContentBox>
      <S.Header>
        <S.TimeBadge>{time}</S.TimeBadge>
        <Badge tone="lime" typo="B5.Md" variant="outline">
          {FINAL_STATUS_CONFIG[status].label}
        </Badge>
      </S.Header>
      <S.Content>
        <S.Name>{`${nickname}/${name}`}</S.Name>
        <S.Score>서류 {score}점</S.Score>
      </S.Content>
      <S.Footer>
        <S.TagGroup>
          {tags.map((tag) => (
            <S.PartBadge
              tone={'gray'}
              variant="outline"
              label={PART_TYPE_TO_SMALL_PART[tag]}
              key={tag}
              onClick={() => {}}
              typo="B4.Sb"
            />
          ))}
        </S.TagGroup>
        <Button
          tone={'lime'}
          variant="solid"
          label="평가하기"
          onClick={() => handleStartEval({ name: `${nickname}/${name}` })}
          typo="B4.Sb"
          css={{ width: 'fit-content', padding: '6px 18px' }}
        />
      </S.Footer>
    </S.ContentBox>
  )
}

export default EvaluationCard
