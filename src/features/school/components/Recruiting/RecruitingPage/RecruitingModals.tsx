import { Suspense } from 'react'

import { Modal } from '@/shared/ui/common/Modal/Modal'

import CreateRecruitingConfirm from '../modals/CreateRecruitingConferm'
import { RecruitingPreviewContent } from '../modals/RecruitingPreview'
import { RecruitingPreviewSkeletonContent } from '../modals/RecruitingPreviewSkeleton'

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
        <Modal.Root open={true} onOpenChange={(open) => !open && onClosePreview()}>
          <Modal.Portal>
            <Modal.Overlay />
            <Modal.Content>
              <Suspense
                fallback={
                  <RecruitingPreviewSkeletonContent title={title} onClose={onClosePreview} />
                }
              >
                <RecruitingPreviewContent
                  recruitingId={recruitingId}
                  title={title}
                  onClose={onClosePreview}
                />
              </Suspense>
            </Modal.Content>
          </Modal.Portal>
        </Modal.Root>
      )}
      {isOpen && modalName === 'createRecruitingConfirm' && (
        <CreateRecruitingConfirm onClose={onCloseConfirm} onSubmit={onConfirmSubmit} />
      )}
    </>
  )
}

export default RecruitingModals
