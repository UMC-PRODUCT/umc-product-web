import type { ReactNode } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { getSchoolLink } from '@/features/auth/domain/api'
import type { ExternalLink } from '@/features/auth/domain/types'
import { useManagementMutations } from '@/features/management/hooks/useManagementMutations'
import Close from '@/shared/assets/icons/close.svg?react'
import InstagramIcon from '@/shared/assets/social/instagram.svg?react'
import KakaoIcon from '@/shared/assets/social/kakao-talk.svg?react'
import YoutubeIcon from '@/shared/assets/social/youtube.svg?react'
import type { LinkType } from '@/shared/constants/umc'
import { useCustomQuery } from '@/shared/hooks/customQuery'
import { schoolKeys } from '@/shared/queryKeys'
import { useUserProfileStore } from '@/shared/store/useUserProfileStore'
import { theme } from '@/shared/styles/theme'
import type { Option } from '@/shared/types/form'
import AsyncBoundary from '@/shared/ui/common/AsyncBoundary/AsyncBoundary'
import { Dropdown } from '@/shared/ui/common/Dropdown'
import ErrorPage from '@/shared/ui/common/ErrorPage/ErrorPage'
import Flex from '@/shared/ui/common/Flex/Flex'
import { Modal } from '@/shared/ui/common/Modal'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'
import { TextField } from '@/shared/ui/form/LabelTextField/TextField'
import * as S from '@/shared/ui/modals/AccountModal/AccountModal.style'

import { Button } from '../../common/Button'

type AccountModalProps = {
  onClose: () => void
}

type LocalExternalLink = ExternalLink & { id: string }

const externalLinkIcons: Record<LinkType, ReactNode> = {
  KAKAO: <KakaoIcon width={20} height={20} />,
  INSTAGRAM: <InstagramIcon width={20} height={20} />,
  YOUTUBE: <YoutubeIcon width={20} height={20} />,
}

const linkTypeOptions: Array<Option<string>> = [
  { id: 'KAKAO', label: '카카오' },
  { id: 'INSTAGRAM', label: '인스타그램' },
  { id: 'YOUTUBE', label: '유튜브' },
]

const ExternalModalContent = () => {
  const queryClient = useQueryClient()
  const schoolId = useUserProfileStore((state) => state.schoolId)
  const { usePatchSchool } = useManagementMutations()
  const { mutate: patchSchool, isPending } = usePatchSchool()

  const { data } = useCustomQuery(
    schoolKeys.getSchoolLink(schoolId),
    () => getSchoolLink(schoolId),
    {
      enabled: Boolean(schoolId),
    },
  )

  const initialLinks = useMemo<Array<LocalExternalLink>>(() => {
    const links = data?.result ? data.result.links : []
    return links.map((link, index) => ({
      ...link,
      id: `${link.type}-${index}-${link.url}`,
    }))
  }, [data])

  const [links, setLinks] = useState<Array<LocalExternalLink>>(initialLinks)
  const [newLinkType, setNewLinkType] = useState<Option<string> | null>(null)
  const [newLinkTitle, setNewLinkTitle] = useState('')
  const [newLinkUrl, setNewLinkUrl] = useState('')
  const [editingIds, setEditingIds] = useState<Set<string>>(new Set())
  const [isAddOpen, setIsAddOpen] = useState(false)

  useEffect(() => {
    setLinks(initialLinks)
  }, [initialLinks])

  const handleChange = (id: string, key: 'title' | 'url' | 'type', value: string | LinkType) => {
    setLinks((prev) => prev.map((link) => (link.id === id ? { ...link, [key]: value } : link)))
  }

  const handleDelete = (id: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== id))
  }

  const handleEditToggle = (id: string) => {
    setEditingIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const handleSave = () => {
    if (!schoolId) return
    const payload = links
      .map((link) => ({
        type: link.type,
        url: link.url.trim(),
        title: link.title.trim(),
      }))
      .filter((item) => item.url.length > 0 && item.title.length > 0)

    patchSchool(
      { schoolId, body: { links: payload } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: schoolKeys.getSchoolLink(schoolId) })
        },
      },
    )
  }

  const handleAddLink = () => {
    if (!newLinkType || !newLinkTitle.trim() || !newLinkUrl.trim()) return
    setLinks((prev) => [
      ...prev,
      {
        id: `${newLinkType.id}-${Date.now()}`,
        type: newLinkType.id as LinkType,
        title: newLinkTitle.trim(),
        url: newLinkUrl.trim(),
      },
    ])
    setNewLinkType(null)
    setNewLinkTitle('')
    setNewLinkUrl('')
    setIsAddOpen(false)
  }

  return (
    <S.ContentWrapper flexDirection="column" gap="16px" width="100%" css={{ overflow: 'hidden' }}>
      <Flex flexDirection="column" gap="12px" width="100%">
        {links.map((link) => (
          <Flex
            key={link.id}
            flexDirection="column"
            width="100%"
            css={{
              padding: '16px',
              borderRadius: '12px',
              backgroundColor: theme.colors.gray[800],
              border: `1px solid ${editingIds.has(link.id) ? theme.colors.lime[500] : theme.colors.gray[800]}`,
            }}
          >
            {editingIds.has(link.id) ? (
              <Flex flexDirection="column" gap="12px" width="100%">
                <Flex gap="8px" width="100%">
                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    width={40}
                    css={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: theme.colors.gray[800],
                      borderRadius: '8px',
                      flexShrink: 0,
                    }}
                  >
                    {externalLinkIcons[link.type]}
                  </Flex>
                  <TextField
                    type="text"
                    autoComplete="off"
                    value={link.title}
                    onChange={(e) => handleChange(link.id, 'title', e.target.value)}
                    placeholder="타이틀"
                    css={{ flex: 1, minWidth: 0, '& input': { height: '40px', minWidth: 0 } }}
                  />
                </Flex>
                <TextField
                  type="text"
                  autoComplete="off"
                  value={link.url}
                  onChange={(e) => handleChange(link.id, 'url', e.target.value)}
                  placeholder="URL 주소를 입력하세요"
                  css={{ width: '100%', '& input': { height: '40px', minWidth: 0 } }}
                />
                <Flex gap="8px" justifyContent="flex-end">
                  <Button
                    label="완료"
                    tone="lime"
                    onClick={() => handleEditToggle(link.id)}
                    css={{ width: '64px', height: '32px' }}
                    typo="B4.Md"
                  />
                </Flex>
              </Flex>
            ) : (
              <Flex alignItems="center" justifyContent="space-between" width="100%" gap="12px">
                <Flex gap="12px" alignItems="center" css={{ flex: 1, minWidth: 0 }}>
                  <Flex
                    width={'fit-content'}
                    css={{
                      padding: '8px',
                      backgroundColor: theme.colors.gray[800],
                      borderRadius: '8px',
                      flexShrink: 0,
                    }}
                  >
                    {externalLinkIcons[link.type]}
                  </Flex>
                  <Flex
                    flexDirection="column"
                    alignItems="flex-start"
                    css={{ flex: 1, minWidth: 0 }}
                  >
                    <S.Subtitle
                      css={{
                        color: theme.colors.white,
                        fontWeight: 600,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {link.title}
                    </S.Subtitle>
                    <S.Subtitle
                      css={{
                        color: theme.colors.gray[400],
                        fontSize: '12px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        width: '100%',
                      }}
                    >
                      {link.url}
                    </S.Subtitle>
                  </Flex>
                </Flex>
                <Flex gap="6px" css={{ flexShrink: 0 }} width={'fit-content'}>
                  <Button
                    label="수정"
                    variant="outline"
                    tone="gray"
                    onClick={() => handleEditToggle(link.id)}
                    css={{ width: '48px', height: '28px' }}
                    typo="B4.Md"
                  />
                  <Button
                    label="삭제"
                    variant="outline"
                    tone="necessary"
                    onClick={() => handleDelete(link.id)}
                    css={{ width: '48px', height: '28px' }}
                    typo="B4.Md"
                  />
                </Flex>
              </Flex>
            )}
          </Flex>
        ))}
      </Flex>

      {isAddOpen && (
        <Flex
          flexDirection="column"
          gap="12px"
          width="100%"
          css={{
            padding: '16px',
            borderRadius: '12px',
            backgroundColor: theme.colors.gray[800],
            border: `1px solid ${theme.colors.gray[700]}`,
          }}
        >
          <Flex gap="8px" width="100%">
            <Dropdown
              options={linkTypeOptions}
              value={newLinkType ?? undefined}
              onChange={(option) => setNewLinkType(option)}
              placeholder="타입"
              css={{ width: '100px', flexShrink: 0, height: '40px' }}
              portal={false}
            />
            <TextField
              type="text"
              autoComplete="off"
              value={newLinkTitle}
              onChange={(e) => setNewLinkTitle(e.target.value)}
              placeholder="링크 제목"
              css={{
                flex: 1,
                minWidth: 0,
                height: '40px',
                '& input': { minWidth: 0 },
              }}
            />
          </Flex>
          <TextField
            type="text"
            autoComplete="off"
            value={newLinkUrl}
            onChange={(e) => setNewLinkUrl(e.target.value)}
            placeholder="URL (https://...)"
            css={{ width: '100%', height: '40px', '& input': { minWidth: 0 } }}
          />
          <Flex gap="8px" justifyContent="flex-end">
            <Button
              label="취소"
              variant="outline"
              tone="gray"
              onClick={() => setIsAddOpen(false)}
              css={{ width: '60px', height: '32px' }}
              typo="B4.Md"
            />
            <Button
              label="추가"
              tone="lime"
              onClick={handleAddLink}
              css={{ width: '60px', height: '32px' }}
              typo="B4.Md"
            />
          </Flex>
        </Flex>
      )}

      {!isAddOpen && (
        <Button
          label="+ 링크 추가하기"
          variant="outline"
          tone="gray"
          onClick={() => setIsAddOpen(true)}
          css={{ width: '100%', height: '44px', borderStyle: 'dashed' }}
        />
      )}

      <Button
        label={isPending ? '저장 중...' : '설정 저장하기'}
        variant="solid"
        typo="B4.Md"
        tone="lime"
        onClick={handleSave}
        disabled={isPending}
        css={{ width: '100px', height: '40px', marginTop: '8px', alignSelf: 'flex-end' }}
      />
    </S.ContentWrapper>
  )
}

const ExternalLinkModal = ({ onClose }: AccountModalProps) => {
  return (
    <Modal.Root open={true} onOpenChange={(open) => !open && onClose()}>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content
          onPointerDownOutside={(e) => e.preventDefault()}
          css={{ width: '480px', maxWidth: '90vw' }}
        >
          <S.ModalContentWrapper flexDirection="column" padding="24px">
            <Modal.Header>
              <Flex
                justifyContent="space-between"
                alignItems="flex-start"
                width="100%"
                css={{ marginBottom: '20px' }}
              >
                <Modal.Title asChild>
                  <S.TitleGroup>
                    <S.Title css={{ fontSize: '20px' }}>외부 링크 관리</S.Title>
                    <S.Subtitle css={{ whiteSpace: 'pre-line', marginTop: '8px' }}>
                      {`학교별 외부 링크를 관리할 수 있습니다.\n카카오/인스타그램/유튜브만 등록 가능합니다.`}
                    </S.Subtitle>
                  </S.TitleGroup>
                </Modal.Title>
                <Modal.Close asChild>
                  <S.ModalButton type="button">
                    <Close color={theme.colors.gray[400]} />
                  </S.ModalButton>
                </Modal.Close>
              </Flex>
            </Modal.Header>
            <Modal.Body>
              <AsyncBoundary
                fallback={<SuspenseFallback label="정보를 불러오고 있습니다..." />}
                errorFallback={(error, reset) => (
                  <ErrorPage
                    title="오류가 발생했습니다."
                    description={error.message}
                    onRetry={reset}
                  />
                )}
              >
                <ExternalModalContent />
              </AsyncBoundary>
            </Modal.Body>
          </S.ModalContentWrapper>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  )
}

export default ExternalLinkModal
