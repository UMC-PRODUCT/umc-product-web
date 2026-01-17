import { useCallback, useMemo, useState } from 'react'

import SearchIcon from '@shared/assets/icons/search.svg?react'
import { media } from '@shared/styles/media'
import { theme } from '@shared/styles/theme'
import { Button } from '@shared/ui/common/Button/Button'
import { Dropdown } from '@shared/ui/common/Dropdown/Dropdown'
import Flex from '@shared/ui/common/Flex/Flex'
import { TextField } from '@shared/ui/form/LabelTextField/TextField'

import type { Option } from '@/shared/types/form'
import Section from '@/shared/ui/common/Section/Section'

import { DELETE_SCHOOL_TABLE_HEADER_LABEL } from '../../domain/constants'
import { AFFILIATED_MOCK, UNI_DELETE_MOCK } from '../../mocks/managementMocks'
import ManagementTable from '../common/ManagementTable'
import DeleteConfirmModal from '../modals/DeleteConfirm/DeleteConfirm'
import DeleteTableRow from './DeleteTableRow'
import * as S from './shared'

const ALL_BRANCHES_OPTION = { label: '-- 전체 지부 --', id: 0 }
const DEFAULT_SCHOOL_NAME = '학교 이름'
const TOTAL_PAGES = 5 // TODO: API 연동 시 서버에서 받아오도록 변경

interface DeleteConfirmModalState {
  isOpen: boolean
  schoolName: string
  selectedCount: number
  onConfirm: () => void
}

const INITIAL_MODAL_STATE: DeleteConfirmModalState = {
  isOpen: false,
  schoolName: '',
  selectedCount: 0,
  onConfirm: () => {},
}

function getInitialPageFromUrl(): number {
  const pageParam = new URLSearchParams(window.location.search).get('page')
  const parsedPage = Number(pageParam)
  return Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1
}

function updateUrlPageParam(pageNumber: number): void {
  const url = new URL(window.location.href)
  url.searchParams.set('page', String(pageNumber))
  window.history.replaceState(null, '', url.toString())
}

const DeleteSchool = () => {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectedBranch, setSelectedBranch] = useState<Option<string> | undefined>()
  const [selectedSchoolIds, setSelectedSchoolIds] = useState<Set<number>>(new Set())
  const [currentPage, setCurrentPage] = useState(() => getInitialPageFromUrl())
  const [deleteModalState, setDeleteModalState] =
    useState<DeleteConfirmModalState>(INITIAL_MODAL_STATE)

  const branchFilterOptions = useMemo(
    () => [ALL_BRANCHES_OPTION, ...AFFILIATED_MOCK.filter((option) => option.id !== 0)],
    [],
  )

  const findSchoolNameById = useCallback(
    (targetSchoolId?: number): string => {
      const schoolIdToFind =
        targetSchoolId ??
        (selectedSchoolIds.size > 0 ? Math.min(...Array.from(selectedSchoolIds)) : undefined)

      if (schoolIdToFind === undefined) {
        return DEFAULT_SCHOOL_NAME
      }

      const matchedSchool = UNI_DELETE_MOCK.find((school) => school.id === schoolIdToFind)
      return matchedSchool?.name ?? DEFAULT_SCHOOL_NAME
    },
    [selectedSchoolIds],
  )

  const closeDeleteModal = useCallback(() => {
    setDeleteModalState((previousState) => ({ ...previousState, isOpen: false }))
  }, [])

  const openDeleteConfirmModal = useCallback(
    (targetSchoolId?: number) => {
      const deleteCount = targetSchoolId ? 1 : selectedSchoolIds.size

      if (deleteCount === 0) return

      setDeleteModalState({
        isOpen: true,
        schoolName: findSchoolNameById(targetSchoolId),
        selectedCount: deleteCount,
        onConfirm: () => {
          const idsToDelete = targetSchoolId ?? Array.from(selectedSchoolIds)
          // TODO: 학교 삭제 API 연동
          console.log('삭제 대상 학교 ID:', idsToDelete)
          closeDeleteModal()
        },
      })
    },
    [closeDeleteModal, findSchoolNameById, selectedSchoolIds],
  )

  const handlePageChange = (nextPage: number) => {
    setCurrentPage(nextPage)
    updateUrlPageParam(nextPage)
  }

  const handleSearchKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value)
  }

  const handleBranchFilterChange = (selectedOption: Option<string>) => {
    const isAllBranchesSelected = selectedOption.id === 0
    setSelectedBranch(isAllBranchesSelected ? undefined : selectedOption)
  }

  const clearSelection = () => {
    setSelectedSchoolIds(new Set())
  }

  const toggleSelectAll = () => {
    setSelectedSchoolIds((previousIds) => {
      const isAllSelected = previousIds.size === UNI_DELETE_MOCK.length
      if (isAllSelected) {
        return new Set()
      }
      return new Set(UNI_DELETE_MOCK.map((school) => school.id))
    })
  }

  const isAllSchoolsSelected = selectedSchoolIds.size === UNI_DELETE_MOCK.length
  const totalSchoolCount = UNI_DELETE_MOCK.length

  const filterContainerStyle = {
    maxWidth: '240px',
    [media.down(theme.breakPoints.tablet)]: {
      maxWidth: '100%',
    },
  }

  const actionButtons = (
    <>
      <Button label="선택 취소" tone="gray" onClick={clearSelection} />
      <Button label="선택한 학교 삭제" tone="necessary" onClick={() => openDeleteConfirmModal()} />
    </>
  )

  return (
    <>
      <S.TabHeader alignItems="flex-start">
        <S.TabTitle>학교 삭제</S.TabTitle>
        <S.TabSubtitle>삭제할 학교를 선택하세요. 삭제 시 복구가 불가능합니다.</S.TabSubtitle>

        <Section
          variant="solid"
          padding="12px 14px"
          margin="30px 0 16px 0"
          gap="12px"
          css={{
            flexDirection: 'row',
            [media.down(theme.breakPoints.tablet)]: { flexDirection: 'column' },
          }}
        >
          <Flex css={filterContainerStyle}>
            <TextField
              type="text"
              autoComplete="off"
              placeholder="학교명으로 검색"
              Icon={SearchIcon}
              value={searchKeyword}
              onChange={handleSearchKeywordChange}
            />
          </Flex>

          <Flex css={filterContainerStyle}>
            <Dropdown
              options={branchFilterOptions}
              placeholder="전체 지부"
              value={selectedBranch}
              onChange={handleBranchFilterChange}
            />
          </Flex>
        </Section>

        <ManagementTable
          isAllChecked={isAllSchoolsSelected}
          onToggleAll={toggleSelectAll}
          totalAmounts={totalSchoolCount}
          headerLabels={DELETE_SCHOOL_TABLE_HEADER_LABEL}
          type="school"
          currentPage={currentPage}
          totalPages={TOTAL_PAGES}
          onChangePage={handlePageChange}
          buttonChildren={actionButtons}
        >
          <DeleteTableRow
            setSelectedIds={setSelectedSchoolIds}
            selectedIds={selectedSchoolIds}
            openDeleteConfirm={openDeleteConfirmModal}
          />
        </ManagementTable>
      </S.TabHeader>

      {deleteModalState.isOpen && (
        <DeleteConfirmModal
          onClose={closeDeleteModal}
          name={deleteModalState.schoolName}
          type="school"
          count={deleteModalState.selectedCount}
          onClick={deleteModalState.onConfirm}
        />
      )}
    </>
  )
}

export default DeleteSchool
