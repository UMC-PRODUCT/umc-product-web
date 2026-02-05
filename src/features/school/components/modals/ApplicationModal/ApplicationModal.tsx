import { useGetApplicationFormData } from '@/features/school/hooks/useGetRecruitingData'
import { answers } from '@/features/school/mocks/application'
import Close from '@/shared/assets/icons/close.svg?react'
import { theme } from '@/shared/styles/theme'
import AsyncBoundary from '@/shared/ui/common/AsyncBoundary/AsyncBoundary'
import ErrorPage from '@/shared/ui/common/ErrorPage/ErrorPage'
import { Flex } from '@/shared/ui/common/Flex'
import { Modal } from '@/shared/ui/common/Modal'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'

import ApplicationView from '../../SchoolEvaluation/DocsEvaluation/ApplicationView/ApplicationView'
import * as S from './ApplicationModal.style'

const ApplicationModalContent = () => {
  const { data: questionData } = useGetApplicationFormData('34')
  const data = answers
  return <ApplicationView data={data} questions={questionData.result} isModal={true} />
}

const ApplicationModal = ({ onClose }: { onClose: () => void }) => {
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
              <AsyncBoundary
                fallback={<SuspenseFallback label="지원서를 불러오는 중입니다." />}
                errorFallback={(error, reset) => (
                  <ErrorPage
                    title="지원서를 불러오는 중 오류가 발생했습니다."
                    description={error.message || '잠시 후 다시 시도해 주세요.'}
                    onRetry={reset}
                  />
                )}
              >
                <ApplicationModalContent />
              </AsyncBoundary>
            </S.ApplicationViewWrapper>
          </S.ModalContentWrapper>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  )
}
export default ApplicationModal
