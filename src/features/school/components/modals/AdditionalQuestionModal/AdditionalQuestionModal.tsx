import type { ChangeEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { useRecruitingMutation } from '@/features/school/hooks/useRecruitingMutation'
import Close from '@/shared/assets/icons/close.svg?react'
import { schoolKeys } from '@/shared/queryKeys'
import { theme } from '@/shared/styles/theme'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import { Modal } from '@/shared/ui/common/Modal'

import * as S from './AdditionalQuestionModal.style'

const AdditionalQuestionModal = ({
  onClose,
  recruitmentId,
  assignmentId,
  liveQuestionId,
  initialText,
}: {
  onClose: () => void
  recruitmentId: string
  assignmentId: string
  liveQuestionId?: string
  initialText?: string
}) => {
  const queryClient = useQueryClient()
  const [questionText, setQuestionText] = useState(initialText ?? '')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { usePostInterviewLiveQuestion, usePatchInterviewLiveQuestion } = useRecruitingMutation()
  const { mutate: postInterviewLiveQuestionMutate, isPending } = usePostInterviewLiveQuestion()
  const { mutate: patchInterviewLiveQuestionMutate, isPending: isPatchPending } =
    usePatchInterviewLiveQuestion()

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      textareaRef.current?.focus()
    })

    return () => cancelAnimationFrame(rafId)
  }, [])

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setQuestionText(e.target.value)
  }

  const handleSubmit = () => {
    const trimmedText = questionText.trim()
    if (!trimmedText) return

    if (liveQuestionId) {
      patchInterviewLiveQuestionMutate(
        {
          recruitmentId,
          assignmentId,
          liveQuestionId,
          requestBody: { text: trimmedText },
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: schoolKeys.evaluation.interview.getView(recruitmentId, assignmentId),
            })
            queryClient.invalidateQueries({
              queryKey: schoolKeys.evaluation.interview.getLiveQuestions(
                recruitmentId,
                assignmentId,
              ),
            })
            onClose()
          },
        },
      )
      return
    }

    postInterviewLiveQuestionMutate(
      {
        recruitmentId,
        assignmentId,
        requestBody: { text: trimmedText },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: schoolKeys.evaluation.interview.getView(recruitmentId, assignmentId),
          })
          queryClient.invalidateQueries({
            queryKey: schoolKeys.evaluation.interview.getLiveQuestions(recruitmentId, assignmentId),
          })
          onClose()
        },
      },
    )
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
                  ref={textareaRef}
                  placeholder="질문 내용을 작성해주세요."
                  value={questionText}
                  onChange={handleTextChange}
                  maxLength={238}
                />
              </form>
            </S.ApplicationViewWrapper>
            <Modal.Footer>
              <S.FooterWrapper>
                <S.WordCounter>{questionText.length} / 238</S.WordCounter>
                <Button
                  type="button"
                  tone="lime"
                  variant="solid"
                  label={isPending || isPatchPending ? '저장 중...' : '질문 등록'}
                  onClick={handleSubmit}
                  disabled={isPending || isPatchPending || !questionText.trim()}
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
