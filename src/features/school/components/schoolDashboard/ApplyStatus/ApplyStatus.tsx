import type { ApplicationStatus } from '@/features/school/domain'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'

import ApplyStatusCard from './ApplyStatusCard/ApplyStatusCard'
import * as S from './ApplyStatus.style'

const ApplyStatus = ({ applicationStatus }: { applicationStatus: ApplicationStatus }) => {
  return (
    <Flex flexDirection="column" gap={20}>
      <PageTitle title="지원 현황" />
      <Section variant="outline" padding={16}>
        <S.Grid>
          {applicationStatus.partCounts.map((partStatus) => (
            <ApplyStatusCard
              key={partStatus.part}
              part={partStatus.part}
              applyNum={Number(partStatus.count)}
            />
          ))}
          <ApplyStatusCard
            key={applicationStatus.totalApplicants}
            part={'총 지원자'}
            applyNum={Number(applicationStatus.totalApplicants)}
          />
        </S.Grid>
      </Section>
    </Flex>
  )
}
export default ApplyStatus
