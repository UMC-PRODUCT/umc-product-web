import Close from '@shared/assets/icons/close.svg?react'
import Flex from '@shared/ui/common/Flex/Flex'
import Instruction from '@shared/ui/common/Instruction/Instruction'
import { Modal } from '@shared/ui/common/Modal'
import * as S from '@shared/ui/modals/AlertModalLayout/AlertModalLayout.style'

type AlertModalLayoutProps = {
  onClose: () => void
  title: string
  content: string
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
  children: React.ReactNode
  mode: 'success' | 'error' | 'warning'
}

export default function AlertModalLayout({
  onClose,
  title,
  content,
  Icon,
  children,
  mode,
}: AlertModalLayoutProps) {
  return (
    <Modal.Root open={true} onOpenChange={(open) => !open && onClose()}>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content>
          <S.ModalContentWrapper
            flexDirection="column"
            width="fit-content"
            maxWidth="90vw"
            padding="24px"
          >
            <Modal.Header>
              <Flex
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                css={{ marginBottom: '33px' }}
              >
                <Modal.Title asChild>
                  <Instruction
                    content={title}
                    typography="H2.Sb"
                    Icon={Icon}
                    iconSize={32}
                    mode={mode}
                  />
                </Modal.Title>
                <Modal.Close asChild>
                  <S.ModalButton type="button" aria-label="모달 닫기">
                    <Close />
                  </S.ModalButton>
                </Modal.Close>
              </Flex>
            </Modal.Header>
            <Modal.Body>
              <S.ContentWrapper
                justifyContent="flex-start"
                width={'fit-content'}
                minHeight="50px"
                alignItems="center"
              >
                {content}
              </S.ContentWrapper>
            </Modal.Body>
            <Modal.Footer>
              <Flex justifyContent="flex-end">{children}</Flex>
            </Modal.Footer>
          </S.ModalContentWrapper>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  )
}
