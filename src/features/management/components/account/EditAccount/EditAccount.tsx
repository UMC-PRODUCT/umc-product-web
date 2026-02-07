import { useMemo, useState } from 'react'

import Arrow from '@shared/assets/icons/arrow.svg?react'

import { DELETE_ACCOUNT_TABLE_HEADER_LABEL } from '@/features/management/domain/constants'
import {
  ACCOUNT_DELETE_MOCK,
  AFFILIATED_MOCK,
  GENERATIONS_MOCK,
  ROLE_MOCK,
  STATUS_MOCK,
} from '@/features/management/mocks/managementMocks'
import FilterBar from '@/features/school/components/SchoolEvaluation/FilterBar/FilterBar'
import DefaultProfile from '@/shared/assets/icons/profile.svg'
import Search from '@/shared/assets/icons/search.svg?react'
import useFilterOptions from '@/shared/hooks/useFilterOptions'
import * as S from '@/shared/styles/shared'
import type { Option } from '@/shared/types/form'
import { Dropdown } from '@/shared/ui/common/Dropdown'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'
import Table from '@/shared/ui/common/Table/Table'
import * as TableStyles from '@/shared/ui/common/Table/Table.style'
import { TextField } from '@/shared/ui/form/LabelTextField/TextField'
import { transformRoleKorean, transformStateKorean } from '@/shared/utils/transformKorean'

import AccountDetail from '../../modals/AccountDetail/AccountDetail'

type AffiliatedOption = Option<string>
type GenerationOption = Option<string>
type RoleOption = Option<string>
type StatusOption = Option<string>

const PAGE_SIZE = 5

const EditAccount = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [affiliated, setAffiliated] = useState<AffiliatedOption | undefined>()
  const [generation, setGeneration] = useState<GenerationOption | undefined>()
  const [role, setRole] = useState<RoleOption | undefined>()
  const [status, setStatus] = useState<StatusOption | undefined>()
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

  const { options: affiliatedOptions } = useFilterOptions({
    label: '지부',
    options: AFFILIATED_MOCK,
  })

  const { options: roleOptions } = useFilterOptions({
    label: '역할',
    options: ROLE_MOCK,
    mapLabel: transformRoleKorean,
  })

  const { options: statusOptions } = useFilterOptions({
    label: '상태',
    options: STATUS_MOCK,
    mapLabel: transformStateKorean,
  })

  const { options: generationOptions } = useFilterOptions({
    label: '기수',
    options: GENERATIONS_MOCK,
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
              css={{ width: '252px' }}
            />
            <Dropdown
              options={generationOptions}
              placeholder="전체 기수"
              value={generation}
              onChange={(option) => setGeneration(option.id === 0 ? undefined : option)}
            />
            <Dropdown
              options={affiliatedOptions}
              placeholder="전체 지부"
              value={affiliated}
              onChange={(option) => setAffiliated(option.id === 0 ? undefined : option)}
            />
            <Dropdown
              options={roleOptions}
              placeholder="전체 학교"
              value={role}
              onChange={(option) => setRole(option.id === 0 ? undefined : option)}
            />
            <Dropdown
              options={statusOptions}
              placeholder="전체 파트"
              value={status}
              onChange={(option) => setStatus(option.id === 0 ? undefined : option)}
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

export default EditAccount
