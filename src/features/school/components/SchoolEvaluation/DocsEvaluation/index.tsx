import * as Shared from '@shared/styles/shared'

import AsyncBoundary from '@/shared/ui/common/AsyncBoundary/AsyncBoundary'
import Section from '@/shared/ui/common/Section/Section'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'

import RecruitmentCard from './RecruitmentCard/RecruitmentCard'

const DocsEvaluationContent = () => {
  return (
    <>
      <Shared.TabHeader flexDirection="row" justifyContent="space-between" alignItems="center">
        <Shared.TabHeader alignItems="flex-start">
          <Shared.TabTitle>서류 평가 중인 모집</Shared.TabTitle>
          <Shared.TabSubtitle>현재 서류 평가 중인 모집의 목록입니다.</Shared.TabSubtitle>
        </Shared.TabHeader>
      </Shared.TabHeader>
      <Section variant="solid" padding="18px 22px">
        <RecruitmentCard
          start="2026-02-16"
          end="2026-02-28"
          applicants={67}
          title="UMC 중앙대학교 10기 모집"
          parts={['PLAN', 'DESIGN', 'ANDROID', 'IOS', 'WEB', 'SPRINGBOOT', 'NODEJS']}
          recruitmentId="34"
        />
      </Section>
    </>
  )
}

const DocsEvaluation = () => {
  return (
    <AsyncBoundary fallback={<SuspenseFallback label="지원서를 불러오는 중입니다." />}>
      <DocsEvaluationContent />
    </AsyncBoundary>
  )
}

export default DocsEvaluation
