/** @jsxImportSource @emotion/react */
import { Suspense, useState } from 'react'

import { PART_REQUIRED_SKILL } from '@features/recruiting/domain'

import { PART_TYPE_TO_SMALL_PART } from '@shared/constants/part'

import { useGetCurriculumsQuery } from '@/features/management/hooks/useManagementQueries'
import { CURRICULUM_MOCK } from '@/features/management/mocks/managementMocks'
import Check from '@/shared/assets/icons/check.svg?react'
import { PART } from '@/shared/constants/umc'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import { theme } from '@/shared/styles/theme'
import type { PartType } from '@/shared/types/part'
import { Flex } from '@/shared/ui/common/Flex'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'
import { CurriculumTimeline } from '@/shared/ui/curriculum/CurriculumTimeline'

import * as S from './PartCurriculum.style'

const PartCurriculum = () => {
  const [activeTab, setActiveTab] = useState<PartType>('PLAN')
  const { data } = useGetCurriculumsQuery(activeTab)
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const apiWorkbooks = data?.result?.workbooks
  const workbooks =
    Array.isArray(apiWorkbooks) && apiWorkbooks.length > 0
      ? apiWorkbooks
      : CURRICULUM_MOCK[activeTab]

  return (
    <Flex flexDirection="column" gap="24px">
      <PageTitle title="파트별 커리큘럼" />
      <Flex flexDirection="column">
        <S.TabList>
          {PART.map((id) => (
            <S.TabItem key={id} $active={activeTab === id} onClick={() => setActiveTab(id)}>
              {PART_TYPE_TO_SMALL_PART[id]}
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
          <CurriculumTimeline workbooks={workbooks} />
        </Suspense>
      </Flex>
    </Flex>
  )
}

export default PartCurriculum
