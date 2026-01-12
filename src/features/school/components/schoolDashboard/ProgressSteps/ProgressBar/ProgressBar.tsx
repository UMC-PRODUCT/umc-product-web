import * as S from './ProgressBar.style'

interface Step {
  label: string
}

interface StepperProps {
  steps: Array<Step>
  currentStepIndex: number
}
const ProgressBar = ({ steps, currentStepIndex }: StepperProps) => {
  const progressWidth = (currentStepIndex / (steps.length - 1)) * 100

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
