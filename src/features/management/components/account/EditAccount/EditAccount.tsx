import { useMemo, useState } from 'react'

import Arrow from '@shared/assets/icons/arrow.svg?react'

import type { PartType } from '@/features/auth/domain'
import { DELETE_ACCOUNT_TABLE_HEADER_LABEL } from '@/features/management/domain/constants'
import { useGetChallenger } from '@/features/management/hooks/useManagementQueries'
import FilterBar from '@/features/school/components/SchoolEvaluation/FilterBar/FilterBar'
import DefaultProfile from '@/shared/assets/icons/profile.svg'
import Search from '@/shared/assets/icons/search.svg?react'
import { PART_LIST } from '@/shared/constants/part'
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue'
import {
  useChapterDropdown,
  useGisuDropdown,
  usePartDropdown,
  useSchoolDropdown,
} from '@/shared/hooks/useManagedDropdown'
import * as S from '@/shared/styles/shared'
import type { RoleType } from '@/shared/types/umc'
import AsyncBoundary from '@/shared/ui/common/AsyncBoundary/AsyncBoundary'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'
import Table from '@/shared/ui/common/Table/Table'
import * as TableStyles from '@/shared/ui/common/Table/Table.style'
import { TextField } from '@/shared/ui/form/LabelTextField/TextField'
import { transformPart, transformRoleKorean } from '@/shared/utils/transformKorean'

import AccountDetail from '../../modals/AccountDetail/AccountDetail'

const SEARCH_DEBOUNCE_MS = 500

const EditAccountContent = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [activeRowId, setActiveRowId] = useState<string | null>(null)
  const [selectedChallengerId, setSelectedChallengerId] = useState<string | null>(null)
  const [selectedRoleType, setSelectedRoleType] = useState<RoleType | null>(null)
  const initialPage = useMemo(() => {
    const pageParam = new URLSearchParams(window.location.search).get('page')

    return pageParam && Number(pageParam) > 0 ? Number(pageParam) - 1 : 0
  }, [])
  const { debouncedValue: debouncedSearch } = useDebouncedValue(
    searchTerm.trim(),
    SEARCH_DEBOUNCE_MS,
  )

  const [page, setPage] = useState<number>(initialPage)

  const chapterDropdown = useChapterDropdown({ includeAllOption: true })
  const schoolDropdown = useSchoolDropdown({ includeAllOption: true })
  const gisuDropdown = useGisuDropdown({ includeAllOption: true })
  const partDropdown = usePartDropdown({ includeAllOption: false })
  const selectedPartId = partDropdown.value?.id
  const selectedPart: PartType | undefined =
    typeof selectedPartId === 'string' && PART_LIST.includes(selectedPartId as PartType)
      ? (selectedPartId as PartType)
      : undefined

  const challengerQueryParams = useMemo(
    () => ({
      page: String(page),
      size: '10',
      chapterId: chapterDropdown.value ? String(chapterDropdown.value.id) : undefined,
      schoolId: schoolDropdown.value ? String(schoolDropdown.value.id) : undefined,
      gisuId: gisuDropdown.value ? String(gisuDropdown.value.id) : undefined,
      part: selectedPart,
      keyword: debouncedSearch || undefined,
    }),
    [
      page,
      chapterDropdown.value,
      schoolDropdown.value,
      gisuDropdown.value,
      selectedPart,
      debouncedSearch,
    ],
  )

  const { data, isLoading, isFetching } = useGetChallenger(challengerQueryParams)

  const pageItems = useMemo(
    () =>
      (data?.result.page.content ?? []).map((item) => ({
        id: `${item.challengerId}-${item.memberId}`,
        challengerId: String(item.challengerId),
        name: item.name,
        nickname: item.nickname,
        school: item.schoolName,
        generation: `${item.gisu}기`,
        part: transformPart(item.part),
        role:
          item.roleTypes.length > 0
            ? item.roleTypes.map((roleType) => transformRoleKorean(roleType)).join(', ')
            : transformRoleKorean('USER'),
        roleTypes: item.roleTypes,
        profileImageLink: item.profileImageLink,
      })),
    [data?.result.page.content],
  )

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
            {partDropdown.Dropdown}총 {Number(data?.result.page.totalElements ?? 0)}명
          </>
        }
      />

      <Section variant="solid" height={'fit-content'} gap={0} padding="12px 16px">
        {isLoading || isFetching ? (
          <Flex justifyContent="center" alignItems="center" css={{ padding: '48px 0' }}>
            <SuspenseFallback label="계정 목록을 불러오는 중입니다." />
          </Flex>
        ) : (
          <Table
            page={{
              currentPage: page + 1,
              totalPages: Number(data?.result.page.totalPages ?? 1),
              onChangePage: (nextPage) => setPage(nextPage - 1),
            }}
            showFooter={true}
            label="챌린저를 클릭하면 상세 정보 및 권한을 수정할 수 있습니다."
            headerLabels={DELETE_ACCOUNT_TABLE_HEADER_LABEL}
            rows={pageItems}
            getRowId={(row) => row.id}
            activeRowId={activeRowId}
            onRowClick={(id) => {
              setActiveRowId(id)
              setSelectedChallengerId(id.split('-')[0] || null)
              const selectedRow = pageItems.find((row) => row.id === id)
              setSelectedRoleType(selectedRow?.roleTypes[0] ?? null)
              setOpenModal(true)
            }}
            renderRow={(item) => (
              <>
                <TableStyles.Td>
                  <Flex gap={20}>
                    <img
                      src={item.profileImageLink || DefaultProfile}
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
                      width={20}
                      role="button"
                      css={{ transform: 'rotate(-90deg)', cursor: 'pointer' }}
                    />
                  </Flex>
                </TableStyles.Td>
              </>
            )}
          />
        )}
      </Section>
      {openModal && selectedChallengerId && (
        <AccountDetail
          challengerId={selectedChallengerId}
          initialRoleType={selectedRoleType}
          onClose={() => {
            setOpenModal(false)
            setSelectedChallengerId(null)
            setSelectedRoleType(null)
          }}
        />
      )}
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
