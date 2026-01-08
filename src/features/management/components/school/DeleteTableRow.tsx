import { UNI_DELETE_MOCK } from '@features/management/mocks/managementMocks'

import { Badge } from '@shared/ui/common/Badge/Badge'
import { Button } from '@shared/ui/common/Button/Button'
import { Checkbox } from '@shared/ui/common/Checkbox/Checkbox'

import * as S from './School.style'

const DeleteTableRow = ({
  setSelectedIds,
  selectedIds,
  openDeleteConfirm,
}: {
  setSelectedIds: React.Dispatch<React.SetStateAction<Set<number>>>
  selectedIds: Set<number>
  openDeleteConfirm: (targetId?: number) => void
}) => {
  return (
    <>
      {UNI_DELETE_MOCK.map((item) => (
        <tr key={item.id}>
          <S.Td>
            <Checkbox
              onCheckedChange={() => {
                setSelectedIds((prev: Set<number>) => {
                  const next = new Set(prev)
                  if (next.has(item.id)) {
                    next.delete(item.id)
                  } else {
                    next.add(item.id)
                  }
                  return next
                })
              }}
              checked={selectedIds.has(item.id)}
            />
          </S.Td>
          <S.Td>{item.name}</S.Td>
          <S.Td>{item.branch}</S.Td>
          <S.Td>{item.date}</S.Td>
          <S.Td>
            <Badge tone={item.status === '활성' ? 'lime' : 'gray'} variant="outline" typo="B4.Md">
              {item.status}
            </Badge>
          </S.Td>
          <S.Td>
            <Button
              key={item.id}
              label={'삭제'}
              tone={'necessary'}
              onClick={() => openDeleteConfirm(item.id)}
              typo="C2.Md"
            />
          </S.Td>
        </tr>
      ))}
    </>
  )
}

export default DeleteTableRow
