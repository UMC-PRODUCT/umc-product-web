import type { FieldErrors, UseFormRegister } from 'react-hook-form'

import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import Flex from '@/shared/ui/common/Flex/Flex'
import Label from '@/shared/ui/common/Label/Label'
import { LabelTextField } from '@/shared/ui/form/LabelTextField/LabelTextField'

import type { SchoolRegisterForm } from '../../schemas/management'
import * as S from './shared'

type SchoolFormFieldsProps = {
  register: UseFormRegister<SchoolRegisterForm>
  errors: FieldErrors<SchoolRegisterForm>
  registeredAt: string
  updatedAt: string
}

export const SchoolFormFields = ({
  register,
  errors,
  registeredAt,
  updatedAt,
}: SchoolFormFieldsProps) => {
  return (
    <S.Form>
      <S.InputRow>
        <LabelTextField
          type="text"
          label="학교명"
          autoComplete="off"
          placeholder="학교명을 입력하세요."
          error={{
            error: !!errors.schoolName,
            errorMessage: errors.schoolName?.message || '',
          }}
          {...register('schoolName')}
        />
      </S.InputRow>
      <S.TextAreaWrapper alignItems="flex-start">
        <Label label="비고" necessary={false} />
        <S.TextArea placeholder="추가 정보를 입력하세요." {...register('remark')} />
      </S.TextAreaWrapper>
      <Flex
        gap="42px"
        maxWidth="602px"
        css={{
          alignSelf: 'flex-start',
          [media.down(theme.breakPoints.tablet)]: { flexDirection: 'column' },
        }}
      >
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
