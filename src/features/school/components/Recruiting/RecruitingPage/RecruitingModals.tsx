import { useGetApplicationFormData } from '@/features/school/hooks/useGetRecruitingData'

import CreateRecruitingConfirm from '../modals/CreateRecruitingConferm'
import RecruitingPreview from '../modals/RecruitingPreview'

type RecruitingModalsProps = {
  isOpen: boolean
  modalName: string
  title: string
  onClosePreview: () => void
  onCloseConfirm: () => void
  onConfirmSubmit: () => void
  recruitingId: string
}

const RecruitingModals = ({
  isOpen,
  modalName,
  title,
  onClosePreview,
  onCloseConfirm,
  onConfirmSubmit,
  recruitingId,
}: RecruitingModalsProps) => {
  return (
    <>
      {isOpen && modalName === 'recruitingPreview' && (
        <RecruitingPreview recruitingId={recruitingId} title={title} onClose={onClosePreview} />
      )}
      {isOpen && modalName === 'createRecruitingConfirm' && (
        <CreateRecruitingConfirm onClose={onCloseConfirm} onSubmit={onConfirmSubmit} />
      )}
    </>
  )
}

export default RecruitingModals
