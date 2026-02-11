import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import type { ExternalLink } from '@/features/management/domain/model'
import { managementKeys } from '@/features/management/domain/queryKeys'
import { useManagementMutations } from '@/features/management/hooks/useManagementMutations'
import Close from '@/shared/assets/icons/close.svg?react'
import Plus from '@/shared/assets/icons/plus.svg?react'
import DefaultSchool from '@/shared/assets/icons/school.svg'
import type { LinkType } from '@/shared/constants/umc'
import { useCustomQuery } from '@/shared/hooks/customQuery'
import { theme } from '@/shared/styles/theme'
import type { Option } from '@/shared/types/form'
import { Button } from '@/shared/ui/common/Button'
import { Dropdown } from '@/shared/ui/common/Dropdown'
import { Flex } from '@/shared/ui/common/Flex'
import { Modal } from '@/shared/ui/common/Modal'
import Section from '@/shared/ui/common/Section/Section'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'
import { LabelTextField } from '@/shared/ui/form/LabelTextField/LabelTextField'
import { TextField } from '@/shared/ui/form/LabelTextField/TextField'

import * as S from './EditSchoolModal.style'

const linkTypeOptions: Array<Option<string>> = [
  { id: 'KAKAO', label: '카카오' },
  { id: 'INSTAGRAM', label: '인스타그램' },
  { id: 'YOUTUBE', label: '유튜브' },
]

const EditSchoolModal = ({ onClose, schoolId }: { onClose: () => void; schoolId: string }) => {
  const [isOpen, setIsOpen] = useState(true)
  const queryClient = useQueryClient()
  const schoolQuery = managementKeys.getSchoolDetails(schoolId)
  const { data: schoolDetails, isLoading } = useCustomQuery(
    schoolQuery.queryKey,
    schoolQuery.queryFn,
  )
  const { usePatchSchool } = useManagementMutations()
  const { mutate: patchSchool, isPending: isPatchLoading } = usePatchSchool()
  const [openAddLink, setOpenAddLink] = useState(false)
  const [links, setLinks] = useState<Array<ExternalLink>>([])
  const [linkTitle, setLinkTitle] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const [linkType, setLinkType] = useState<Option<string> | null>(null)
  const [schoolName, setSchoolName] = useState('')
  const [remark, setRemark] = useState('')
  const [initialSchoolName, setInitialSchoolName] = useState('')
  const [initialRemark, setInitialRemark] = useState('')
  const [initialLinks, setInitialLinks] = useState<Array<ExternalLink>>([])

  useEffect(() => {
    if (!schoolDetails?.result) return
    const nextName = schoolDetails.result.schoolName
    const nextRemark = schoolDetails.result.remark ?? ''
    setSchoolName(nextName)
    setRemark(nextRemark)
    setInitialSchoolName(nextName)
    setInitialRemark(nextRemark)

    const providedLinks = (schoolDetails.result as { links?: Array<ExternalLink> }).links
    const resolvedLinks = Array.isArray(providedLinks) ? providedLinks : []
    setLinks(resolvedLinks)
    setInitialLinks(resolvedLinks)
  }, [schoolDetails])

  const handleAddLink = () => {
    const trimmedTitle = linkTitle.trim()
    const trimmedUrl = linkUrl.trim()
    if (!trimmedTitle || !trimmedUrl || !linkType) return

    setLinks((prev) => [
      ...prev,
      { title: trimmedTitle, url: trimmedUrl, type: linkType.id as LinkType },
    ])
    setLinkTitle('')
    setLinkUrl('')
    setLinkType(null)
    setOpenAddLink(false)
  }

  const handleRemoveLink = (index: number) => {
    setLinks((prev) => prev.filter((_, idx) => idx !== index))
  }

  const handleSave = () => {
    const trimmedName = schoolName.trim()
    const trimmedRemark = remark.trim()
    const nameChanged = trimmedName !== initialSchoolName
    const remarkChanged = trimmedRemark !== initialRemark
    const addedLinks = links.filter((link) => {
      const trimmedUrl = link.url.trim()
      return !initialLinks.some(
        (initial) => initial.type === link.type && initial.url.trim() === trimmedUrl,
      )
    })
    const linksChanged = addedLinks.length > 0

    if (!nameChanged && !remarkChanged && !linksChanged) {
      onClose()
      return
    }

    const body: {
      schoolName?: string
      remark?: string
      links?: Array<ExternalLink>
    } = {}

    if (nameChanged) body.schoolName = trimmedName
    if (remarkChanged) body.remark = trimmedRemark || undefined
    if (linksChanged) body.links = addedLinks

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
            queryKey: managementKeys.getSchoolDetails(schoolId).queryKey,
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
                <Section height="fit-content" variant="solid" css={{ marginTop: '32px' }}>
                  <Flex alignItems="center" justifyContent="center" gap={25}>
                    <img
                      src={DefaultSchool}
                      alt="학교 이미지"
                      css={{ borderRadius: '50%', width: '100px', height: '100px' }}
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
                <Flex flexDirection="column" gap={10}>
                  <Flex flexDirection="column" gap={8}>
                    <S.Title>학교명</S.Title>
                    <TextField
                      type="text"
                      autoComplete="none"
                      placeholder="학교명을 입력해주세요"
                      value={schoolName}
                      onChange={(event) => setSchoolName(event.target.value)}
                    />
                  </Flex>
                  <Flex flexDirection="column" gap={8}>
                    <S.Title>비고</S.Title>
                    <TextField
                      type="text"
                      autoComplete="none"
                      placeholder="비고 (선택)"
                      value={remark}
                      onChange={(event) => setRemark(event.target.value)}
                    />
                  </Flex>
                  <Flex flexDirection="column" gap={8}>
                    <S.Title>외부 링크</S.Title>

                    <S.LinkPreviewList>
                      {links.map((link, index) => (
                        <S.LinkPreviewItem key={`${link.type}-${link.url}-${index}`}>
                          <Flex gap={4} flexDirection="column" alignItems="flex-start">
                            <S.LinkTitleText>{link.title}</S.LinkTitleText>
                            <S.LinkUrlText>{link.url}</S.LinkUrlText>
                          </Flex>
                          <S.ModalButton
                            type="button"
                            aria-label="링크 삭제"
                            onClick={() => handleRemoveLink(index)}
                          >
                            <Close color={theme.colors.gray[400]} width={20} />
                          </S.ModalButton>
                        </S.LinkPreviewItem>
                      ))}
                    </S.LinkPreviewList>

                    {!openAddLink && (
                      <S.AddLink onClick={() => setOpenAddLink(!openAddLink)}>
                        <span>
                          <Plus color={theme.colors.lime} width={20} height={20} />
                        </span>
                        링크 추가
                      </S.AddLink>
                    )}
                    {openAddLink && (
                      <Flex flexDirection="column" gap={8}>
                        <Flex gap={8} alignItems="flex-end" margin={'16px 0 2px 0'}>
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
                            onChange={setLinkType}
                            css={{ width: '55px', height: '50px' }}
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
                  </Flex>
                </Flex>
              </>
            )}

            <Modal.Footer>
              <S.FooterWrapper>
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
              </S.FooterWrapper>
            </Modal.Footer>
          </S.ModalContentWrapper>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  )
}
export default EditSchoolModal
