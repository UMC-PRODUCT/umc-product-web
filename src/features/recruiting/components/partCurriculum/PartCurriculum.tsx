/** @jsxImportSource @emotion/react */
import { Suspense, useState } from 'react'

import { PART_REQUIRED_SKILL } from '@features/recruiting/domain'

import type { PartType } from '@/features/auth/domain'
import { useGetCurriculums } from '@/features/management/hooks/getManagementQueries'
import Check from '@/shared/assets/icons/check.svg?react'
import { PART } from '@/shared/constants/umc'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'

import * as S from './PartCurriculum.style'

const CurriculumTimeline = ({ activeTab }: { activeTab: PartType }) => {
  const { data } = useGetCurriculums(activeTab)
  const currentData = data.result.workbooks

  const firstColWeeks = currentData.filter((item) => Number(item.weekNo) <= 6)
  const secondColWeeks = currentData.filter((item) => Number(item.weekNo) >= 7)

  const secondLastIndex = secondColWeeks.length > 0 ? secondColWeeks.length - 1 : -1
  const lenFirstColumn = firstColWeeks.length

  return (
    <S.TimelineGrid>
      <S.FirstColumn $indexLength={lenFirstColumn}>
        {firstColWeeks.map((item) => (
          <S.WeekRow key={item.weekNo}>
            <S.Dot />
            <S.WeekLabel>{item.weekNo.toString().padStart(2, '0')}주차</S.WeekLabel>
            <S.ContentLabel>{item.title}</S.ContentLabel>
          </S.WeekRow>
        ))}
      </S.FirstColumn>

      <S.SecondColumn $lastIndex={secondLastIndex}>
        {secondColWeeks.map((item) => (
          <S.WeekRow key={item.weekNo}>
            <S.Dot />
            <S.WeekLabel>{item.weekNo.toString().padStart(2, '0')}주차</S.WeekLabel>
            <S.ContentLabel>{item.title}</S.ContentLabel>
          </S.WeekRow>
        ))}
      </S.SecondColumn>
    </S.TimelineGrid>
  )
}

const PartCurriculum = () => {
  const [activeTab, setActiveTab] = useState<PartType>('PLAN')

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

        <Suspense fallback={<SuspenseFallback />}>
          <CurriculumTimeline activeTab={activeTab} />
        </Suspense>
      </Flex>
    </Flex>
  )
}

export default PartCurriculum
