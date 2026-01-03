import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/common/Button/Button'
import type { Option } from '@/components/common/Dropdown/Dropdown'
import { Dropdown } from '@/components/common/Dropdown/Dropdown'
import RegisterConfirm from '@/components/Modal/AlertModal/RegisterConfirm/RegisterConfirm'
import { UNI_LIST_MOCK } from '@/mocks/mocks'
import type { SchoolRegisterForm } from '@/schema/management'
import { schoolRegisterSchema } from '@/schema/management'

import * as S from '../School.style'
import { EmptySelectionNotice } from './EmptySelectionNotice'
import { SchoolFormFields } from './SchoolFormFields'

type SchoolOption = Option

type ModalState = {
  isOpen: boolean
  schoolName: string
  link: string
}

const REGISTERED_AT = '2026.01.15'

const formatDateToYMD = (date: Date) =>
  `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`

export default function EditSchool() {
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    schoolName: '',
    link: '',
  })
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
    setModal({
      isOpen: true,
      schoolName: data.schoolName,
      link: `/management/school/edit?school=${data.schoolName}`,
    })
    console.log(data)
  }

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }))
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
            onChange={handleSelectSchool}
            placeholder="학교를 선택하세요."
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

      {modal.isOpen && (
        <RegisterConfirm
          onClose={closeModal}
          schoolName={modal.schoolName}
          link={modal.link}
        />
      )}
    </>
  )
}
