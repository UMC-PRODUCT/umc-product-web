import { useCallback, useMemo, useState } from 'react'

import DeleteConfirm from '@/features/management/components/modals/DeleteConfirm/DeleteConfirm'
import { DELETE_ACCOUNT_TABLE_HEADER_LABEL } from '@/features/management/domain/constants'
import {
  ACCOUNT_DELETE_MOCK,
  AFFILIATED_MOCK,
  ROLE_MOCK,
  STATUS_MOCK,
} from '@/features/management/mocks/managementMocks'
import * as S from '@/shared/styles/shared'
import type { Option } from '@/shared/types/form'
import { Badge } from '@/shared/ui/common/Badge/Badge'
import { Button } from '@/shared/ui/common/Button'
import { Checkbox } from '@/shared/ui/common/Checkbox/Checkbox'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'
import Table from '@/shared/ui/common/Table/Table'
import * as TableStyles from '@/shared/ui/common/Table/Table.style'
import { transformRoleKorean, transformStateKorean } from '@/shared/utils/transformKorean'

import { AccountFilters } from '../AccountFilters/AccountFilters'

type AffiliatedOption = Option<string>
type RoleOption = Option<string>
type StatusOption = Option<string>

type DeleteModalState = {
  isOpen: boolean
  name: string
  count: number
  onConfirm: () => void
}
const PAGE_SIZE = 5

const DefaultEditView = ({ setIsEditMode }: { setIsEditMode: (isEditMode: boolean) => void }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [affiliated, setAffiliated] = useState<AffiliatedOption | undefined>()
  const [role, setRole] = useState<RoleOption | undefined>()
  const [status, setStatus] = useState<StatusOption | undefined>()
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const [activeRowId, setActiveRowId] = useState<number | null>(null)
  const initialPage = useMemo(() => {
    const pageParam = new URLSearchParams(window.location.search).get('page')
    const parsed = Number(pageParam)
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 1
  }, [])
  const [page, setPage] = useState(initialPage)
  const totalAmounts = ACCOUNT_DELETE_MOCK.length
  const totalPages = Math.max(1, Math.ceil(totalAmounts / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return ACCOUNT_DELETE_MOCK.slice(start, start + PAGE_SIZE)
  }, [currentPage])

  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
    isOpen: false,
    name: '',
    count: 0,
    onConfirm: () => {},
  })

  const affiliatedOptions = useMemo<Array<AffiliatedOption>>(
    () => [
      { label: '-- 전체 지부 --', id: 0 },
      ...AFFILIATED_MOCK.filter((option) => option.id !== 0),
    ],
    [],
  )

  const roleOptions = useMemo<Array<RoleOption>>(
    () => [
      { label: '-- 전체 역할 --', id: 0 },
      ...ROLE_MOCK.filter((option) => option.id !== 0).map((option) => ({
        ...option,
        label: transformRoleKorean(option.label),
      })),
    ],
    [],
  )

  const statusOptions = useMemo<Array<StatusOption>>(
    () => [
      { label: '-- 전체 상태 --', id: 0 },
      ...STATUS_MOCK.filter((option) => option.id !== 0).map((option) => ({
        ...option,
        label: transformStateKorean(option.label),
      })),
    ],
    [],
  )

  const findAccountName = useCallback(
    (targetId?: number) => {
      const selectedId =
        targetId ?? (selectedIds.size ? Math.min(...Array.from(selectedIds)) : undefined)

      if (selectedId === undefined) return '계정 이름'

      const matched = ACCOUNT_DELETE_MOCK.find((account) => account.id === selectedId)
      return matched?.name ?? '계정 이름'
    },
    [selectedIds],
  )

  const openDeleteConfirm = useCallback(
    (targetId?: number) => {
      const count = targetId ? 1 : selectedIds.size
      if (count === 0) return

      setDeleteModal({
        isOpen: true,
        name: findAccountName(targetId),
        count,
        onConfirm: () => {
          // TODO: 선택된 계정 삭제 API 연동 (targetId ?? Array.from(selectedIds))
        },
      })
    },
    [findAccountName, selectedIds],
  )

  const closeDeleteModal = () => {
    setDeleteModal((prev) => ({ ...prev, isOpen: false }))
  }

  const handlePageChange = (nextPage: number) => {
    const safePage = Math.max(1, Math.min(nextPage, totalPages))
    setPage(safePage)
    const url = new URL(window.location.href)
    url.searchParams.set('page', String(safePage))
    window.history.replaceState(null, '', url.toString())
  }

  const toggleRow = (id: number) => {
    setSelectedIds((prev: Set<number>) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const toggleAll = (checked: boolean | 'indeterminate') => {
    setSelectedIds((prev) => {
      const pageIds = pageItems.map((item) => item.id)
      const next = new Set(prev)
      if (checked === true) {
        pageIds.forEach((id) => next.add(id))
        return next
      }
      pageIds.forEach((id) => next.delete(id))
      return next
    })
  }

  const buttonChildren = (
    <>
      <Button label="선택 취소" tone="gray" onClick={() => setSelectedIds(new Set())} />
      <Button label="선택한 계정 삭제" tone="necessary" onClick={() => openDeleteConfirm()} />
    </>
  )

  return (
    <S.TabHeader alignItems="flex-start">
      <S.TabTitle>계정 수정 및 삭제</S.TabTitle>
      <S.TabSubtitle>
        계정을 수정하거나 삭제할 수 있습니다. 삭제 시 복구가 불가능합니다.
      </S.TabSubtitle>
      <Section
        variant="solid"
        flexDirection="row"
        padding="12px 14px"
        margin="30px 0 16px 0"
        gap="12px"
      >
        <AccountFilters
          searchTerm={searchTerm}
          onChangeSearch={setSearchTerm}
          affiliated={affiliated}
          onSelectAffiliated={(option) => setAffiliated(option.id === 0 ? undefined : option)}
          affiliatedOptions={affiliatedOptions}
          role={role}
          onSelectRole={(option) => setRole(option.id === 0 ? undefined : option)}
          roleOptions={roleOptions}
          status={status}
          onSelectStatus={(option) => setStatus(option.id === 0 ? undefined : option)}
          statusOptions={statusOptions}
        />
      </Section>
      <Section variant="solid" maxHeight={540} gap={0} padding="12px 16px">
        <Table
          checkbox={{
            isAllChecked:
              pageItems.length > 0 && pageItems.every((item) => selectedIds.has(item.id)),
            onToggleAll: toggleAll,
          }}
          page={{
            currentPage: currentPage,
            totalPages: totalPages,
            onChangePage: handlePageChange,
          }}
          count={{
            totalAmounts: totalAmounts,
            label: '계정',
          }}
          headerLabels={DELETE_ACCOUNT_TABLE_HEADER_LABEL}
          buttonChildren={buttonChildren}
          rows={pageItems}
          getRowId={(row) => row.id}
          activeRowId={activeRowId}
          onRowClick={(id) => setActiveRowId(id)}
          renderRow={(item) => (
            <>
              <TableStyles.Td>
                <Checkbox
                  onCheckedChange={() => toggleRow(item.id)}
                  checked={selectedIds.has(item.id)}
                />
              </TableStyles.Td>
              <TableStyles.Td>{item.name}</TableStyles.Td>
              <TableStyles.Td>{item.email}</TableStyles.Td>
              <TableStyles.Td>{item.school}</TableStyles.Td>
              <TableStyles.Td>{item.branch}</TableStyles.Td>
              <TableStyles.Td>
                <Badge tone="gray" variant="solid" typo="B4.Sb">
                  {transformRoleKorean(item.role)}
                </Badge>
              </TableStyles.Td>
              <TableStyles.Td>
                <Badge
                  tone={
                    item.status === 'ACTIVE' ? 'lime' : item.status === 'PENDING' ? 'white' : 'gray'
                  }
                  variant="outline"
                  typo="B4.Md"
                >
                  {transformStateKorean(item.status)}
                </Badge>
              </TableStyles.Td>
              <TableStyles.Td>
                <Flex gap="10px">
                  <Button
                    key={`edit-${item.id}`}
                    label="수정"
                    tone="caution"
                    onClick={() => setIsEditMode(true)}
                    typo="C2.Md"
                    css={{ height: '28px', width: '57px' }}
                  />
                  <Button
                    key={`delete-${item.id}`}
                    label="삭제"
                    tone="necessary"
                    onClick={() => openDeleteConfirm(item.id)}
                    typo="C2.Md"
                    css={{ height: '28px', width: '57px' }}
                  />
                </Flex>
              </TableStyles.Td>
            </>
          )}
        />
      </Section>

      {deleteModal.isOpen && (
        <DeleteConfirm
          onClose={closeDeleteModal}
          name={deleteModal.name}
          type="account"
          count={deleteModal.count}
          onClick={deleteModal.onConfirm}
        />
      )}
    </S.TabHeader>
  )
}

export default DefaultEditView
