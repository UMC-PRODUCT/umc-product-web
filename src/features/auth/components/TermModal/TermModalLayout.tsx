import type { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import * as S from '@features/auth/components/TermModal/TermModalLayout.style'

import Close from '@shared/assets/icons/close.svg?react'
import Flex from '@shared/ui/common/Flex/Flex'
import { Modal } from '@shared/ui/common/Modal'

type TermModalLayoutProps = {
  title?: string
  content?: string
  children?: ReactNode
  onClose: () => void
}

function TermMarkdown({ content }: { content: string }) {
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

export default function TermModalLayout({
  title = '약관',
  content,
  children,
  onClose,
}: TermModalLayoutProps) {
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
                    <Close css={{ cursor: 'pointer', width: '21px', height: '21px' }} />
                  </Modal.Close>
                </Flex>
              </S.Header>
              <S.ContentWrapper>
                <S.ContentSection>
                  {content ? <TermMarkdown content={content} /> : children}
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
