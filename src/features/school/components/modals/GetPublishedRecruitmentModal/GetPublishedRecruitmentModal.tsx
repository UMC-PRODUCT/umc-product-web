import Close from '@/shared/assets/icons/close.svg?react'
import { theme } from '@/shared/styles/theme'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import { Modal } from '@/shared/ui/common/Modal'

import * as S from './GetPublishedRecruitmentModal.style'

type PublishedRecruitment = {
  recruitmentId: string
  recruitmentName: string
  startDate: string
  endDate: string
}

const formatDate = (value: string) => value.replaceAll('-', '.')

const GetPublishedRecruitmentModal = ({
  recruitments,
  onClose,
  onSelect,
}: {
  recruitments: Array<PublishedRecruitment>
  onClose: () => void
  onSelect: (recruitmentId: string) => void
}) => {
  return (
    <Modal.Root open={true} onOpenChange={(open) => !open && onClose()}>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content>
          <S.ModalContentWrapper>
            <Modal.Header>
              <S.HeaderRow>
                <Modal.Title asChild>
                  <S.Title>기존 모집 불러오기</S.Title>
                </Modal.Title>
                <Modal.Close asChild>
                  <S.ModalButton type="button" aria-label="모달 닫기">
                    <Close color={theme.colors.gray[300]} width={36} />
                  </S.ModalButton>
                </Modal.Close>
              </S.HeaderRow>
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
              기존에 게시된 모집 목록에서 불러올 모집을 선택할 수 있습니다.
            </Modal.Description>
            <Modal.Body>
              <S.ListWrapper>
                {recruitments.map((recruitment) => (
                  <S.Card key={recruitment.recruitmentId}>
                    <Flex flexDirection="column" gap={10} alignItems="flex-start">
                      <S.Name>{recruitment.recruitmentName}</S.Name>
                      <Flex gap={40}>
                        <S.DateText>{`시작: ${formatDate(recruitment.startDate)}`}</S.DateText>
                        <S.DateText>{`종료: ${formatDate(recruitment.endDate)}`}</S.DateText>
                      </Flex>
                    </Flex>
                    <Button
                      type="button"
                      label="선택"
                      tone="lime"
                      typo="B4.Sb"
                      css={{ width: '57px', height: '30px' }}
                      onClick={() => onSelect(recruitment.recruitmentId)}
                    />
                  </S.Card>
                ))}
              </S.ListWrapper>
            </Modal.Body>
          </S.ModalContentWrapper>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  )
}

export default GetPublishedRecruitmentModal
