import Flex from '@/components/common/Flex/Flex'
import Modal from '@/components/common/Modal/Modal'
import Instruction from '@/components/Instruction/Instruction'
import { theme } from '@/styles/theme'
import Close from '@/assets/icons/close.svg?react'
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
    <Modal onClose={onClose}>
      <Flex
        direction="column"
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
        <Flex
          justifyContent="space-between"
          alignItems="center"
          css={{
            marginBottom: '33px',
          }}
        >
          <Instruction
            content={title}
            typography="H2.Sb"
            Icon={Icon}
            iconSize={32}
            mode={mode}
          />
          <S.ModalButton type="button" onClick={onClose} aria-label="모달 닫기">
            <Close />
          </S.ModalButton>
        </Flex>
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
        <Flex justifyContent="flex-end">{children}</Flex>
      </Flex>
    </Modal>
  )
}
