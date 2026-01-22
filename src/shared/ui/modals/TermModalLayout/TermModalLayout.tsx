import type { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import remarkGfm from 'remark-gfm'

import Close from '@shared/assets/icons/close.svg?react'
import Flex from '@shared/ui/common/Flex/Flex'
import { Modal } from '@shared/ui/common/Modal'

import { theme } from '@/shared/styles/theme'
import * as S from '@/shared/ui/modals/TermModalLayout/TermModalLayout.style'

type TermModalLayoutProps = {
  title?: string
  content?: string
  children?: ReactNode
  onClose: () => void
  isLoading?: boolean
  error?: string
  loadingLabel?: string
  errorLabel?: string
}

const TermMarkdown = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ node: _node, ...props }) => <S.Heading1 {...props} />,
        h2: ({ node: _node, ...props }) => <S.Heading2 {...props} />,
        p: ({ node: _node, ...props }) => <S.Paragraph {...props} />,
        li: ({ node: _node, ...props }) => <S.ListItem {...props} />,
        hr: () => <S.Divider />,
        table: ({ node: _node, ...props }) => (
          <S.TableWrapper>
            <S.StyledTable {...props} />
          </S.TableWrapper>
        ),
        th: ({ node: _node, ...props }) => <S.TableHeader {...props} />,
        td: ({ node: _node, ...props }) => <S.TableCell {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

const TermModalLayout = ({
  title = '약관',
  content,
  children,
  onClose,
  isLoading,
  error,
  loadingLabel = '약관을 불러오는 중입니다...',
  errorLabel,
}: TermModalLayoutProps) => {
  return (
    <Modal.Root open={true} onOpenChange={(open) => !open && onClose()}>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content>
          <Flex
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
            width="1048px"
            maxWidth="90vw"
            height="720px"
            maxHeight="90vh"
          >
            <S.Card>
              <S.Header>
                <Flex justifyContent="space-between" alignItems="center">
                  <Modal.Title asChild>
                    <S.Title>{title}</S.Title>
                  </Modal.Title>
                  <Modal.Close asChild>
                    <Close
                      color={theme.colors.gray[400]}
                      css={{ cursor: 'pointer', width: '21px', height: '21px' }}
                    />
                  </Modal.Close>
                </Flex>
              </S.Header>
              <S.ContentWrapper>
                <S.ContentSection>
                  {isLoading ? (
                    <StatusWrapper>
                      <Spinner />
                      <span css={{ color: theme.colors.gray[300], ...theme.typography.B4.Rg }}>
                        {loadingLabel}
                      </span>
                    </StatusWrapper>
                  ) : error ? (
                    <StatusWrapper>
                      <span css={{ color: theme.colors.red[400], ...theme.typography.B4.Rg }}>
                        {errorLabel ?? error}
                      </span>
                    </StatusWrapper>
                  ) : content ? (
                    <TermMarkdown content={content} />
                  ) : (
                    children
                  )}
                  <br />
                </S.ContentSection>
              </S.ContentWrapper>
              <S.Blur />
            </S.Card>
          </Flex>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  )
}

const spinRotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Spinner = styled.span`
  width: 32px;
  height: 32px;
  border: 3px solid rgba(255, 255, 255, 0.25);
  border-top-color: ${theme.colors.lime};
  border-radius: 50%;
  animation: ${spinRotation} 0.8s linear infinite;
`

const StatusWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding-top: 40px;
`

export default TermModalLayout
