import { useState } from 'react'

import Close from '@/shared/assets/icons/close.svg?react'
import { theme } from '@/shared/styles/theme'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import { Modal } from '@/shared/ui/common/Modal'

import * as S from './AdditionalQuestionModal.style'

const AdditionalQuestionModal = ({ onClose }: { onClose: () => void }) => {
  const [wordCount, setWordCount] = useState(0)

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWordCount(e.target.value.length)
  }
  return (
    <Modal.Root open={true} onOpenChange={(open) => !open && onClose()}>
      <Modal.Portal>
        <Modal.Overlay />

        <Modal.Content>
          <S.ModalContentWrapper
            flexDirection="column"
            padding="24px"
            width="600px"
            maxWidth={'90vw'}
          >
            <Modal.Header>
              <Flex justifyContent="space-between" alignItems="center" width="100%">
                <Modal.Title asChild>
                  <S.Title>추가 질문 등록</S.Title>
                </Modal.Title>
                <Modal.Close asChild>
                  <S.ModalButton type="button" aria-label="모달 닫기">
                    <Close color={theme.colors.gray[300]} width={20} />
                  </S.ModalButton>
                </Modal.Close>
              </Flex>
            </Modal.Header>
            <S.ApplicationViewWrapper>
              <form method="POST">
                <textarea
                  placeholder="질문 내용을 작성해주세요."
                  onChange={handleTextChange}
                  maxLength={238}
                />
              </form>
            </S.ApplicationViewWrapper>
            <Modal.Footer>
              <S.FooterWrapper>
                <S.WordCounter>{wordCount} / 238</S.WordCounter>
                <Button
                  type="submit"
                  tone="lime"
                  variant="solid"
                  label="질문 등록"
                  css={{ width: 'fit-content', padding: '6px 18px' }}
                />
              </S.FooterWrapper>
            </Modal.Footer>
          </S.ModalContentWrapper>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  )
}
export default AdditionalQuestionModal
