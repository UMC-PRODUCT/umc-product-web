import {
  useGetActiveRecruitmentId,
  useGetRecruitmentNotice,
  useGetRecruitmentSchedules,
} from '@/features/apply/hooks/useGetApplicationQuery'
import PartCurriculum from '@/features/recruiting/components/partCurriculum/PartCurriculum'
import RecruitingCalendar from '@/features/recruiting/components/recruitingCalendar/RecruitingCalendar'
import AsyncBoundary from '@/shared/components/AsyncBoundary/AsyncBoundary'
import PageLayout from '@/shared/layout/PageLayout/PageLayout'
import { theme } from '@/shared/styles/theme'
import { Flex } from '@/shared/ui/common/Flex'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'

import RecruitingNotification from '../components/recruitingNotification/RecruitingNotification'

const RecruitingPageContent = () => {
  const { data: activeRecruitmentId } = useGetActiveRecruitmentId()

  const recruitmentId = activeRecruitmentId.result.recruitmentId
  if (!recruitmentId) return null

  return <RecruitingPageDetail recruitmentId={recruitmentId} />
}

const RecruitingPageDetail = ({ recruitmentId }: { recruitmentId: string }) => {
  const { data: noticeData } = useGetRecruitmentNotice(recruitmentId)
  const { data: scheduleData } = useGetRecruitmentSchedules(recruitmentId)

  return (
    <PageLayout>
      <Flex flexDirection="column" gap={112}>
        <RecruitingNotification
          title={noticeData.result.title}
          content={noticeData.result.content}
          parts={noticeData.result.parts}
        />
        <RecruitingCalendar events={scheduleData.result} />
        <PartCurriculum />
      </Flex>
    </PageLayout>
  )
}

export const RecruitingPage = () => (
  <AsyncBoundary
    fallback={<SuspenseFallback label="모집 일정을 불러오는 중입니다." />}
    errorFallback={() => (
      <PageLayout>
        <Flex flexDirection="column" gap={112} css={{ color: theme.colors.gray[400] }}>
          현재 진행 중인 모집이 없습니다.
        </Flex>
      </PageLayout>
    )}
  >
    <RecruitingPageContent />
  </AsyncBoundary>
)
