import type { FinalSelectionApplication } from '@/features/school/domain/model'
import type { PartType } from '@/shared/types/part'

import PassCancleCautionModal from '../../modals/PassCancleCautionModal/PassCancleCautionModal'
import PassInfoModal from '../../modals/PassInfoModal/PassInfoModal'
import { SetPassPartModal } from '../../modals/SetPassPartModal/SetPassPartModal'
import SetPassSuccessModal from '../../modals/SetPassSuccessModal/SetPassSuccessModal'

type ModalName = 'setPassPart' | 'setPassSuccess' | 'cancelStatus' | 'inform' | null

type Props = {
  modalOpen: { open: boolean; modalName: ModalName }
  partSelectApplicant: FinalSelectionApplication | null
  processedPassCount: number
  activeApplicant: FinalSelectionApplication | null
  cancelStatus: 'PASS' | 'FAIL' | null
  selectedCount: number
  alreadyPassedCount: number
  selectedIds: Set<string>
  recruitmentId: string
  isPassing: boolean
  onClose: () => void
  onSetCancelStatus: (status: 'PASS' | 'FAIL' | null) => void
  onConfirmPart: (selectedPart: PartType) => Promise<void>
  onConfirmSelectedPass: (ids: Array<string>) => Promise<void>
}

const FinalEvaluationModals = ({
  modalOpen,
  partSelectApplicant,
  processedPassCount,
  activeApplicant,
  cancelStatus,
  selectedCount,
  alreadyPassedCount,
  selectedIds,
  recruitmentId,
  isPassing,
  onClose,
  onSetCancelStatus,
  onConfirmPart,
  onConfirmSelectedPass,
}: Props) => {
  return (
    <>
      {modalOpen.open && modalOpen.modalName === 'setPassPart' && partSelectApplicant && (
        <SetPassPartModal
          onClose={onClose}
          onConfirm={(selectedPart) => void onConfirmPart(selectedPart)}
          applicantName={partSelectApplicant.applicant.name}
          applicantNickname={partSelectApplicant.applicant.nickname}
          documentScore={partSelectApplicant.documentScore}
          interviewScore={partSelectApplicant.interviewScore}
          finalScore={partSelectApplicant.finalScore}
          appliedParts={partSelectApplicant.appliedParts
            .filter(
              (
                item,
              ): item is {
                priority: string
                part: { key: PartType; label: string }
              } => item.part.key !== 'COMMON',
            )
            .map((item) => ({
              priority: item.priority,
              key: item.part.key,
              label: item.part.label,
            }))}
          isSubmitting={isPassing}
        />
      )}
      {modalOpen.open && modalOpen.modalName === 'setPassSuccess' && (
        <SetPassSuccessModal processedCount={processedPassCount} onClose={onClose} />
      )}
      {modalOpen.open &&
        modalOpen.modalName === 'cancelStatus' &&
        activeApplicant &&
        cancelStatus && (
          <PassCancleCautionModal
            applicationId={activeApplicant.applicationId}
            recruitmentId={recruitmentId}
            name={activeApplicant.applicant.name}
            nickname={activeApplicant.applicant.nickname}
            score={activeApplicant.finalScore}
            currentStatus={cancelStatus}
            onClose={() => {
              onClose()
              onSetCancelStatus(null)
            }}
          />
        )}
      {modalOpen.open && modalOpen.modalName === 'inform' && (
        <PassInfoModal
          selectedCount={selectedCount}
          alreadyPassedCount={alreadyPassedCount}
          onConfirm={() => {
            void onConfirmSelectedPass([...selectedIds])
          }}
          onClose={onClose}
        />
      )}
    </>
  )
}

export default FinalEvaluationModals
