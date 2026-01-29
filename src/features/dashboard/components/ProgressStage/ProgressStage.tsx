import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import Section from '@/shared/ui/common/Section/Section'

import ProgressBar from '../ProgressBar/ProgressBar'
import * as S from './ProgressStage.style'

const Step = [
  { step: '1', label: '지원 전', done: false, active: true },
  { step: '2', label: '서류 평가 중', done: false, active: false },
  { step: '3', label: '서류 결과 발표', done: false, active: false },
  { step: '4', label: '면접 대기 중', done: false, active: false },
  { step: '5', label: '최종 평가 중', done: false, active: false },
  { step: '6', label: '최종 결과 발표', done: false, active: false },
]

interface ProgressStageProps {
  progress:
    | {
        currentStep: string
        steps: Array<{
          step: string
          label: string
          done: boolean
          active: boolean
        }>
        resultAnnounceAt: string
      }
    | undefined
    | null
}
const ProgressStage = ({ progress }: ProgressStageProps) => {
  const currentStepIndex = progress?.currentStep ?? '0'
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
      <ProgressBar steps={progress?.steps ?? Step} currentStepIndex={currentStepIndex} />
      <S.Info>
        * {progress?.steps[Number(currentStepIndex) - 1]?.label ?? '다음 기수 모집 예정'}:
        {progress?.resultAnnounceAt ?? ' 추후 공지'}
      </S.Info>
    </Section>
  )
}

export default ProgressStage
