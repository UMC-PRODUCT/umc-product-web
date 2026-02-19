import * as Shared from '@shared/styles/shared'

import { useGetRecruitmentsDocumentEvaluation } from '@/features/school/hooks/useRecruitingQueries'
import { media } from '@/shared/styles/media'
import { theme } from '@/shared/styles/theme'
import type { PartType } from '@/shared/types/part'
import { Button } from '@/shared/ui/common/Button'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'

import ServerErrorCard from '../../common/ServerErrorCard'
import RecruitmentCard from './RecruitmentCard/RecruitmentCard'

const DocsEvaluation = () => {
  const { data, isLoading, error, refetch } = useGetRecruitmentsDocumentEvaluation()
  const errorMessage = error instanceof Error ? error.message : '데이터를 불러오지 못했어요.'
  const evaluatingRecruitments = data?.result.evaluatingRecruitments ?? []
  const completeRecruitments = data?.result.completeRecruitments ?? []

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
        <Section
          variant="solid"
          css={{
            padding: '18px 22px',
            [media.down(theme.breakPoints.desktop)]: { padding: '12px 12px' },
          }}
          gap={32}
        >
          <Flex flexDirection="column" gap={18}>
            <Flex alignItems="center" gap={18}>
              <Button
                tone="lime"
                variant="outline"
                label="서류 평가 중"
                typo="B4.Sb"
                css={{ width: 'fit-content', height: '28px' }}
              />
              <div
                css={{
                  width: '100%',
                  height: '1px',
                  borderBottom: `1px solid ${theme.colors.gray[600]}`,
                }}
              />
            </Flex>
            {evaluatingRecruitments.length === 0 && (
              <div css={{ padding: '20px 0', textAlign: 'center' }}>
                <div css={{ color: theme.colors.gray[400] }}>서류 평가 중인 모집이 없습니다.</div>
              </div>
            )}
            {evaluatingRecruitments.map((recruitment) => (
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
          </Flex>
          <Flex flexDirection="column" gap={18}>
            <Flex alignItems="center" gap={18}>
              <Button
                tone="lime"
                variant="outline"
                label="서류 평가 완료"
                typo="B4.Sb"
                css={{ width: 'fit-content', height: '28px' }}
              />
              <div
                css={{
                  width: '100%',
                  height: '1px',
                  borderBottom: `1px solid ${theme.colors.gray[600]}`,
                }}
              />
            </Flex>
            {completeRecruitments.length === 0 && (
              <div css={{ padding: '20px 0', textAlign: 'center' }}>
                <div css={{ color: theme.colors.gray[400] }}>서류 평가 완료된 모집이 없습니다.</div>
              </div>
            )}
            {completeRecruitments.map((recruitment) => (
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
          </Flex>
        </Section>
      )}
    </>
  )
}

export default DocsEvaluation
