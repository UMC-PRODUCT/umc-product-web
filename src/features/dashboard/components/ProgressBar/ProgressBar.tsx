import * as S from './ProgressBar.style'

interface Step {
  label: string
}

interface StepperProps {
  steps: Array<Step>
  currentStepIndex: number
}
export const STEPS = [
  '지원 전',
  '서류 평가 중',
  '서류 결과 발표',
  '면접 대기 중',
  '최종 평가 중',
  '최종 결과 발표',
] as const

export default function ProgressBar({ steps, currentStepIndex }: StepperProps) {
  const progressWidth = (currentStepIndex / (steps.length - 1)) * 100
  return (
    <S.StepperWrapper>
      <S.ProgressLineContainer>
        <S.ActiveLine progressWidth={progressWidth} />
      </S.ProgressLineContainer>
      {STEPS.map((label, index) => {
        const isActive = index <= currentStepIndex
        return (
          <S.StepItem key={label}>
            <S.Dot isActive={isActive} />
            <S.Label isActive={isActive}>{label}</S.Label>
          </S.StepItem>
        )
      })}
    </S.StepperWrapper>
  )
}
