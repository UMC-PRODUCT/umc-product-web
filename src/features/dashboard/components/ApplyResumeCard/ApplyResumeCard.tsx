import { useNavigate } from '@tanstack/react-router'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import type { ResumeType } from '@/shared/types/umc'
import { Badge } from '@/shared/ui/common/Badge'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import { transformRecruitingKorean } from '@/shared/utils/transformKorean'

import * as S from './ApplyResumeCard.style'

interface ApplyResumeCardProps {
  title: string
  resumeId: number
  state: ResumeType
}

const ApplyResumeCard = ({ title, resumeId, state }: ApplyResumeCardProps) => {
  const navigate = useNavigate()
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
          tone={state === 'NOW' ? 'lime' : 'gray'}
          label={transformRecruitingKorean(state)}
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
        onClick={() =>
          navigate({
            to: `/dashboard/$resumeId`,
            params: { resumeId: String(resumeId) },
            search: { page: 1 },
          })
        }
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
