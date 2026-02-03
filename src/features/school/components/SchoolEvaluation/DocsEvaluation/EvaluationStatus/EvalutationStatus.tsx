import { theme } from '@/shared/styles/theme'
import Section from '@/shared/ui/common/Section/Section'

import * as S from '../shared.style'

const MOCK = [
  { id: '1', score: '95', nickname: '닉네임1', name: '이름1', comment: '잘했어요' },
  { id: '2', score: '88', nickname: '닉네임2', name: '이름2', comment: '보완이 필요해요' },
  { id: '3', score: '92', nickname: '닉네임3', name: '이름3', comment: '좋아요' },
]

const EvaluationStatus = ({ selectedUserId }: { selectedUserId: string | null }) => {
  console.log(selectedUserId)
  return (
    <Section
      variant="both"
      padding={'12px 16px'}
      gap={'12px'}
      css={{ boxSizing: 'border-box', backgroundColor: `${theme.colors.gray[700]}` }}
    >
      <S.Header>
        <S.SubTitle>평가 현황</S.SubTitle>
        <S.AverageScore>
          <span className="label">평균 점수</span>
          <div>
            <span className="score">95.0</span>
            <span className="total">/100</span>
          </div>
        </S.AverageScore>
      </S.Header>
      <S.Content>
        {MOCK.map((evaluation) => (
          <Section
            height="fit-content"
            variant="solid"
            key={evaluation.id}
            gap={3}
            padding={'10px 16px'}
            width={'100%'}
          >
            <S.Header>
              <S.Wrapper>
                <S.Name>
                  {evaluation.nickname}/{evaluation.name}
                </S.Name>
              </S.Wrapper>
              <S.Wrapper>
                <S.OtherScore>{evaluation.score}</S.OtherScore>
                <S.OtherTotalScore>/100</S.OtherTotalScore>
              </S.Wrapper>
            </S.Header>
            <S.Comment>{evaluation.comment}</S.Comment>
          </Section>
        ))}
      </S.Content>
    </Section>
  )
}

export default EvaluationStatus
