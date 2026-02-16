import dayjs from 'dayjs'

import AfterSubmit from '@/features/apply/components/AfterSubmit'
import * as S from '@/features/apply/components/ApplyPage.style'
import BeforeSubmit from '@/features/apply/components/BeforeSubmit'
import { useActiveGisuQuery, useMemberMeQuery } from '@/features/auth/hooks/useAuthQueries'
import { PART_LIST } from '@/shared/constants/part'
import { formatActivityPeriod, formatRecruitmentPeriod } from '@/shared/constants/recruitment'
import PageLayout from '@/shared/layout/PageLayout/PageLayout'
import PageTitle from '@/shared/layout/PageTitle/PageTitle'
import { theme } from '@/shared/styles/theme'
import type { PartType } from '@/shared/types/part'
import AsyncBoundary from '@/shared/ui/common/AsyncBoundary/AsyncBoundary'
import { Flex } from '@/shared/ui/common/Flex'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'

import { useGetActiveRecruitmentId, useGetRecruitmentParts } from '../hooks/useGetApplicationQuery'

type ApplyPageViewData = {
  title: string
  recruitmentPeriod?: {
    startsAt: string
    endsAt: string
  } | null
  activityPeriod?: {
    startsAt: string
    endsAt: string
  } | null
  parts: Array<{
    recruitmentPartId: string
    part: PartType
    status: string
  }>
  myApplication: {
    status: 'DRAFT' | 'NONE' | 'SUBMITTED'
    draftFormResponseId?: string
  }
}

const DEFAULT_APPLY_VIEW_DATA: ApplyPageViewData = {
  title: 'UMC 모집',
  recruitmentPeriod: null,
  activityPeriod: null,
  parts: PART_LIST.map((part) => ({
    recruitmentPartId: `empty-${part}`,
    part,
    status: 'CLOSED',
  })),
  myApplication: {
    status: 'NONE',
    draftFormResponseId: undefined,
  },
}

const resolveErrorStatus = (error: unknown) =>
  (error as { response?: { status?: number } } | null)?.response?.status

const buildRecruitmentTitle = ({
  schoolName,
  gisu,
  fallbackTitle,
}: {
  schoolName?: string
  gisu?: string
  fallbackTitle: string
}) => {
  if (!schoolName || !gisu) return fallbackTitle
  return `${schoolName} UMC ${gisu}기 모집`
}

const renderApplySections = (
  result: ApplyPageViewData,
  recruitmentId?: string,
  overrideTitle?: string,
) => {
  const today = dayjs().startOf('day')
  const period = result.recruitmentPeriod
  const isRecruitmentOpen =
    !!period?.startsAt &&
    !!period.endsAt &&
    !today.isBefore(dayjs(period.startsAt).startOf('day')) &&
    !today.isAfter(dayjs(period.endsAt).startOf('day'))

  const formattedRecruitmentPeriod = formatRecruitmentPeriod(
    result.recruitmentPeriod?.startsAt,
    result.recruitmentPeriod?.endsAt,
  )

  const formattedActivityPeriod = formatActivityPeriod(
    result.activityPeriod?.startsAt,
    result.activityPeriod?.endsAt,
  )
  const submitStatus = result.myApplication.status
  const isAlreadySubmitted =
    submitStatus === 'DRAFT' ? false : submitStatus === 'NONE' ? false : true

  return (
    <PageLayout>
      <Flex flexDirection="column" gap="35px" maxWidth="868px">
        <Flex flexDirection="column" gap="22px">
          <PageTitle title={overrideTitle ?? result.title} />
          <Flex gap="9px" flexDirection="column" alignItems="flex-start">
            <S.Info>모집 기간 | {formattedRecruitmentPeriod || '추후 공지'}</S.Info>
            <S.Info>활동 기간 | {formattedActivityPeriod}</S.Info>
          </Flex>
        </Flex>
        {isAlreadySubmitted && <AfterSubmit />}
        {!isAlreadySubmitted && (
          <BeforeSubmit
            submitStatus={submitStatus}
            partInfoList={result.parts}
            recruitmentId={recruitmentId}
            canApply={isRecruitmentOpen}
            draftFormResponseId={result.myApplication.draftFormResponseId}
          />
        )}
      </Flex>
    </PageLayout>
  )
}

const ApplyPageContent = ({ schoolName, gisu }: { schoolName?: string; gisu?: string }) => {
  const { data: recruitmentIdData } = useGetActiveRecruitmentId()
  const recruitmentId = recruitmentIdData.result.recruitmentId
  const { data: specificPartRecruitingData } = useGetRecruitmentParts(recruitmentId)
  const result = specificPartRecruitingData.result
  const composedTitle = buildRecruitmentTitle({
    schoolName,
    gisu,
    fallbackTitle: result.title,
  })

  return renderApplySections(result, recruitmentId, composedTitle)
}

export const ApplyPage = () => {
  const { data: memberMe } = useMemberMeQuery()
  const { data: activeGisuData } = useActiveGisuQuery()
  const schoolName = memberMe?.schoolName
  const gisu = activeGisuData?.result.gisu

  return (
    <AsyncBoundary
      fallback={<SuspenseFallback label="모집 정보를 불러오는 중입니다." />}
      errorFallback={(error) =>
        resolveErrorStatus(error) === 404 ? (
          renderApplySections(
            DEFAULT_APPLY_VIEW_DATA,
            undefined,
            buildRecruitmentTitle({
              schoolName,
              gisu,
              fallbackTitle: DEFAULT_APPLY_VIEW_DATA.title,
            }),
          )
        ) : (
          <PageLayout>
            <Flex flexDirection="column" gap={112} css={{ color: theme.colors.gray[400] }}>
              모집 정보를 불러오지 못했습니다.
            </Flex>
          </PageLayout>
        )
      }
    >
      <ApplyPageContent schoolName={schoolName} gisu={gisu} />
    </AsyncBoundary>
  )
}
