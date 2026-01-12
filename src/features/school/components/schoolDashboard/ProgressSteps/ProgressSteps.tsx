import { RECRUITING_PROGRESS_MOCKS } from '@/features/school/mocks/interview'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'

import ProgressBar from './ProgressBar/ProgressBar'
import * as S from './ProgressSteps.style'

export const ProgressSteps = () => {
  return (
    <Flex flexDirection="column" gap={20}>
      <PageTitle title="진행 단계" />
      <Section variant="outline" gap={56}>
        <ProgressBar steps={RECRUITING_PROGRESS_MOCKS} currentStepIndex={1} />
        <S.Span>* 서류 결과 발표 예정일: 20xx년 xx월 xx일</S.Span>
      </Section>
    </Flex>
  )
}
