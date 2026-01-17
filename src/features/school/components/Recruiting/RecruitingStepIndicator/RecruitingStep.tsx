import { Flex } from '@/shared/ui/common/Flex'

import StepNumber from './StepNumber'

const RecruitingStepIndicator = ({ step }: { step: number }) => {
  return (
    <Flex>
      <StepNumber step={1} currentStep={step} />
      <StepNumber step={2} currentStep={step} />
      <StepNumber step={3} currentStep={step} />
      <StepNumber step={4} currentStep={step} />
      <StepNumber step={5} currentStep={step} />
    </Flex>
  )
}

export default RecruitingStepIndicator
