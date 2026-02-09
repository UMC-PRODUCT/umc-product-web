import { useEffect, useRef } from 'react'

import { patchTerms } from '@/features/auth/domain/api'
import { useTermsById } from '@/features/auth/hooks/register/useTerms'
import Close from '@/shared/assets/icons/close.svg?react'
import { theme } from '@/shared/styles/theme'
import AsyncBoundary from '@/shared/ui/common/AsyncBoundary/AsyncBoundary'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import { Modal } from '@/shared/ui/common/Modal'

import * as S from './common.style'
import { applyMarkdownBlock, execEditorCommand, markdownToHtml } from './editorUtils'

const EditTermContent = ({ onClose, termId }: { termId: string; onClose: () => void }) => {
  const { data } = useTermsById(termId)
  const editorRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef('')
  const isComposingRef = useRef(false)

  useEffect(() => {
    const raw = data.result.content
    if (!raw) return
    const isHtml = /<[^>]+>/.test(raw)
    const html = isHtml ? raw : markdownToHtml(raw)
    contentRef.current = html
    const editor = editorRef.current
    if (editor) {
      editor.innerHTML = html
    }
  }, [data])

  const execCommand = (command: string, value?: string) => {
    const html = execEditorCommand(editorRef.current, command, value)
    if (html !== null) contentRef.current = html
  }

  const handleBold = () => execCommand('bold')
  const handleItalic = () => execCommand('italic')
  const handleUnderline = () => execCommand('underline')
  const handleHeading1 = () => execCommand('formatBlock', 'H1')
  const handleHeading2 = () => execCommand('formatBlock', 'H2')
  const handleHeading3 = () => execCommand('formatBlock', 'H3')
  const handleSave = async () => {
    const editor = editorRef.current
    const current = editor?.innerHTML ?? contentRef.current
    await patchTerms(termId, { content: current })
    console.log('EditTerm saved content:', current)
  }

  return (
    <Modal.Root open={true} onOpenChange={(open) => !open && onClose()}>
      <Modal.Portal>
        <Modal.Overlay />

        <Modal.Content>
          <S.ModalContentWrapper
            flexDirection="column"
            width="900px"
            height={'fit-content'}
            maxHeight={'80vh'}
            maxWidth={'90vw'}
          >
            <Modal.Header>
              <Flex justifyContent="space-between" alignItems="center" width="100%" padding="24px">
                <Modal.Title asChild>
                  <S.ModalTitle>서비스이용약관 수정하기</S.ModalTitle>
                </Modal.Title>
                <Modal.Close asChild>
                  <S.ModalButton type="button" aria-label="모달 닫기">
                    <Close color={theme.colors.gray[300]} width={20} />
                  </S.ModalButton>
                </Modal.Close>
              </Flex>
            </Modal.Header>
            <Flex
              justifyContent="space-between"
              padding="15px 24px"
              width="100%"
              alignItems="center"
              css={{ backgroundColor: '#1f1f1f' }}
            >
              <S.Toolbar>
                <Flex gap={10} css={{ paddingRight: '10px', borderRight: `1px solid #333` }}>
                  <S.ToolButton type="button" onClick={handleBold}>
                    B
                  </S.ToolButton>
                  <S.ToolButton type="button" onClick={handleItalic}>
                    I
                  </S.ToolButton>
                  <S.ToolButton
                    type="button"
                    onClick={handleUnderline}
                    css={{ textDecoration: 'underline' }}
                  >
                    U
                  </S.ToolButton>
                </Flex>
                <Flex gap={10} css={{ marginLeft: '10px' }}>
                  <S.ToolButton type="button" onClick={handleHeading1}>
                    H1
                  </S.ToolButton>
                  <S.ToolButton type="button" onClick={handleHeading2}>
                    H2
                  </S.ToolButton>
                  <S.ToolButton type="button" onClick={handleHeading3}>
                    H3
                  </S.ToolButton>
                </Flex>
              </S.Toolbar>
              <S.Info>최종 수정: 2024.01.15 14:23</S.Info>
            </Flex>
            <S.EditorSection>
              <S.EditorPane>
                <S.WysiwygEditor
                  ref={editorRef}
                  contentEditable
                  suppressContentEditableWarning
                  data-placeholder="이용약관 내용을 작성하세요."
                  onCompositionStart={() => {
                    isComposingRef.current = true
                  }}
                  onCompositionEnd={() => {
                    isComposingRef.current = false
                  }}
                  onInput={(event) => {
                    contentRef.current = (event.target as HTMLDivElement).innerHTML || ''
                  }}
                  onKeyDown={(event) => {
                    if (isComposingRef.current || event.nativeEvent.isComposing) return
                    if (event.key === 'Enter') {
                      const applied = applyMarkdownBlock(editorRef.current)
                      if (applied) {
                        event.preventDefault()
                        event.stopPropagation()
                        contentRef.current = editorRef.current?.innerHTML || ''
                      }
                    }
                  }}
                />
              </S.EditorPane>
            </S.EditorSection>

            <Modal.Footer>
              <S.FooterWrapper>
                <S.Info>
                  수정 사항을 저장하시겠습니까? 저장하지 않으면 변경 내용이 사라집니다.
                </S.Info>
                <Flex width={'fit-content'} gap={8}>
                  <Button
                    typo="C3.Md"
                    tone="gray"
                    variant="outline"
                    label="취소"
                    onClick={onClose}
                    css={{ width: 'fit-content', padding: '6px 30px' }}
                  />
                  <Button
                    type="submit"
                    tone="lime"
                    typo="C3.Md"
                    variant="solid"
                    label="저장"
                    css={{ width: 'fit-content', padding: '6px 30px' }}
                    onClick={handleSave}
                  />
                </Flex>
              </S.FooterWrapper>
            </Modal.Footer>
          </S.ModalContentWrapper>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  )
}

const EditTerm = ({ onClose, termId }: { termId: string; onClose: () => void }) => {
  return (
    <AsyncBoundary
      fallback={null}
      errorFallback={() => <div>약관을 불러오는 중 오류가 발생했습니다.</div>}
    >
      <EditTermContent onClose={onClose} termId={termId} />
    </AsyncBoundary>
  )
}

export default EditTerm
