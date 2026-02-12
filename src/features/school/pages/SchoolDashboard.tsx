import { useGetActiveRecruitmentId } from '@/features/apply/hooks/useGetApplicationQuery'
import PageLayout from '@/shared/layout/PageLayout/PageLayout'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import AsyncBoundary from '@/shared/ui/common/AsyncBoundary/AsyncBoundary'
import { Flex } from '@/shared/ui/common/Flex'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'

import ServerErrorCard from '../components/common/ServerErrorCard'
import ApplyStatus from '../components/schoolDashboard/ApplyStatus/ApplyStatus'
import EvaluationStatus from '../components/schoolDashboard/EvaluationStatus/EvaluationStatus'
import { ProgressSteps } from '../components/schoolDashboard/ProgressSteps/ProgressSteps'
import ScheduleSummary from '../components/schoolDashboard/ScheduleSummary/ScheduleSummary'
import { useGetRecruitmentDashboardSummary } from '../hooks/useRecruitingQueries'

const resolveErrorStatus = (error: unknown) =>
  (error as { response?: { status?: number } } | null)?.response?.status

const resolveErrorMessage = (error: unknown) =>
  (error as { response?: { data?: { message?: string } } } | null)?.response?.data?.message ||
  (error instanceof Error ? error.message : undefined) ||
  '요청 처리 중 오류가 발생했습니다.'

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
        <ProgressSteps progress={dashboardData.result.progress} />
        <ApplyStatus applicationStatus={dashboardData.result.applicationStatus} />
        <EvaluationStatus evaluationStatus={dashboardData.result.evaluationStatus} />
      </Flex>
    </PageLayout>
  )
}

export const SchoolDashboard = () => {
  return (
    <AsyncBoundary
      fallback={<SuspenseFallback />}
      errorFallback={(error, reset) => {
        const errorStatus = resolveErrorStatus(error)
        const isNotFound = errorStatus === 404
        const errorMessage = resolveErrorMessage(error)
        return (
          <ServerErrorCard
            errorStatus={errorStatus}
            errorMessage={errorMessage}
            onRetry={reset}
            message={isNotFound ? '진행 중인 모집 없음' : '모집 정보를 불러오지 못했어요.'}
            description={
              isNotFound
                ? '현재 진행 중인 모집이 없거나 접근 권한이 없습니다.'
                : '잠시 후 다시 시도하거나 네트워크 상태를 확인해주세요.'
            }
          />
        )
      }}
    >
      <SchoolDashboardContent />
    </AsyncBoundary>
  )
}
