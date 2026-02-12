import { useState } from 'react'
import type { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'

import Plus from '@/shared/assets/icons/plus.svg?react'
import type { LinkType } from '@/shared/constants/umc'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import { Button } from '@/shared/ui/common/Button/Button'
import { Dropdown } from '@/shared/ui/common/Dropdown'
import { Flex } from '@/shared/ui/common/Flex'
import Label from '@/shared/ui/common/Label/Label'
import { LabelTextField } from '@/shared/ui/form/LabelTextField/LabelTextField'

import type { ExternalLink } from '../../domain/model'
import { LINK_TYPE_OPTIONS } from '../../domain/schoolConstants'
import type { AddSchoolForm } from '../../schemas/management'
import ExternalLinkCard from './ExternalLinkCard'
import * as S from './shared'

const ExternalLinksSection = ({
  onLinksChange,
  register,
  setValue,
  watch,
}: {
  onLinksChange: (links: Array<ExternalLink>) => void
  register: UseFormRegister<AddSchoolForm>
  setValue: UseFormSetValue<AddSchoolForm>
  watch: UseFormWatch<AddSchoolForm>
}) => {
  const [links, setLinks] = useState<Array<ExternalLink>>([])
  const [openAddLink, setOpenAddLink] = useState(false)
  const linkTitle = watch('linkTitle')
  const linkUrl = watch('linkUrl')
  const linkType = watch('linkType')

  const updateLinks = (updater: (prev: Array<ExternalLink>) => Array<ExternalLink>) => {
    setLinks((prev) => {
      const next = updater(prev)
      onLinksChange(next)
      return next
    })
  }

  const handleAddLink = () => {
    const trimmedTitle = linkTitle.trim()
    const trimmedUrl = linkUrl.trim()
    if (!trimmedTitle || !trimmedUrl || !linkType) return

    updateLinks((prev) => [
      ...prev,
      {
        title: trimmedTitle,
        url: trimmedUrl,
        type: linkType.id as LinkType,
      },
    ])
    setValue('linkTitle', '')
    setValue('linkUrl', '')
    setValue('linkType', null)
    setOpenAddLink(false)
  }

  const handleRemoveLink = (index: number) => {
    updateLinks((prev) => prev.filter((_, idx) => idx !== index))
  }

  return (
    <S.TextAreaWrapper alignItems="flex-start">
      <Label label="외부 링크" necessary={false} />
      <S.ExternalLinkWrapper>
        {links.length > 0 && (
          <S.LinkPreviewList>
            {links.map((link, index) => (
              <ExternalLinkCard
                key={`${link.url}-${index}`}
                link={link}
                onRemove={() => handleRemoveLink(index)}
              />
            ))}
          </S.LinkPreviewList>
        )}

        {!openAddLink && (
          <S.AddLink onClick={() => setOpenAddLink(!openAddLink)}>
            <span className="icon">
              <Plus color={theme.colors.lime} width={20} height={20} />
            </span>
            클릭하여 링크 추가
            <span className="description">카카오톡, 인스타그램, 유튜브 링크만 가능합니다.</span>
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
                {...register('linkTitle')}
              />
              <Dropdown
                placeholder="Type"
                options={LINK_TYPE_OPTIONS}
                value={linkType ?? undefined}
                onChange={(option) =>
                  setValue('linkType', {
                    id: String(option.id),
                    label: String(option.label),
                  })
                }
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
              {...register('linkUrl')}
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
  )
}

export default ExternalLinksSection
