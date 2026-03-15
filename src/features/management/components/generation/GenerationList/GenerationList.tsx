import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { postGisuActivate } from '@/features/management/domain/api'
import { useGetGisuList } from '@/features/management/hooks/useManagementQueries'
import { formatDateToDot } from '@/features/management/utils/gisu'
import { useCustomMutation } from '@/shared/hooks/customQuery'
import { managementKeys } from '@/shared/queryKeys'
import { theme } from '@/shared/styles/theme'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import SectionTitle from '@/shared/ui/common/SectionTitles/SectionTitle'
import Table from '@/shared/ui/common/Table/Table'
import * as TableStyles from '@/shared/ui/common/Table/Table.style'

import ExistGeneration from '../../modals/ExistGeneration/ExistGenration'
import StateButton from '../../stateButton/StateButton'

const GenerationList = () => {
  const [page, setPage] = useState(0)
  const [isExistModalOpen, setIsExistModalOpen] = useState(false)
  const queryClient = useQueryClient()
  const { data } = useGetGisuList({ page: String(page), size: '20' })
  const { mutate: activateGisu, isPending: isActivating } = useCustomMutation(
    (gisuId: string) => postGisuActivate(gisuId),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: managementKeys.getGisuListBase })
        await queryClient.invalidateQueries({ queryKey: managementKeys.getAllGisu })
      },
    },
  )

  const rows = (data?.result.content ?? []).map((gisu) => ({
    id: gisu.gisuId,
    state: gisu.isActive,
    gisuName: gisu.gisu,
    duration: `${formatDateToDot(gisu.startAt)} ~ ${formatDateToDot(gisu.endAt)}`,
  }))

  return (
    <Flex flexDirection="column" gap={16} alignItems="flex-start">
      <SectionTitle title="기수 목록" />
      <Table
        headerLabels={['활성 상태', '기수', '활동 기간', '활성화']}
        rows={rows}
        getRowId={(row) => row.id}
        renderRow={(row) => (
          <>
            <TableStyles.Td>
              <StateButton label={row.state ? '활성' : '비활성'} isActive={row.state} />
            </TableStyles.Td>
            <TableStyles.Td css={{ ...theme.typography.C2.Sb }}>{row.gisuName}기</TableStyles.Td>
            <TableStyles.Td css={{ color: theme.colors.gray[300], ...theme.typography.C2.Md }}>
              {row.duration}
            </TableStyles.Td>
            <TableStyles.Td>
              <Button
                iconSize={15}
                typo="C2.Md"
                tone={row.state ? 'gray' : 'lime'}
                variant={row.state ? 'solid' : 'outline'}
                label={row.state ? '활성 중' : '활성화하기'}
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
      {isExistModalOpen && <ExistGeneration onClose={() => setIsExistModalOpen(false)} />}
    </Flex>
  )
}
export default GenerationList
