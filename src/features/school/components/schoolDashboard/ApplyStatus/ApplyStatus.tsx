import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'

// import ApplyStatusCard from './ApplyStatusCard/ApplyStatusCard'
import * as S from './ApplyStatus.style'

const ApplyStatus = () => {
  return (
    <Flex flexDirection="column" gap={20}>
      <PageTitle title="지원 현황" />
      <Section variant="outline" padding={16}>
        <S.Grid>
          {/* {APPLY_PART_STATUS_MOCKS.map((partStatus) => (
            <ApplyStatusCard
              key={partStatus.part}
              part={partStatus.part}
              applyNum={partStatus.applyNum}
            />
          ))} */}
        </S.Grid>
      </Section>
    </Flex>
  )
}
export default ApplyStatus
