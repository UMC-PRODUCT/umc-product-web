import { STEP_NAME } from '@features/school/domain'

import Section from '@/shared/ui/common/Section/Section'

import * as S from './CurrentStepInfo.style'

const CurrentStepInfo = ({ step }: { step: number }) => {
  return (
    <Section
      height={48}
      flexDirection="row"
      variant="solid"
      alignItems="center"
      justifyContent="space-between"
    >
      <S.Title>현재 단계: {STEP_NAME[step - 1].name}</S.Title>
      {step !== 5 && (
        <S.Description>
          * 필수 입력 필드를 모두 입력해야 다음 단계로 진행할 수 있습니다.
        </S.Description>
      )}
    </Section>
  )
}

export default CurrentStepInfo
