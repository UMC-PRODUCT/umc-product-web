import CardTitle from '@/features/school/components/common/CardTitle'
import Percentage from '@/features/school/components/common/Percentage'
import type { ProgressRate } from '@/features/school/domain'
import Section from '@/shared/ui/common/Section/Section'

const InterviewEvaluation = ({ evaluationStatus }: { evaluationStatus: ProgressRate }) => {
  return (
    <Section variant="solid" alignItems="flex-start" padding={'17px 20px'} gap={18}>
      <CardTitle title="면접 평가 진행률" />
      <Percentage
        total={Number(evaluationStatus.total)}
        complete={Number(evaluationStatus.completed)}
      />
    </Section>
  )
}

export default InterviewEvaluation
