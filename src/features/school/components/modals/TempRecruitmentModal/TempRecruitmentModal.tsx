import Close from '@shared/assets/icons/close.svg?react'
import { Modal } from '@shared/ui/common/Modal'

import * as S from '@/features/school/components/modals/TempRecruitmentModal/TempRecruitmentModal.style'
import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'

import TempRecruitmentCard from './TempRecruitmentCard'

type TempRecruitmentModalProps = {
  onClose: () => void
}
const TempRecruitmentModal = ({ onClose }: TempRecruitmentModalProps) => {
  return (
    <Modal.Root open={true} onOpenChange={(open) => !open && onClose()}>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content>
          <S.ModalContentWrapper
            flexDirection="column"
            padding="24px"
            width="920px"
            maxHeight={'600px'}
            minHeight={'600px'}
            maxWidth={'90vw'}
          >
            <Modal.Header>
              <Flex
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                css={{
                  borderBottom: `1px solid ${theme.colors.gray[600]}`,
                }}
              >
                <Modal.Title asChild>
                  <S.Title>임시저장 모집</S.Title>
                </Modal.Title>
                <Modal.Close asChild>
                  <S.ModalButton type="button" aria-label="모달 닫기">
                    <Close color={theme.colors.gray[400]} />
                  </S.ModalButton>
                </Modal.Close>
              </Flex>
            </Modal.Header>
            <Modal.Body>
              <S.ContentWrapper width="100%" alignItems="center" flexDirection="column" gap={'8px'}>
                <TempRecruitmentCard
                  title="Sample Title"
                  tempSavedTime="2026.01.28 22:08"
                  editable={true}
                />
              </S.ContentWrapper>
            </Modal.Body>
          </S.ModalContentWrapper>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  )
}

export default TempRecruitmentModal
