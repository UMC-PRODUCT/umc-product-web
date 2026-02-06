import { useCallback, useMemo, useState } from 'react'

import Arrow from '@shared/assets/icons/arrow.svg?react'

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

  return (
    <S.AccountContent alignItems="flex-start">
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
      <Section variant="solid" maxHeight={540} gap={0} padding="12px 16px">
        <Table
          page={{
            currentPage: currentPage,
            totalPages: 100,
            onChangePage: handlePageChange,
          }}
          showFooter={true}
          label="챌린저를 클릭하면 상세 정보 및 권한을 수정할 수 있습니다."
          headerLabels={DELETE_ACCOUNT_TABLE_HEADER_LABEL}
          rows={pageItems}
          getRowId={(row) => row.id}
          activeRowId={activeRowId}
          onRowClick={(id) => setActiveRowId(id)}
          renderRow={(item) => (
            <>
              <TableStyles.Td>
                <Flex gap={20}>
                  <img
                    src="/src/shared/assets/icons/profile.svg"
                    alt={`${item.name} 프로필 이미지`}
                    css={{ width: 32, height: 32, borderRadius: '50%' }}
                  />
                  {item.name}
                </Flex>
              </TableStyles.Td>
              <TableStyles.Td>{item.nickname}</TableStyles.Td>
              <TableStyles.Td>{item.school}</TableStyles.Td>
              <TableStyles.Td>{item.generation}</TableStyles.Td>
              <TableStyles.Td>{item.part}</TableStyles.Td>
              <TableStyles.Td>
                <Flex gap={10} justifyContent="space-between">
                  {item.role}
                  <Arrow
                    onClick={() => setIsEditMode(true)}
                    width={20}
                    role="button"
                    css={{ transform: 'rotate(-90deg)', cursor: 'pointer' }}
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
    </S.AccountContent>
  )
}

export default DefaultEditView
