import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import Upload from '@/shared/assets/icons/arrow_up_circle.svg?react'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import { Button } from '@/shared/ui/common/Button/Button'
import { Flex } from '@/shared/ui/common/Flex'
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
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileInputChange = (files: FileList | null) => {
    if (!files || files.length === 0) return
  }
  const handleFileWrapperClick = () => {
    fileInputRef.current?.click()
  }
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
        <Section variant="solid" flexDirection="row" alignItems="flex-start" height="100%">
          <Flex width={'50%'} gap={24} flexDirection="column">
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
            <S.FileWrapper
              alignItems="center"
              justifyContent="center"
              gap={6}
              flexDirection="column"
              onClick={handleFileWrapperClick}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={(event) => handleFileInputChange(event.target.files)}
                multiple
                hidden
              />
              <Flex alignItems="center" gap={8} width="fit-content">
                <Upload />
                <span className="main-text">클릭하여 이미지 업로드</span>
              </Flex>
              <span className="file-notification">PNG, JPG (최대 5MB)</span>
            </S.FileWrapper>
            <S.TextAreaWrapper alignItems="flex-start">
              <Label label="비고" necessary={false} />
              <S.TextArea placeholder="추가 정보를 입력하세요. (선택)" {...register('note')} />
            </S.TextAreaWrapper>
          </Flex>
          <Flex
            height="100%"
            minHeight={'100%'}
            width={'50%'}
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Flex flexDirection="column" gap={4} alignItems="flex-start">
              <Label label="미리보기" />
              <Section
                variant="outline"
                height="280px"
                css={{ backgroundColor: theme.colors.black, borderColor: theme.colors.gray[600] }}
              >
                <Section
                  variant="solid"
                  flexDirection="row"
                  gap={20}
                  height="120px"
                  padding="10px 20px"
                  css={{
                    flexWrap: 'wrap',
                    [media.down(theme.breakPoints.tablet)]: {
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  }}
                >
                  <S.SchoolProfile src="https://avatars.githubusercontent.com/u/111187984?v=4" />
                  <S.SchoolProfileInfo>
                    <h3>학교명</h3>
                    <p>비고: 서울 캠퍼스</p>
                    <button>
                      <div />
                      활성
                    </button>
                  </S.SchoolProfileInfo>
                </Section>
              </Section>
            </Flex>
            <S.SubmitButtonWrapper width="120px" height="41px">
              <Button
                type="submit"
                disabled={!isValid}
                tone="lime"
                label="학교 추가"
                onClick={handleSubmit(onSubmit)}
                typo="C2.Md"
              />
            </S.SubmitButtonWrapper>
          </Flex>
        </Section>
      </S.Form>

      {modal.isOpen && (
        <RegisterConfirm onClose={closeModal} schoolName={modal.schoolName} link={modal.link} />
      )}
    </>
  )
}

export default AddSchool
