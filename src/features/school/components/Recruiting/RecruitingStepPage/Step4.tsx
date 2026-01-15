import type { Control } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import type { RecruitingForms } from '@/shared/types/form'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'
import LabelLongTextField from '@/shared/ui/form/LabelLongTextField/LabelLongTextField'
import { LabelTextField } from '@/shared/ui/form/LabelTextField/LabelTextField'

import * as S from './common'

const Step4 = ({ control }: { control: Control<RecruitingForms> }) => {
  return (
    <Flex flexDirection="column" gap={18}>
      <Section gap={29} variant="solid" flexDirection="column" alignItems="flex-start">
        <Flex gap={6} flexDirection="column" alignItems="flex-start">
          <S.Title>모집 공지 작성</S.Title>
          <S.SubTitle>
            지원자들에게 전달하고 싶은 내용을 작성하세요. (예: 지원 시 유의사항, 추후 변동 가능 일정
            등)
          </S.SubTitle>
        </Flex>
        <Controller
          name="noticeTitle"
          control={control}
          render={({ field, fieldState }) => (
            <LabelTextField
              {...field}
              type="text"
              autoComplete="none"
              label="공지 제목"
              placeholder="공지사항 제목을 입력하세요."
              error={{
                error: !!fieldState.error,
                errorMessage: fieldState.error?.message || '',
              }}
            />
          )}
        />
        <Controller
          name="noticeContent"
          control={control}
          render={({ field, fieldState }) => (
            <LabelLongTextField
              id="noticeContent"
              label="공지 내용"
              placeholder="공지사항 내용을 입력하세요."
              value={field.value}
              onChange={field.onChange}
              error={{
                error: !!fieldState.error,
                errorMessage: fieldState.error?.message || '',
              }}
            />
          )}
        ></Controller>
      </Section>
    </Flex>
  )
}

export default Step4
