import PartCurriculum from '@/features/recruiting/components/partCurriculum/PartCurriculum'
import RecruitingCalendar from '@/features/recruiting/components/recruitingCalendar/RecruitingCalendar'
import RecruitingNotification from '@/features/recruiting/components/recrutingNotification/RecruitingNotification'
import { PART } from '@/shared/constants/umc'
import PageLayout from '@/shared/layout/PageLayout/PageLayout'
import { Flex } from '@/shared/ui/common/Flex'

export function RecruitingPage() {
  const TITLE = 'UMC 11기 챌린저 모집'
  const CONTENT = `안녕하세요, 회장단입니다.
  2026년 11기 신입 회원을 모집합니다. 열정과 책임감을 가지고 함께 성장할 분들을 찾고 있습니다.
  실제 서비스 개발 경험을 쌓고, 다양한 파트의 사람들과 협업하며 개발 역량을 키워나갈 수 있습니다.
  관심 있으신 분들의 많은 지원 부탁드립니다! `

  return (
    <PageLayout>
      <Flex flexDirection="column" gap={112}>
        <RecruitingNotification title={TITLE} content={CONTENT} parts={PART} />
        <RecruitingCalendar />
        <PartCurriculum />
      </Flex>
    </PageLayout>
  )
}
