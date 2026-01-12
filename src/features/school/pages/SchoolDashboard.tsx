import PageLayout from '@/shared/layout/PageLayout/PageLayout'
import { Flex } from '@/shared/ui/common/Flex'

import ApplyStatus from '../components/schoolDashboard/ApplyStatus/ApplyStatus'
import EvaluationStatus from '../components/schoolDashboard/EvaluationStatus/EvaluationStatus'
import { ProgressSteps } from '../components/schoolDashboard/ProgressSteps/ProgressSteps'
import ScheduleSummary from '../components/schoolDashboard/ScheduleSummary/ScheduleSummary'

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
