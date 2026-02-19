import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

import { PART_CONFIG } from '@features/auth/domain'

import { PART_TYPE_TO_SMALL_PART } from '@shared/constants/part'

import * as S from '@/features/apply/components/ApplyPage.style'
import type { PartType } from '@/shared/types/part'
import { Button } from '@/shared/ui/common/Button'
import { transformResumeStatusKorean } from '@/shared/utils/transformKorean'

import { useApplyMutation } from '../hooks/useApplyMutation'
import ConfirmApplicationModal from './modals/CautionConfirm'
import PartInfoCard from './PartInfoCard'

interface BeforeSubmitProps {
  partInfoList: Array<{
    part: PartType
    status: string
    recruitmentPartId: string
  }>
  draftFormResponseId?: string
  recruitmentId?: string
  canApply: boolean
  submitStatus: 'DRAFT' | 'NONE' | 'SUBMITTED'
}

const BeforeSubmit = ({
  submitStatus,
  partInfoList,
  recruitmentId,
  canApply,
  draftFormResponseId,
}: BeforeSubmitProps & { submitStatus: string }) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const navigate = useNavigate()
  const openConfirmModal = () => setIsConfirmModalOpen(true)
  const closeConfirmModal = () => setIsConfirmModalOpen(false)
  const { useFirstCreateDraft } = useApplyMutation()
  const { mutate: firstCreateDraft } = useFirstCreateDraft()
  const isApplyDisabled = !recruitmentId || !canApply

  const handleApplyClick = () => {
    if (submitStatus === 'NONE') {
      firstCreateDraft(recruitmentId!, {
        onSuccess: (data) => {
          navigate({
            to: `/apply/$recruitmentId/$resumeId`,
            search: { page: 1 },
            params: {
              recruitmentId: String(recruitmentId),
              resumeId: data.result.formResponseId,
            },
          })
        },
      })
    } else {
      openConfirmModal()
    }
  }

  return (
    <>
      <S.PartInfoListContainer gap="16px" flexDirection="column">
        {partInfoList.map(({ part, status, recruitmentPartId }) => (
          <PartInfoCard
            key={recruitmentPartId}
            partName={PART_TYPE_TO_SMALL_PART[part]}
            recruitmentState={transformResumeStatusKorean(status)}
            requiredAbilities={Array.from(PART_CONFIG[part].abilities)}
          />
        ))}
      </S.PartInfoListContainer>

      <Button
        label={`UMC 지원하기`}
        tone={isApplyDisabled ? 'darkGray' : 'lime'}
        disabled={isApplyDisabled}
        onClick={handleApplyClick}
      />

      {isConfirmModalOpen && (
        <ConfirmApplicationModal
          recruitmentId={recruitmentId!}
          onClose={closeConfirmModal}
          formId={draftFormResponseId}
        />
      )}
    </>
  )
}

export default BeforeSubmit
