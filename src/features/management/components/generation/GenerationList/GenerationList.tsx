import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import Notice from '@shared/assets/icons/notice.svg?react'
import Trash from '@shared/assets/icons/trash.svg?react'

import { postGisuActivate } from '@/features/management/domain/api'
import { useGetGisuList } from '@/features/management/hooks/useManagementQueries'
import { useCustomMutation } from '@/shared/hooks/customQuery'
import { theme } from '@/shared/styles/theme'
import { Button } from '@/shared/ui/common/Button'
import ErrorMessage from '@/shared/ui/common/ErrorMessage/ErrorMessage'
import { Flex } from '@/shared/ui/common/Flex'
import SectionTitle from '@/shared/ui/common/SectionTitles/SectionTitle'
import Table from '@/shared/ui/common/Table/Table'
import * as TableStyles from '@/shared/ui/common/Table/Table.style'

import DeleteGenerationConfirm from '../../modals/DeleteGenerationConfirm/DeleteGenerationConfirm'
import ExistGeneration from '../../modals/ExistGeneration/ExistGenration'

const formatDateToDot = (value: string) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}.${month}.${day}`
}

const GenerationList = () => {
  const [page, setPage] = useState(0)
  const [deleteTargetGisuId, setDeleteTargetGisuId] = useState<string | null>(null)
  const [isExistModalOpen, setIsExistModalOpen] = useState(false)
  const queryClient = useQueryClient()
  const { data } = useGetGisuList({ page: String(page), size: '20' })
  const { mutate: activateGisu, isPending: isActivating } = useCustomMutation(
    (gisuId: string) => postGisuActivate(gisuId),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['management', 'gisuList'] })
        await queryClient.invalidateQueries({ queryKey: ['management', 'gisu'] })
      },
    },
  )

  const rows = (data?.result.content ?? []).map((generation) => ({
    id: generation.gisuId,
    state: generation.isActive,
    gisuName: generation.generation,
    duration: `${formatDateToDot(generation.startAt)}~${formatDateToDot(generation.endAt)}`,
  }))

  return (
    <Flex flexDirection="column" gap={16} alignItems="flex-start">
      <Flex flexDirection="column" gap={2} alignItems="flex-start">
        <SectionTitle title="기수 목록 및 삭제" />
        <Flex gap={6}>
          <Notice color={theme.colors.necessary} width={18} />
          <ErrorMessage errorMessage="삭제된 기수는 복구할 수 없습니다." typo="C2.Sb" />
        </Flex>
      </Flex>
      <Table
        headerLabels={['활성 상태', '기수', '활동 기간', '활성화', '삭제']}
        rows={rows}
        getRowId={(row) => row.id}
        renderRow={(row) => (
          <>
            <TableStyles.Td>
              <span
                css={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '72px',
                  height: '30px',
                  padding: '0 12px',
                  borderRadius: '999px',
                  border: `1px solid ${row.state ? '#5CBF2F' : theme.colors.gray[600]}`,
                  backgroundColor: row.state ? '#273423' : theme.colors.gray[700],
                  color: row.state ? theme.colors.lime : theme.colors.gray[400],
                  ...theme.typography.C3.Md,
                }}
              >
                {row.state ? '활성' : '비활성'}
              </span>
            </TableStyles.Td>
            <TableStyles.Td css={{ ...theme.typography.C2.Sb }}>{row.gisuName}기</TableStyles.Td>
            <TableStyles.Td css={{ color: theme.colors.gray[300] }}>{row.duration}</TableStyles.Td>
            <TableStyles.Td>
              <Button
                iconSize={15}
                typo="C3.Md"
                tone={row.state ? 'gray' : 'lime'}
                variant={row.state ? 'solid' : 'outline'}
                label={row.state ? '활성 중' : '활성화 하기'}
                disabled={row.state || isActivating}
                css={{
                  width: '108px',
                  height: '38px',
                  padding: 0,
                  borderRadius: '10px',
                  color: row.state ? theme.colors.gray[500] : theme.colors.lime,
                  backgroundColor: row.state ? theme.colors.gray[700] : 'transparent',
                  border: row.state
                    ? `1px solid ${theme.colors.gray[600]}`
                    : `1px solid ${theme.colors.lime}`,
                  boxShadow: row.state ? 'none' : 'inset 0 0 0 1px rgba(149,239,75,0.18)',
                }}
                onClick={() => {
                  activateGisu(row.id, {
                    onError: () => {
                      setIsExistModalOpen(true)
                    },
                  })
                }}
              />
            </TableStyles.Td>
            <TableStyles.Td>
              <Button
                Icon={Trash}
                iconSize={15}
                typo="C2.Rg"
                tone="necessary"
                variant="outline"
                label="삭제"
                css={{ width: 'fit-content', padding: '7px 20px' }}
                onClick={() => setDeleteTargetGisuId(row.id)}
              />
            </TableStyles.Td>
          </>
        )}
        showFooter={true}
        count={{ totalAmounts: Number(data?.result.totalElements ?? 0), label: '기수' }}
        page={{
          currentPage: page + 1,
          totalPages: Number(data?.result.totalPages ?? 1),
          onChangePage: (nextPage) => setPage(nextPage - 1),
        }}
      />
      {deleteTargetGisuId && (
        <DeleteGenerationConfirm
          gisuId={deleteTargetGisuId}
          onClose={() => setDeleteTargetGisuId(null)}
        />
      )}
      {isExistModalOpen && <ExistGeneration onClose={() => setIsExistModalOpen(false)} />}
    </Flex>
  )
}
export default GenerationList
