import { useMemo, useState } from 'react'

import Arrow from '@shared/assets/icons/arrow.svg?react'

import { getGisuChapterWithSchools } from '@/features/management/domain/api'
import { DELETE_ACCOUNT_TABLE_HEADER_LABEL } from '@/features/management/domain/constants'
import {
  useGetAllGisu,
  useGetAllSchools,
  useGetChallenger,
  useGetChapters,
  useGetSchoolsPaging,
} from '@/features/management/hooks/useManagementQueries'
import FilterBar from '@/features/school/components/SchoolEvaluation/FilterBar/FilterBar'
import DefaultProfile from '@/shared/assets/icons/profile.svg'
import Search from '@/shared/assets/icons/search.svg?react'
import { PART_LIST } from '@/shared/constants/part'
import { useCustomQuery } from '@/shared/hooks/customQuery'
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue'
import { usePartDropdown } from '@/shared/hooks/useManagedDropdown'
import { managementKeys } from '@/shared/queryKeys'
import * as S from '@/shared/styles/shared'
import type { Option } from '@/shared/types/form'
import type { PartType } from '@/shared/types/part'
import AsyncBoundary from '@/shared/ui/common/AsyncBoundary/AsyncBoundary'
import { Dropdown } from '@/shared/ui/common/Dropdown'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'
import Table from '@/shared/ui/common/Table/Table'
import * as TableStyles from '@/shared/ui/common/Table/Table.style'
import { TextField } from '@/shared/ui/form/LabelTextField/TextField'
import { createDropdownOptions } from '@/shared/utils/createDropdownOptions'
import { transformPart, transformRoleKorean } from '@/shared/utils/transformKorean'

import AccountDetail from '../../modals/AccountDetail/AccountDetail'

const SEARCH_DEBOUNCE_MS = 500
const ALL_OPTION_ID = '0'

const EditAccountContent = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [activeRowId, setActiveRowId] = useState<string | null>(null)
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null)
  const [selectedGisuId, setSelectedGisuId] = useState<string | undefined>()
  const [selectedChapter, setSelectedChapter] = useState<Option<string> | undefined>()
  const [selectedSchool, setSelectedSchool] = useState<Option<string> | undefined>()
  const initialPage = useMemo(() => {
    const pageParam = new URLSearchParams(window.location.search).get('page')

    return pageParam && Number(pageParam) > 0 ? Number(pageParam) - 1 : 0
  }, [])
  const { debouncedValue: debouncedSearch } = useDebouncedValue(
    searchTerm.trim(),
    SEARCH_DEBOUNCE_MS,
  )

  const [page, setPage] = useState<number>(initialPage)

  const { data: allGisuData, isLoading: isGisuLoading } = useGetAllGisu()
  const { data: allChaptersData } = useGetChapters()
  const { data: allSchoolsData } = useGetAllSchools()
  const { data: schoolsByChapterData } = useGetSchoolsPaging({
    page: '0',
    size: '1000',
    chapterId: selectedChapter ? String(selectedChapter.id) : undefined,
  })
  const partDropdown = usePartDropdown({ includeAllOption: false })
  const gisuOptions = useMemo<Array<Option<string>>>(
    () =>
      createDropdownOptions(
        allGisuData?.result.gisuList ?? [],
        (gisu) => `${gisu.gisu}기`,
        (gisu) => gisu.gisuId,
        '-- 전체 기수 --',
      ),
    [allGisuData?.result.gisuList],
  )
  const selectedGisu = useMemo<Option<string> | undefined>(
    () => gisuOptions.find((option) => String(option.id) === selectedGisuId),
    [gisuOptions, selectedGisuId],
  )
  const resolvedGisuId = selectedGisu ? String(selectedGisu.id) : undefined

  const { data: branchWithSchoolData } = useCustomQuery(
    managementKeys.getGisuChapterWithSchools(resolvedGisuId ?? ''),
    () => getGisuChapterWithSchools({ gisuId: resolvedGisuId ?? '' }),
    { enabled: Boolean(resolvedGisuId) },
  )

  const chapterOptions = useMemo<Array<Option<string>>>(() => {
    if (!resolvedGisuId) {
      const chapterList = allChaptersData?.result.chapters ?? []
      return createDropdownOptions(
        chapterList,
        (chapter) => chapter.name,
        (chapter) => chapter.id,
        '-- 전체 지부 --',
      )
    }
    const chapterList = branchWithSchoolData?.result.chapters ?? []
    return createDropdownOptions(
      chapterList,
      (chapter) => chapter.chapterName,
      (chapter) => chapter.chapterId,
      '-- 전체 지부 --',
    )
  }, [allChaptersData?.result.chapters, branchWithSchoolData?.result.chapters, resolvedGisuId])

  const schoolOptions = useMemo<Array<Option<string>>>(() => {
    if (!resolvedGisuId) {
      const schools = selectedChapter
        ? (schoolsByChapterData?.result.content ?? []).map((school) => ({
            schoolId: school.schoolId,
            schoolName: school.schoolName,
          }))
        : (allSchoolsData?.result.schools ?? [])
      return createDropdownOptions(
        schools,
        (school) => school.schoolName,
        (school) => school.schoolId,
        '-- 전체 학교 --',
      )
    }
    const chapterList = branchWithSchoolData?.result.chapters ?? []
    if (!selectedChapter) {
      const uniqueSchools = new Map<string, string>()
      chapterList.forEach((chapter) => {
        chapter.schools.forEach((school) => {
          if (!uniqueSchools.has(school.schoolId)) {
            uniqueSchools.set(school.schoolId, school.schoolName)
          }
        })
      })
      const schools = Array.from(uniqueSchools.entries()).map(([schoolId, schoolName]) => ({
        schoolId,
        schoolName,
      }))
      return createDropdownOptions(
        schools,
        (school) => school.schoolName,
        (school) => school.schoolId,
        '-- 전체 학교 --',
      )
    }
    const targetChapter = chapterList.find(
      (chapter) => chapter.chapterId === String(selectedChapter.id),
    )
    return createDropdownOptions(
      targetChapter?.schools ?? [],
      (school) => school.schoolName,
      (school) => school.schoolId,
      '-- 전체 학교 --',
    )
  }, [
    allSchoolsData?.result.schools,
    branchWithSchoolData?.result.chapters,
    resolvedGisuId,
    selectedChapter,
    schoolsByChapterData?.result.content,
  ])

  const selectedPartId = partDropdown.value?.id
  const selectedPart: PartType | undefined =
    typeof selectedPartId === 'string' && PART_LIST.includes(selectedPartId as PartType)
      ? (selectedPartId as PartType)
      : undefined

  const challengerQueryParams = useMemo(
    () => ({
      page: String(page),
      size: '10',
      chapterId: selectedChapter ? String(selectedChapter.id) : undefined,
      schoolId: selectedSchool ? String(selectedSchool.id) : undefined,
      gisuId: resolvedGisuId,
      part: selectedPart,
      keyword: debouncedSearch || undefined,
    }),
    [page, selectedChapter, selectedSchool, resolvedGisuId, selectedPart, debouncedSearch],
  )

  const { data, isLoading, isFetching } = useGetChallenger(challengerQueryParams)

  const pageItems = useMemo(
    () =>
      (data?.result.page.content ?? []).map((item) => ({
        id: `${item.challengerId}-${item.memberId}`,
        memberId: String(item.memberId),
        challengerId: String(item.challengerId),
        name: item.name,
        nickname: item.nickname,
        school: item.schoolName,
        gisu: `${item.gisu}기`,
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
              css={{ width: '252px', height: '48px' }}
            />
            <Dropdown
              options={gisuOptions}
              placeholder="전체 기수"
              value={selectedGisu}
              disabled={isGisuLoading}
              onChange={(option) => {
                const nextGisu = option.id === ALL_OPTION_ID ? undefined : String(option.id)
                setSelectedGisuId(nextGisu)
                setSelectedChapter(undefined)
                setSelectedSchool(undefined)
                setPage(0)
              }}
            />
            <Dropdown
              options={chapterOptions}
              placeholder="전체 지부"
              value={selectedChapter}
              disabled={false}
              onChange={(option) => {
                setSelectedChapter(option.id === ALL_OPTION_ID ? undefined : option)
                setSelectedSchool(undefined)
                setPage(0)
              }}
            />
            <Dropdown
              options={schoolOptions}
              placeholder="전체 학교"
              value={selectedSchool}
              disabled={false}
              onChange={(option) => {
                setSelectedSchool(option.id === ALL_OPTION_ID ? undefined : option)
                setPage(0)
              }}
            />
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
              const selectedRow = pageItems.find((row) => row.id === id)
              setSelectedMemberId(selectedRow?.memberId ?? null)
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
                <TableStyles.Td>{item.gisu}</TableStyles.Td>
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
      {openModal && selectedMemberId && (
        <AccountDetail
          memberId={selectedMemberId}
          onClose={() => {
            setOpenModal(false)
            setSelectedMemberId(null)
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
