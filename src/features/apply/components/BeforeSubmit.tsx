import { useState } from 'react'

import type { PartType } from '@features/auth/domain'
import type { RecruitingType } from '@features/management/domain'

import * as S from '@/features/apply/components/ApplyPage.style'
import { RECRUITMENT_INFO } from '@/shared/constants/recruitment'
import { Button } from '@/shared/ui/common/Button'
import { transformResumeStatusKorean } from '@/shared/utils/transformKorean'

import ConfirmApplicationModal from './modals/CautionConfirm'
import PartInfoCard from './PartInfoCard'

interface PartInfo {
  part: PartType
  state: RecruitingType
  ability: Array<string>
}

interface BeforeSubmitProps {
  partInfoList: Array<PartInfo>
}

// TODO: API 연동 시 useRecruitmentStatus 훅으로 대체
const getRecruitmentOpenState = (): boolean => {
  return true
}

const BeforeSubmit = ({ partInfoList }: BeforeSubmitProps) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const isRecruitmentOpen = getRecruitmentOpenState()

  const openConfirmModal = () => setIsConfirmModalOpen(true)
  const closeConfirmModal = () => setIsConfirmModalOpen(false)

  const handleApplyClick = () => {
    openConfirmModal()
  }

  return (
    <>
      <S.PartInfoListContainer gap="16px" flexDirection="column">
        {partInfoList.map(({ part, state, ability }) => (
          <PartInfoCard
            key={part}
            partName={part}
            recruitmentState={transformResumeStatusKorean(state)}
            requiredAbilities={ability}
          />
        ))}
      </S.PartInfoListContainer>

      <Button
        label={`UMC ${RECRUITMENT_INFO.generation} 지원하기`}
        tone={isRecruitmentOpen ? 'lime' : 'darkGray'}
        disabled={!isRecruitmentOpen}
        onClick={handleApplyClick}
      />

      {isConfirmModalOpen && (
        <ConfirmApplicationModal
          onClose={closeConfirmModal}
          createNewResume={() => {}}
          existingResumeId={1}
        />
      )}
    </>
  )
}

export default BeforeSubmit
