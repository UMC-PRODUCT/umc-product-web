import AsyncBoundary from '@/shared/ui/common/AsyncBoundary/AsyncBoundary'
import ErrorPage from '@/shared/ui/common/ErrorPage/ErrorPage'
import { Modal } from '@/shared/ui/common/Modal/Modal'

import CreateRecruitingConfirm from '../../modals/CreateRecruitingConfirm/CreateRecruitingConfirm'
import PublishBlockedRecruitmentModal from '../../modals/PublishBlockedRecruitmentModal/PublishBlockedRecruitmentModal'
import { RecruitingPreviewContent } from '../../modals/RecruitingPreview/RecruitingPreview'
import { RecruitingPreviewSkeletonContent } from '../../modals/RecruitingPreview/RecruitingPreviewSkeleton'

type RecruitingModalsProps = {
  isOpen: boolean
  modalName: string
  title: string
  onClosePreview: () => void
  onCloseConfirm: () => void
  onClosePublishBlocked: () => void
  onConfirmPublishBlocked: () => void
  onConfirmSubmit: () => void
  recruitingId: string
}

const RecruitingModals = ({
  isOpen,
  modalName,
  title,
  onClosePreview,
  onCloseConfirm,
  onClosePublishBlocked,
  onConfirmPublishBlocked,
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
              <AsyncBoundary
                fallback={
                  <RecruitingPreviewSkeletonContent title={title} onClose={onClosePreview} />
                }
                errorFallback={(error, reset) => (
                  <ErrorPage
                    title="지원서 미리보기를 불러오는 중 오류가 발생했습니다."
                    description={error.message || '잠시 후 다시 시도해 주세요.'}
                    onRetry={reset}
                  />
                )}
              >
                <RecruitingPreviewContent
                  recruitingId={recruitingId}
                  title={title}
                  onClose={onClosePreview}
                />
              </AsyncBoundary>
            </Modal.Content>
          </Modal.Portal>
        </Modal.Root>
      )}
      {isOpen && modalName === 'createRecruitingConfirm' && (
        <CreateRecruitingConfirm onClose={onCloseConfirm} onSubmit={onConfirmSubmit} />
      )}
      {isOpen && modalName === 'publishBlockedRecruitment' && (
        <PublishBlockedRecruitmentModal
          onClose={onClosePublishBlocked}
          onConfirm={onConfirmPublishBlocked}
        />
      )}
    </>
  )
}

export default RecruitingModals
