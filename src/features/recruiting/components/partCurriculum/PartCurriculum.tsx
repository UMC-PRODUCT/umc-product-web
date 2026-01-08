/** @jsxImportSource @emotion/react */
import { useState } from 'react'

import { PART_REQUIRED_SKILL } from '@/features/recruiting/constants/partRequiredSkill'
import type { PartData } from '@/features/recruiting/types/partCurriculum'
import Check from '@/shared/assets/icons/check.svg?react'
import { PART } from '@/shared/constants/umc'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import { theme } from '@/shared/styles/theme'
import type { Part } from '@/shared/types/umc/part'
import { Flex } from '@/shared/ui/common/Flex'

import * as S from './PartCurriculum.style'

type PartCurriculumProps = {
  curriculum: Array<PartData>
}

const PartCurriculum = ({ curriculum }: PartCurriculumProps) => {
  const [activeTab, setActiveTab] = useState<Part>('Plan')
  const currentData = curriculum.find((d) => d.id === activeTab) || curriculum[0] // TODO: 데이터 수정 예정

  const firstColWeeks = currentData.curriculum.filter((item) => item.week <= 6)
  const secondColWeeks = currentData.curriculum.filter((item) => item.week >= 7)

  const secondLastIndex = secondColWeeks.length > 0 ? secondColWeeks.length - 1 : -1
  const lenFirstColumn = firstColWeeks.length

  return (
    <Flex flexDirection="column" gap="24px">
      <PageTitle title="파트별 커리큘럼" />
      <Flex flexDirection="column">
        <S.TabList>
          {PART.map((id) => (
            <S.TabItem key={id} $active={activeTab === id} onClick={() => setActiveTab(id)}>
              {id}
            </S.TabItem>
          ))}
        </S.TabList>

        <S.Requirement>
          <Flex
            width="fit-content"
            gap={6}
            css={{ borderRight: `1px solid ${theme.colors.gray[500]}`, paddingRight: '18px' }}
          >
            <Check color={theme.colors.lime} />
            <span css={{ color: theme.colors.lime }}>요구 역량</span>
          </Flex>
          <span css={{ color: theme.colors.white, paddingLeft: '18px' }}>
            {PART_REQUIRED_SKILL[activeTab]}
          </span>
        </S.Requirement>

        <S.TimelineGrid>
          <S.FirstColumn $indexLength={lenFirstColumn}>
            {firstColWeeks.map((item) => (
              <S.WeekRow key={item.week}>
                <S.Dot />
                <S.WeekLabel>{item.week.toString().padStart(2, '0')}주차</S.WeekLabel>
                <S.ContentLabel>{item.content}</S.ContentLabel>
              </S.WeekRow>
            ))}
          </S.FirstColumn>

          <S.SecondColumn $lastIndex={secondLastIndex}>
            {secondColWeeks.map((item) => (
              <S.WeekRow key={item.week}>
                <S.Dot />
                <S.WeekLabel>{item.week.toString().padStart(2, '0')}주차</S.WeekLabel>
                <S.ContentLabel>{item.content}</S.ContentLabel>
              </S.WeekRow>
            ))}
          </S.SecondColumn>
        </S.TimelineGrid>
      </Flex>
    </Flex>
  )
}

export default PartCurriculum
