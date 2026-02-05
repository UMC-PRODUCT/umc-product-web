import type { RecruitingStepType } from '../../domain/types'
import * as S from './ProgressBar.style'

interface Step {
  label: string
  step: RecruitingStepType | null | undefined
  done: boolean
  active: boolean
}

interface StepperProps {
  steps: Array<Step>
  currentStepIndex: number
}

const ProgressBar = ({ steps, currentStepIndex }: StepperProps) => {
  const progressWidth =
    steps.length > 1
      ? (Number(currentStepIndex) / (steps.length - 1)) * 100
      : steps.length === 1
        ? 100
        : 0
  return (
    <S.StepperWrapper>
      <S.ProgressLineContainer>
        <S.ActiveLine $progressWidth={progressWidth} />
      </S.ProgressLineContainer>
      {steps.length > 0 &&
        steps.map((step, index) => {
          const isActive = step.active || step.done || index <= currentStepIndex
          return (
            <S.StepItem key={step.step}>
              <S.Dot $isActive={isActive} />
              <S.Label $isActive={isActive}>{step.label}</S.Label>
            </S.StepItem>
          )
        })}
    </S.StepperWrapper>
  )
}

export default ProgressBar
