import PageLayout from '@/shared/layout/PageLayout/PageLayout'
import { Flex } from '@/shared/ui/common/Flex'

import ApplyStatus from '../components/SchoolDashboard/ApplyStatus/ApplyStatus'
import EvaluationStatus from '../components/SchoolDashboard/EvaluationStatus/EvaluationStatus'
import { ProgressSteps } from '../components/SchoolDashboard/ProgressSteps/ProgressSteps'
import ScheduleSummary from '../components/SchoolDashboard/ScheduleSummary/ScheduleSummary'

const SchoolDashboard = () => {
  return (
    <PageLayout>
      <Flex flexDirection="column" gap={100}>
        <ScheduleSummary />
        <ProgressSteps />
        <ApplyStatus />
        <EvaluationStatus />
      </Flex>
    </PageLayout>
  )
}
export default SchoolDashboard
