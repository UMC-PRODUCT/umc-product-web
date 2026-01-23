import type { ApplySummary, DashboardProgress } from '@features/dashboard/domain'

import PageLayout from '@/shared/layout/PageLayout/PageLayout'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import { useUserProfileStore } from '@/shared/store/useUserProfileStore'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'

import ApplyResumeCard from '../components/ApplyResumeCard/ApplyResumeCard'
import ApplyStatement from '../components/ApplyStatement/ApplyStatement'
import { gridStyle } from '../components/ApplyStatement/ApplyStatement.style'
import ProgressStage from '../components/ProgressStage/ProgressStage'

type DashboardPageProps = {
  progress: DashboardProgress
  applyData: Array<ApplySummary>
}

export const DashboardPage = ({ progress, applyData }: DashboardPageProps) => {
  const { nickname, name } = useUserProfileStore()
  const { parts, document, final } = progress
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
          <PageTitle title={`${nickname}/${name} 님의 지원 현황`} />
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
              <ApplyStatement parts={parts} document={document} final={final} />
              <ProgressStage />
            </div>
          </Section>
        </Flex>
        <Flex flexDirection="column" gap={22}>
          <PageTitle title={`${nickname}/${name} 님의 지원서`} />
          <Section variant="outline" gap={16} css={sectionBorder}>
            {applyData.map(({ title, resumeId, state }) => (
              <ApplyResumeCard key={resumeId} title={title} resumeId={resumeId} state={state} />
            ))}
          </Section>
        </Flex>
      </Flex>
    </PageLayout>
  )
}
