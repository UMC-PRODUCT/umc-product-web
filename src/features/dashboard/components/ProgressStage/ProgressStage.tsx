import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import Section from '@/shared/ui/common/Section/Section'
import { transformNextRecruitmentMonthKorean } from '@/shared/utils/transformKorean'

import type { Progress, RecruitingStepType, Step } from '../../domain/types'
import { getRecruitingStep } from '../../utils/getRecruitingStep'
import ProgressBar from '../ProgressBar/ProgressBar'
import * as S from './ProgressStage.style'

const progressStage: Array<Step> = [
  { label: '지원서 작성', step: 'BEFORE_APPLY', done: false, active: false },
  { label: '서류 심사 중', step: 'DOC_REVIEWING', done: false, active: false },
  { label: '서류 합격 발표', step: 'DOC_RESULT_PUBLISHED', done: false, active: false },
  { label: '면접 대기', step: 'INTERVIEW_WAITING', done: false, active: false },
  { label: '최종 심사 중', step: 'FINAL_REVIEWING', done: false, active: false },
  { label: '최종 합격 발표', step: 'FINAL_RESULT_PUBLISHED', done: false, active: false },
]
interface ProgressStageProps {
  progress: Progress | undefined | null
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
      <ProgressBar steps={progress?.steps ?? progressStage} currentStepIndex={currentStepIndex} />
      <S.Info>
        * {transformNextRecruitmentMonthKorean(progress?.noticeType ?? '')}
        {progress?.noticeDate ?? ' 추후 공지'}
      </S.Info>
    </Section>
  )
}

export default ProgressStage
