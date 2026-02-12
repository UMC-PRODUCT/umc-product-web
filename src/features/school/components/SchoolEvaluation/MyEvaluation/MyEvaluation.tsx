import type { KeyboardEvent } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { schoolKeys } from '@/features/school/domain/queryKeys'
import { useRecruitingMutation } from '@/features/school/hooks/useRecruitingMutation'
import {
  useGetDocumentEvaluationMyAnswer,
  useGetInterviewEvaluationMyAnswer,
} from '@/features/school/hooks/useRecruitingQueries'
import { theme } from '@/shared/styles/theme'
import { Button } from '@/shared/ui/common/Button'
import ErrorMessage from '@/shared/ui/common/ErrorMessage/ErrorMessage'
import { Flex } from '@/shared/ui/common/Flex'
import Label from '@/shared/ui/common/Label'
import Loading from '@/shared/ui/common/Loading/Loading'
import Section from '@/shared/ui/common/Section/Section'
import { formatDateTimeDot } from '@/shared/utils/date'

import * as S from './MyEvaluation.style'

const MyEvaluation = ({
  selectedUserId,
  recruitingId,
  mode = 'document',
}: {
  selectedUserId: string | null
  recruitingId?: string | null
  mode?: 'document' | 'interview'
}) => {
  const queryClient = useQueryClient()
  const { usePatchDocumentEvaluationMyAnswer, usePatchInterviewEvaluationMyAnswer } =
    useRecruitingMutation()
  const { mutate: patchDocumentEvaluation, isPending: isDocumentPending } =
    usePatchDocumentEvaluationMyAnswer(recruitingId ?? '', selectedUserId ?? '')
  const { mutate: patchInterviewEvaluation, isPending: isInterviewPending } =
    usePatchInterviewEvaluationMyAnswer(recruitingId ?? '', selectedUserId ?? '')
  const {
    data: documentData,
    isLoading: isDocumentLoading,
    refetch: refetchDocument,
  } = useGetDocumentEvaluationMyAnswer(recruitingId ?? null, selectedUserId)
  const {
    data: interviewData,
    isLoading: isInterviewLoading,
    refetch: refetchInterview,
  } = useGetInterviewEvaluationMyAnswer(recruitingId ?? '', selectedUserId ?? '')
  const [score, setScore] = useState('')
  const [comment, setComment] = useState('')

  const canSubmit = Boolean(recruitingId) && Boolean(selectedUserId)
  const isScoreEmpty = score.trim().length === 0
  const isLoading = mode === 'document' ? isDocumentLoading : isInterviewLoading
  const isPending = mode === 'document' ? isDocumentPending : isInterviewPending

  const currentEvaluation = useMemo(() => {
    if (mode === 'document') return documentData?.result.myEvaluation
    return interviewData?.result.myEvaluation
  }, [documentData?.result.myEvaluation, interviewData?.result.myEvaluation, mode])

  const isSubmitted =
    mode === 'document'
      ? Boolean(documentData?.result.myEvaluation?.submitted)
      : Boolean(interviewData?.result.myEvaluation?.submittedAt)

  const savedOrSubmittedAt =
    mode === 'document'
      ? documentData?.result.myEvaluation?.savedAt
      : interviewData?.result.myEvaluation?.submittedAt

  const scoreError = useMemo(() => {
    if (isScoreEmpty) return ''
    if (!/^\d+$/.test(score)) return '0 이상 100 이하의 정수를 입력하세요.'
    const numericScore = Number(score)
    if (numericScore < 0 || numericScore > 100) return '0 이상 100 이하의 정수를 입력하세요.'
    return ''
  }, [isScoreEmpty, score])
  const showScoreError = !isLoading && Boolean(scoreError)

  useEffect(() => {
    if (!selectedUserId || !recruitingId) {
      setScore('')
      setComment('')
      return
    }
    const evaluation = currentEvaluation
    if (!evaluation) {
      setScore('')
      setComment('')
      return
    }
    setScore(evaluation.score)
    setComment(evaluation.comments)
  }, [currentEvaluation, recruitingId, selectedUserId])

  const handleSubmit = (action: 'DRAFT_SAVE' | 'SUBMIT') => {
    if (!canSubmit || isScoreEmpty || scoreError) return

    if (mode === 'document') {
      patchDocumentEvaluation(
        {
          action,
          score,
          comments: comment,
        },
        {
          onSuccess: () => {
            if (recruitingId && selectedUserId) {
              queryClient.invalidateQueries({
                queryKey: schoolKeys.evaluation.document.getAnswers(recruitingId, selectedUserId),
              })
              queryClient.invalidateQueries({
                queryKey: schoolKeys.evaluation.document.getMyAnswer(recruitingId, selectedUserId),
              })
              queryClient.invalidateQueries({
                predicate: (query) => {
                  const [root, domain, feature, key, params] = query.queryKey as [
                    string?,
                    string?,
                    string?,
                    string?,
                    any?,
                  ]
                  return (
                    root === 'school' &&
                    domain === 'documents' &&
                    feature === 'evaluation' &&
                    key === 'applicants' &&
                    String(params?.recruitmentId) === String(recruitingId)
                  )
                },
              })
              queryClient.invalidateQueries({
                queryKey: ['school', 'documents', 'evaluation', 'applicants'],
                exact: false,
              })
              void refetchDocument()
            }
          },
        },
      )
      return
    }

    patchInterviewEvaluation(
      {
        score,
        comments: comment,
      },
      {
        onSuccess: () => {
          if (recruitingId && selectedUserId) {
            queryClient.invalidateQueries({
              queryKey: schoolKeys.evaluation.interview.getMyAnswer(recruitingId, selectedUserId),
            })
            queryClient.invalidateQueries({
              queryKey: schoolKeys.evaluation.interview.getSummary(recruitingId, selectedUserId),
            })
            queryClient.invalidateQueries({
              queryKey: schoolKeys.evaluation.interview.getView(recruitingId, selectedUserId),
            })
            void refetchInterview()
          }
        },
      },
    )
  }

  const handleScoreChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '')
    setScore(digitsOnly)
  }

  const handleScoreKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (['e', 'E', '+', '-', '.'].includes(event.key)) {
      event.preventDefault()
    }
  }
  return (
    <Section
      variant="both"
      padding={'20px 16px'}
      gap={'18px'}
      css={{
        boxSizing: 'border-box',
        backgroundColor: `${theme.colors.gray[700]}`,
        borderRadius: '12px',
      }}
    >
      <S.Container>
        {isLoading && (
          <S.LoadingOverlay>
            <Loading size={24} label="불러오는 중" labelPlacement="right" />
          </S.LoadingOverlay>
        )}
        <S.Header>
          <S.SubTitle>나의 평가</S.SubTitle>
        </S.Header>

        <S.FormContainer>
          {/* 점수 섹션 - 입력 가능 */}
          <S.InputWrapper>
            <S.ScoreHeader>
              <Label label="점수" necessary={true} />
              {showScoreError && <ErrorMessage typo="C3.Md" errorMessage={scoreError} />}
            </S.ScoreHeader>
            <S.ScoreInputBox>
              <S.ScoreInput
                type="number"
                value={score}
                onChange={(e) => handleScoreChange(e.target.value)}
                onKeyDown={handleScoreKeyDown}
                min="0"
                max="100"
                inputMode="numeric"
              />
              <span className="total">/ 100</span>
            </S.ScoreInputBox>
          </S.InputWrapper>

          {/* 코멘트 섹션 */}
          <S.InputWrapper>
            <S.FlexHeader>
              <Label label="코멘트" necessary={false} />
              <S.CharCount>{comment.length} / 80</S.CharCount>
            </S.FlexHeader>
            <S.TextArea
              value={comment}
              onChange={(e) => setComment(e.target.value.slice(0, 80))}
              placeholder="코멘트를 입력해주세요."
            />
          </S.InputWrapper>

          <S.Footer>
            {savedOrSubmittedAt && (
              <S.DateText>
                {formatDateTimeDot(savedOrSubmittedAt)} {isSubmitted ? '제출' : '저장'}
              </S.DateText>
            )}
            <Flex gap={8} width={'fit-content'} css={{ marginLeft: 'auto' }}>
              {mode === 'document' && !isSubmitted && (
                <Button
                  variant="solid"
                  tone={'gray'}
                  type="button"
                  label={'임시저장'}
                  css={{ padding: '7px 0', width: '112px' }}
                  disabled={!canSubmit || isScoreEmpty || Boolean(scoreError) || isPending}
                  onClick={() => handleSubmit('DRAFT_SAVE')}
                />
              )}
              <Button
                variant="solid"
                tone={isSubmitted ? 'lime' : 'gray'}
                type="button"
                label={isSubmitted ? '평가 재제출' : '평가 제출'}
                css={{ padding: '7px 0', width: '112px' }}
                disabled={!canSubmit || isScoreEmpty || Boolean(scoreError) || isPending}
                onClick={() => handleSubmit('SUBMIT')}
              />
            </Flex>
          </S.Footer>
        </S.FormContainer>
      </S.Container>
    </Section>
  )
}

export default MyEvaluation
