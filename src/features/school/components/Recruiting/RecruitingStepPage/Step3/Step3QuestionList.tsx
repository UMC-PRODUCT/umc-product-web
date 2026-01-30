import type { Control } from 'react-hook-form'

import type { PartType } from '@/features/auth/domain'
import type { RecruitingForms } from '@/shared/types/form'
import { Flex } from '@/shared/ui/common/Flex'

import QuestionList from '../../QuestionList/QuestionList'
import * as S from '../common'

type Step3QuestionListProps = {
  page: number
  control: Control<RecruitingForms>
  selectedPart: PartType | null
  isSelectedPartComplete: boolean
}

const Step3QuestionList = ({
  page,
  control,
  selectedPart,
  isSelectedPartComplete,
}: Step3QuestionListProps) => {
  if (page === 1 || page === 2) {
    return (
      <QuestionList
        key={`common-${page}`}
        control={control}
        target={{ kind: 'COMMON_PAGE', pageNo: page }}
      />
    )
  }
  if (page === 3 && selectedPart) {
    return (
      <QuestionList
        key={`part-${selectedPart}`}
        control={control}
        target={{ kind: 'PART', part: selectedPart, pageNo: page }}
        isLocked={isSelectedPartComplete}
      />
    )
  }
  return (
    <Flex flexDirection="column" alignItems="center" padding={'30px'}>
      <S.SubTitle>모집할 파트를 먼저 선택해 주세요.</S.SubTitle>
    </Flex>
  )
}

export default Step3QuestionList
