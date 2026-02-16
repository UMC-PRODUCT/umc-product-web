import { useGetActiveRecruitmentId } from '@/features/apply/hooks/useGetApplicationQuery'
import type {
  ApplicationStatus,
  EvaluationStatus as EvaluationStatusType,
  ScheduleSummary as ScheduleSummaryType,
  SchoolLeaderProgressType,
} from '@/features/school/domain'
import { PART_LIST } from '@/shared/constants/part'
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

const DEFAULT_SCHEDULE_SUMMARY: ScheduleSummaryType = {
  phaseTitle: '진행 중인 모집 없음.',
  dDay: '0',
  dateRange: {
    start: '',
    end: '',
  },
  todayInterviews: [],
}

const DEFAULT_PROGRESS: SchoolLeaderProgressType = {
  currentStep: 'BEFORE_APPLY',
  steps: [
    { step: 'BEFORE_APPLY', label: '지원서 작성', done: false, active: true },
    { step: 'DOC_REVIEWING', label: '서류 심사 중', done: false, active: false },
    { step: 'DOC_RESULT_PUBLISHED', label: '서류 합격 발표', done: false, active: false },
    { step: 'INTERVIEW_WAITING', label: '면접 대기', done: false, active: false },
    { step: 'FINAL_REVIEWING', label: '최종 심사 중', done: false, active: false },
    { step: 'FINAL_RESULT_PUBLISHED', label: '최종 합격 발표', done: false, active: false },
  ],
  noticeType: 'NEXT_RECRUITMENT_EXPECTED',
  noticeDate: new Date().toISOString(),
}

const DEFAULT_APPLICATION_STATUS: ApplicationStatus = {
  totalApplicants: '0',
  partCounts: PART_LIST.map((part) => ({
    part,
    count: '0',
  })),
}

const DEFAULT_EVALUATION_STATUS: EvaluationStatusType = {
  documentEvaluation: {
    progressRate: '0',
    completed: '0',
    total: '0',
  },
  interviewEvaluation: {
    progressRate: '0',
    completed: '0',
    total: '0',
  },
  partStatuses: PART_LIST.map((part) => ({
    part,
    documentStatus: 'NOT_STARTED',
    interviewStatus: 'NOT_STARTED',
  })),
}

const DashboardSections = ({
  scheduleSummary,
  progress,
  applicationStatus,
  evaluationStatus,
}: {
  scheduleSummary: ScheduleSummaryType
  progress: SchoolLeaderProgressType
  applicationStatus: ApplicationStatus
  evaluationStatus: EvaluationStatusType
}) => (
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
      <ScheduleSummary scheduleSummary={scheduleSummary} />
      <ProgressSteps progress={progress} />
      <ApplyStatus applicationStatus={applicationStatus} />
      <EvaluationStatus evaluationStatus={evaluationStatus} />
    </Flex>
  </PageLayout>
)

export const SchoolDashboardContent = () => {
  const { data } = useGetActiveRecruitmentId()
  const { data: dashboardData } = useGetRecruitmentDashboardSummary(data.result.recruitmentId)
  return (
    <DashboardSections
      scheduleSummary={dashboardData.result.scheduleSummary}
      progress={dashboardData.result.progress}
      applicationStatus={dashboardData.result.applicationStatus}
      evaluationStatus={dashboardData.result.evaluationStatus}
    />
  )
}

export const SchoolDashboard = () => {
  return (
    <AsyncBoundary
      fallback={<SuspenseFallback />}
      errorFallback={(error, reset) => {
        const errorStatus = resolveErrorStatus(error)
        const isNotFound = errorStatus === 404
        if (isNotFound) {
          return (
            <DashboardSections
              scheduleSummary={DEFAULT_SCHEDULE_SUMMARY}
              progress={DEFAULT_PROGRESS}
              applicationStatus={DEFAULT_APPLICATION_STATUS}
              evaluationStatus={DEFAULT_EVALUATION_STATUS}
            />
          )
        }

        const errorMessage = resolveErrorMessage(error)
        return (
          <ServerErrorCard
            errorStatus={errorStatus}
            errorMessage={errorMessage}
            onRetry={reset}
            message="모집 정보를 불러오지 못했어요."
            description="잠시 후 다시 시도하거나 네트워크 상태를 확인해주세요."
          />
        )
      }}
    >
      <SchoolDashboardContent />
    </AsyncBoundary>
  )
}
