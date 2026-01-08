import { useNavigate } from '@tanstack/react-router'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import { Badge } from '@/shared/ui/common/Badge'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'

import * as S from './ApplyResumeCard.style'

interface ApplyResumeCardProps {
  title: string
  resumeId: number
  state: '제출 완료' | '지난 모집'
}

export default function ApplyResumeCard({ title, resumeId, state }: ApplyResumeCardProps) {
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
          tone={state === '제출 완료' ? 'lime' : 'gray'}
          label={state}
          onClick={() => {}}
          css={{
            ...theme.typography.B4.Sb,
            cursor: 'default',
            [media.down(theme.breakPoints.tablet)]: { ...theme.typography.B5.Sb },
          }}
        ></Button>
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
