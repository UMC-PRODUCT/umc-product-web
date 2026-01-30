import {
  useGetActiveRecruitmentId,
  useGetRecruitmentNotice,
  useGetRecruitmentSchedules,
} from '@/features/apply/hooks/useGetApplicationQuery'
import PartCurriculum from '@/features/recruiting/components/partCurriculum/PartCurriculum'
import RecruitingCalendar from '@/features/recruiting/components/recruitingCalendar/RecruitingCalendar'
import PageLayout from '@/shared/layout/PageLayout/PageLayout'
import { Flex } from '@/shared/ui/common/Flex'

import RecruitingNotification from '../components/recruitingNotification/RecruitingNotification'

export const RecruitingPage = () => {
  const { data: activeRecruitmentId } = useGetActiveRecruitmentId()

  const recruitmentId = activeRecruitmentId.result.recruitmentId
  const { data: noticeData } = useGetRecruitmentNotice(recruitmentId)
  const { data: scheduleData } = useGetRecruitmentSchedules(recruitmentId)

  if (!recruitmentId) return null

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
