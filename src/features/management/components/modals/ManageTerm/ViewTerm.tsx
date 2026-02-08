import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

import { useTermsById } from '@/features/auth/hooks/register/useTerms'
import Close from '@/shared/assets/icons/close.svg?react'
import { theme } from '@/shared/styles/theme'
import AsyncBoundary from '@/shared/ui/common/AsyncBoundary/AsyncBoundary'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import { Modal } from '@/shared/ui/common/Modal'

import * as S from './common.style'

const ViewTermContent = ({ termId, onClose }: { termId: string; onClose: () => void }) => {
  const { data } = useTermsById(termId)
  return (
    <Modal.Root open={true} onOpenChange={(open) => !open && onClose()}>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content>
          <S.ModalContentWrapper
            flexDirection="column"
            padding="24px"
            width="900px"
            height={'fit-content'}
            maxHeight={'80vh'}
            maxWidth={'90vw'}
          >
            <Modal.Header>
              <Flex justifyContent="space-between" alignItems="center" width="100%">
                <Modal.Title asChild>
                  <S.ModalTitle>{data.result.title} 내용 보기</S.ModalTitle>
                </Modal.Title>
                <Modal.Close asChild>
                  <S.ModalButton type="button" aria-label="모달 닫기">
                    <Close color={theme.colors.gray[300]} width={20} />
                  </S.ModalButton>
                </Modal.Close>
              </Flex>
            </Modal.Header>
            <Flex justifyContent="flex-start" margin="10px 0 0 0">
              <S.Info>
                <span>최종 수정일: 2024.01.15 14:23</span>
                <span>최종 수정자: 닉네임/이름</span>
              </S.Info>
            </Flex>
            <Flex
              flexDirection="column"
              padding="16px"
              alignItems="flex-start"
              height={400}
              css={{
                backgroundColor: theme.colors.black,

                margin: '20px 0',
                borderRadius: '8px',
                overflowY: 'scroll',
              }}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  h1: ({ node: _node, ...props }) => <S.Heading1 {...props} />,
                  h2: ({ node: _node, ...props }) => <S.Heading2 {...props} />,
                  h3: ({ node: _node, ...props }) => <S.Heading3 {...props} />,
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
                {data.result.content}
              </ReactMarkdown>
            </Flex>
            <Modal.Footer>
              <Button
                type="submit"
                tone="lime"
                typo="C3.Md"
                variant="solid"
                label="닫기"
                css={{ width: '110px', padding: '6px 18px' }}
                onClick={onClose}
              />
            </Modal.Footer>
          </S.ModalContentWrapper>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  )
}

const ViewTerm = ({ termId, onClose }: { termId: string; onClose: () => void }) => {
  return (
    <AsyncBoundary
      fallback={null}
      errorFallback={() => <div>약관을 불러오는 중 오류가 발생했습니다.</div>}
    >
      <ViewTermContent termId={termId} onClose={onClose} />
    </AsyncBoundary>
  )
}

export default ViewTerm
