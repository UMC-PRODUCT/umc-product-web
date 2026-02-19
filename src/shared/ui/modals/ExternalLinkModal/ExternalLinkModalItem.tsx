import type { ChangeEvent, ReactNode } from 'react'

import Cancle from '@shared/assets/icons/close.svg?react'

import Edit from '@/shared/assets/icons/edit.svg?react'
import type { LinkType } from '@/shared/constants/umc'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import type { ExternalLink } from '@/shared/types/link'
import Flex from '@/shared/ui/common/Flex/Flex'
import LinkInput from '@/shared/ui/form/LinkInput/LinkInput'

import { Button } from '../../common/Button'
import * as S from './ExternalLinkModal.style'

type LocalExternalLink = ExternalLink & { id: string }

type ExternalLinkModalItemProps = {
  link: LocalExternalLink
  isEditing: boolean
  icon: ReactNode
  onChange: (id: string, key: 'title' | 'url' | 'type', value: string | LinkType) => void
  onToggleEdit: (id: string) => void
  onDelete: (id: string) => void
}

const buildRegister = (name: string, value: string, onChange: (next: string) => void) => ({
  name,
  value,
  onChange: (event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value),
  onBlur: () => undefined,
})

const ExternalLinkModalItem = ({
  link,
  isEditing,
  icon,
  onChange,
  onToggleEdit,
  onDelete,
}: ExternalLinkModalItemProps) => {
  return (
    <S.LinkCard $editing={isEditing}>
      {isEditing ? (
        <Flex flexDirection="column" gap="12px" width="100%">
          <Flex
            width="100%"
            css={{ gap: '18px', [media.down(theme.breakPoints.tablet)]: { gap: '12px' } }}
          >
            <S.LinkIconBox width={'fit-content'} $type={link.type}>
              {icon}
            </S.LinkIconBox>
            <Flex flexDirection="column" css={{ flex: 1, minWidth: 0 }} gap="10px">
              <LinkInput
                inputTypo="B2.Md"
                responsiveInputTypo={{ tablet: 'B3.Md', mobile: 'B4.Md' }}
                placeholder="타이틀"
                {...buildRegister(`edit-title-${link.id}`, link.title, (next) =>
                  onChange(link.id, 'title', next),
                )}
              />
              <LinkInput
                inputTypo="B4.Rg"
                responsiveInputTypo={{ tablet: 'C3.Rg', mobile: 'C4.Rg' }}
                placeholder="URL 주소를 입력하세요"
                {...buildRegister(`edit-url-${link.id}`, link.url, (next) =>
                  onChange(link.id, 'url', next),
                )}
              />
            </Flex>
          </Flex>
          <Flex gap="8px" justifyContent="flex-end">
            <Button
              label="완료"
              tone="lime"
              onClick={() => onToggleEdit(link.id)}
              css={{ width: '64px', height: '32px' }}
              typo="B4.Md"
            />
          </Flex>
        </Flex>
      ) : (
        <Flex alignItems="center" justifyContent="space-between" width="100%" gap="12px">
          <Flex gap="12px" alignItems="center" css={{ flex: 1, minWidth: 0 }}>
            <S.LinkIconBox width={'fit-content'} $type={link.type}>
              {icon}
            </S.LinkIconBox>
            <S.LinkTextGroup flexDirection="column" alignItems="flex-start">
              <S.LinkTitle>{link.title}</S.LinkTitle>
              <S.LinkUrl>{link.url}</S.LinkUrl>
            </S.LinkTextGroup>
          </Flex>
          <Flex gap="12px" width="fit-content">
            <Edit color={theme.colors.gray[300]} onClick={() => onToggleEdit(link.id)} />
            <Cancle color={theme.colors.gray[300]} width={24} onClick={() => onDelete(link.id)} />
          </Flex>
        </Flex>
      )}
    </S.LinkCard>
  )
}

export default ExternalLinkModalItem
