import { useGetDocumentEvaluationApplicationDetail } from '@/features/apply/hooks/useGetApplicationQuery'
import type { GetDocumentEvaluationApplicationResponseDTO } from '@/features/school/domain'
import Close from '@/shared/assets/icons/close.svg?react'
import { theme } from '@/shared/styles/theme'
import ErrorPage from '@/shared/ui/common/ErrorPage/ErrorPage'
import { Flex } from '@/shared/ui/common/Flex'
import { Modal } from '@/shared/ui/common/Modal'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'

import ApplicationView from '../../SchoolEvaluation/DocsEvaluation/ApplicationView/ApplicationView'
import * as S from './ApplicationModal.style'

const ApplicationModalContent = ({
  data,
}: {
  data: GetDocumentEvaluationApplicationResponseDTO | undefined
}) => {
  return <ApplicationView data={data} isModal={true} />
}

const ApplicationModal = ({
  onClose,
  assignmentId,
  recruitmentId,
}: {
  onClose: () => void
  assignmentId: string
  recruitmentId: string
}) => {
  const {
    data: answerData,
    isLoading: isApplicationLoading,
    isError,
    error,
    refetch,
  } = useGetDocumentEvaluationApplicationDetail(recruitmentId, assignmentId)

  return (
    <Modal.Root open={true} onOpenChange={(open) => !open && onClose()}>
      <Modal.Portal>
        <Modal.Overlay />

        <Modal.Content>
          <S.ModalContentWrapper
            flexDirection="column"
            padding="24px"
            width="480px"
            maxWidth={'90vw'}
            height={'100%'}
          >
            <Modal.Header>
              <Flex justifyContent="space-between" alignItems="center" width="100%">
                <Modal.Title asChild>
                  <S.TitleGroup>
                    <S.Title>닉네임/성이름 님의 지원서</S.Title>
                  </S.TitleGroup>
                </Modal.Title>
                <Modal.Close asChild>
                  <S.ModalButton type="button" aria-label="모달 닫기">
                    <Close color={theme.colors.gray[400]} />
                  </S.ModalButton>
                </Modal.Close>
              </Flex>
            </Modal.Header>
            <S.ApplicationViewWrapper>
              {isApplicationLoading ? (
                <SuspenseFallback label="지원서를 불러오는 중입니다." />
              ) : isError ? (
                <ErrorPage
                  title="지원서를 불러오는 중 오류가 발생했습니다."
                  description={
                    (error as { message?: string } | null)?.message ?? '잠시 후 다시 시도해 주세요.'
                  }
                  onRetry={() => void refetch()}
                />
              ) : (
                <ApplicationModalContent data={answerData?.result} />
              )}
            </S.ApplicationViewWrapper>
          </S.ModalContentWrapper>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  )
}
export default ApplicationModal
