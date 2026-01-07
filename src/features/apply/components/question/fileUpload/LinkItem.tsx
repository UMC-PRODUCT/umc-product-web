import Delete from '@/shared/assets/icons/delete.svg?react'
import { Flex } from '@/shared/ui/common/Flex'

import * as S from './shared'
import { CancelIcon } from './shared'

export default function LinkItem({ value, onRemove }: { value: string; onRemove: () => void }) {
  return (
    <Flex gap={10} width="100%" maxWidth={'100%'}>
      <S.Item>
        <span>{value}</span>
      </S.Item>
      <CancelIcon type="button" onClick={onRemove}>
        <Delete width={18} height={18} />
      </CancelIcon>
    </Flex>
  )
}
