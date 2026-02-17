import type { EvaluationStatus as EvaluationStatusType } from '@/features/school/domain'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'

import InterviewEvaluation from './InterviewEvaluation/InterviewEvaluation'
import PaperEvaluation from './PaperEvaluation/PaperEvaluation'
import PartStatus from './PartStatus/PartStatus'
import * as S from './EvaluationStatus.style'

const EvaluationStatus = ({ evaluationStatus }: { evaluationStatus: EvaluationStatusType }) => {
  return (
    <Flex flexDirection="column" gap={20}>
      <PageTitle title="평가 현황" />
      <Section variant="outline" padding={16}>
        <S.Grid>
          <Flex flexDirection="column" gap={16}>
            <PaperEvaluation evaluationStatus={evaluationStatus.documentEvaluation} />
            <InterviewEvaluation evaluationStatus={evaluationStatus.interviewEvaluation} />
          </Flex>
          <PartStatus evaluationStatus={evaluationStatus.partStatuses} />
        </S.Grid>
      </Section>
    </Flex>
  )
}

export default EvaluationStatus
