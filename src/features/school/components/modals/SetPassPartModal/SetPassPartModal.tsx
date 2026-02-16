import { useState } from 'react'

import Close from '@/shared/assets/icons/close.svg?react'
import { theme } from '@/shared/styles/theme'
import type { PartType } from '@/shared/types/part'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import { Modal } from '@/shared/ui/common/Modal/Modal'

import * as S from './SetPassPartModal.style'

export const SetPassPartModal = ({
  onClose,
  onConfirm,
  applicantName,
  applicantNickname,
  documentScore,
  interviewScore,
  finalScore,
  appliedParts,
  isSubmitting = false,
}: {
  onClose: () => void
  onConfirm: (selectedPart: PartType) => void
  applicantName: string
  applicantNickname: string
  documentScore: string
  interviewScore: string
  finalScore: string
  appliedParts: Array<{ priority: string; key: PartType; label: string }>
  isSubmitting?: boolean
}) => {
  const [part, setPart] = useState<PartType>(appliedParts[0]?.key ?? 'SPRINGBOOT')

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
                    <S.Title>{`${applicantNickname}/${applicantName} 님의 합격 파트 선택`}</S.Title>
                    <S.SubTitle>
                      지원자가 여러 파트에 지원했습니다. 최종 합격 처리할 파트를 선택해 주세요.
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
                    <span className="score">{documentScore}</span>
                  </S.Score>
                  <S.Score>
                    <span className="label">면접 점수</span>
                    <span className="score">{interviewScore}</span>
                  </S.Score>
                  <S.Score>
                    <span className="label">최종 환산 점수</span>
                    <span className="totalScore">{finalScore}</span>
                  </S.Score>
                </S.ScoreInfo>
                <S.ButtonWrapper>
                  {appliedParts.map((appliedPart) => (
                    <S.PartButton
                      key={appliedPart.key}
                      Active={part === appliedPart.key}
                      onClick={() => setPart(appliedPart.key)}
                    >
                      <S.RadioChoiceInput
                        type="radio"
                        readOnly
                        checked={part === appliedPart.key}
                        $isChecked={part === appliedPart.key}
                        $isInteractive={true}
                      />
                      {`${appliedPart.priority}지망 ${appliedPart.label} 합격`}
                    </S.PartButton>
                  ))}
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
                    disabled={isSubmitting}
                    onClick={() => onConfirm(part)}
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
