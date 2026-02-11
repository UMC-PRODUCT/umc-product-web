import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'

import { realUploadFile } from '@/shared/api/file/api'
import Upload from '@/shared/assets/icons/arrow_up_circle.svg?react'
import Close from '@/shared/assets/icons/close.svg?react'
import Plus from '@/shared/assets/icons/plus.svg?react'
import type { LinkType } from '@/shared/constants/umc'
import { useFile } from '@/shared/hooks/useFile'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import type { Option } from '@/shared/types/form'
import { Button } from '@/shared/ui/common/Button/Button'
import { Dropdown } from '@/shared/ui/common/Dropdown'
import { Flex } from '@/shared/ui/common/Flex'
import Label from '@/shared/ui/common/Label/Label'
import Section from '@/shared/ui/common/Section/Section'
import { LabelTextField } from '@/shared/ui/form/LabelTextField/LabelTextField'

import type { ExternalLink } from '../../domain/model'
import { useManagementMutations } from '../../hooks/useManagementMutations'
import type { SchoolRegisterForm } from '../../schemas/management'
import { schoolRegisterSchema } from '../../schemas/management'
import RegisterConfirm from '../modals/SchoolRegisterConfirm/SchoolRegisterConfirm'
import * as S from './shared'

type ModalState = {
  isOpen: boolean
  schoolName: string
  link: string
}

const MAX_PROFILE_SIZE = 5 * 1024 * 1024
const PROFILE_CATEGORY = 'SCHOOL_LOGO'
const ALLOWED_PROFILE_TYPES = new Set(['image/png', 'image/jpeg', 'image/jpg'])
const FALLBACK_CONTENT_TYPE = 'application/octet-stream'

const AddSchool = () => {
  const { usePostSchool } = useManagementMutations()
  const { mutate: postSchool } = usePostSchool()
  const queryClient = useQueryClient()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const previewUrlRef = useRef<string | null>(null)
  const { useUploadFile, useConfirmUpload, useDeleteFile } = useFile()
  const uploadFileMutation = useUploadFile()
  const confirmUploadMutation = useConfirmUpload()
  const deleteFileMutation = useDeleteFile()
  const [profilePreview, setProfilePreview] = useState<string | null>(null)
  const [profileFileId, setProfileFileId] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState<number | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [linkType, setLinkType] = useState<Option<string> | null>(null)
  const [links, setLinks] = useState<Array<ExternalLink>>([])
  const [linkTitle, setLinkTitle] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const [openAddLink, setOpenAddLink] = useState(false)
  const linkTypeOptions: Array<Option<string>> = [
    { id: 'KAKAO', label: '카카오' },
    { id: 'INSTAGRAM', label: '인스타그램' },
    { id: 'YOUTUBE', label: '유튜브' },
  ]
  const handleFileInputChange = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    const file = files[0]
    if (!ALLOWED_PROFILE_TYPES.has(file.type)) return
    if (file.size > MAX_PROFILE_SIZE) return

    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current)
    }
    const previewUrl = URL.createObjectURL(file)
    previewUrlRef.current = previewUrl
    setProfilePreview(previewUrl)
    setUploadProgress(0)
    setIsUploading(true)

    try {
      const prepare = await uploadFileMutation.mutateAsync({
        fileName: file.name,
        contentType: file.type || FALLBACK_CONTENT_TYPE,
        fileSize: file.size,
        category: PROFILE_CATEGORY,
      })

      await realUploadFile(
        prepare.result.uploadUrl,
        file,
        file.type || FALLBACK_CONTENT_TYPE,
        (p) => setUploadProgress(p),
      )
      await confirmUploadMutation.mutateAsync(prepare.result.fileId)
      setProfileFileId(prepare.result.fileId)
    } catch (error) {
      setProfileFileId(null)
      setUploadProgress(null)
      setProfilePreview(null)
    } finally {
      setIsUploading(false)
    }
  }
  const handleFileWrapperClick = () => {
    if (isUploading) return
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
    console.log('Submitting school data:', data)
    postSchool(
      {
        schoolName: data.schoolName,
        remark: data.remark,
        logoImageId: profileFileId || undefined,
        links: links,
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

  const handleAddLink = () => {
    const trimmedTitle = linkTitle.trim()
    const trimmedUrl = linkUrl.trim()
    if (!trimmedTitle || !trimmedUrl || !linkType) return

    setLinks((prev) => [
      ...prev,
      {
        title: trimmedTitle,
        url: trimmedUrl,
        type: linkType.id as LinkType,
      },
    ])
    setLinkTitle('')
    setLinkUrl('')
    setLinkType(null)
    setOpenAddLink(false)
  }

  const handleRemoveProfile = async () => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current)
      previewUrlRef.current = null
    }
    setProfilePreview(null)
    setUploadProgress(null)
    if (profileFileId) {
      await deleteFileMutation.mutateAsync(profileFileId)
      setProfileFileId(null)
    }
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
            width={'50%'}
            flexDirection="column"
            alignItems="flex-start"
            gap={24}
            justifyContent="space-between"
          >
            <LabelTextField
              placeholder="학교에 대한 추가 정보를 입력하세요. (선택)"
              type="text"
              autoComplete="none"
              label="비고"
              necessary={false}
              {...register('remark')}
            />
            <S.TextAreaWrapper alignItems="flex-start">
              <Label label="외부 링크" necessary={false} />
              <S.ExternalLinkWrapper>
                {links.length > 0 && (
                  <S.LinkPreviewList>
                    {links.map((link, index) => (
                      <S.LinkPreviewItem key={`${link.url}-${index}`}>
                        <Flex gap={4} flexDirection="column" alignItems="flex-start">
                          <S.LinkTitleText>{link.title}</S.LinkTitleText>
                          <S.LinkUrlText>{link.url}</S.LinkUrlText>
                        </Flex>
                        <Close color={theme.colors.gray[400]} width={20} />
                      </S.LinkPreviewItem>
                    ))}
                  </S.LinkPreviewList>
                )}

                {!openAddLink && (
                  <S.AddLink onClick={() => setOpenAddLink(!openAddLink)}>
                    <span className="icon">
                      <Plus color={theme.colors.lime} width={20} height={20} />
                    </span>
                    클릭하여 링크 추가
                    <span className="description">
                      카카오톡, 인스타그램, 유튜브 링크만 가능합니다.
                    </span>
                  </S.AddLink>
                )}
                {openAddLink && (
                  <Flex flexDirection="column" gap={8}>
                    <Flex
                      gap={8}
                      alignItems="flex-start"
                      margin={'16px 0 0 0'}
                      css={{
                        [media.down(theme.breakPoints.desktop)]: {
                          flexDirection: 'column',
                        },
                      }}
                    >
                      <LabelTextField
                        label="링크 제목"
                        type="text"
                        placeholder="링크의 제목을 입력하세요."
                        autoComplete="none"
                        css={{ height: 'fit-content' }}
                        value={linkTitle}
                        onChange={(event) => setLinkTitle(event.target.value)}
                      />
                      <Dropdown
                        placeholder="Type"
                        options={linkTypeOptions}
                        value={linkType ?? undefined}
                        onChange={(option) => setLinkType(option)}
                        css={{
                          maxWidth: '50px',
                          height: '50px',
                          marginTop: '26px',
                          [media.down(theme.breakPoints.desktop)]: {
                            maxWidth: '100%',
                            marginTop: '0',
                          },
                        }}
                      />
                    </Flex>
                    <LabelTextField
                      label="URL"
                      placeholder="URL 주소를 입력하세요."
                      type="text"
                      autoComplete="none"
                      css={{ marginTop: '16px' }}
                      value={linkUrl}
                      onChange={(event) => setLinkUrl(event.target.value)}
                    />
                    <Button
                      tone="lime"
                      typo="C3.Md"
                      label="링크 등록"
                      css={{ height: '30px', marginTop: '16px' }}
                      disabled={!linkTitle.trim() || !linkUrl.trim() || !linkType}
                      onClick={handleAddLink}
                    />
                  </Flex>
                )}
              </S.ExternalLinkWrapper>
            </S.TextAreaWrapper>
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
