import AfterSubmit from '@/features/apply/components/AfterSubmit'
import * as S from '@/features/apply/components/ApplyPage.style'
import BeforeSubmit from '@/features/apply/components/BeforeSubmit'
import AsyncBoundary from '@/shared/components/AsyncBoundary/AsyncBoundary'
import { formatActivityPeriod, formatRecruitmentPeriod } from '@/shared/constants/recruitment'
import PageLayout from '@/shared/layout/PageLayout/PageLayout'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import { Flex } from '@/shared/ui/common/Flex'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'

import {
  useGetActiveRecruitmentId,
  useGetSpecificPartRecruiting,
} from '../hooks/useGetApplicationQuery'

const ApplyPageContent = () => {
  const { data: recruitmentIdData } = useGetActiveRecruitmentId()
  const recruitmentId = recruitmentIdData.result.recruitmentId
  const { data: specificPartRecruitingData } = useGetSpecificPartRecruiting(recruitmentId)

  const { result } = specificPartRecruitingData

  const formattedRecruitmentPeriod = formatRecruitmentPeriod(
    result.recruitmentPeriod.startsAt,
    result.recruitmentPeriod.endsAt,
  )

  const formattedActivityPeriod = formatActivityPeriod(
    result.activityPeriod.startsAt,
    result.activityPeriod.endsAt,
  )
  const submitStatus = result.myApplication.status

  const isAlreadySubmitted =
    submitStatus === 'DRAFT' ? false : submitStatus === 'NONE' ? false : true
  return (
    <PageLayout>
      <Flex flexDirection="column" gap="35px" maxWidth="868px">
        <Flex flexDirection="column" gap="22px">
          <PageTitle title={result.title} />
          <Flex gap="9px" flexDirection="column" alignItems="flex-start">
            <S.Info>모집 기간 | {formattedRecruitmentPeriod}</S.Info>
            <S.Info>활동 기간 | {formattedActivityPeriod}</S.Info>
          </Flex>
        </Flex>
        {isAlreadySubmitted && <AfterSubmit />}
        {!isAlreadySubmitted && (
          <BeforeSubmit
            submitStatus={submitStatus}
            partInfoList={result.parts}
            recruitmentId={recruitmentId}
            draftFormResponseId={result.myApplication.draftFormResponseId}
          />
        )}
      </Flex>
    </PageLayout>
  )
}

export const ApplyPage = () => (
  <AsyncBoundary fallback={<SuspenseFallback label="모집 정보를 불러오는 중입니다." />}>
    <ApplyPageContent />
  </AsyncBoundary>
)
