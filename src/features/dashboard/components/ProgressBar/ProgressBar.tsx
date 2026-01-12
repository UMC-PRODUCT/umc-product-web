import * as S from './ProgressBar.style'

interface Step {
  label: string
}

interface StepperProps {
  steps: Array<Step>
  currentStepIndex: number
}

const ProgressBar = ({ steps, currentStepIndex }: StepperProps) => {
  if (steps.length === 0) return null
  const progressWidth =
    steps.length > 1 ? (currentStepIndex / (steps.length - 1)) * 100 : steps.length === 1 ? 100 : 0
  return (
    <S.StepperWrapper>
      <S.ProgressLineContainer>
        <S.ActiveLine $progressWidth={progressWidth} />
      </S.ProgressLineContainer>
      {steps.map((step, index) => {
        const isActive = index <= currentStepIndex
        return (
          <S.StepItem key={step.label}>
            <S.Dot $isActive={isActive} />
            <S.Label $isActive={isActive}>{step.label}</S.Label>
          </S.StepItem>
        )
      })}
    </S.StepperWrapper>
  )
}

export default ProgressBar
