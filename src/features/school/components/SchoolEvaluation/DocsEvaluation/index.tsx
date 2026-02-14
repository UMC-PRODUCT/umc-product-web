import * as Shared from '@shared/styles/shared'

import type { PartType } from '@/features/auth/domain'
import { useGetRecruitmentsDocumentEvaluation } from '@/features/school/hooks/useRecruitingQueries'
import Section from '@/shared/ui/common/Section/Section'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'

import ServerErrorCard from '../../common/ServerErrorCard'
import RecruitmentCard from './RecruitmentCard/RecruitmentCard'

const DocsEvaluation = () => {
  const { data, isLoading, error, refetch } = useGetRecruitmentsDocumentEvaluation()
  const errorMessage = error instanceof Error ? error.message : '데이터를 불러오지 못했어요.'

  return (
    <>
      <Shared.TabHeader flexDirection="row" justifyContent="space-between" alignItems="center">
        <Shared.TabHeader alignItems="flex-start">
          <Shared.TabTitle>서류 평가 중인 모집</Shared.TabTitle>
          <Shared.TabSubtitle>현재 서류 평가 중인 모집의 목록입니다.</Shared.TabSubtitle>
        </Shared.TabHeader>
      </Shared.TabHeader>
      {isLoading ? (
        <SuspenseFallback label="지원서를 불러오는 중입니다." />
      ) : error ? (
        <ServerErrorCard
          errorStatus={(error as { response?: { status?: number } } | null)?.response?.status}
          errorMessage={errorMessage}
          onRetry={() => {
            refetch()
          }}
        />
      ) : (
        <Section variant="solid" padding="18px 22px">
          {data?.result.recruitments.map((recruitment) => (
            <RecruitmentCard
              key={recruitment.recruitmentId}
              start={recruitment.docReviewStartDate}
              end={recruitment.docReviewEndDate}
              applicants={Number(recruitment.totalApplicantCount)}
              title={recruitment.title}
              parts={recruitment.openParts
                .map((part) => part.key)
                .filter((part): part is PartType => part !== 'COMMON')}
              recruitmentId={recruitment.recruitmentId}
            />
          ))}
        </Section>
      )}
    </>
  )
}

export default DocsEvaluation
