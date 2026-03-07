import { PART_TYPE_TO_SMALL_PART } from '@/shared/constants/part'
import type { PartType } from '@/shared/types/part'
import type { EvaluationProgressStatusType } from '@/shared/types/umc'
import { Badge } from '@/shared/ui/common/Badge'
import { Button } from '@/shared/ui/common/Button'

import * as S from './EvaluationCard.style'

const INTERVIEW_EVALUATION_STATUS_CONFIG: Record<
  EvaluationProgressStatusType,
  { label: string; color: 'gray' | 'lime' }
> = {
  WAITING: { label: '미정', color: 'gray' },
  IN_PROGRESS: { label: '평가 중', color: 'lime' },
  COMPLETED: { label: '평가 완료', color: 'lime' },
}

const EvaluationCard = ({
  handleStartEval,
  time,
  name,
  nickname,
  score,
  tags,
  status,
}: {
  handleStartEval: () => void
  time: string
  name: string
  nickname: string
  score: number
  tags: Array<PartType>
  status: EvaluationProgressStatusType
}) => {
  return (
    <S.ContentBox>
      <S.Header>
        <S.TimeBadge>{time}</S.TimeBadge>
        <Badge
          tone={INTERVIEW_EVALUATION_STATUS_CONFIG[status].color}
          typo="B5.Md"
          variant="outline"
        >
          {INTERVIEW_EVALUATION_STATUS_CONFIG[status].label}
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
          tone="lime"
          variant="solid"
          label="평가하기"
          onClick={handleStartEval}
          typo="B4.Sb"
          css={{ width: 'fit-content', padding: '6px 18px' }}
        />
      </S.Footer>
    </S.ContentBox>
  )
}

export default EvaluationCard
