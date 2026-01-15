import type { Control } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import { PART } from '@/shared/constants/umc'
import type { RecruitingForms } from '@/shared/types/form'
import ErrorMessage from '@/shared/ui/common/ErrorMessage/ErrorMessage'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'
import { LabelTextField } from '@/shared/ui/form/LabelTextField/LabelTextField'

import * as S from './common'

const Step3 = ({ control }: { control: Control<RecruitingForms> }) => {
  return (
    <Flex flexDirection="column" gap={18}>
      <Section gap={29} variant="solid" flexDirection="column" alignItems="flex-start">
        <Flex gap={6} flexDirection="column" alignItems="flex-start">
          <S.Title>지원서 페이지 안내</S.Title>
          <S.SubTitle>지원서 페이지별 주제에 맞는 문항을 작성하세요.</S.SubTitle>
        </Flex>
      </Section>
    </Flex>
  )
}

export default Step3
