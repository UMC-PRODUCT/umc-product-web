import { useMemo, useState } from 'react'

import Arrow from '@shared/assets/icons/arrow.svg?react'

import type { PartType } from '@/features/auth/domain'
import { DELETE_ACCOUNT_TABLE_HEADER_LABEL } from '@/features/management/domain/constants'
import { ACCOUNT_DELETE_MOCK } from '@/features/management/mocks/managementMocks'
import FilterBar from '@/features/school/components/SchoolEvaluation/FilterBar/FilterBar'
import DefaultProfile from '@/shared/assets/icons/profile.svg'
import Search from '@/shared/assets/icons/search.svg?react'
import useFilterOptions from '@/shared/hooks/useFilterOptions'
import {
  useChapterDropdown,
  useGisuDropdown,
  useSchoolDropdown,
} from '@/shared/hooks/useManagedDropdown'
import * as S from '@/shared/styles/shared'
import AsyncBoundary from '@/shared/ui/common/AsyncBoundary/AsyncBoundary'
import { Dropdown } from '@/shared/ui/common/Dropdown'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'
import Table from '@/shared/ui/common/Table/Table'
import * as TableStyles from '@/shared/ui/common/Table/Table.style'
import { TextField } from '@/shared/ui/form/LabelTextField/TextField'
import { transformPart } from '@/shared/utils/transformKorean'

import AccountDetail from '../../modals/AccountDetail/AccountDetail'

const PAGE_SIZE = 5
const EditAccountContent = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [part, setPart] = useState<PartType | undefined>()
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

  const chapterDropdown = useChapterDropdown({ includeAllOption: true })
  const schoolDropdown = useSchoolDropdown({ includeAllOption: true })
  const gisuDropdown = useGisuDropdown({ includeAllOption: true })
  const { options: partOptions } = useFilterOptions({
    label: '파트',
    options: [
      { id: 'PLAN', label: 'PLAN' },
      { id: 'DESIGN', label: 'DESIGN' },
      { id: 'ANDROID', label: 'ANDROID' },
      { id: 'IOS', label: 'IOS' },
      { id: 'WEB', label: 'WEB' },
      { id: 'SPRINGBOOT', label: 'SPRINGBOOT' },
      { id: 'NODEJS', label: 'NODEJS' },
    ],
    mapLabel: transformPart,
  })

  const handlePageChange = (nextPage: number) => {
    const safePage = Math.max(1, Math.min(nextPage, totalPages))
    setPage(safePage)
    const url = new URL(window.location.href)
    url.searchParams.set('page', String(safePage))
    window.history.replaceState(null, '', url.toString())
  }

  return (
    <S.AccountContent alignItems="flex-start">
      <FilterBar
        leftChild={
          <>
            <TextField
              type="text"
              autoComplete="off"
              placeholder="이름, 이메일, 학교로 검색"
              Icon={Search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              css={{ width: '252px', height: '54px' }}
            />
            {gisuDropdown.Dropdown}
            {chapterDropdown.Dropdown}
            {schoolDropdown.Dropdown}
            <Dropdown
              options={partOptions}
              placeholder="전체 파트"
              value={partOptions.find((option) => option.id === part)}
              onChange={(option) =>
                setPart(option.id === '0' ? undefined : (option.id as PartType))
              }
            />
            총 247명
          </>
        }
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
                    src={DefaultProfile}
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
                    onClick={() => setOpenModal(true)}
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
      {openModal && <AccountDetail onClose={() => setOpenModal(false)} />}
    </S.AccountContent>
  )
}

const EditAccount = () => {
  return (
    <AsyncBoundary
      fallback={
        <div style={{ minHeight: 480 }}>
          <SuspenseFallback label="계정 정보를 불러오는 중입니다." />
        </div>
      }
    >
      <EditAccountContent />
    </AsyncBoundary>
  )
}

export default EditAccount
