import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'

import { getSchoolDetails } from '@/features/management/domain/api'
import type { ExternalLink } from '@/features/management/domain/model'
import { managementKeys } from '@/features/management/domain/queryKeys'
import { useManagementMutations } from '@/features/management/hooks/useManagementMutations'
import { realUploadFile } from '@/shared/api/file/api'
import Close from '@/shared/assets/icons/close.svg?react'
import Edit from '@/shared/assets/icons/edit.svg?react'
import DefaultSchool from '@/shared/assets/icons/school.svg'
import type { LinkType } from '@/shared/constants/umc'
import { useCustomQuery } from '@/shared/hooks/customQuery'
import { useFile } from '@/shared/hooks/useFile'
import { theme } from '@/shared/styles/theme'
import type { Option } from '@/shared/types/form'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import { Modal } from '@/shared/ui/common/Modal'
import Section from '@/shared/ui/common/Section/Section'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'
import { TextField } from '@/shared/ui/form/LabelTextField/TextField'

import {
  ALLOWED_PROFILE_TYPES,
  FALLBACK_CONTENT_TYPE,
  MAX_PROFILE_SIZE,
  PROFILE_CATEGORY,
} from '../../../domain/schoolConstants'
import * as S from './EditSchoolModal.style'
import ExternalLinkEditor from './ExternalLinkEditor'

type EditSchoolForm = {
  schoolName: string
  remark: string
  linkTitle: string
  linkUrl: string
}

const EditSchoolModal = ({ onClose, schoolId }: { onClose: () => void; schoolId: string }) => {
  const [isOpen, setIsOpen] = useState(true)
  const queryClient = useQueryClient()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const previewUrlRef = useRef<string | null>(null)
  const initialDataRef = useRef<{
    schoolName: string
    remark: string
    links: Array<ExternalLink>
  }>({
    schoolName: '',
    remark: '',
    links: [],
  })
  const { useUploadFile, useConfirmUpload } = useFile()
  const uploadFileMutation = useUploadFile()
  const confirmUploadMutation = useConfirmUpload()
  const { data: schoolDetails, isLoading } = useCustomQuery(
    managementKeys.getSchoolDetails(schoolId),
    () => getSchoolDetails({ schoolId }),
  )
  const { usePatchSchool } = useManagementMutations()
  const { mutate: patchSchool, isPending: isPatchLoading } = usePatchSchool()
  const [openAddLink, setOpenAddLink] = useState(false)
  const [links, setLinks] = useState<Array<ExternalLink>>([])
  const [linkType, setLinkType] = useState<Option<string> | null>(null)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [profilePreview, setProfilePreview] = useState<string | null>(null)
  const [profileFileId, setProfileFileId] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const { register, reset, setValue, getValues, watch } = useForm<EditSchoolForm>({
    defaultValues: {
      schoolName: '',
      remark: '',
      linkTitle: '',
      linkUrl: '',
    },
  })
  const linkTitleValue = watch('linkTitle')
  const linkUrlValue = watch('linkUrl')
  const linkTitleField = register('linkTitle')
  const linkUrlField = register('linkUrl')

  useEffect(() => {
    if (!schoolDetails?.result) return
    const nextName = schoolDetails.result.schoolName
    const nextRemark = schoolDetails.result.remark ?? ''
    reset({
      schoolName: nextName,
      remark: nextRemark,
      linkTitle: '',
      linkUrl: '',
    })

    const providedLinks = (schoolDetails.result as { links?: Array<ExternalLink> }).links
    const resolvedLinks = Array.isArray(providedLinks) ? providedLinks : []
    setLinks(resolvedLinks)
    initialDataRef.current = {
      schoolName: nextName,
      remark: nextRemark,
      links: resolvedLinks,
    }
  }, [schoolDetails, reset])

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
    setIsUploading(true)

    try {
      const prepare = await uploadFileMutation.mutateAsync({
        fileName: file.name,
        contentType: file.type || FALLBACK_CONTENT_TYPE,
        fileSize: file.size,
        category: PROFILE_CATEGORY,
      })

      await realUploadFile(prepare.result.uploadUrl, file, file.type || FALLBACK_CONTENT_TYPE)
      await confirmUploadMutation.mutateAsync(prepare.result.fileId)
      setProfileFileId(prepare.result.fileId)
    } catch (error) {
      setProfileFileId(null)
      setProfilePreview(null)
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileWrapperClick = () => {
    if (isUploading) return
    fileInputRef.current?.click()
  }

  const handleStartAddLink = () => {
    setEditingIndex(null)
    setLinkType(null)
    setValue('linkTitle', '')
    setValue('linkUrl', '')
    setOpenAddLink(true)
  }

  const handleStartEditLink = (index: number) => {
    const target = links[index]
    setOpenAddLink(false)
    setEditingIndex(index)
    setValue('linkTitle', target.title)
    setValue('linkUrl', target.url)
  }

  const handleSubmitLink = () => {
    const { linkTitle, linkUrl } = getValues()
    const trimmedTitle = linkTitle.trim()
    const trimmedUrl = linkUrl.trim()
    if (!trimmedTitle || !trimmedUrl) return

    if (editingIndex !== null) {
      setLinks((prev) =>
        prev.map((link, index) =>
          index === editingIndex ? { ...link, title: trimmedTitle, url: trimmedUrl } : link,
        ),
      )
    } else {
      if (!linkType) return
      setLinks((prev) => [
        ...prev,
        { title: trimmedTitle, url: trimmedUrl, type: linkType.id as LinkType },
      ])
    }

    setValue('linkTitle', '')
    setValue('linkUrl', '')
    setLinkType(null)
    setEditingIndex(null)
    setOpenAddLink(false)
  }

  const handleRemoveLink = (index: number) => {
    setLinks((prev) => prev.filter((_, idx) => idx !== index))
    if (editingIndex === index) {
      setEditingIndex(null)
      setValue('linkTitle', '')
      setValue('linkUrl', '')
      setLinkType(null)
    } else if (editingIndex !== null && index < editingIndex) {
      setEditingIndex(editingIndex - 1)
    }
  }

  const handleCancelLinkEditor = () => {
    setEditingIndex(null)
    setValue('linkTitle', '')
    setValue('linkUrl', '')
    setLinkType(null)
    setOpenAddLink(false)
  }

  const handleSave = () => {
    const { schoolName, remark } = getValues()
    const trimmedName = schoolName.trim()
    const trimmedRemark = remark.trim()
    const nameChanged = trimmedName !== initialDataRef.current.schoolName
    const remarkChanged = trimmedRemark !== initialDataRef.current.remark
    const addedLinks = links.filter((link) => {
      const trimmedUrl = link.url.trim()
      return !initialDataRef.current.links.some(
        (initial) => initial.type === link.type && initial.url.trim() === trimmedUrl,
      )
    })
    const linksChanged = addedLinks.length > 0
    const imageChanged = Boolean(profileFileId)

    if (!nameChanged && !remarkChanged && !linksChanged && !imageChanged) {
      onClose()
      return
    }

    const body: {
      schoolName?: string
      remark?: string
      links?: Array<ExternalLink>
      logoImageId?: string
    } = {}

    if (nameChanged) body.schoolName = trimmedName
    if (remarkChanged) body.remark = trimmedRemark || undefined
    if (linksChanged) body.links = addedLinks
    if (imageChanged) body.logoImageId = profileFileId ?? undefined

    patchSchool(
      {
        schoolId,
        body: {
          ...body,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['schoolsPaging'] })
          queryClient.invalidateQueries({
            queryKey: managementKeys.getAllSchools,
          })
          queryClient.invalidateQueries({
            queryKey: managementKeys.getSchoolDetails(schoolId),
          })
          onClose()
        },
      },
    )
  }

  return (
    <Modal.Root
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        if (!open) onClose()
      }}
    >
      <Modal.Portal>
        <Modal.Overlay />

        <Modal.Content>
          <S.ModalContentWrapper
            flexDirection="column"
            padding="24px"
            width="520px"
            height={'fit-content'}
            maxHeight={'80vh'}
            maxWidth={'90vw'}
          >
            <Modal.Header>
              <Flex justifyContent="space-between" alignItems="center" width="100%">
                <Modal.Title asChild>
                  <S.ModalTitle>학교 정보 수정</S.ModalTitle>
                </Modal.Title>
                <Modal.Close asChild>
                  <S.ModalButton type="button" aria-label="모달 닫기">
                    <Close color={theme.colors.gray[300]} width={20} />
                  </S.ModalButton>
                </Modal.Close>
              </Flex>
            </Modal.Header>
            {isLoading || !schoolDetails ? (
              <Flex justifyContent="center" alignItems="center" css={{ padding: '32px 0' }}>
                <SuspenseFallback label="학교 정보를 불러오는 중입니다." />
              </Flex>
            ) : (
              <>
                <Section height="fit-content" variant="solid" css={{ marginTop: '16px' }}>
                  <Flex alignItems="center" justifyContent="center" gap={25}>
                    <S.ModalButton type="button" onClick={handleFileWrapperClick}>
                      <img
                        src={profilePreview ?? schoolDetails.result.logoImageLink ?? DefaultSchool}
                        alt="학교 이미지"
                        css={{
                          borderRadius: '50%',
                          width: '100px',
                          height: '100px',
                          objectFit: 'cover',
                          maxWidth: '100px',
                          maxHeight: '100px',
                          cursor: isUploading ? 'not-allowed' : 'pointer',
                        }}
                      />
                    </S.ModalButton>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      hidden
                      onChange={(event) => handleFileInputChange(event.target.files)}
                    />
                    <Flex flexDirection="column" alignItems="flex-start">
                      <Flex alignItems="center" gap={20}>
                        <S.Name>{schoolDetails.result.schoolName}</S.Name>
                        <S.Status>
                          <S.Circle />
                          활성
                        </S.Status>
                      </Flex>

                      <S.SubInfo>{schoolDetails.result.remark}</S.SubInfo>
                    </Flex>
                  </Flex>
                </Section>
                <Flex flexDirection="column">
                  <Flex flexDirection="column" gap={8}>
                    <S.Title>학교명</S.Title>
                    <TextField
                      type="text"
                      autoComplete="none"
                      placeholder="학교명을 입력해주세요"
                      {...register('schoolName')}
                    />
                  </Flex>
                  <Flex flexDirection="column" gap={8}>
                    <S.Title>비고</S.Title>
                    <TextField
                      type="text"
                      autoComplete="none"
                      placeholder="비고 (선택)"
                      {...register('remark')}
                    />
                  </Flex>
                  <Flex flexDirection="column" gap={12}>
                    <S.Title>외부 링크</S.Title>

                    <S.LinkPreviewList>
                      {links.map((link, index) =>
                        editingIndex === index ? (
                          <ExternalLinkEditor
                            key={`${link.type}-${link.url}-${index}`}
                            isOpen
                            mode="edit"
                            linkTitleValue={linkTitleValue}
                            linkUrlValue={linkUrlValue}
                            linkType={linkType}
                            onLinkTypeChange={setLinkType}
                            onSubmit={handleSubmitLink}
                            onCancel={handleCancelLinkEditor}
                            linkTitleField={linkTitleField}
                            linkUrlField={linkUrlField}
                          />
                        ) : (
                          <S.LinkPreviewItem key={`${link.type}-${link.url}-${index}`}>
                            <Flex gap={4} flexDirection="column" alignItems="flex-start">
                              <S.LinkTitleText>{link.title}</S.LinkTitleText>
                              <S.LinkUrlText>{link.url}</S.LinkUrlText>
                            </Flex>
                            <Flex width={'fit-content'} gap={14}>
                              <S.ModalButton
                                type="button"
                                aria-label="링크 수정"
                                onClick={() => handleStartEditLink(index)}
                              >
                                <Edit color={theme.colors.gray[400]} />
                              </S.ModalButton>
                              <S.ModalButton
                                type="button"
                                aria-label="링크 삭제"
                                onClick={() => handleRemoveLink(index)}
                              >
                                <Close color={theme.colors.gray[400]} width={20} />
                              </S.ModalButton>
                            </Flex>
                          </S.LinkPreviewItem>
                        ),
                      )}
                    </S.LinkPreviewList>

                    <ExternalLinkEditor
                      isOpen={openAddLink}
                      mode="add"
                      linkTitleValue={linkTitleValue}
                      linkUrlValue={linkUrlValue}
                      linkType={linkType}
                      onToggleOpen={handleStartAddLink}
                      onLinkTypeChange={setLinkType}
                      onSubmit={handleSubmitLink}
                      onCancel={handleCancelLinkEditor}
                      linkTitleField={linkTitleField}
                      linkUrlField={linkUrlField}
                    />
                  </Flex>
                </Flex>
              </>
            )}

            <Modal.Footer>
              <S.FooterWrapper>
                <Button typo="C3.Md" tone="necessary" label="학교 비활성화" />
                <Flex width={'fit-content'} gap={10}>
                  <Button typo="C3.Md" tone="gray" label="닫기" onClick={onClose} />
                  <Button
                    tone="lime"
                    typo="C3.Md"
                    variant="solid"
                    label="저장하기"
                    css={{ width: 'fit-content', padding: '6px 18px' }}
                    disabled={isPatchLoading}
                    onClick={handleSave}
                  />
                </Flex>
              </S.FooterWrapper>
            </Modal.Footer>
          </S.ModalContentWrapper>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  )
}
export default EditSchoolModal
