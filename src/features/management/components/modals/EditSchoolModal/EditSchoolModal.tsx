import { useState } from 'react'

import type { LinkItem, LinkTypeOption } from '@/features/management/domain/model'
import Close from '@/shared/assets/icons/close.svg?react'
import Plus from '@/shared/assets/icons/plus.svg?react'
import DefaultSchool from '@/shared/assets/icons/school.svg'
import { theme } from '@/shared/styles/theme'
import { Button } from '@/shared/ui/common/Button'
import { Dropdown } from '@/shared/ui/common/Dropdown'
import { Flex } from '@/shared/ui/common/Flex'
import { Modal } from '@/shared/ui/common/Modal'
import Section from '@/shared/ui/common/Section/Section'
import { LabelTextField } from '@/shared/ui/form/LabelTextField/LabelTextField'
import { TextField } from '@/shared/ui/form/LabelTextField/TextField'

import * as S from './EditSchoolModal.style'

const linkTypeOptions: Array<LinkTypeOption> = [
  { id: '1', label: 'KAKAO' },
  { id: '2', label: 'YOUTUBE' },
  { id: '3', label: 'INSTAGRAM' },
]

const EditSchoolModal = ({ onClose }: { onClose: () => void }) => {
  const [isOpen, setIsOpen] = useState(true)
  const [openAddLink, setOpenAddLink] = useState(false)
  const [links, setLinks] = useState<Array<LinkItem>>([])
  const [linkTitle, setLinkTitle] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const [linkType, setLinkType] = useState<LinkTypeOption | null>(null)

  const handleAddLink = () => {
    const trimmedTitle = linkTitle.trim()
    const trimmedUrl = linkUrl.trim()
    if (!trimmedTitle || !trimmedUrl || !linkType) return

    setLinks((prev) => [...prev, { title: trimmedTitle, url: trimmedUrl, type: linkType }])
    setLinkTitle('')
    setLinkUrl('')
    setLinkType(null)
    setOpenAddLink(false)
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
            <Section height="fit-content" variant="solid" css={{ marginTop: '32px' }}>
              <Flex alignItems="center" justifyContent="center" gap={25}>
                <img
                  src={DefaultSchool}
                  alt="학교 이미지"
                  css={{ borderRadius: '50%', width: '100px', height: '100px' }}
                />
                <Flex flexDirection="column" alignItems="flex-start">
                  <Flex alignItems="center" gap={20}>
                    <S.Name>UMC대학교</S.Name>
                    <S.Status>
                      <S.Circle />
                      활성
                    </S.Status>
                  </Flex>

                  <S.SubInfo>비고비고비고</S.SubInfo>
                </Flex>
              </Flex>
            </Section>
            <Flex flexDirection="column" gap={10}>
              <Flex flexDirection="column" gap={8}>
                <S.Title>학교명</S.Title>
                <TextField type="text" autoComplete="none" placeholder="학교명을 입력해주세요" />
              </Flex>
              <Flex flexDirection="column" gap={8}>
                <S.Title>비고</S.Title>
                <TextField type="text" autoComplete="none" placeholder="비고 (선택)" />
              </Flex>
              <Flex flexDirection="column" gap={8}>
                <S.Title>외부 링크</S.Title>
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

            <Modal.Footer>
              <S.FooterWrapper>
                <Button typo="C3.Md" tone="gray" label="닫기" onClick={onClose} />
                <Button
                  type="submit"
                  tone="lime"
                  typo="C3.Md"
                  variant="solid"
                  label="저장하기"
                  css={{ width: 'fit-content', padding: '6px 18px' }}
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
