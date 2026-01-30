import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import Section from '@/shared/ui/common/Section/Section'
import { transformNextRecruitmentMonthKorean } from '@/shared/utils/transformKorean'

import type { RecruitingStepType } from '../../domain/types'
import { getRecruitingStep } from '../../utils/getRecruitingStep'
import ProgressBar from '../ProgressBar/ProgressBar'
import * as S from './ProgressStage.style'

interface ProgressStageProps {
  progress:
    | {
        currentStep: string
        steps: Array<{
          step: RecruitingStepType
          label: string
          done: boolean
          active: boolean
        }>
        noticeType: string
        noticeDate: string
        nextRecruitmentMonth: string
      }
    | undefined
    | null
}
const ProgressStage = ({ progress }: ProgressStageProps) => {
  const currentStepIndex = getRecruitingStep(progress?.currentStep as RecruitingStepType)
  return (
    <Section
      variant="solid"
      gap={28}
      alignItems="flex-start"
      css={{
        padding: '14px 20px',
        [media.down(theme.breakPoints.tablet)]: { padding: '14px 14px' },
      }}
    >
      <S.Title>진행 단계</S.Title>
      <ProgressBar steps={progress?.steps ?? []} currentStepIndex={currentStepIndex} />
      <S.Info>
        * {transformNextRecruitmentMonthKorean(progress?.noticeType ?? '')}
        {progress?.noticeDate ?? ' 추후 공지'}
      </S.Info>
    </Section>
  )
}

export default ProgressStage
