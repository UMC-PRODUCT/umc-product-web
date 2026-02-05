import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/shared/ui/common/Button/Button'
import Label from '@/shared/ui/common/Label/Label'
import Section from '@/shared/ui/common/Section/Section'
import { LabelTextField } from '@/shared/ui/form/LabelTextField/LabelTextField'

import type { SchoolRegisterForm } from '../../schemas/management'
import { schoolRegisterSchema } from '../../schemas/management'
import RegisterConfirm from '../modals/SchoolRegisterConfirm/SchoolRegisterConfirm'
import * as S from './shared'

type ModalState = {
  isOpen: boolean
  schoolName: string
  link: string
}

const AddSchool = () => {
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    schoolName: '',
    link: '',
  })

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<SchoolRegisterForm>({
    mode: 'onChange',
    resolver: zodResolver(schoolRegisterSchema),
  })

  const onSubmit = (data: SchoolRegisterForm) => {
    setModal({
      isOpen: true,
      schoolName: data.schoolName,
      link: `/management/school/edit?school=${data.schoolName}`,
    })
  }

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }))
  }

  return (
    <>
      <S.TabHeader alignItems="flex-start">
        <S.TabTitle>신규 학교 추가</S.TabTitle>
        <S.TabSubtitle>새로운 학교를 시스템에 등록합니다.</S.TabSubtitle>
      </S.TabHeader>
      <S.Form>
        <Section variant="solid">
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
            <LabelTextField
              type="text"
              label="지부"
              autoComplete="off"
              placeholder="지부를 입력하세요."
              error={{
                error: !!errors.affiliated,
                errorMessage: errors.affiliated?.message || '',
              }}
              necessary={false}
              {...register('affiliated')}
            />
          </S.InputRow>
          <S.TextAreaWrapper alignItems="flex-start">
            <Label label="비고" necessary={false} />
            <S.TextArea placeholder="추가 정보를 입력하세요." {...register('note')} />
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
        </Section>
      </S.Form>

      {modal.isOpen && (
        <RegisterConfirm onClose={closeModal} schoolName={modal.schoolName} link={modal.link} />
      )}
    </>
  )
}

export default AddSchool
