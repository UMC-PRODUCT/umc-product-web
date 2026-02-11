import * as Shared from '@shared/styles/shared'

import { useGetRecruitmentsList } from '@/features/school/hooks/useRecruitingQueries'
import AsyncBoundary from '@/shared/ui/common/AsyncBoundary/AsyncBoundary'
import Section from '@/shared/ui/common/Section/Section'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'

import ServerErrorCard from '../../common/ServerErrorCard'
import RecruitmentCard from './RecruitmentCard/RecruitmentCard'

const DocsEvaluationContent = () => {
  const { data } = useGetRecruitmentsList('ONGOING')
  return (
    <>
      <Shared.TabHeader flexDirection="row" justifyContent="space-between" alignItems="center">
        <Shared.TabHeader alignItems="flex-start">
          <Shared.TabTitle>서류 평가 중인 모집</Shared.TabTitle>
          <Shared.TabSubtitle>현재 서류 평가 중인 모집의 목록입니다.</Shared.TabSubtitle>
        </Shared.TabHeader>
      </Shared.TabHeader>
      <Section variant="solid" padding="18px 22px">
        {data.result.recruitments.map((recruitment) => (
          <RecruitmentCard
            key={recruitment.recruitmentId}
            start={recruitment.startDate}
            end={recruitment.endDate}
            applicants={Number(recruitment.applicantCount)}
            title={recruitment.recruitmentName}
            parts={['PLAN', 'DESIGN', 'ANDROID', 'IOS', 'WEB', 'SPRINGBOOT', 'NODEJS']}
            recruitmentId={recruitment.recruitmentId}
          />
        ))}
      </Section>
    </>
  )
}

const DocsEvaluation = () => {
  return (
    <AsyncBoundary
      fallback={<SuspenseFallback label="지원서를 불러오는 중입니다." />}
      errorFallback={(error, reset) => (
        <ServerErrorCard
          errorStatus={(error as { response?: { status?: number } } | null)?.response?.status}
          errorMessage={error.message || '데이터를 불러오지 못했어요.'}
          onRetry={reset}
        />
      )}
    >
      <DocsEvaluationContent />
    </AsyncBoundary>
  )
}

export default DocsEvaluation
