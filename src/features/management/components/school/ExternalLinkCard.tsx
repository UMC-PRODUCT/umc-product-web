import Close from '@/shared/assets/icons/close.svg?react'
import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'

import type { ExternalLink } from '../../domain/model'
import * as S from './shared'

const ExternalLinkCard = ({ link, onRemove }: { link: ExternalLink; onRemove: () => void }) => {
  return (
    <S.LinkPreviewItem>
      <Flex gap={4} flexDirection="column" alignItems="flex-start">
        <S.LinkTitleText>{link.title}</S.LinkTitleText>
        <S.LinkUrlText>{link.url}</S.LinkUrlText>
      </Flex>
      <button
        type="button"
        aria-label="링크 삭제"
        onClick={onRemove}
        css={{
          border: 'none',
          background: 'transparent',
          padding: 0,
          cursor: 'pointer',
        }}
      >
        <Close color={theme.colors.gray[400]} width={20} />
      </button>
    </S.LinkPreviewItem>
  )
}

export default ExternalLinkCard
