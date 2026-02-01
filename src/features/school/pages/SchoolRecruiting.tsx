import RecruitingList from '@/features/school/components/SchoolRecruiting/RecruitingList/RecruitingList'
import RecruitingMake from '@/features/school/components/SchoolRecruiting/RecruitingMake/RecruitingMake'
import PageLayout from '@/shared/layout/PageLayout/PageLayout'
import { Flex } from '@/shared/ui/common/Flex'

const SchoolRecruiting = () => {
  return (
    <PageLayout>
      <Flex flexDirection="column" gap={100}>
        <RecruitingMake />
        <RecruitingList />
      </Flex>
    </PageLayout>
  )
}
export default SchoolRecruiting
