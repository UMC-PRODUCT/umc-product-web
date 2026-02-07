import Close from '@/shared/assets/icons/close.svg?react'
import DefaultSchool from '@/shared/assets/icons/school.svg'
import { theme } from '@/shared/styles/theme'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import { Modal } from '@/shared/ui/common/Modal'
import Section from '@/shared/ui/common/Section/Section'
import { TextField } from '@/shared/ui/form/LabelTextField/TextField'

import * as S from './EditSchoolModal.style'

const EditSchoolModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal.Root open={true} onOpenChange={(open) => !open && onClose()}>
      <Modal.Portal>
        <Modal.Overlay />

        <Modal.Content>
          <S.ModalContentWrapper
            flexDirection="column"
            padding="24px"
            width="520px"
            height={'fit-content'}
            maxHeight={'80vh'}
            maxWidth={'90vw'}
          >
            <Modal.Header>
              <Flex justifyContent="space-between" alignItems="center" width="100%">
                <Modal.Title asChild>
                  <S.ModalTitle>학교 정보 수정</S.ModalTitle>
                </Modal.Title>
                <Modal.Close asChild>
                  <S.ModalButton type="button" aria-label="모달 닫기">
                    <Close color={theme.colors.gray[300]} width={20} />
                  </S.ModalButton>
                </Modal.Close>
              </Flex>
            </Modal.Header>
            <Section height="fit-content" variant="solid" css={{ marginTop: '32px' }}>
              <Flex alignItems="center" justifyContent="center" gap={25}>
                <img
                  src={DefaultSchool}
                  alt="학교 이미지"
                  css={{ borderRadius: '50%', width: '100px', height: '100px' }}
                />
                <Flex flexDirection="column" alignItems="flex-start">
                  <Flex alignItems="center" gap={20}>
                    <S.Name>UMC대학교</S.Name>
                    <S.Status>
                      <S.Circle />
                      활성
                    </S.Status>
                  </Flex>

                  <S.SubInfo>비고비고비고</S.SubInfo>
                </Flex>
              </Flex>
            </Section>
            <Flex flexDirection="column" gap={10}>
              <Flex flexDirection="column" gap={8}>
                <S.Title>학교명</S.Title>
                <TextField type="text" autoComplete="none" placeholder="학교명을 입력해주세요" />
              </Flex>
              <Flex flexDirection="column" gap={8}>
                <S.Title>비고</S.Title>
                <TextField type="text" autoComplete="none" placeholder="비고 (선택)" />
              </Flex>
              <Flex flexDirection="column" gap={4}>
                <S.Title>외부 링크</S.Title>
                <TextField type="text" autoComplete="none" />
              </Flex>
            </Flex>

            <Modal.Footer>
              <S.FooterWrapper>
                <Button typo="C3.Md" tone="gray" label="닫기" onClick={onClose} />
                <Button
                  type="submit"
                  tone="lime"
                  typo="C3.Md"
                  variant="solid"
                  label="저장하기"
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
export default EditSchoolModal
