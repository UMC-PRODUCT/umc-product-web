import { STEP_NAME } from '@/features/school/constants/StepName'
import Check from '@/shared/assets/icons/check.svg?react'
import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'

import * as S from './StepNumber.style'

const StepNumber = ({ step, currentStep }: { step: number; currentStep: number }) => {
  return (
    <Flex flexDirection="column" gap={8}>
      {step >= currentStep ? (
        <S.Number isActive={step === currentStep} isConfirmed={false}>
          {step}
        </S.Number>
      ) : (
        <S.Number isActive={false} isConfirmed={true}>
          <Check color={theme.colors.lime} />
        </S.Number>
      )}
      <S.StepName isConfirmed={step < currentStep} isActive={step === currentStep}>
        {STEP_NAME[step - 1].name}
      </S.StepName>
    </Flex>
  )
}

export default StepNumber
