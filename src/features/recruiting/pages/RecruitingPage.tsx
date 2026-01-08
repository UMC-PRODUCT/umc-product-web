import PartCurriculum from '@/features/recruiting/components/partCurriculum/PartCurriculum'
import RecruitingCalendar from '@/features/recruiting/components/recruitingCalendar/RecruitingCalendar'
import RecruitingNotification from '@/features/recruiting/components/recrutingNotification/RecruitingNotification'
import type { PartData } from '@/features/recruiting/types/partCurriculum'
import { PART } from '@/shared/constants/umc'
import PageLayout from '@/shared/layout/PageLayout/PageLayout'
import type { CalendarEvents } from '@/shared/types/calendar'
import { Flex } from '@/shared/ui/common/Flex'

type RecruitingPageProps = {
  notice: {
    title: string
    content: string
  }
  events: CalendarEvents
  curriculum: Array<PartData>
}

export const RecruitingPage = ({ notice, events, curriculum }: RecruitingPageProps) => {
  return (
    <PageLayout>
      <Flex flexDirection="column" gap={112}>
        <RecruitingNotification title={notice.title} content={notice.content} parts={PART} />
        <RecruitingCalendar events={events} />
        <PartCurriculum curriculum={curriculum} />
      </Flex>
    </PageLayout>
  )
}
