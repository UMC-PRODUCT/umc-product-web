import { useState } from 'react'

import { TabSubtitle, TabTitle } from '@/shared/styles/shared'
import { Dropdown } from '@/shared/ui/common/Dropdown'
import { Flex } from '@/shared/ui/common/Flex'

import { MOCK_BRANCHES } from '../../mocks/branch'
import AddBranchModal from '../modals/AddBranchModal/AddBranchModal'
import DeleteBranchConfirm from '../modals/DeleteBranchConfirm/DeleteBranchConfirm'
import * as S from './AddBranch.style'

const AddBranch = () => {
  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean
    modalName: 'create' | 'delete' | null
  }>({
    isOpen: false,
    modalName: null,
  })

  const handleCreate = () => setIsModalOpen({ isOpen: true, modalName: 'create' })

  return (
    <Flex flexDirection="column" gap="24px">
      {/* 헤더 섹션 */}
      <Flex flexDirection="column" alignItems="flex-start" gap="4px">
        <TabTitle>지부 생성</TabTitle>
        <TabSubtitle>새로운 지부를 생성할 수 있습니다.</TabSubtitle>
      </Flex>

      {/* 기수 선택 드롭다운 */}
      <Dropdown
        options={[
          { label: '10기', id: '1' },
          { label: '9기 (현재)', id: '2' },
          { label: '8기', id: '3' },
        ]}
        css={{ width: '180px', alignSelf: 'flex-start' }}
        placeholder="기수 선택"
      />

      {/* 그리드 레이아웃 */}
      <S.GridContainer>
        {/* 1. 지부 생성 버튼 카드 */}
        <S.AddCard onClick={handleCreate}>
          <S.PlusIcon>+</S.PlusIcon>
          <S.AddText>지부 생성</S.AddText>
        </S.AddCard>

        {/* 2. 기존 지부 카드 목록 */}
        {MOCK_BRANCHES.map((branch) => (
          <S.BranchCard
            key={branch.id}
            variant="solid"
            height={'280px'}
            padding="24px"
            gap={'10px'}
          >
            <S.CardHeader>
              <S.BranchName>{branch.name}</S.BranchName>
              <S.CloseButton onClick={() => setIsModalOpen({ isOpen: true, modalName: 'delete' })}>
                ✕
              </S.CloseButton>
            </S.CardHeader>
            <S.SchoolTagContainer>
              {branch.schools.map((school, idx) => (
                <S.SchoolTag key={idx}>{school}</S.SchoolTag>
              ))}
            </S.SchoolTagContainer>
            <S.SchoolCountText>총 {branch.totalNum}개 학교</S.SchoolCountText>
          </S.BranchCard>
        ))}
      </S.GridContainer>
      {isModalOpen.isOpen && isModalOpen.modalName === 'create' && (
        <AddBranchModal onClose={() => setIsModalOpen({ isOpen: false, modalName: null })} />
      )}
      {isModalOpen.isOpen && isModalOpen.modalName === 'delete' && (
        <DeleteBranchConfirm
          branchId="1"
          onClose={() => setIsModalOpen({ isOpen: false, modalName: null })}
        />
      )}
    </Flex>
  )
}

export default AddBranch
