import { useMemo, useState } from 'react'

import Search from '@shared/assets/icons/search.svg?react'

import { getGisuChapterWithSchools } from '@/features/management/domain/api'
import { useCustomQuery } from '@/shared/hooks/customQuery'
import { usePartDropdown } from '@/shared/hooks/useManagedDropdown'
import PageLayout from '@/shared/layout/PageLayout/PageLayout'
import { managementKeys } from '@/shared/queryKeys'
import { theme } from '@/shared/styles/theme'
import type { Option } from '@/shared/types/form'
import type { PartType } from '@/shared/types/umc'
import { Button } from '@/shared/ui/common/Button'
import { Dropdown } from '@/shared/ui/common/Dropdown'
import FilterBar from '@/shared/ui/common/FilterBar/FilterBar'
import { Flex } from '@/shared/ui/common/Flex'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'
import { TextField } from '@/shared/ui/form/LabelTextField/TextField'
import { createDropdownOptions } from '@/shared/utils/createDropdownOptions'

import { CandidateTable } from '../components/candidate/CandidateTable'
import { useGetAllGisu, useGetRecruitmentApplications } from '../hooks/useManagementQueries'

const ALL_OPTION_ID = '0'

export const CandidatePage = () => {
  const [page, setPage] = useState(0)
  const [keyword, setKeyword] = useState('')
  const [selectedGisuId, setSelectedGisuId] = useState<string | undefined>()
  const [selectedChapter, setSelectedChapter] = useState<Option<string> | undefined>()
  const [selectedSchool, setSelectedSchool] = useState<Option<string> | undefined>()

  const { data: allGisuData, isLoading: isGisuLoading } = useGetAllGisu()
  const partDropdown = usePartDropdown()

  const gisuOptions = useMemo<Array<Option<string>>>(
    () =>
      (allGisuData?.result.gisuList ?? []).map((gisu) => ({
        label: `${gisu.gisu}기`,
        id: gisu.gisuId,
      })),
    [allGisuData?.result.gisuList],
  )

  const activeGisu = useMemo<Option<string> | undefined>(() => {
    const gisuList = allGisuData?.result.gisuList ?? []
    if (gisuList.length === 0) return undefined
    const active = gisuList.find((gisu) => gisu.isActive) ?? gisuList[0]
    return {
      label: `${active.gisu}기`,
      id: active.gisuId,
    }
  }, [allGisuData?.result.gisuList])

  const selectedGisu = useMemo<Option<string> | undefined>(() => {
    if (!selectedGisuId) return activeGisu
    return gisuOptions.find((option) => String(option.id) === selectedGisuId) ?? activeGisu
  }, [activeGisu, gisuOptions, selectedGisuId])
  const resolvedGisuId = selectedGisu ? String(selectedGisu.id) : undefined

  const { data: branchWithSchoolData } = useCustomQuery(
    managementKeys.getGisuChapterWithSchools(resolvedGisuId ?? ''),
    () => getGisuChapterWithSchools({ gisuId: resolvedGisuId ?? '' }),
    { enabled: Boolean(resolvedGisuId) },
  )

  const chapterOptions = useMemo<Array<Option<string>>>(() => {
    const chapterList = branchWithSchoolData?.result.chapters ?? []
    return createDropdownOptions(
      chapterList,
      (chapter) => chapter.chapterName,
      (chapter) => chapter.chapterId,
      '-- 전체 지부 --',
    )
  }, [branchWithSchoolData?.result.chapters])

  const schoolOptions = useMemo<Array<Option<string>>>(() => {
    const chapterList = branchWithSchoolData?.result.chapters ?? []
    const targetChapterId = selectedChapter ? String(selectedChapter.id) : undefined
    const targetChapters = targetChapterId
      ? chapterList.filter((chapter) => chapter.chapterId === targetChapterId)
      : chapterList

    const uniqueSchools = new Map<string, string>()
    targetChapters.forEach((chapter) => {
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
  }, [branchWithSchoolData?.result.chapters, selectedChapter])

  const { data, isLoading, isFetching } = useGetRecruitmentApplications({
    page: String(page),
    chapterId: selectedChapter ? String(selectedChapter.id) : undefined,
    schoolId: selectedSchool ? String(selectedSchool.id) : undefined,
    part: partDropdown.value ? (String(partDropdown.value.id) as PartType) : undefined,
    keyword: keyword.trim() || undefined,
    size: '10',
  })

  return (
    <PageLayout
      title="지원자 관리"
      subTitle="지부별, 학교별, 파트별 지원 현황을 조회할 수 있습니다."
    >
      <FilterBar
        gap={'10px'}
        leftChild={
          <Flex justifyContent="space-evenly" gap={10}>
            <Dropdown
              options={gisuOptions}
              placeholder="전체 기수"
              value={selectedGisu}
              disabled={isGisuLoading}
              onChange={(option) => {
                setSelectedGisuId(String(option.id))
                setSelectedChapter(undefined)
                setSelectedSchool(undefined)
                setPage(0)
              }}
            />
            <Dropdown
              options={chapterOptions}
              placeholder="전체 지부"
              value={selectedChapter}
              disabled={!resolvedGisuId}
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
              disabled={!resolvedGisuId}
              onChange={(option) => {
                setSelectedSchool(option.id === ALL_OPTION_ID ? undefined : option)
                setPage(0)
              }}
            />
            {partDropdown.Dropdown}
            <TextField
              placeholder="이름, 닉네임, 이메일로 검색"
              type="text"
              autoComplete="none"
              Icon={Search}
              IconPlaced="left"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              css={{ width: '260px', height: '52px' }}
            />
            <Button
              typo="B3.Sb"
              label="검색"
              tone="lime"
              onClick={() => setPage(0)}
              css={{ minWidth: '80px', width: '80px', height: '50px' }}
            />
            <Button
              typo="B3.Sb"
              label="초기화"
              variant="outline"
              tone="gray"
              onClick={() => {
                setSelectedGisuId(undefined)
                setSelectedChapter(undefined)
                setSelectedSchool(undefined)
                setKeyword('')
                setPage(0)
              }}
              css={{ minWidth: '80px', width: '80px', height: '50px' }}
            />
          </Flex>
        }
      />
      <Flex gap={'4px'}>
        <span css={{ color: theme.colors.white, ...theme.typography.H4.Sb }}>전체 지원자</span>
        <span css={{ color: theme.colors.lime, ...theme.typography.H4.Sb }}>
          {data?.result.applications.totalElements}명
        </span>
      </Flex>
      {isLoading || isFetching ? (
        <Flex justifyContent="center" alignItems="center" css={{ padding: '48px 0' }}>
          <SuspenseFallback label="지원자 목록을 불러오는 중입니다." />
        </Flex>
      ) : (
        <CandidateTable
          items={data?.result.applications.content}
          totalPages={Number(data?.result.applications.totalPages)}
          currentPage={page + 1}
          onChangePage={(nextPage) => {
            setPage(nextPage - 1)
          }}
        />
      )}
    </PageLayout>
  )
}
