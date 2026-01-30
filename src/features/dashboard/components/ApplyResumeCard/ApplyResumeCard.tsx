import { useNavigate } from '@tanstack/react-router'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import { Badge } from '@/shared/ui/common/Badge'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import { transformUserRecruitmentBadgeToKorean } from '@/shared/utils/transformKorean'

import type { UserApplicationBadgeType } from '../../domain/types'
import * as S from './ApplyResumeCard.style'

interface ApplyResumeCardProps {
  title: string
  resumeId: string
  state: UserApplicationBadgeType
  recruitmentId: string
}

const ApplyResumeCard = ({ title, resumeId, state, recruitmentId }: ApplyResumeCardProps) => {
  const navigate = useNavigate()
  const handleNavigate = () => {
    if (state === 'DRAFT') {
      navigate({
        to: `/apply/$recruitmentId/$resumeId`,
        params: { recruitmentId: String(recruitmentId), resumeId: String(resumeId) },
        search: { page: 1 },
      })
    } else {
      navigate({
        to: `/dashboard/$recruitmentId/$resumeId`,
        params: { resumeId: String(resumeId), recruitmentId: String(recruitmentId) },
        search: { page: 1 },
      })
    }
  }
  return (
    <S.CardWrapper variant="solid" flexDirection="row">
      <Flex
        gap={16}
        css={{
          flex: 1,
          minWidth: 0,
        }}
      >
        <Button
          className="status"
          variant="solid"
          tone={state === 'SUBMITTED' ? 'lime' : 'gray'}
          label={transformUserRecruitmentBadgeToKorean(state)}
          onClick={() => {}}
          css={{
            ...theme.typography.B4.Sb,
            cursor: 'default',
            [media.down(theme.breakPoints.tablet)]: { ...theme.typography.B5.Sb },
          }}
        />
        <span className="title">{title}</span>
      </Flex>
      <Badge
        tone="lime"
        typo="B4.Md"
        variant={'solid'}
        onClick={handleNavigate}
        css={{
          cursor: 'pointer',
          '.badge-text-short': { display: 'none' },
          [media.down(theme.breakPoints.tablet)]: {
            ...theme.typography.B5.Sb,
            '.badge-text-full': { display: 'none' },
            '.badge-text-short': { display: 'inline' },
          },
        }}
      >
        <span className="badge-text-full">지원서 조회하기</span>
        <span className="badge-text-short">조회하기</span>
      </Badge>
    </S.CardWrapper>
  )
}

export default ApplyResumeCard
