import type { QuestionList } from '@/shared/types/question'

import CreateRecruitingConfirm from '../modals/CreateRecruitingConferm'
import RecruitingPreview from '../modals/RecruitingPreview'

type RecruitingModalsProps = {
  isOpen: boolean
  modalName: string
  title: string
  questionData: QuestionList
  onClosePreview: () => void
  onCloseConfirm: () => void
  onConfirmSubmit: () => void
}

const RecruitingModals = ({
  isOpen,
  modalName,
  title,
  questionData,
  onClosePreview,
  onCloseConfirm,
  onConfirmSubmit,
}: RecruitingModalsProps) => {
  return (
    <>
      {isOpen && modalName === 'recruitingPreview' && (
        <RecruitingPreview title={title} onClose={onClosePreview} questionData={questionData} />
      )}
      {isOpen && modalName === 'createRecruitingConfirm' && (
        <CreateRecruitingConfirm onClose={onCloseConfirm} onSubmit={onConfirmSubmit} />
      )}
    </>
  )
}

export default RecruitingModals
