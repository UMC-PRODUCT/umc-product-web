import type { RecruitingStepType } from '@/features/dashboard/domain'
import { getRecruitingStep } from '@/features/dashboard/utils/getRecruitingStep'
import type { SchoolLeaderProgressType } from '@/features/school/domain'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'
import { transformNextRecruitmentMonthKorean } from '@/shared/utils'

import ProgressBar from './ProgressBar/ProgressBar'
import * as S from './ProgressSteps.style'

export const ProgressSteps = ({ progress }: { progress: SchoolLeaderProgressType }) => {
  const currentStepIndex = getRecruitingStep(progress.currentStep as RecruitingStepType)
  const noticeDate = new Date(progress.noticeDate).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  return (
    <Flex flexDirection="column" gap={20}>
      <PageTitle title="진행 단계" />
      <Section variant="outline" gap={56}>
        <ProgressBar steps={progress.steps} currentStepIndex={currentStepIndex} />
        <S.Span>
          * {transformNextRecruitmentMonthKorean(progress.noticeType)}
          {noticeDate}
        </S.Span>
      </Section>
    </Flex>
  )
}
