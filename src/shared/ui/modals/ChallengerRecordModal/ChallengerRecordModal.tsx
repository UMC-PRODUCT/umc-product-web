import { useEffect, useMemo, useRef, useState } from 'react'

import { useAuthMutation } from '@/features/auth/hooks/useAuthMutations'
import Close from '@/shared/assets/icons/close.svg?react'
import { theme } from '@/shared/styles/theme'
import { Button } from '@/shared/ui/common/Button'
import { Modal } from '@/shared/ui/common/Modal'

import * as S from './ChallengerRecordModal.style'

type ChallengerRecordModalProps = {
  onClose: () => void
}

type VerifyStatus = 'idle' | 'success' | 'error'

const CODE_LENGTH = 6

const ChallengerRecordModal = ({ onClose }: ChallengerRecordModalProps) => {
  const [code, setCode] = useState('')
  const [status, setStatus] = useState<VerifyStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const { usePostChallengerRecordMember } = useAuthMutation()
  const { mutate: postChallengerRecord, isPending } = usePostChallengerRecordMember()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const message = useMemo(() => {
    if (status === 'success') return '챌린저 기록을 성공적으로 불러왔습니다.'
    if (status === 'error')
      return errorMessage || '올바르지 않은 코드입니다. 인증 번호 6자리를 입력해 주세요.'
    return '인증 번호 6자리를 입력해 주세요.'
  }, [errorMessage, status])

  const digits = useMemo(
    () => Array.from({ length: CODE_LENGTH }, (_, index) => code[index] ?? ''),
    [code],
  )

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = event.target.value.replace(/\D/g, '').slice(0, CODE_LENGTH)
    if (status !== 'idle') setStatus('idle')
    if (errorMessage) setErrorMessage('')
    setCode(onlyDigits)
  }

  const handleRequest = () => {
    if (code.length !== CODE_LENGTH) {
      setStatus('error')
      setErrorMessage('인증 번호 6자리를 입력해 주세요.')
      return
    }

    postChallengerRecord(
      { code },
      {
        onSuccess: () => {
          setStatus('success')
          setErrorMessage('')
        },
        onError: (error) => {
          const apiMessage =
            (error as { response?: { data?: { message?: string } } }).response?.data?.message ||
            (error instanceof Error ? error.message : undefined)

          setStatus('error')
          setErrorMessage(
            apiMessage || '올바르지 않은 코드입니다. 인증 번호 6자리를 입력해 주세요.',
          )
          setCode('')
        },
      },
    )
  }

  const isSuccess = status === 'success'

  return (
    <Modal.Root open={true} onOpenChange={(open) => !open && onClose()}>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content
          onPointerDownOutside={(event) => event.preventDefault()}
          onInteractOutside={(event) => event.preventDefault()}
        >
          <S.ModalContentWrapper>
            <Modal.Header>
              <S.HeaderRow>
                <Modal.Title asChild>
                  <S.Title>챌린저 기록 불러오기</S.Title>
                </Modal.Title>
                <Modal.Close asChild>
                  <S.CloseButton type="button" aria-label="모달 닫기">
                    <Close color={theme.colors.gray[300]} width={30} />
                  </S.CloseButton>
                </Modal.Close>
              </S.HeaderRow>
            </Modal.Header>
            <Modal.Body>
              <S.Body onClick={() => inputRef.current?.focus()}>
                <S.Description>{message}</S.Description>
                <S.CodeRow>
                  {digits.map((digit, index) => (
                    <S.CodeBox
                      key={index}
                      $active={!isSuccess && index === code.length && code.length < CODE_LENGTH}
                    >
                      <S.CodeText>{digit}</S.CodeText>
                    </S.CodeBox>
                  ))}
                </S.CodeRow>
                <S.HiddenInput
                  ref={inputRef}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={CODE_LENGTH}
                  value={code}
                  onChange={handleCodeChange}
                />
              </S.Body>
              <Modal.Footer>
                <S.Footer>
                  <Button tone="gray" label="닫기" typo="C3.Md" onClick={onClose} />
                  {isSuccess ? (
                    <Button tone="gray" label="인증 완료" typo="C3.Md" disabled />
                  ) : (
                    <Button
                      tone="lime"
                      label="인증 요청"
                      typo="C3.Md"
                      isLoading={isPending}
                      onClick={handleRequest}
                    />
                  )}
                </S.Footer>
              </Modal.Footer>
            </Modal.Body>
          </S.ModalContentWrapper>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  )
}

export default ChallengerRecordModal
