import { useNavigate } from '@tanstack/react-router'
import dayjs from 'dayjs'

import type { PartType } from '@/features/auth/domain'
import { PART_TYPE_TO_SMALL_PART } from '@/shared/constants/part'
import { theme } from '@/shared/styles/theme'
import { Button } from '@/shared/ui/common/Button'
import Section from '@/shared/ui/common/Section/Section'

import * as S from './RecruitmentCard.style'

const RecruitmentCard = ({
  start,
  end,
  applicants,
  title,
  parts,
  recruitmentId,
}: {
  start: string
  end: string
  applicants?: number
  title: string
  parts: Array<PartType>
  recruitmentId?: string
}) => {
  const startDate = dayjs(start).format('YYYY.MM.DD')
  const endDate = dayjs(end).format('YYYY.MM.DD')
  const navigate = useNavigate()
  return (
    <Section
      variant="outline"
      padding="15px 18px"
      alignItems="flex-start"
      gap={12}
      css={{ backgroundColor: theme.colors.gray[700] }}
    >
      <S.RecruitmentHeader>
        <S.Period>
          {startDate} ~ {endDate}
        </S.Period>
        {applicants}명 지원
      </S.RecruitmentHeader>
      <S.RecruitmentTitle>{title}</S.RecruitmentTitle>
      <S.RecruitmentFooter>
        <S.PartWrapper>
          {parts.map((part) => (
            <S.PartBadge key={part}>{PART_TYPE_TO_SMALL_PART[part]}</S.PartBadge>
          ))}
        </S.PartWrapper>
        <Button
          tone="lime"
          label="서류 평가"
          typo="B4.Sb"
          css={{ width: '88px', height: '30px' }}
          onClick={() => {
            navigate({ to: `/school/evaluation/${recruitmentId}` })
          }}
        />
      </S.RecruitmentFooter>
    </Section>
  )
}

export default RecruitmentCard
