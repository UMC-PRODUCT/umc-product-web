import { Suspense, useState } from 'react'

import type { PartType } from '@/features/auth/domain'
import { useGetCurriculumsQuery } from '@/features/management/hooks/useManagementQueries'
import { PART_REQUIRED_SKILL } from '@/features/recruiting/domain'
import { PART_TYPE_TO_SMALL_PART } from '@/shared/constants/part'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'
import { CurriculumTimeline } from '@/shared/ui/curriculum/CurriculumTimeline'

import * as S from './CurriculumSection.style'

const CurriculumSection = () => {
  // 기본값으로 첫 번째 데이터 선택
  const [selectedPart, setSelectedPart] = useState<PartType>('PLAN')
  const { data } = useGetCurriculumsQuery(selectedPart)
  const workbooks = data?.result.workbooks ?? []

  return (
    <S.FullWidthSection id="curriculum">
      <S.HeaderContainer>
        <S.SectionBadge>WHAT WE LEARN</S.SectionBadge>
        <S.SectionTitle>스터디 커리큘럼</S.SectionTitle>
      </S.HeaderContainer>

      {/* 탭 메뉴 */}
      <S.TabContainer>
        {['PLAN', 'DESIGN', 'ANDROID', 'IOS', 'WEB', 'SPRINGBOOT', 'NODEJS'].map((part) => (
          <S.TabButton
            key={part}
            $isActive={selectedPart === part}
            onClick={() => setSelectedPart(part as PartType)}
          >
            {PART_TYPE_TO_SMALL_PART[part as PartType]}
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
