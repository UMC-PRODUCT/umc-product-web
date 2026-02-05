import FilterBar from '@/features/school/components/SchoolEvaluation/FilterBar/FilterBar'
import PageLayout from '@/shared/layout/PageLayout/PageLayout'
import { Flex } from '@/shared/ui/common/Flex'

export const CandidatePage = () => {
  return (
    <PageLayout
      title="지원자 관리"
      subTitle="지부별, 학교별, 파트별 지원 현황을 조회할 수 있습니다."
    >
      <FilterBar />
      <Flex>
        <>전체 지원자</>
        <>42명</>
      </Flex>
    </PageLayout>
  )
}
