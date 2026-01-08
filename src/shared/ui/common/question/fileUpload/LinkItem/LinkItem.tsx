import Delete from '@/shared/assets/icons/delete.svg?react'
import { Flex } from '@/shared/ui/common/Flex'

import * as S from './LinkItem.style'
import { CancelIcon } from './LinkItem.style'

const LinkItem = ({
  value,
  onRemove,
  mode,
}: {
  value: string
  onRemove: () => void
  mode: 'view' | 'edit'
}) => {
  const isEditable = mode === 'edit'
  return (
    <Flex gap={10} width="100%" maxWidth={'100%'}>
      <S.Item>
        <span>{value}</span>
      </S.Item>
      <CancelIcon
        type="button"
        onClick={isEditable ? onRemove : undefined}
        disabled={!isEditable}
        css={{ cursor: isEditable ? 'pointer' : 'default' }}
      >
        <Delete width={18} height={18} />
      </CancelIcon>
    </Flex>
  )
}

export default LinkItem
