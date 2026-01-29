import PageLayout from '@/shared/layout/PageLayout/PageLayout'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'

import ApplyResumeCard from '../components/ApplyResumeCard/ApplyResumeCard'
import ApplyStatement from '../components/ApplyStatement/ApplyStatement'
import { gridStyle } from '../components/ApplyStatement/ApplyStatement.style'
import ProgressStage from '../components/ProgressStage/ProgressStage'
import { useMyApplications } from '../hooks/useDashboardQueries'

export const DashboardPage = () => {
  const { data } = useMyApplications()
  const dashboardData = data?.result
  const current = dashboardData?.current
  const applications = dashboardData?.applications ?? []
  const displayName = dashboardData ? `${dashboardData.nickName}/${dashboardData.name}` : ''
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
              <ApplyStatement current={current ?? null} />
              <ProgressStage progress={current?.progress} />
            </div>
          </Section>
        </Flex>
        <Flex flexDirection="column" gap={22}>
          <PageTitle title={`${displayName} 님의 지원서`} />
          <Section variant="outline" gap={16} css={sectionBorder}>
            {applications.map(({ recruitmentTitle, applicationId, status, recruitmentId }) => (
              <ApplyResumeCard
                key={applicationId}
                title={recruitmentTitle}
                resumeId={applicationId}
                state={status}
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
