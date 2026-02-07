import Close from '@/shared/assets/icons/close.svg?react'
import { theme } from '@/shared/styles/theme'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import { Modal } from '@/shared/ui/common/Modal'

import * as S from './common.style'

const EditTerm = ({ onClose, termId }: { termId: string; onClose: () => void }) => {
  console.log('Editing term with ID:', termId)
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
                  <S.ModalTitle>서비스이용약관 수정하기</S.ModalTitle>
                </Modal.Title>
                <Modal.Close asChild>
                  <S.ModalButton type="button" aria-label="모달 닫기">
                    <Close color={theme.colors.gray[300]} width={20} />
                  </S.ModalButton>
                </Modal.Close>
              </Flex>
            </Modal.Header>
            <Flex justifyContent="flex-end">
              <S.Info>최종 수정: 2024.01.15 14:23</S.Info>
            </Flex>

            <Modal.Footer>
              <S.FooterWrapper>
                <S.Info>
                  수정 사항을 저장하시겠습니까? 저장하지 않으면 변경 내용이 사라집니다.
                </S.Info>
                <Flex width={'fit-content'}>
                  <Button typo="C3.Md" tone="gray" label="취소" onClick={onClose} />
                  <Button
                    type="submit"
                    tone="lime"
                    typo="C3.Md"
                    variant="solid"
                    label="저장"
                    css={{ width: 'fit-content', padding: '6px 18px' }}
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
export default EditTerm
