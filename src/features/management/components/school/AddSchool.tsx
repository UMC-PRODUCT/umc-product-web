import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'

import Upload from '@/shared/assets/icons/arrow_up_circle.svg?react'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import { Button } from '@/shared/ui/common/Button/Button'
import { Flex } from '@/shared/ui/common/Flex'
import Label from '@/shared/ui/common/Label/Label'
import Section from '@/shared/ui/common/Section/Section'
import { LabelTextField } from '@/shared/ui/form/LabelTextField/LabelTextField'

import type { ExternalLink } from '../../domain/model'
import { useManagementMutations } from '../../hooks/useManagementMutations'
import { useSchoolProfileUpload } from '../../hooks/useSchoolProfileUpload'
import type { AddSchoolForm } from '../../schemas/management'
import { addSchoolSchema } from '../../schemas/management'
import RegisterConfirm from '../modals/SchoolRegisterConfirm/SchoolRegisterConfirm'
import ExternalLinksSection from './ExternalLinksSection'
import * as S from './shared'

type ModalState = {
  isOpen: boolean
  schoolName: string
  link: string
}

const AddSchool = () => {
  const { usePostSchool } = useManagementMutations()
  const { mutate: postSchool } = usePostSchool()
  const queryClient = useQueryClient()
  const linksRef = useRef<Array<ExternalLink>>([])
  const {
    fileInputRef,
    profilePreview,
    uploadProgress,
    profileFileId,
    handleFileInputChange,
    handleFileWrapperClick,
    handleRemoveProfile,
  } = useSchoolProfileUpload()
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    schoolName: '',
    link: '',
  })

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isValid, errors },
  } = useForm<AddSchoolForm>({
    mode: 'onChange',
    resolver: zodResolver(addSchoolSchema),
    defaultValues: {
      schoolName: '',
      remark: '',
      schoolProfile: undefined,
      linkTitle: '',
      linkUrl: '',
      linkType: null,
    },
  })

  const onSubmit = (data: AddSchoolForm) => {
    console.log('Submitting school data:', data)
    postSchool(
      {
        schoolName: data.schoolName,
        remark: data.remark,
        logoImageId: profileFileId || undefined,
        links: linksRef.current,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['schoolsPaging'] })
          setModal({
            isOpen: true,
            schoolName: data.schoolName,
            link: `/management/school?tab=edit`,
          })
        },
      },
    )
  }

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }))
  }

  const handleLinksChange = (nextLinks: Array<ExternalLink>) => {
    linksRef.current = nextLinks
  }
  return (
    <>
      <S.TabHeader alignItems="flex-start">
        <S.TabTitle>신규 학교 추가</S.TabTitle>
        <S.TabSubtitle>새로운 학교를 시스템에 등록합니다.</S.TabSubtitle>
      </S.TabHeader>
      <S.Form>
        <Section
          variant="solid"
          alignItems="flex-start"
          height="100%"
          css={{
            flexDirection: 'row',
            [media.down(theme.breakPoints.desktop)]: {
              width: '100%',
              flexDirection: 'column',
            },
          }}
        >
          <Flex
            gap={24}
            flexDirection="column"
            css={{ width: '50%', [media.down(theme.breakPoints.desktop)]: { width: '100%' } }}
          >
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
            <Flex flexDirection="column" alignItems="flex-start" gap={8}>
              <Label label="학교 프로필" necessary={false} />
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
                  accept="image/png,image/jpeg"
                  hidden
                />
                {profilePreview ? (
                  <Flex alignItems="center" gap={20} width="fit-content" flexDirection="row">
                    <img
                      src={profilePreview}
                      alt="학교 프로필 미리보기"
                      css={{ width: '120px', height: '120px', borderRadius: '50%' }}
                    />
                    <Flex flexDirection="column" gap={8}>
                      {uploadProgress !== null && (
                        <span className="file-notification">업로드 {uploadProgress}%</span>
                      )}
                      <Button
                        tone="gray"
                        variant="outline"
                        typo="C4.Md"
                        label="삭제"
                        onClick={(event) => {
                          event.stopPropagation()
                          void handleRemoveProfile()
                        }}
                        css={{ height: '28px', padding: '0 10px' }}
                      />
                    </Flex>
                  </Flex>
                ) : (
                  <>
                    <Flex alignItems="center" gap={8} width="fit-content" flexDirection="column">
                      <Upload />
                      <span className="main-text">클릭하여 이미지 업로드</span>
                    </Flex>
                    <span className="file-notification">PNG, JPG (최대 5MB)</span>
                  </>
                )}
              </S.FileWrapper>
            </Flex>
          </Flex>
          <Flex
            height="100%"
            minHeight={'100%'}
            flexDirection="column"
            alignItems="flex-start"
            gap={24}
            justifyContent="space-between"
            css={{ width: '50%', [media.down(theme.breakPoints.desktop)]: { width: '100%' } }}
          >
            <LabelTextField
              placeholder="학교에 대한 추가 정보를 입력하세요. (선택)"
              type="text"
              autoComplete="none"
              label="비고"
              necessary={false}
              {...register('remark')}
            />
            <ExternalLinksSection
              onLinksChange={handleLinksChange}
              register={register}
              setValue={setValue}
              watch={watch}
            />
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
