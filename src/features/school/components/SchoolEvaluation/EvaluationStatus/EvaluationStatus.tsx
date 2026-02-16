import { useMemo } from 'react'

import {
  useGetDocumentEvaluationAnswers,
  useGetInterviewEvaluationSummary,
} from '@/features/school/hooks/useRecruitingQueries'
import { theme } from '@/shared/styles/theme'
import Loading from '@/shared/ui/common/Loading/Loading'
import Section from '@/shared/ui/common/Section/Section'

import * as S from './EvaluationStatus.style'

const EvaluationStatus = ({
  selectedUserId,
  recruitingId,
  mode = 'document',
}: {
  selectedUserId: string | null
  recruitingId: string | null
  mode?: 'document' | 'interview'
}) => {
  const { data: documentData, isLoading: isDocumentLoading } = useGetDocumentEvaluationAnswers(
    mode === 'document' ? recruitingId : null,
    mode === 'document' ? selectedUserId : null,
  )
  const { data: interviewData, isLoading: isInterviewLoading } = useGetInterviewEvaluationSummary(
    recruitingId ?? '',
    mode === 'interview' ? (selectedUserId ?? '') : '',
  )

  const isLoading = mode === 'document' ? isDocumentLoading : isInterviewLoading

  const averageScore =
    mode === 'document' ? documentData?.result.avgDocScore : interviewData?.result.avgScore

  const evaluations = useMemo(() => {
    if (mode === 'document') {
      return (
        documentData?.result.docEvaluationSummaries.map((evaluation) => ({
          evaluatorId: evaluation.evaluatorMemberId,
          nickname: evaluation.evaluatorNickname,
          name: evaluation.evaluatorName,
          score: evaluation.score,
          comments: evaluation.comments,
        })) ?? []
      )
    }

    return (
      interviewData?.result.interviewEvaluationSummaries.map((evaluation) => ({
        evaluatorId: evaluation.evaluator.memberId,
        nickname: evaluation.evaluator.nickname,
        name: evaluation.evaluator.name,
        score: evaluation.score,
        comments: evaluation.comments,
      })) ?? []
    )
  }, [
    documentData?.result.docEvaluationSummaries,
    interviewData?.result.interviewEvaluationSummaries,
    mode,
  ])

  return (
    <Section
      variant="both"
      padding={'12px 16px'}
      gap={'12px'}
      css={{ boxSizing: 'border-box', backgroundColor: `${theme.colors.gray[700]}` }}
    >
      <S.Container>
        {isLoading && (
          <S.LoadingOverlay>
            <Loading size={24} label="불러오는 중" labelPlacement="right" />
          </S.LoadingOverlay>
        )}
        <S.Header>
          <S.SubTitle>평가 현황</S.SubTitle>
          <S.AverageScore>
            <span className="label">평균 점수</span>
            <div>
              <span className="score">{averageScore ?? 0}</span>
              <span className="total">/100</span>
            </div>
          </S.AverageScore>
        </S.Header>
        <S.Content>
          {evaluations.map((evaluation) => (
            <Section
              height="fit-content"
              variant="solid"
              key={evaluation.evaluatorId}
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
              <S.Comment>{evaluation.comments}</S.Comment>
            </Section>
          ))}
          {evaluations.length === 0 && <S.EmptyAnswer>아직 평가 내역이 없습니다.</S.EmptyAnswer>}
        </S.Content>
      </S.Container>
    </Section>
  )
}

export default EvaluationStatus
