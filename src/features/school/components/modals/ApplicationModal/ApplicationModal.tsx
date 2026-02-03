import Close from '@shared/assets/icons/close.svg?react'

import { useGetApplicationFormData } from '@/features/school/hooks/useGetRecruitingData'
import { answers } from '@/features/school/mocks/application'
import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'
import { Modal } from '@/shared/ui/common/Modal'

import ApplicationView from '../../SchoolEvaluation/DocsEvaluation/ApplicationView/ApplicationView'
import * as S from './ApplicationModal.style'

const ApplicationModal = ({ onClose }: { onClose: () => void }) => {
  const { data: questionData } = useGetApplicationFormData('34')
  const data = answers
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
              <ApplicationView data={data} questions={questionData.result} isModal={true} />
            </S.ApplicationViewWrapper>
          </S.ModalContentWrapper>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  )
}
export default ApplicationModal
