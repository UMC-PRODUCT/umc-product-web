import { useGetDocumentEvaluationAnswers } from '@/features/school/hooks/useGetRecruitingData'
import { theme } from '@/shared/styles/theme'
import Section from '@/shared/ui/common/Section/Section'

import * as S from './EvaluationStatus.style'

const EvaluationStatus = ({
  selectedUserId,
  recruitingId,
}: {
  selectedUserId: string | null
  recruitingId: string | null
}) => {
  const { data } = useGetDocumentEvaluationAnswers(recruitingId, selectedUserId)
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
            <span className="score">{data?.result.avgDocScore ?? 0}</span>
            <span className="total">/100</span>
          </div>
        </S.AverageScore>
      </S.Header>
      <S.Content>
        {data?.result.docEvaluationSummaries.map((evaluation) => (
          <Section
            height="fit-content"
            variant="solid"
            key={evaluation.evaluatorMemberId}
            gap={3}
            padding={'10px 16px'}
            width={'100%'}
          >
            <S.Header>
              <S.Wrapper>
                <S.Name>
                  {evaluation.evaluatorNickname}/{evaluation.evaluatorName}
                </S.Name>
              </S.Wrapper>
              <S.Wrapper>
                <S.OtherScore>{evaluation.score}</S.OtherScore>
                <S.OtherTotalScore>/100</S.OtherTotalScore>
              </S.Wrapper>
            </S.Header>
            <S.Comment>{evaluation.comments}</S.Comment>
          </Section>
        ))}
        {data?.result.docEvaluationSummaries.length === 0 && (
          <S.EmptyAnswer>아직 평가 내역이 없습니다.</S.EmptyAnswer>
        )}
      </S.Content>
    </Section>
  )
}

export default EvaluationStatus
