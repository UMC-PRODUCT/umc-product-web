import CardTitle from '@/features/school/components/common/CardTitle'
import Percentage from '@/features/school/components/common/Percentage'
import Section from '@/shared/ui/common/Section/Section'

const InterviewEvaluation = () => {
  return (
    <Section variant="solid" alignItems="flex-start" padding={'17px 20px'} gap={18}>
      <CardTitle title="면접 평가 진행률" />
      <Percentage total={100} complete={75} />
    </Section>
  )
}

export default InterviewEvaluation
