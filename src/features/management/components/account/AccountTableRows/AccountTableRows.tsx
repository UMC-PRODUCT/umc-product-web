import { Badge } from '@/shared/ui/common/Badge/Badge'
import { Button } from '@/shared/ui/common/Button/Button'
import { Checkbox } from '@/shared/ui/common/Checkbox/Checkbox'
import Flex from '@/shared/ui/common/Flex/Flex'
import { transformRoleKorean, transformStateKorean } from '@/shared/utils/transformKorean'

import { ACCOUNT_DELETE_MOCK } from '../../../mocks/managementMocks'
import * as S from './AccountTableRows.style'

type AccountTableRowsProps = {
  selectedIds: Set<number>
  toggleRow: (id: number) => void
  onDelete: (id: number) => void
  setIsEditMode: (isEditMode: boolean) => void
}

export const AccountTableRows = ({
  selectedIds,
  toggleRow,
  setIsEditMode,
  onDelete,
}: AccountTableRowsProps) => {
  return (
    <>
      {ACCOUNT_DELETE_MOCK.map((item) => (
        <tr key={item.id}>
          <S.Td>
            <Checkbox
              onCheckedChange={() => toggleRow(item.id)}
              checked={selectedIds.has(item.id)}
            />
          </S.Td>
          <S.Td>{item.name}</S.Td>
          <S.Td>{item.email}</S.Td>
          <S.Td>{item.school}</S.Td>
          <S.Td>{item.branch}</S.Td>
          <S.Td>
            <Badge tone="gray" variant="solid" typo="B4.Sb">
              {transformRoleKorean(item.role)}
            </Badge>
          </S.Td>
          <S.Td>
            <Badge
              tone={
                item.status === 'ACTIVE' ? 'lime' : item.status === 'PENDING' ? 'white' : 'gray'
              }
              variant="outline"
              typo="B4.Md"
            >
              {transformStateKorean(item.status)}
            </Badge>
          </S.Td>
          <S.Td>
            <Flex gap="10px">
              <Button
                key={`edit-${item.id}`}
                label="수정"
                tone="caution"
                onClick={() => setIsEditMode(true)}
                typo="C2.Md"
              />
              <Button
                key={`delete-${item.id}`}
                label="삭제"
                tone="necessary"
                onClick={() => onDelete(item.id)}
                typo="C2.Md"
              />
            </Flex>
          </S.Td>
        </tr>
      ))}
    </>
  )
}
