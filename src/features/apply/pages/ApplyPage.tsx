import AfterSubmit from '@/features/apply/components/AfterSubmit'
import * as S from '@/features/apply/components/ApplyPage.style'
import BeforeSubmit from '@/features/apply/components/BeforeSubmit'
import {
  formatActivityPeriod,
  formatRecruitmentPeriod,
  RECRUITMENT_INFO,
} from '@/shared/constants/recruitment'
import PageLayout from '@/shared/layout/PageLayout/PageLayout'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import type { PartType, RecruitingType } from '@/shared/types/umc'
import { Flex } from '@/shared/ui/common/Flex'

type ApplyPageProps = {
  partInfoList: Array<{
    part: PartType
    state: RecruitingType
    ability: Array<string>
  }>
  isAlreadySubmitted: boolean
}

export const ApplyPage = ({ partInfoList, isAlreadySubmitted }: ApplyPageProps) => {
  const { schoolName, generation, recruitmentPeriod, activityPeriod } = RECRUITMENT_INFO

  const formattedRecruitmentPeriod = formatRecruitmentPeriod(
    recruitmentPeriod.start,
    recruitmentPeriod.end,
  )

  const formattedActivityPeriod = formatActivityPeriod(
    activityPeriod.start,
    activityPeriod.end,
    activityPeriod.duration,
  )

  return (
    <PageLayout>
      <Flex flexDirection="column" gap="35px" maxWidth="868px">
        <Flex flexDirection="column" gap="22px">
          <PageTitle title={`UMC ${schoolName} ${generation} 추가모집`} />
          <Flex gap="9px" flexDirection="column" alignItems="flex-start">
            <S.Info>모집 기간 | {formattedRecruitmentPeriod}</S.Info>
            <S.Info>활동 기간 | {formattedActivityPeriod}</S.Info>
          </Flex>
        </Flex>
        {isAlreadySubmitted ? <AfterSubmit /> : <BeforeSubmit partInfoList={partInfoList} />}
      </Flex>
    </PageLayout>
  )
}
