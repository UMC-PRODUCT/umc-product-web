import { Suspense, useState } from 'react'

import type { PartType } from '@/features/auth/domain'
import { useGetCurriculumsQuery } from '@/features/management/hooks/useManagementQueries'
import { CURRICULUM_MOCK } from '@/features/management/mocks/managementMocks'
import { PART_REQUIRED_SKILL } from '@/features/recruiting/domain'
import { PART_TYPE_TO_SMALL_PART } from '@/shared/constants/part'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'
import { CurriculumTimeline } from '@/shared/ui/curriculum/CurriculumTimeline'

import * as S from './CurriculumSection.style'

const CURRICULUM_PARTS: Array<PartType> = [
  'PLAN',
  'DESIGN',
  'ANDROID',
  'IOS',
  'WEB',
  'SPRINGBOOT',
  'NODEJS',
]

const CurriculumSection = () => {
  // 기본값으로 첫 번째 데이터 선택
  const [selectedPart, setSelectedPart] = useState<PartType>('PLAN')
  const { data } = useGetCurriculumsQuery(selectedPart)
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const apiWorkbooks = data?.result?.workbooks
  const workbooks =
    Array.isArray(apiWorkbooks) && apiWorkbooks.length > 0
      ? apiWorkbooks
      : CURRICULUM_MOCK[selectedPart]

  return (
    <S.FullWidthSection id="curriculum">
      <S.HeaderContainer>
        <S.SectionBadge>WHAT WE LEARN</S.SectionBadge>
        <S.SectionTitle>스터디 커리큘럼</S.SectionTitle>
      </S.HeaderContainer>

      {/* 탭 메뉴 */}
      <S.TabContainer>
        {CURRICULUM_PARTS.map((part) => (
          <S.TabButton
            key={part}
            $isActive={selectedPart === part}
            onClick={() => setSelectedPart(part)}
          >
            {PART_TYPE_TO_SMALL_PART[part]}
          </S.TabButton>
        ))}
      </S.TabContainer>

      {/* 커리큘럼 상세 보드 */}
      <S.CurriculumBoard>
        <S.RequiredSkill>
          <S.CheckIcon>✓</S.CheckIcon>
          <S.SkillLabel>요구 역량</S.SkillLabel>
          <S.SkillValue>{PART_REQUIRED_SKILL[selectedPart] || '기초 지식'}</S.SkillValue>
        </S.RequiredSkill>
        <Suspense fallback={<SuspenseFallback />}>
          <CurriculumTimeline workbooks={workbooks} />
        </Suspense>
      </S.CurriculumBoard>
    </S.FullWidthSection>
  )
}

export default CurriculumSection
