import { useCallback, useMemo, useState } from 'react'

import Search from '@/assets/icons/search.svg?react'
import { Button } from '@/components/common/Button/Button'
import type { Option } from '@/components/common/Dropdown/Dropdown'
import { Dropdown } from '@/components/common/Dropdown/Dropdown'
import Flex from '@/components/common/Flex/Flex'
import { TextField } from '@/components/form/LabelTextField/TextField'
import DeleteConfirm from '@/components/modal/AlertModal/DeleteConfirm/DeleteConfirm'
import { DeleteSchoolTableHeaderLabel } from '@/constants/tableHeaders'
import { AFFILIATED_MOCK, UNI_DELETE_MOCK } from '@/mocks/mocks'
import ManagementTable from '@/routes/(app)/management/-components/ManagementTable'
import { media } from '@/styles/media'
import { theme } from '@/styles/theme'

import * as S from '../School.style'
import DeleteTableRow from './DeleteTableRow'

type DeleteModalState = {
  isOpen: boolean
  name: string
  count: number
  onConfirm: () => void
}

export default function DeleteSchool() {
  const [searchTerm, setSearchTerm] = useState('')
  const [affiliated, setAffiliated] = useState<Option | undefined>()
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const initialPage = useMemo(() => {
    const pageParam = new URLSearchParams(window.location.search).get('page')
    const parsed = Number(pageParam)
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 1
  }, [])
  const [page, setPage] = useState(initialPage)
  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
    isOpen: false,
    name: '',
    count: 0,
    onConfirm: () => {},
  })

  const affiliatedOptions = useMemo(
    () => [
      { label: '-- 전체 지부 --', id: 0 },
      ...AFFILIATED_MOCK.filter((option) => option.id !== 0),
    ],
    [],
  )

  const findSchoolName = useCallback(
    (targetId?: number) => {
      const selectedId =
        targetId ??
        (selectedIds.size ? Math.min(...Array.from(selectedIds)) : undefined)

      if (selectedId === undefined) return '학교 이름'

      const matched = UNI_DELETE_MOCK.find((school) => school.id === selectedId)
      return matched?.name ?? '학교 이름'
    },
    [selectedIds],
  )

  const openDeleteConfirm = useCallback(
    (targetId?: number) => {
      const count = targetId ? 1 : selectedIds.size
      if (count === 0) return

      setDeleteModal({
        isOpen: true,
        name: findSchoolName(targetId),
        count,
        onConfirm: () => {
          // TODO: 선택된 학교 삭제 API 연동
          console.log('delete target', targetId ?? Array.from(selectedIds))
        },
      })
    },
    [findSchoolName, selectedIds],
  )

  const closeDeleteModal = () => {
    setDeleteModal((prev) => ({ ...prev, isOpen: false }))
  }

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage)
    const url = new URL(window.location.href)
    url.searchParams.set('page', String(nextPage))
    window.history.replaceState(null, '', url.toString())
  }

  const Buttons = () => {
    return (
      <>
        <Button
          label="선택 취소"
          tone="gray"
          onClick={() => setSelectedIds(new Set())}
        />
        <Button
          label="선택한 학교 삭제"
          tone="necessary"
          onClick={() => openDeleteConfirm()}
        />
      </>
    )
  }

  const toggleAll = () => {
    setSelectedIds((prev) => {
      if (prev.size === 5) return new Set()
      return new Set(UNI_DELETE_MOCK.map((item) => item.id))
    })
  }

  return (
    <>
      <S.TabHeader alignItems="flex-start">
        <S.TabTitle>학교 삭제</S.TabTitle>
        <S.TabSubtitle>
          삭제할 학교를 선택하세요. 삭제 시 복구가 불가능합니다.
        </S.TabSubtitle>
        <S.FilterWrapper>
          <Flex
            css={{
              maxWidth: '240px',
              [media.down(theme.breakPoints.tablet)]: {
                maxWidth: '100%',
              },
            }}
          >
            <TextField
              type="text"
              autoComplete="off"
              placeholder="학교명으로 검색"
              Icon={Search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Flex>
          <Flex
            css={{
              maxWidth: '240px',
              [media.down(theme.breakPoints.tablet)]: {
                maxWidth: '100%',
              },
            }}
          >
            <Dropdown
              options={affiliatedOptions}
              placeholder="전체 지부"
              value={affiliated}
              onChange={(option) =>
                setAffiliated(option.id === 0 ? undefined : option)
              }
            />
          </Flex>
        </S.FilterWrapper>
        <ManagementTable
          isAllChecked={selectedIds.size === 5}
          onToggleAll={() => toggleAll()}
          totalAmounts={UNI_DELETE_MOCK.length}
          headerLabels={DeleteSchoolTableHeaderLabel}
          type="school"
          currentPage={page}
          totalPages={5}
          onChangePage={handlePageChange}
          buttonChildren={<Buttons />}
        >
          <DeleteTableRow
            setSelectedIds={setSelectedIds}
            selectedIds={selectedIds}
            openDeleteConfirm={openDeleteConfirm}
          />
        </ManagementTable>
      </S.TabHeader>

      {deleteModal.isOpen && (
        <DeleteConfirm
          onClose={closeDeleteModal}
          name={deleteModal.name}
          type="school"
          count={deleteModal.count}
          onClick={deleteModal.onConfirm}
        />
      )}
    </>
  )
}
