import Close from '@/shared/assets/icons/close.svg?react'
import { theme } from '@/shared/styles/theme'
import Flex from '@/shared/ui/common/Flex/Flex'
import { Modal } from '@/shared/ui/common/Modal'

import ExternalLinkModalContent from './ExternalLinkModalContent'
import * as S from './index.style'

type ExternalLinkModalProps = {
  onClose: () => void
}

const ExternalLinkModal = ({ onClose }: ExternalLinkModalProps) => {
  return (
    <Modal.Root open={true} onOpenChange={(open) => !open && onClose()}>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content
          onPointerDownOutside={(event) => event.preventDefault()}
          css={{ width: '480px', maxWidth: '90vw' }}
        >
          <S.ModalContentWrapper flexDirection="column" padding="24px">
            <Modal.Header>
              <Flex
                justifyContent="space-between"
                alignItems="flex-start"
                width="100%"
                css={{ marginBottom: '20px' }}
              >
                <Modal.Title asChild>
                  <S.TitleGroup>
                    <S.Title>외부 링크 관리</S.Title>
                    <S.Subtitle>
                      {`학교별 외부 링크를 관리할 수 있습니다.\n카카오/인스타그램/유튜브만 등록 가능합니다.`}
                    </S.Subtitle>
                  </S.TitleGroup>
                </Modal.Title>
                <Modal.Close asChild>
                  <S.ModalButton type="button" aria-label="모달 닫기">
                    <Close color={theme.colors.gray[400]} />
                  </S.ModalButton>
                </Modal.Close>
              </Flex>
            </Modal.Header>
            <Modal.Body>
              <ExternalLinkModalContent onClose={onClose} />
            </Modal.Body>
          </S.ModalContentWrapper>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  )
}

export default ExternalLinkModal
