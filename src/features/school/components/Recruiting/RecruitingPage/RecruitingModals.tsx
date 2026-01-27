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
  const questionDatas = useGetApplicationFormData(recruitingId).data?.result
  return (
    <>
      {isOpen && modalName === 'recruitingPreview' && questionDatas && (
        <RecruitingPreview recruitingId={recruitingId} title={title} onClose={onClosePreview} />
      )}
      {isOpen && modalName === 'createRecruitingConfirm' && (
        <CreateRecruitingConfirm onClose={onCloseConfirm} onSubmit={onConfirmSubmit} />
      )}
    </>
  )
}

export default RecruitingModals
