import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import Section from '@/shared/ui/common/Section/Section'

import ProgressBar from '../ProgressBar/ProgressBar'
import * as S from './ProgressStage.style'

const Step = [
  { label: '지원 전' },
  { label: '서류 평가 중' },
  { label: '서류 결과 발표' },
  { label: '면접 대기 중' },
  { label: '최종 평가 중' },
  { label: '최종 결과 발표' },
]

export default function ProgressStage() {
  const currentStepIndex = 4
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
      <ProgressBar steps={Step} currentStepIndex={currentStepIndex} />
      <S.Info>* 최종 합불 발표 예정일: 20xx년 xx월 xx일</S.Info>
    </Section>
  )
}
