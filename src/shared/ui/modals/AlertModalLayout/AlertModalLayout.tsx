import Close from '@/shared/assets/icons/close.svg?react'
import { theme } from '@/shared/styles/theme'
import Flex from '@/shared/ui/common/Flex/Flex'
import Instruction from '@/shared/ui/common/Instruction/Instruction'
import { Modal } from '@/shared/ui/common/Modal'
import * as S from '@/shared/ui/modals/AlertModalLayout/AlertModalLayout.style'

type AlertModalLayoutProps = {
  onClose: () => void
  title: string
  content: string
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
  children: React.ReactNode
  mode: 'success' | 'error' | 'warning' | 'disabled'
}

const AlertModalLayout = ({
  onClose,
  title,
  content,
  Icon,
  children,
  mode,
}: AlertModalLayoutProps) => {
  return (
    <Modal.Root open={true} onOpenChange={(open) => !open && onClose()}>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content>
          <S.ModalContentWrapper flexDirection="column" padding="24px">
            <Modal.Header>
              <Flex
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                css={{ marginBottom: '33px' }}
              >
                <Modal.Title>
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
                    <Close color={theme.colors.gray[400]} />
                  </S.ModalButton>
                </Modal.Close>
              </Flex>
            </Modal.Header>
            <Modal.Description
              css={{
                position: 'absolute',
                width: 1,
                height: 1,
                padding: 0,
                margin: -1,
                overflow: 'hidden',
                clip: 'rect(0, 0, 0, 0)',
                whiteSpace: 'nowrap',
                border: 0,
              }}
            >
              {content}
            </Modal.Description>
            <Modal.Body>
              <S.ContentWrapper
                justifyContent="flex-start"
                width="fit-content"
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

export default AlertModalLayout
