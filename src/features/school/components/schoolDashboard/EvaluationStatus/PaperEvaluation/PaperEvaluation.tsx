import CardTitle from '@/features/school/common/CardTitle'
import Percentage from '@/features/school/common/Percentage'
import Section from '@/shared/ui/common/Section/Section'

const PaperEvaluation = () => {
  return (
    <Section variant="solid" alignItems="flex-start" padding={'17px 20px'} gap={18}>
      <CardTitle title="서류 평가 진행률" />
      <Percentage total={100} complete={75} />
    </Section>
  )
}

export default PaperEvaluation
