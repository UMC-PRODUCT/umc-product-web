import { useState } from 'react'

import Arrow from '@shared/assets/icons/arrow.svg?react'
import DefaultSchool from '@shared/assets/icons/school.svg'
import Search from '@shared/assets/icons/search.svg?react'

import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue'
import { Flex } from '@/shared/ui/common/Flex'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'
import Table from '@/shared/ui/common/Table/Table'
import * as TableStyles from '@/shared/ui/common/Table/Table.style'
import { TextField } from '@/shared/ui/form/LabelTextField/TextField'

import { useGetSchoolsPaging } from '../../hooks/useManagementQueries'
import EditSchoolModal from '../modals/EditSchoolModal/EditSchoolModal'
import SchoolStateButton from './SchoolStateButton'
import * as S from './shared'

const EditSchool = () => {
  const [page, setPage] = useState(0)
  const [open, setOpen] = useState(false)
  const [selectedSchoolId, setSelectedSchoolId] = useState<string | null>(null)
  const [searchInput, setSearchInput] = useState('')
  const { debouncedValue: debouncedSearch, flush } = useDebouncedValue(searchInput.trim(), 3000)

  const { data, isLoading } = useGetSchoolsPaging({
    page: String(page),
    size: '10',
    keyword: debouncedSearch,
  })
  return (
    <>
      <S.TabHeader alignItems="flex-start">
        <S.TabTitle>학교 정보 수정</S.TabTitle>
        <S.TabSubtitle>기존 등록된 학교의 정보를 수정할 수 있습니다.</S.TabSubtitle>
      </S.TabHeader>
      <Flex width={300}>
        <TextField
          type="text"
          placeholder="학교명으로 검색"
          autoComplete="none"
          Icon={Search}
          IconPlaced="left"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              setPage(0)
              flush(searchInput.trim())
            }
          }}
        />
      </Flex>
      {isLoading ? (
        <Flex justifyContent="center" alignItems="center" css={{ padding: '48px 0' }}>
          <SuspenseFallback label="학교 목록을 불러오는 중입니다." />
        </Flex>
      ) : (
        <Table
          headerLabels={['학교명', '비고', '상태']}
          showFooter={true}
          page={{
            currentPage: page,
            totalPages: data ? Number(data.result.totalPages) : 0,
            onChangePage: setPage,
          }}
          rows={data?.result.content ?? []}
          getRowId={(row) => row.schoolId}
          onRowClick={(id) => {
            setSelectedSchoolId(String(id))
            setOpen(true)
          }}
          renderRow={(row) => (
            <>
              <TableStyles.Td>
                <Flex alignItems="center" gap="12px">
                  <img
                    src={row.logoImageUrl ?? DefaultSchool}
                    alt="학교 로고"
                    css={{ width: '50px', height: '50px', borderRadius: '50%' }}
                  />
                  {row.schoolName}
                </Flex>
              </TableStyles.Td>
              <TableStyles.Td>{row.remark}</TableStyles.Td>
              <TableStyles.Td>
                <Flex justifyContent="space-between" alignItems="center">
                  <SchoolStateButton
                    isActive={row.isActive === true}
                    label={row.isActive ? '활성' : '비활성'}
                  />
                  <Arrow width={20} css={{ cursor: 'pointer', transform: 'rotate(-90deg)' }} />
                </Flex>
              </TableStyles.Td>
            </>
          )}
        />
      )}
      {open && selectedSchoolId && (
        <EditSchoolModal onClose={() => setOpen(false)} schoolId={selectedSchoolId} />
      )}
    </>
  )
}

export default EditSchool
