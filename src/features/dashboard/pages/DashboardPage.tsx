import PageLayout from '@/shared/layout/PageLayout/PageLayout'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import AsyncBoundary from '@/shared/ui/common/AsyncBoundary/AsyncBoundary'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'

import ApplyResumeCard from '../components/ApplyResumeCard/ApplyResumeCard'
import ApplyStatement from '../components/ApplyStatement/ApplyStatement'
import { gridStyle } from '../components/ApplyStatement/ApplyStatement.style'
import ProgressStage from '../components/ProgressStage/ProgressStage'
import { useGetMyApplications } from '../hooks/useDashboardQueries'

const DashboardPageContent = () => {
  const { data } = useGetMyApplications()
  const dashboardData = data.result
  const current = dashboardData.current
  const applications = dashboardData.applications
  const displayName = `${dashboardData.nickName}/${dashboardData.name}`
  const progressForDisplay =
    current && current.appliedParts.length === 0 ? undefined : current?.progress
  const sectionBorder = {
    border: `1px solid ${theme.colors.gray[700]}`,
    [media.down(theme.breakPoints.tablet)]: {
      padding: '14px 14px',
    },
  }

  return (
    <PageLayout>
      <Flex flexDirection="column" gap={96}>
        <Flex gap={22} flexDirection="column">
          <PageTitle title={`${displayName} 님의 지원 현황`} />
          <Section
            variant="outline"
            padding={16}
            css={{
              flexDirection: 'row',
              ...sectionBorder,
              [media.down(theme.breakPoints.tablet)]: { flexDirection: 'column' },
            }}
          >
            <div css={gridStyle}>
              <ApplyStatement current={current} />
              <ProgressStage progress={progressForDisplay} />
            </div>
          </Section>
        </Flex>
        <Flex flexDirection="column" gap={22}>
          <PageTitle title={`${displayName} 님의 지원서`} />
          <Section variant="outline" gap={16} css={sectionBorder} padding={'16px'}>
            {applications.map(({ recruitmentTitle, formResponseId, badge, recruitmentId }) => (
              <ApplyResumeCard
                key={`${recruitmentId}-${formResponseId}`}
                title={recruitmentTitle}
                resumeId={formResponseId}
                state={badge}
                recruitmentId={recruitmentId}
              />
            ))}
            {applications.length === 0 && (
              <div css={{ color: theme.colors.gray[400] }}>지원서 작성 기록이 없습니다.</div>
            )}
          </Section>
        </Flex>
      </Flex>
    </PageLayout>
  )
}

export const DashboardPage = () => (
  <AsyncBoundary fallback={<SuspenseFallback label="지원 현황을 불러오는 중입니다." />}>
    <DashboardPageContent />
  </AsyncBoundary>
)
