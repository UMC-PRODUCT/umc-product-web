import { useState } from 'react'

import { theme } from '@/shared/styles/theme'
import { Button } from '@/shared/ui/common/Button'
import ErrorMessage from '@/shared/ui/common/ErrorMessage/ErrorMessage'
import Label from '@/shared/ui/common/Label'
import Section from '@/shared/ui/common/Section/Section'

import * as S from './MyEvaluation.style'

const MyEvaluation = ({ selectedUserId }: { selectedUserId: string | null }) => {
  console.log(selectedUserId)
  const [score, setScore] = useState('92')
  const [comment, setComment] = useState('프로젝트 경험이 우수함.')

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
            <ErrorMessage typo="C3.Md" errorMessage="0 이상 100 이하의 정수를 입력하세요." />
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
          <S.DateText>2026.01.14 19:32 제출</S.DateText>
          <Button
            variant="solid"
            tone="lime"
            type="submit"
            label="평가 재제출"
            css={{ padding: '7px 0', width: '112px' }}
          />
        </S.Footer>
      </S.FormContainer>
    </Section>
  )
}

export default MyEvaluation
