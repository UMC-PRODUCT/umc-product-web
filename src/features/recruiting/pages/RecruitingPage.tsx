import type {
  GetRecruitmentNoticeResponseDTO,
  GetRecruitmentSchedulesResponseDTO,
} from '@/features/apply/domain/model'
import {
  useGetActiveRecruitmentIdQuery,
  useGetRecruitmentNotice,
  useGetRecruitmentSchedules,
} from '@/features/apply/hooks/useGetApplicationQuery'
import PartCurriculum from '@/features/recruiting/components/PartCurriculum/PartCurriculum'
import RecruitingCalendar from '@/features/recruiting/components/RecruitingCalendar/RecruitingCalendar'
import PageLayout from '@/shared/layout/PageLayout/PageLayout'
import { theme } from '@/shared/styles/theme'
import AsyncBoundary from '@/shared/ui/common/AsyncBoundary/AsyncBoundary'
import { Flex } from '@/shared/ui/common/Flex'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'

import RecruitingNotification from '../components/RecruitingNotification/RecruitingNotification'

const DEFAULT_RECRUITING_NOTICE: GetRecruitmentNoticeResponseDTO = {
  recruitmentId: '',
  title: '현재 진행 중인 모집이 없습니다.',
  content:
    '다음 기수 모집 공지와 일정은 준비 중입니다.\n파트별 커리큘럼을 미리 확인해 주시고, 추후 모집 일정이 안내되면 많은 관심과 지원 부탁드립니다.',
  parts: [],
}

const DEFAULT_RECRUITING_SCHEDULES: GetRecruitmentSchedulesResponseDTO = {
  recruitmentId: '',
  schedules: [],
}

const resolveErrorStatus = (error: unknown) =>
  (error as { response?: { status?: number } } | null)?.response?.status

const RecruitingPageView = ({
  notice,
  schedules,
}: {
  notice: GetRecruitmentNoticeResponseDTO
  schedules: GetRecruitmentSchedulesResponseDTO
}) => (
  <PageLayout>
    <Flex flexDirection="column" gap={112}>
      <RecruitingNotification title={notice.title} content={notice.content} parts={notice.parts} />
      <RecruitingCalendar events={schedules} />
      <PartCurriculum />
    </Flex>
  </PageLayout>
)

const RecruitingPageContent = () => {
  const { data: activeRecruitmentId, error, isError, isPending } = useGetActiveRecruitmentIdQuery()

  if (isPending) {
    return <SuspenseFallback label="모집 일정을 불러오는 중입니다." />
  }

  if (isError) {
    if (resolveErrorStatus(error) === 404) {
      return (
        <RecruitingPageView
          notice={DEFAULT_RECRUITING_NOTICE}
          schedules={DEFAULT_RECRUITING_SCHEDULES}
        />
      )
    }

    throw error
  }

  const recruitmentId = activeRecruitmentId.result.recruitmentId
  if (!recruitmentId) {
    return (
      <RecruitingPageView
        notice={DEFAULT_RECRUITING_NOTICE}
        schedules={DEFAULT_RECRUITING_SCHEDULES}
      />
    )
  }

  return <RecruitingPageDetail recruitmentId={recruitmentId} />
}

const RecruitingPageDetail = ({ recruitmentId }: { recruitmentId: string }) => {
  const { data: noticeData } = useGetRecruitmentNotice(recruitmentId)
  const { data: scheduleData } = useGetRecruitmentSchedules(recruitmentId)

  return <RecruitingPageView notice={noticeData.result} schedules={scheduleData.result} />
}

export const RecruitingPage = () => (
  <AsyncBoundary
    fallback={<SuspenseFallback label="모집 일정을 불러오는 중입니다." />}
    errorFallback={() => (
      <PageLayout>
        <Flex flexDirection="column" gap={112} css={{ color: theme.colors.gray[400] }}>
          모집 정보를 불러오지 못했습니다.
        </Flex>
      </PageLayout>
    )}
  >
    <RecruitingPageContent />
  </AsyncBoundary>
)
