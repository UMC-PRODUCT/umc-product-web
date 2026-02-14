import { useMemo } from 'react'
import styled from '@emotion/styled'

import { useGetRecruitmentsDocumentEvaluation } from '@/features/school/hooks/useRecruitingQueries'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'
import { Tab } from '@/shared/ui/common/Tab'

import ServerErrorCard from '../components/common/ServerErrorCard'
import DocsEvaluation from '../components/SchoolEvaluation/DocsEvaluation'
import FinalEvaluation from '../components/SchoolEvaluation/FinalEvaluation/FinalEvaluation'
import InterviewEvaluation from '../components/SchoolEvaluation/InterviewEvaluation/InterviewEvaluation'
import { EVALUATION_TAB } from '../domain'

interface SchoolEvaluationProps {
  activeTab: (typeof EVALUATION_TAB)[number]['value']
  onTabChange: (next: (typeof EVALUATION_TAB)[number]['value']) => void
  docsContent?: React.ReactNode
  recruitmentId?: string
}

export const SchoolEvaluation = ({
  activeTab,
  onTabChange,
  docsContent,
  recruitmentId,
}: SchoolEvaluationProps) => {
  const { data, isLoading, error, refetch } = useGetRecruitmentsDocumentEvaluation()
  const rootRecruitmentId = useMemo(() => {
    const recruitments = data?.result.recruitments ?? []
    if (recruitments.length === 0) return undefined
    if (!recruitmentId) return recruitments[0]?.rootRecruitmentId
    const matched = recruitments.find(
      (recruitment) =>
        String(recruitment.recruitmentId) === String(recruitmentId) ||
        String(recruitment.rootRecruitmentId) === String(recruitmentId),
    )
    return matched?.rootRecruitmentId
  }, [data?.result, recruitmentId])

  return (
    <Flex justifyContent="center">
      <PageLayout>
        <Tab
          tabs={EVALUATION_TAB}
          value={activeTab}
          onValueChange={onTabChange}
          contentCss={{ padding: '22px 18px' }}
        >
          {activeTab === 'docs' && (docsContent ?? <DocsEvaluation />)}
          {activeTab === 'interview' &&
            (isLoading ? (
              <SuspenseFallback label="모집 정보를 불러오는 중입니다." />
            ) : error ? (
              <ServerErrorCard
                errorStatus={(error as { response?: { status?: number } } | null)?.response?.status}
                errorMessage={
                  error instanceof Error ? error.message : '데이터를 불러오지 못했어요.'
                }
                onRetry={() => {
                  refetch()
                }}
              />
            ) : rootRecruitmentId ? (
              <InterviewEvaluation recruitmentId={rootRecruitmentId} />
            ) : (
              <Flex
                justifyContent="center"
                alignItems="center"
                css={{ padding: '48px 0', color: theme.colors.gray[300] }}
              >
                현재 평가 가능한 모집이 없습니다.
              </Flex>
            ))}
          {activeTab === 'final' &&
            (isLoading ? (
              <SuspenseFallback label="모집 정보를 불러오는 중입니다." />
            ) : error ? (
              <ServerErrorCard
                errorStatus={(error as { response?: { status?: number } } | null)?.response?.status}
                errorMessage={
                  error instanceof Error ? error.message : '데이터를 불러오지 못했어요.'
                }
                onRetry={() => {
                  refetch()
                }}
              />
            ) : rootRecruitmentId ? (
              <FinalEvaluation recruitmentId={rootRecruitmentId} />
            ) : (
              <Flex
                justifyContent="center"
                alignItems="center"
                css={{ padding: '48px 0', color: theme.colors.gray[300] }}
              >
                현재 평가 가능한 모집이 없습니다.
              </Flex>
            ))}
        </Tab>
      </PageLayout>
    </Flex>
  )
}

const PageLayout = styled.div`
  flex-direction: column;
  gap: 28px;
  padding: 42px 20px;
  ${media.down(theme.breakPoints.desktop)} {
    padding: 20px 20px;
  }
  max-width: 1320px;
  width: 100%;
`
