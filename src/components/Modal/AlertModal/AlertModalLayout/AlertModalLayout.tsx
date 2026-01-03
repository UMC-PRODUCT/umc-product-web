import Close from '@/assets/icons/close.svg?react'
import Flex from '@/components/common/Flex/Flex'
import Instruction from '@/components/common/Instruction/Instruction'
import { Modal } from '@/components/common/Modal'
import { theme } from '@/styles/theme'

import * as S from './AlertModalLayout.style'

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
          <Flex
            flexDirection="column"
            gap={'16px'}
            padding={'28px 28px 30px 34px'}
            width="90vw"
            minWidth="390px"
            maxWidth="492px"
            css={{
              backgroundColor: theme.colors.gray[700],
              borderRadius: '8px',
            }}
          >
            <Modal.Header>
              <Flex
                justifyContent="space-between"
                alignItems="center"
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
              <Flex
                justifyContent="flex-start"
                width="100%"
                minHeight="50px"
                alignItems="center"
                css={{
                  borderLeft: `4px solid ${theme.colors.white}`,
                  paddingLeft: '14px',
                  color: theme.colors.white,
                  whiteSpace: 'pre-line',
                  ...theme.typography.B3.Md,
                }}
              >
                {content}
              </Flex>
            </Modal.Body>
            <Modal.Footer>
              <Flex justifyContent="flex-end">{children}</Flex>
            </Modal.Footer>
          </Flex>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  )
}
