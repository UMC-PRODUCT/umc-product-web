import { useState } from 'react'

import { TabSubtitle, TabTitle } from '@/shared/styles/shared'
import type { Option } from '@/shared/types/form'
import AsyncBoundary from '@/shared/ui/common/AsyncBoundary/AsyncBoundary'
import { Flex } from '@/shared/ui/common/Flex'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'

import { useGisuDropdown } from '../../../../shared/hooks/useManagedDropdown'
import { useGetGisuChapterWithSchools } from '../../hooks/useManagementQueries'
import AddBranchModal from '../modals/AddBranchModal/AddBranchModal'
import DeleteBranchConfirm from '../modals/DeleteBranchConfirm/DeleteBranchConfirm'
import * as S from './AddBranch.style'

const AddBranchContent = ({ baseGisu }: { baseGisu: Option<string> }) => {
  const { data } = useGetGisuChapterWithSchools(baseGisu.id as string)
  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean
    modalName: 'create' | 'delete' | null
    deleteBranchId?: string | null
  }>({
    isOpen: false,
    modalName: null,
    deleteBranchId: null,
  })

  const handleCreate = () => setIsModalOpen({ isOpen: true, modalName: 'create' })

  return (
    <S.GridContainer>
      {/* 1. 지부 생성 버튼 카드 */}
      <S.AddCard onClick={handleCreate}>
        <S.PlusIcon>+</S.PlusIcon>
        <S.AddText>지부 생성</S.AddText>
      </S.AddCard>

      {/* 2. 기존 지부 카드 목록 */}
      {data.result.chapters.map((branch) => (
        <S.BranchCard
          key={branch.chapterId}
          variant="solid"
          height={'280px'}
          padding="24px"
          gap={'10px'}
        >
          <S.CardHeader>
            <S.BranchName>{branch.chapterName}</S.BranchName>
            <S.CloseButton
              onClick={() =>
                setIsModalOpen({
                  isOpen: true,
                  modalName: 'delete',
                  deleteBranchId: branch.chapterId,
                })
              }
            >
              ✕
            </S.CloseButton>
          </S.CardHeader>
          <S.SchoolTagContainer>
            {branch.schools.map((school, idx) => (
              <S.SchoolTag key={idx}>{school.schoolName}</S.SchoolTag>
            ))}
          </S.SchoolTagContainer>
          <S.SchoolCountText>총 {branch.schools.length}개 학교</S.SchoolCountText>
        </S.BranchCard>
      ))}
      {isModalOpen.isOpen && isModalOpen.modalName === 'create' && (
        <AddBranchModal
          onClose={() => setIsModalOpen({ isOpen: false, modalName: null })}
          gisuId={baseGisu.id as string}
        />
      )}
      {isModalOpen.deleteBranchId && isModalOpen.isOpen && isModalOpen.modalName === 'delete' && (
        <DeleteBranchConfirm
          onClose={() => setIsModalOpen({ isOpen: false, modalName: null })}
          branchId={isModalOpen.deleteBranchId}
        />
      )}
    </S.GridContainer>
  )
}

const AddBranchData = () => {
  const gisuDropdown = useGisuDropdown({
    includeAllOption: false,
    defaultToFirst: true,
  })

  return (
    <Flex flexDirection="column" gap="24px">
      {/* 헤더 섹션 */}
      <Flex flexDirection="column" alignItems="flex-start" gap="4px">
        <TabTitle>지부 생성</TabTitle>
        <TabSubtitle>새로운 지부를 생성할 수 있습니다.</TabSubtitle>
      </Flex>

      {/* 기수 선택 드롭다운 */}
      <Flex width={150} css={{ alignSelf: 'flex-start' }}>
        {gisuDropdown.Dropdown}
      </Flex>
      {gisuDropdown.value ? (
        <AsyncBoundary
          fallback={<SuspenseFallback label="지부 정보를 불러오는 중입니다." />}
          errorFallback={() => <div>지부 정보를 불러오는 중 오류가 발생했습니다.</div>}
        >
          <AddBranchContent baseGisu={gisuDropdown.value} />
        </AsyncBoundary>
      ) : (
        <Flex justifyContent="center" alignItems="center" css={{ padding: '32px 0' }}>
          기수 정보를 불러오는 중입니다.
        </Flex>
      )}
    </Flex>
  )
}

const AddBranch = () => {
  return (
    <AsyncBoundary
      fallback={
        <div style={{ minHeight: 520 }}>
          <SuspenseFallback label="기수 정보를 불러오는 중입니다." />
        </div>
      }
    >
      <AddBranchData />
    </AsyncBoundary>
  )
}

export default AddBranch
