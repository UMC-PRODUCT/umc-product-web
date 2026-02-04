import { useState } from 'react'

import type { PartType } from '@/features/auth/domain'
import Close from '@/shared/assets/icons/close.svg?react'
import { theme } from '@/shared/styles/theme'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import { Modal } from '@/shared/ui/common/Modal/Modal'

import * as S from './SetPassPartModal.style'

export const SetPassPartModal = ({ onClose }: { onClose: () => void }) => {
  const [part, setPart] = useState<PartType>('SPRINGBOOT')
  return (
    <Modal.Root open={true} onOpenChange={(open) => !open && onClose()}>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content>
          <S.ModalContentWrapper
            css={{
              backgroundColor: theme.colors.gray[700],
              boxShadow: '0 8px 20px 0 rgba(0, 0, 0, 0.70)',
            }}
            flexDirection="column"
            padding={'24px 28px'}
            width={'fit-content'}
            height={'fit-content'}
          >
            <Modal.Header>
              <Flex
                justifyContent="space-between"
                alignItems="flex-start"
                width="100%"
                css={{ borderBottom: `1px solid ${theme.colors.gray[600]}`, paddingBottom: '16px' }}
              >
                <Modal.Title asChild>
                  <div>
                    <S.Title>닉넴/성이름 님의 합격 파트 선택</S.Title>
                    <S.SubTitle>
                      지원자가 2개의 파트에 지원했습니다. 최종 합격 처리할 파트를 선택해 주세요.
                    </S.SubTitle>
                  </div>
                </Modal.Title>
                <Modal.Close asChild>
                  <S.ModalButton type="button" aria-label="모달 닫기" onClick={onClose}>
                    <Close color={theme.colors.gray[300]} width={30} />
                  </S.ModalButton>
                </Modal.Close>
              </Flex>
            </Modal.Header>
            <Modal.Body>
              <S.ContentWrapper
                flexDirection="column"
                justifyContent="flex-start"
                alignItems="center"
                gap={22}
              >
                <S.ScoreInfo>
                  <S.Score>
                    <span className="label">서류 점수</span>
                    <span className="score">91.0</span>
                  </S.Score>
                  <S.Score>
                    <span className="label">면접 점수</span>
                    <span className="score">90.0</span>
                  </S.Score>
                  <S.Score>
                    <span className="label">최종 환산 점수</span>
                    <span className="totalScore">90.5</span>
                  </S.Score>
                </S.ScoreInfo>
                <S.ButtonWrapper>
                  <S.PartButton
                    Active={part === 'SPRINGBOOT'}
                    onClick={() => setPart('SPRINGBOOT')}
                  >
                    <S.RadioChoiceInput
                      type="radio"
                      readOnly
                      checked={part === 'SPRINGBOOT'}
                      $isChecked={part === 'SPRINGBOOT'}
                      $isInteractive={true}
                    />
                    1지망 SpringBoot 합격
                  </S.PartButton>
                  <S.PartButton Active={part === 'NODEJS'} onClick={() => setPart('NODEJS')}>
                    <S.RadioChoiceInput
                      type="radio"
                      readOnly
                      checked={part === 'NODEJS'}
                      $isChecked={part === 'NODEJS'}
                      $isInteractive={true}
                    />
                    2지망 Node.js 합격
                  </S.PartButton>
                </S.ButtonWrapper>
                <Modal.Footer>
                  <Button
                    tone="gray"
                    label="닫기"
                    onClick={onClose}
                    css={{ width: 'fit-content', padding: '7px 17px' }}
                  />
                  <Button
                    tone="lime"
                    label="합격 처리"
                    css={{ width: 'fit-content', padding: '7px 17px' }}
                  />
                </Modal.Footer>
              </S.ContentWrapper>
            </Modal.Body>
          </S.ModalContentWrapper>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  )
}
