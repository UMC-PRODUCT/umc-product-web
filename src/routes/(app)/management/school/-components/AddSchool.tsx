import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as S from '../School.style'
import type { SchoolRegisterForm } from '@/schema/management'
import Button from '@/components/common/Button/Button'
import Label from '@/components/common/Label/Label'
import { LabelTextField } from '@/components/common/LabelTextField/LabelTextField'
import { schoolRegisterSchema } from '@/schema/management'
import useModalStore from '@/store/useModalStore'
import { MODAL_TYPES } from '@/components/common/Modal/ModalProvider'

export default function AddSchool() {
  const { openModal } = useModalStore()
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<SchoolRegisterForm>({
    mode: 'onChange',
    resolver: yupResolver(schoolRegisterSchema),
  })

  const onSubmit = (data: SchoolRegisterForm) => {
    openModal({
      modalType: MODAL_TYPES.RegisterConfirm,
      modalProps: {
        schoolName: data.schoolName,
        link: `/management/school/edit?school=${data.schoolName}`,
      },
    })
    console.log(data)
  }
  return (
    <>
      <S.TabHeader alignItems="flex-start">
        <S.TabTitle>신규 학교 추가</S.TabTitle>
        <S.TabSubtitle>새로운 학교를 시스템에 등록합니다.</S.TabSubtitle>
      </S.TabHeader>
      <S.Form>
        <S.FormCard>
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
          <S.SubmitButtonWrapper width="120px" height="41px">
            <Button
              type="submit"
              disabled={!isValid}
              tone="lime"
              label="등록하기"
              onClick={handleSubmit(onSubmit)}
              typo="C2.Md"
            />
          </S.SubmitButtonWrapper>
        </S.FormCard>
      </S.Form>
    </>
  )
}
