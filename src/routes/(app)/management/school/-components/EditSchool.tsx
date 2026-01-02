import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import * as S from '../School.style'
import { SchoolFormFields } from './SchoolFormFields'
import { EmptySelectionNotice } from './EmptySelectionNotice'
import type {SchoolRegisterForm} from '@/schema/management';
import Button from '@/components/common/Button/Button'
import {
  
  schoolRegisterSchema
} from '@/schema/management'
import useModalStore from '@/store/useModalStore'
import { MODAL_TYPES } from '@/components/common/Modal/ModalProvider'
import Dropdown from '@/components/common/Dropdown/Dropdown'
import { UNI_LIST_MOCK } from '@/mocks/mocks'

type SchoolOption = {
  id: string
  label: string
}

const REGISTERED_AT = '2026.01.15'

const formatDateToYMD = (date: Date) =>
  `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`

export default function EditSchool() {
  const { openModal } = useModalStore()
  const [open, setOpen] = useState(false)
  const [school, setSchool] = useState<SchoolOption | undefined>(undefined)
  const {
    register,
    handleSubmit,
    setValue,
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

  const handleSelectSchool = ({ id, label }: SchoolOption) => {
    setSchool({ id, label })
    setValue('schoolName', label, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  const updatedAt = formatDateToYMD(new Date())

  return (
    <>
      <S.TabHeader alignItems="flex-start">
        <S.TabTitle>학교 정보 수정</S.TabTitle>
        <S.TabSubtitle>
          수정할 학교를 선택하고 정보를 업데이트하세요.
        </S.TabSubtitle>
      </S.TabHeader>
      <S.FormCard>
        <S.DropdownWrapper alignItems="flex-start">
          <Dropdown
            options={UNI_LIST_MOCK}
            onClick={handleSelectSchool}
            placeholder="학교를 선택하세요."
            open={open}
            setOpen={setOpen}
            value={school}
          />
        </S.DropdownWrapper>
        {school ? (
          <SchoolFormFields
            register={register}
            errors={errors}
            registeredAt={REGISTERED_AT}
            updatedAt={updatedAt}
          />
        ) : (
          <EmptySelectionNotice />
        )}
        <S.SubmitButtonWrapper width="250px" height="41px" gap="20px">
          <Button
            type="submit"
            disabled={!isValid || !school}
            tone={!school ? 'darkGray' : 'gray'}
            label="초기화"
            onClick={handleSubmit(onSubmit)}
            typo="C2.Md"
          />
          <Button
            type="submit"
            disabled={!isValid || !school}
            tone={!school ? 'darkGray' : 'lime'}
            label="수정 완료"
            onClick={handleSubmit(onSubmit)}
            typo="C2.Md"
          />
        </S.SubmitButtonWrapper>
      </S.FormCard>
    </>
  )
}
