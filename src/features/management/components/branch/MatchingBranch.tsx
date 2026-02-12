import type { ReactElement } from 'react'
import { useState } from 'react'

import Cancle from '@shared/assets/icons/close.svg?react'
import Grab from '@shared/assets/icons/drag.svg?react'

import { theme } from '@/shared/styles/theme'
import AsyncBoundary from '@/shared/ui/common/AsyncBoundary/AsyncBoundary'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'

import { useGisuDropdown } from '../../../../shared/hooks/useManagedDropdown'
import type { Branch, ChapterType, UniversitySimple } from '../../domain/model'
import { useManagementMutations } from '../../hooks/useManagementMutations'
import {
  useGetGisuChapterWithSchools,
  useGetUnassignedSchools,
} from '../../hooks/useManagementQueries'
import { TabSubtitle, TabTitle } from '../school/shared'
import * as S from './MatchingBranch.style'

type DragPayload = {
  source: 'branch' | 'waiting'
  schoolId: UniversitySimple['schoolId']
  branchId?: Branch['id']
}

const parsePayload = (event: React.DragEvent) => {
  const raw = event.dataTransfer.getData('application/json')
  if (!raw) return null
  try {
    return JSON.parse(raw) as DragPayload
  } catch (error) {
    console.error('드래그 데이터 파싱 실패', error)
    return null
  }
}

type MatchingBranchContentProps = {
  dropdown: ReactElement
  gisuId: string
  initialBranches: Array<ChapterType>
  initialWaitingSchools: Array<UniversitySimple>
  assignSchool: (payload: {
    chapterId: Branch['id']
    schoolId: UniversitySimple['schoolId']
  }) => void
  unassignSchool: (payload: { gisuId: string; schoolId: UniversitySimple['schoolId'] }) => void
}

const MatchingBranchContent = ({
  dropdown,
  gisuId,
  initialBranches,
  initialWaitingSchools,
  assignSchool,
  unassignSchool,
}: MatchingBranchContentProps) => {
  const [branches, setBranches] = useState<Array<ChapterType>>(initialBranches)
  const [waitingSchools, setWaitingSchools] =
    useState<Array<UniversitySimple>>(initialWaitingSchools)

  const removeFromWaiting = (schoolId: UniversitySimple['schoolId']) =>
    waitingSchools.filter((school) => school.schoolId !== schoolId)

  const addToWaiting = (school: UniversitySimple) =>
    waitingSchools.some((item) => item.schoolId === school.schoolId)
      ? waitingSchools
      : [...waitingSchools, school]

  const removeFromBranch = (
    sourceBranchId: Branch['id'],
    schoolId: UniversitySimple['schoolId'],
  ) => {
    let moved: UniversitySimple | undefined
    const next = branches.map((branch) => {
      if (branch.chapterId !== sourceBranchId) return branch
      const remaining = branch.schools.filter((school) => school.schoolId !== schoolId)
      const found = branch.schools.find((school) => school.schoolId === schoolId)
      if (found) moved = found
      return { ...branch, schools: remaining }
    })
    return { nextBranches: next, movedSchool: moved }
  }

  const addToBranch = (
    base: Array<ChapterType>,
    targetBranchId: Branch['id'],
    school: UniversitySimple,
  ) =>
    base.map((branch) => {
      if (branch.chapterId !== targetBranchId) return branch
      if (branch.schools.some((item) => item.schoolId === school.schoolId)) return branch
      return { ...branch, schools: [...branch.schools, school] }
    })

  // 드래그 정보를 dataTransfer에 저장해 리스트 간 이동을 가능하게 함.
  const handleDragStart = (payload: DragPayload) => (event: React.DragEvent) => {
    event.dataTransfer.setData('application/json', JSON.stringify(payload))
    event.dataTransfer.effectAllowed = 'move'
  }

  // 지부로 드롭: 대기/다른 지부에서 이동 후 assign 뮤테이션으로 서버 동기화.
  const handleDropToBranch = (targetBranchId: Branch['id']) => (event: React.DragEvent) => {
    event.preventDefault()
    const payload = parsePayload(event)
    if (!payload) return

    if (payload.source === 'branch' && payload.branchId === targetBranchId) return

    if (payload.source === 'waiting') {
      const moved = waitingSchools.find((school) => school.schoolId === payload.schoolId)
      if (!moved) return
      setBranches(addToBranch(branches, targetBranchId, moved))
      setWaitingSchools(removeFromWaiting(payload.schoolId))
      assignSchool({ chapterId: targetBranchId, schoolId: moved.schoolId })
      return
    }

    if (!payload.branchId) return
    const { nextBranches, movedSchool } = removeFromBranch(payload.branchId, payload.schoolId)
    if (!movedSchool) return
    setBranches(addToBranch(nextBranches, targetBranchId, movedSchool))
    assignSchool({ chapterId: targetBranchId, schoolId: movedSchool.schoolId })
  }

  // 대기 영역 드롭: 지부에서 해제하고 unassign 뮤테이션으로 서버 동기화.
  const handleDropToWaiting = (event: React.DragEvent) => {
    event.preventDefault()
    const payload = parsePayload(event)
    if (!payload) return

    if (payload.source === 'waiting') return

    if (!payload.branchId) return
    const { nextBranches, movedSchool } = removeFromBranch(payload.branchId, payload.schoolId)
    if (!movedSchool) return
    setBranches(nextBranches)
    setWaitingSchools(addToWaiting(movedSchool))
    unassignSchool({ gisuId, schoolId: movedSchool.schoolId })
  }

  // X 버튼으로 지부에서 제거: 대기 영역으로 이동과 동일하게 처리.
  const handleRemoveFromBranch = (
    branchId: Branch['id'],
    schoolId: UniversitySimple['schoolId'],
  ) => {
    const { nextBranches, movedSchool } = removeFromBranch(branchId, schoolId)
    if (!movedSchool) return
    setBranches(nextBranches)
    setWaitingSchools(addToWaiting(movedSchool))
    unassignSchool({ gisuId, schoolId: movedSchool.schoolId })
  }

  return (
    <S.Container>
      <S.MainSection>
        <S.Header>
          <Flex flexDirection="column" gap="4px" alignItems="flex-start" width="fit-content">
            <TabTitle>지부 매칭</TabTitle>
            <TabSubtitle>지부별 학교를 설정할 수 있습니다.</TabSubtitle>
          </Flex>
          <Flex width={180}>{dropdown}</Flex>
        </S.Header>

        {branches.map((branch) => (
          <Section
            variant="solid"
            key={branch.chapterId}
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDropToBranch(branch.chapterId)}
            gap={22}
            alignItems="flex-start"
            css={{
              padding: '20px',
              height: 'fit-content',
              marginBottom: 24,
            }}
          >
            <S.BranchHeader>
              <h2>{branch.chapterName}</h2>
              <span>{branch.schools.length}개 학교</span>
            </S.BranchHeader>
            <S.SchoolGrid>
              {branch.schools.map((school) => (
                <Flex
                  key={school.schoolId}
                  draggable
                  onDragStart={handleDragStart({
                    source: 'branch',
                    schoolId: school.schoolId,
                    branchId: branch.chapterId,
                  })}
                >
                  <span css={{ cursor: 'grab', width: 22, height: 22 }}>
                    <Grab color={theme.colors.gray[400]} />
                  </span>
                  <S.SchoolBadge>
                    <span className="school-name">{school.schoolName}</span>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => handleRemoveFromBranch(branch.chapterId, school.schoolId)}
                    >
                      <Cancle width={10} height={10} color="white" />
                    </button>
                  </S.SchoolBadge>
                </Flex>
              ))}
            </S.SchoolGrid>
          </Section>
        ))}
      </S.MainSection>

      <S.Sidebar>
        <S.WaitingBox onDragOver={(event) => event.preventDefault()} onDrop={handleDropToWaiting}>
          <h2>배정 대기 중인 학교</h2>
          <p>드래그 앤 드롭으로 학교를 이동할 수 있습니다.</p>
          <Flex flexDirection="column" gap="12px" width={'fit-content'}>
            {waitingSchools.map((school) => (
              <Flex
                key={school.schoolId}
                alignItems="center"
                height={'fit-content'}
                draggable
                onDragStart={handleDragStart({ source: 'waiting', schoolId: school.schoolId })}
              >
                <Grab color={theme.colors.lime} css={{ cursor: 'grab', width: 22, height: 22 }} />
                <S.WaitingItem>
                  <span className="school-name">{school.schoolName}</span>
                </S.WaitingItem>
              </Flex>
            ))}
          </Flex>
        </S.WaitingBox>
      </S.Sidebar>
    </S.Container>
  )
}

const MatchingBranchBody = ({ gisuId, dropdown }: { gisuId: string; dropdown: ReactElement }) => {
  const { usePatchAssignSchools, usePatchUnassignSchools } = useManagementMutations()
  const { mutate: assignSchool } = usePatchAssignSchools()
  const { mutate: unassignSchool } = usePatchUnassignSchools()
  const { data: chapterData } = useGetGisuChapterWithSchools(gisuId)
  const { data: unassignedSchool } = useGetUnassignedSchools(gisuId)

  return (
    <MatchingBranchContent
      key={gisuId}
      dropdown={dropdown}
      gisuId={gisuId}
      initialBranches={chapterData.result.chapters}
      initialWaitingSchools={unassignedSchool.result.schools}
      assignSchool={assignSchool}
      unassignSchool={unassignSchool}
    />
  )
}

const MatchingBranchData = () => {
  const gisuDropdown = useGisuDropdown({
    includeAllOption: false,
    defaultToFirst: true,
    closeOnChange: true,
  })

  if (!gisuDropdown.value) {
    return (
      <S.Container>
        <S.MainSection>
          <S.Header>
            <Flex flexDirection="column" gap="4px" alignItems="flex-start" width="fit-content">
              <TabTitle>지부 매칭</TabTitle>
              <TabSubtitle>지부별 학교를 설정할 수 있습니다.</TabSubtitle>
            </Flex>
            <Flex width={180}>{gisuDropdown.Dropdown}</Flex>
          </S.Header>
          <Flex justifyContent="center" alignItems="center" css={{ padding: '32px 0' }}>
            기수 정보를 불러오는 중입니다.
          </Flex>
        </S.MainSection>
      </S.Container>
    )
  }

  return (
    <AsyncBoundary
      fallback={
        <div style={{ minHeight: 520, width: '100%' }}>
          <SuspenseFallback label="지부 매칭 정보를 불러오는 중입니다." />
        </div>
      }
    >
      <MatchingBranchBody gisuId={String(gisuDropdown.value.id)} dropdown={gisuDropdown.Dropdown} />
    </AsyncBoundary>
  )
}

const MatchingBranch = () => <MatchingBranchData />

export default MatchingBranch
