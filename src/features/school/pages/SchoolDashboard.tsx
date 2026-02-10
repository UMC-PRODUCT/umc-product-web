import { useGetActiveRecruitmentId } from '@/features/apply/hooks/useGetApplicationQuery'
import PageLayout from '@/shared/layout/PageLayout/PageLayout'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import AsyncBoundary from '@/shared/ui/common/AsyncBoundary/AsyncBoundary'
import { Flex } from '@/shared/ui/common/Flex'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'

import ApplyStatus from '../components/schoolDashboard/ApplyStatus/ApplyStatus'
import EvaluationStatus from '../components/schoolDashboard/EvaluationStatus/EvaluationStatus'
import { ProgressSteps } from '../components/schoolDashboard/ProgressSteps/ProgressSteps'
import ScheduleSummary from '../components/schoolDashboard/ScheduleSummary/ScheduleSummary'
import { useGetRecruitmentDashboardSummary } from '../hooks/useRecruitingQueries'

export const SchoolDashboardContent = () => {
  const { data } = useGetActiveRecruitmentId()
  const { data: dashboardData } = useGetRecruitmentDashboardSummary(data.result.recruitmentId)
  return (
    <PageLayout>
      <Flex
        flexDirection="column"
        css={{
          gap: '100px',
          [media.down(theme.breakPoints.tablet)]: {
            gap: '30px',
          },
        }}
      >
        <ScheduleSummary scheduleSummary={dashboardData.result.scheduleSummary} />
        <ProgressSteps />
        <ApplyStatus />
        <EvaluationStatus />
      </Flex>
    </PageLayout>
  )
}

export const SchoolDashboard = () => {
  return (
    <AsyncBoundary
      fallback={<SuspenseFallback />}
      errorFallback={() => (
        <PageLayout>
          <Flex flexDirection="column" gap={112} css={{ color: theme.colors.gray[400] }}>
            현재 진행 중인 모집이 없습니다.
          </Flex>
        </PageLayout>
      )}
    >
      <SchoolDashboardContent />
    </AsyncBoundary>
  )
}
