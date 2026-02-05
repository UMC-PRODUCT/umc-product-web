import PageLayout from '@/shared/layout/PageLayout/PageLayout'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'

import ApplyStatus from '../components/SchoolDashboard/ApplyStatus/ApplyStatus'
import EvaluationStatus from '../components/SchoolDashboard/EvaluationStatus/EvaluationStatus'
import { ProgressSteps } from '../components/SchoolDashboard/ProgressSteps/ProgressSteps'
import ScheduleSummary from '../components/SchoolDashboard/ScheduleSummary/ScheduleSummary'

export const SchoolDashboard = () => {
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
        <ScheduleSummary />
        <ProgressSteps />
        <ApplyStatus />
        <EvaluationStatus />
      </Flex>
    </PageLayout>
  )
}
