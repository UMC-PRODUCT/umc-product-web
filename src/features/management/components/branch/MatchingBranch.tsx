import { useState } from 'react'

import Cancle from '@shared/assets/icons/close.svg?react'
import Grab from '@shared/assets/icons/drag.svg?react'

import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'

import type { Branch, School } from '../../mocks/branch'
import { MOCK_BRANCHES_MATCHING, MOCK_WAITING_SCHOOLS } from '../../mocks/branch'
import { TabSubtitle, TabTitle } from '../school/shared'
import * as S from './MatchingBranch.style'

type DragPayload = {
  source: 'branch' | 'waiting'
  schoolId: School['id']
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

const MatchingBranch = () => {
  const [branches, setBranches] = useState<Array<Branch>>(MOCK_BRANCHES_MATCHING)
  const [waitingSchools, setWaitingSchools] = useState<Array<School>>(MOCK_WAITING_SCHOOLS)

  const handleDragStart = (payload: DragPayload) => (event: React.DragEvent) => {
    event.dataTransfer.setData('application/json', JSON.stringify(payload))
    event.dataTransfer.effectAllowed = 'move'
  }

  const handleDropToBranch = (targetBranchId: Branch['id']) => (event: React.DragEvent) => {
    event.preventDefault()
    const payload = parsePayload(event)
    if (!payload) return

    if (payload.source === 'branch' && payload.branchId === targetBranchId) return

    let movedSchool: School | undefined
    let nextBranches = branches
    let nextWaiting = waitingSchools

    if (payload.source === 'waiting') {
      movedSchool = waitingSchools.find((school) => school.id === payload.schoolId)
      nextWaiting = waitingSchools.filter((school) => school.id !== payload.schoolId)
    } else if (payload.branchId) {
      nextBranches = branches.map((branch) => {
        if (branch.id !== payload.branchId) return branch
        const remaining = branch.schools.filter((school) => school.id !== payload.schoolId)
        const found = branch.schools.find((school) => school.id === payload.schoolId)
        if (found) movedSchool = found
        return { ...branch, schools: remaining }
      })
    }

    if (!movedSchool) return
    const schoolToMove = movedSchool

    nextBranches = nextBranches.map((branch) => {
      if (branch.id !== targetBranchId) return branch
      if (branch.schools.some((school) => school.id === schoolToMove.id)) return branch
      return { ...branch, schools: [...branch.schools, schoolToMove] }
    })

    setBranches(nextBranches)
    setWaitingSchools(nextWaiting)
  }

  const handleDropToWaiting = (event: React.DragEvent) => {
    event.preventDefault()
    const payload = parsePayload(event)
    if (!payload) return

    if (payload.source === 'waiting') return

    let movedSchool: School | undefined
    const nextBranches = branches.map((branch) => {
      if (branch.id !== payload.branchId) return branch
      const remaining = branch.schools.filter((school) => school.id !== payload.schoolId)
      const found = branch.schools.find((school) => school.id === payload.schoolId)
      if (found) movedSchool = found
      return { ...branch, schools: remaining }
    })

    if (!movedSchool) return
    const schoolToMove = movedSchool

    const nextWaiting = waitingSchools.some((school) => school.id === schoolToMove.id)
      ? waitingSchools
      : [...waitingSchools, schoolToMove]

    setBranches(nextBranches)
    setWaitingSchools(nextWaiting)
  }

  const handleRemoveFromBranch = (branchId: Branch['id'], schoolId: School['id']) => {
    let removedSchool: School | undefined
    const nextBranches = branches.map((branch) => {
      if (branch.id !== branchId) return branch
      const remaining = branch.schools.filter((school) => school.id !== schoolId)
      removedSchool = branch.schools.find((school) => school.id === schoolId)
      return { ...branch, schools: remaining }
    })

    if (!removedSchool) return
    const schoolToMove = removedSchool

    const nextWaiting = waitingSchools.some((school) => school.id === schoolToMove.id)
      ? waitingSchools
      : [...waitingSchools, schoolToMove]

    setBranches(nextBranches)
    setWaitingSchools(nextWaiting)
  }

  return (
    <S.Container>
      <S.MainSection>
        <S.Header>
          <TabTitle>지부 매칭</TabTitle>
          <TabSubtitle>지부별 학교를 설정할 수 있습니다.</TabSubtitle>
        </S.Header>

        {branches.map((branch) => (
          <Section
            variant="solid"
            key={branch.id}
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDropToBranch(branch.id)}
            gap={22}
            css={{ padding: '20px', height: 'fit-content', marginBottom: 24 }}
          >
            <S.BranchHeader>
              <h2>{branch.name}</h2>
              <span>{branch.schools.length}개 학교</span>
            </S.BranchHeader>
            <S.SchoolGrid>
              {branch.schools.map((school) => (
                <Flex
                  key={school.id}
                  draggable
                  onDragStart={handleDragStart({
                    source: 'branch',
                    schoolId: school.id,
                    branchId: branch.id,
                  })}
                >
                  <span css={{ cursor: 'grab', width: 22, height: 22 }}>
                    <Grab color={theme.colors.gray[400]} />
                  </span>
                  <S.SchoolBadge>
                    <span className="school-name">{school.name}</span>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => handleRemoveFromBranch(branch.id, school.id)}
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
                key={school.id}
                alignItems="center"
                height={'fit-content'}
                draggable
                onDragStart={handleDragStart({ source: 'waiting', schoolId: school.id })}
              >
                <Grab color={theme.colors.lime} css={{ cursor: 'grab', width: 22, height: 22 }} />
                <S.WaitingItem>
                  <span className="school-name">{school.name}</span>
                </S.WaitingItem>
              </Flex>
            ))}
          </Flex>
        </S.WaitingBox>
      </S.Sidebar>
    </S.Container>
  )
}

export default MatchingBranch
