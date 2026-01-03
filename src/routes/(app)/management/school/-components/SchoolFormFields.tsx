import type { FieldErrors, UseFormRegister } from 'react-hook-form'

import Flex from '@/components/common/Flex/Flex'
import Label from '@/components/common/Label/Label'
import { LabelTextField } from '@/components/form/LabelTextField/LabelTextField'
import type { SchoolRegisterForm } from '@/schema/management'
import { theme } from '@/styles/theme'

import * as S from '../School.style'

type SchoolFormFieldsProps = {
  register: UseFormRegister<SchoolRegisterForm>
  errors: FieldErrors<SchoolRegisterForm>
  registeredAt: string
  updatedAt: string
}

export function SchoolFormFields({
  register,
  errors,
  registeredAt,
  updatedAt,
}: SchoolFormFieldsProps) {
  return (
    <S.Form>
      <S.InputRow>
        <LabelTextField
          type="text"
          label="학교명"
          autoComplete="off"
          placeholder="학교명을 입력하세요."
          css={S.inputStyle}
          error={{
            error: !!errors.schoolName,
            errorMessage: errors.schoolName?.message || '',
          }}
          {...register('schoolName')}
        />
        <LabelTextField
          type="text"
          label="지부"
          autoComplete="off"
          placeholder="지부를 입력하세요."
          css={S.inputStyle}
          error={{
            error: !!errors.affiliated,
            errorMessage: errors.affiliated?.message || '',
          }}
          necessary={false}
          {...register('affiliated')}
        />
      </S.InputRow>
      <S.TextAreaWrapper alignItems="flex-start">
        <Label label="비고" necessary={false}></Label>
        <S.TextArea
          placeholder="추가 정보를 입력하세요."
          {...register('note')}
        />
      </S.TextAreaWrapper>
      <Flex gap="42px" maxWidth="602px" css={{ alignSelf: 'flex-start' }}>
        <LabelTextField
          autoComplete="off"
          type="text"
          label="등록일"
          necessary={false}
          value={registeredAt}
          readOnly
          css={{ color: theme.colors.gray[400] }}
        />
        <LabelTextField
          autoComplete="off"
          type="text"
          label="최종 수정일"
          necessary={false}
          value={updatedAt}
          readOnly
          css={{ color: theme.colors.gray[400] }}
        />
      </Flex>
    </S.Form>
  )
}
