import { useState } from 'react'

import type { RecruitingTab } from '@/features/school/domain'
import { useGetRecruitmentsList } from '@/features/school/hooks/useRecruitingQueries'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import AsyncBoundary from '@/shared/ui/common/AsyncBoundary/AsyncBoundary'
import ErrorPage from '@/shared/ui/common/ErrorPage/ErrorPage'
import { Flex } from '@/shared/ui/common/Flex'
import Loading from '@/shared/ui/common/Loading/Loading'
import Section from '@/shared/ui/common/Section/Section'

import EmptyRecruiting from '../EmptyRecruiting/EmptyRecruiting'
import RecruitingCard from '../RecruitingCard/RecruitingCard'
import * as S from './RecruitingList.style'

const RecruitingListLoading = () => (
  <Flex
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    maxHeight={530}
    height={'fit-content'}
    minHeight={400}
    css={{ padding: '24px 0' }}
  >
    <Loading />
  </Flex>
)

const RecruitingListBody = ({ tab }: { tab: RecruitingTab }) => {
  const { data } = useGetRecruitmentsList(tab)
  const recruitments = data.result.recruitments
  return (
    <Flex
      flexDirection="column"
      gap={12}
      maxHeight={530}
      height={'fit-content'}
      minHeight={400}
      css={{ overflowY: 'auto' }}
    >
      {recruitments.length > 0 ? (
        recruitments.map((recruitment) => (
          <RecruitingCard
            recruitmentId={recruitment.recruitmentId}
            key={recruitment.recruitmentId}
            title={recruitment.recruitmentName}
            startDate={recruitment.startDate}
            endDate={recruitment.endDate}
            applicants={recruitment.applicantCount}
            state={recruitment.phase}
            editable={recruitment.editable}
            listBadge={recruitment.listBadge}
          />
        ))
      ) : (
        <EmptyRecruiting tab={tab} />
      )}
    </Flex>
  )
}

const RecruitingList = () => {
  const [tab, setTab] = useState<RecruitingTab>('ONGOING')
  return (
    <Flex gap={20} flexDirection="column">
      <PageTitle title="모집 목록" />
      <Section variant="outline" gap={24}>
        <S.Header>
          <S.Tab isActive={tab === 'ONGOING'} onClick={() => setTab('ONGOING')}>
            진행 중인 모집
          </S.Tab>
          <S.Tab isActive={tab === 'CLOSED'} onClick={() => setTab('CLOSED')}>
            종료된 모집
          </S.Tab>
          <S.Tab isActive={tab === 'SCHEDULED'} onClick={() => setTab('SCHEDULED')}>
            예정된 모집
          </S.Tab>
        </S.Header>
        <AsyncBoundary
          fallback={<RecruitingListLoading />}
          errorFallback={(error, reset) => (
            <ErrorPage
              title="모집 목록을 불러오는 중 오류가 발생했습니다."
              description={error.message || '잠시 후 다시 시도해 주세요.'}
              onRetry={reset}
            />
          )}
        >
          <RecruitingListBody tab={tab} />
        </AsyncBoundary>
      </Section>
    </Flex>
  )
}
export default RecruitingList
