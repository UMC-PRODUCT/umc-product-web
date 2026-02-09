import { useEffect, useMemo, useState } from 'react'

import { useGetDocumentEvaluationAnswerMe } from '@/features/school/hooks/useGetRecruitingData'
import { useRecruitingMutation } from '@/features/school/hooks/useRecruitingMutation'
import { theme } from '@/shared/styles/theme'
import { Button } from '@/shared/ui/common/Button'
import ErrorMessage from '@/shared/ui/common/ErrorMessage/ErrorMessage'
import { Flex } from '@/shared/ui/common/Flex'
import Label from '@/shared/ui/common/Label'
import Section from '@/shared/ui/common/Section/Section'
import { formatDateTimeDot } from '@/shared/utils/date'

import * as S from './MyEvaluation.style'

const MyEvaluation = ({
  selectedUserId,
  recruitingId,
}: {
  selectedUserId: string | null
  recruitingId?: string | null
}) => {
  const { usePatchDocsEvaluationAnswerMe } = useRecruitingMutation()
  const { mutate, isPending } = usePatchDocsEvaluationAnswerMe(
    recruitingId ?? '',
    selectedUserId ?? '',
  )
  const { data } = useGetDocumentEvaluationAnswerMe(recruitingId!, selectedUserId)
  const [score, setScore] = useState('')
  const [comment, setComment] = useState('')
  const canSubmit = Boolean(recruitingId) && Boolean(selectedUserId)
  const scoreError = useMemo(() => {
    if (!canSubmit) return ''
    if (score.trim().length === 0) return '0 이상 100 이하의 정수를 입력하세요.'
    if (!/^\d+$/.test(score)) return '0 이상 100 이하의 정수를 입력하세요.'
    const numericScore = Number(score)
    if (numericScore < 0 || numericScore > 100) return '0 이상 100 이하의 정수를 입력하세요.'
    return ''
  }, [score, canSubmit])

  useEffect(() => {
    if (!data?.result.myEvaluation) return
    setScore(data.result.myEvaluation.score)
    setComment(data.result.myEvaluation.comments)
  }, [data?.result.myEvaluation])

  const handleSubmit = (action: 'DRAFT_SAVE' | 'SUBMIT') => {
    if (!canSubmit || scoreError) return
    mutate({
      action,
      score,
      comments: comment,
    })
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
      <S.Header>
        <S.SubTitle>나의 평가</S.SubTitle>
      </S.Header>

      <S.FormContainer>
        {/* 점수 섹션 - 입력 가능 */}
        <S.InputWrapper>
          <S.ScoreHeader>
            <Label label="점수" necessary={true} />
            {scoreError && <ErrorMessage typo="C3.Md" errorMessage={scoreError} />}
          </S.ScoreHeader>
          <S.ScoreInputBox>
            <S.ScoreInput
              type="number"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              min="0"
              max="100"
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
          {data?.result.myEvaluation?.savedAt && (
            <S.DateText>{formatDateTimeDot(data.result.myEvaluation.savedAt)} 제출</S.DateText>
          )}
          <Flex gap={8} width={'fit-content'} css={{ marginLeft: 'auto' }}>
            {!data?.result.myEvaluation?.submitted && (
              <Button
                variant="solid"
                tone={'gray'}
                type="button"
                label={'임시저장'}
                css={{ padding: '7px 0', width: '112px' }}
                disabled={!canSubmit || Boolean(scoreError) || isPending}
                onClick={() => handleSubmit('DRAFT_SAVE')}
              />
            )}
            <Button
              variant="solid"
              tone={data?.result.myEvaluation?.submitted ? 'lime' : 'gray'}
              type="button"
              label={data?.result.myEvaluation?.submitted ? '평가 재제출' : '평가 제출'}
              css={{ padding: '7px 0', width: '112px' }}
              disabled={!canSubmit || Boolean(scoreError) || isPending}
              onClick={() => handleSubmit('SUBMIT')}
            />
          </Flex>
        </S.Footer>
      </S.FormContainer>
    </Section>
  )
}

export default MyEvaluation
