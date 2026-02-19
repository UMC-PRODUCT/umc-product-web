import { useEffect, useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { getSchoolLink } from '@/features/auth/domain/api'
import { useManagementMutations } from '@/features/management/hooks/useManagementMutations'
import InstagramIcon from '@/shared/assets/social/instagram_color.svg?react'
import KakaoIcon from '@/shared/assets/social/kakao.svg?react'
import YoutubeIcon from '@/shared/assets/social/youtube_color.svg?react'
import type { LinkType } from '@/shared/constants/umc'
import { useCustomQuery } from '@/shared/hooks/customQuery'
import { schoolKeys } from '@/shared/queryKeys'
import { useUserProfileStore } from '@/shared/store/useUserProfileStore'
import type { Option } from '@/shared/types/form'
import type { ExternalLink } from '@/shared/types/link'
import AsyncBoundary from '@/shared/ui/common/AsyncBoundary/AsyncBoundary'
import ErrorPage from '@/shared/ui/common/ErrorPage/ErrorPage'
import Flex from '@/shared/ui/common/Flex/Flex'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'
import LinkDropdown from '@/shared/ui/form/LinkDropdown/LinkDropdown'
import LinkInput from '@/shared/ui/form/LinkInput/LinkInput'

import { Button } from '../../common/Button'
import * as S from './ExternalLinkModal.style'
import ExternalLinkModalItem from './ExternalLinkModalItem'

type LocalExternalLink = ExternalLink & { id: string }

const externalLinkIcons: Record<LinkType, React.ReactNode> = {
  KAKAO: <KakaoIcon width={30} height={30} />,
  INSTAGRAM: <InstagramIcon width={52} height={52} />,
  YOUTUBE: <YoutubeIcon width={30} height={30} />,
}

const linkTypeOptions: Array<Option<string>> = [
  { id: 'KAKAO', label: '카카오' },
  { id: 'INSTAGRAM', label: '인스타그램' },
  { id: 'YOUTUBE', label: '유튜브' },
]

const normalizeLink = (link: Pick<ExternalLink, 'title' | 'type' | 'url'>) => ({
  type: link.type,
  title: link.title.trim(),
  url: link.url.trim(),
})

const createLinkKey = (link: Pick<ExternalLink, 'title' | 'type' | 'url'>) => {
  const { type, title, url } = normalizeLink(link)
  return `${type}|||${title}|||${url}`
}

const areLinksEqual = (left: Array<ExternalLink>, right: Array<ExternalLink>) => {
  if (left.length !== right.length) return false

  const toCountMap = (links: Array<ExternalLink>) => {
    const map = new Map<string, number>()
    links.forEach((link) => {
      const key = createLinkKey(link)
      map.set(key, (map.get(key) ?? 0) + 1)
    })
    return map
  }

  const leftMap = toCountMap(left)
  const rightMap = toCountMap(right)

  if (leftMap.size !== rightMap.size) return false

  for (const [key, leftCount] of leftMap.entries()) {
    if (rightMap.get(key) !== leftCount) return false
  }
  return true
}

const Content = ({ onClose }: { onClose: () => void }) => {
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
      .map((link) => normalizeLink(link))
      .filter((item) => item.url.length > 0 && item.title.length > 0)
    const initialPayload = initialLinks
      .map((link) => normalizeLink(link))
      .filter((item) => item.url.length > 0 && item.title.length > 0)
    const linksChanged = !areLinksEqual(payload, initialPayload)

    patchSchool(
      { schoolId, body: { links: linksChanged ? payload : null } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: schoolKeys.getSchoolLink(schoolId) })
          onClose()
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
    <S.ContentWrapper flexDirection="column" gap="16px" width="100%">
      <Flex flexDirection="column" gap="12px" width="100%">
        {links.map((link) => (
          <ExternalLinkModalItem
            key={link.id}
            link={link}
            isEditing={editingIds.has(link.id)}
            icon={externalLinkIcons[link.type]}
            onChange={handleChange}
            onToggleEdit={handleEditToggle}
            onDelete={handleDelete}
          />
        ))}
      </Flex>

      {isAddOpen && (
        <S.AddCard>
          <Flex gap="8px" width="100%" flexDirection="column">
            <Flex css={{ flex: 1, minWidth: 0 }} gap="10px">
              <LinkInput
                label="링크 제목"
                placeholder="링크 제목"
                name="new-link-title"
                value={newLinkTitle}
                onChange={(event) => setNewLinkTitle(event.target.value)}
              />
              <LinkDropdown
                options={linkTypeOptions}
                value={newLinkType}
                onChange={(option) => setNewLinkType(option)}
              />
            </Flex>
            <LinkInput
              label="URL"
              placeholder="URL (https://...)"
              name="new-link-url"
              value={newLinkUrl}
              onChange={(event) => setNewLinkUrl(event.target.value)}
            />
          </Flex>
          <Flex gap="8px" justifyContent="flex-end">
            <Button
              label="취소하기"
              variant="solid"
              tone="gray"
              onClick={() => setIsAddOpen(false)}
              css={{ width: '60px', height: '32px' }}
              typo="C5.Rg"
            />
            <Button
              label="저장하기"
              tone="lime"
              onClick={handleAddLink}
              css={{ width: '60px', height: '32px' }}
              typo="C5.Rg"
            />
          </Flex>
        </S.AddCard>
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

const ExternalLinkModalContent = ({ onClose }: { onClose: () => void }) => {
  return (
    <AsyncBoundary
      fallback={<SuspenseFallback label="정보를 불러오고 있습니다..." />}
      errorFallback={(error, reset) => (
        <ErrorPage title="오류가 발생했습니다." description={error.message} onRetry={reset} />
      )}
    >
      <Content onClose={onClose} />
    </AsyncBoundary>
  )
}

export default ExternalLinkModalContent
