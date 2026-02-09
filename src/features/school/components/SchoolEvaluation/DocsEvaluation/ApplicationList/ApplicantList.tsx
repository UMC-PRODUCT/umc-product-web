import { useEffect, useState } from 'react'

import { useGetDocumentAllApplicants } from '@/features/school/hooks/useGetRecruitingData'
import CheckIcon from '@/shared/assets/icons/check.svg?react'
import Search from '@/shared/assets/icons/search.svg?react'
import { usePartDropdown } from '@/shared/hooks/useManagedDropdown'
import { theme } from '@/shared/styles/theme'
import type { PartType } from '@/shared/types/part'
import AsyncBoundary from '@/shared/ui/common/AsyncBoundary/AsyncBoundary'
import Loading from '@/shared/ui/common/Loading/Loading'
import Section from '@/shared/ui/common/Section/Section'
import { TextField } from '@/shared/ui/form/LabelTextField/TextField'

import * as S from './ApplicationList.style'

const ApplicantListContent = ({
  selectedUserId,
  setSelectedUserId,
  recruitmentId,
  onSummaryChange,
}: {
  recruitmentId: string
  selectedUserId: string | null
  setSelectedUserId: (selectedUserId: string | null) => void
  onSummaryChange?: (summary: { totalCount: string; evaluatedCount: string }) => void
}) => {
  const [keyword, setKeyword] = useState('')
  const { value, Dropdown } = usePartDropdown()
  const selectedPart = (value?.id as PartType | undefined) ?? 'ALL'

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetDocumentAllApplicants(recruitmentId, {
      part: selectedPart,
      keyword: keyword.trim(),
      size: '20',
    })

  const pages = data?.pages ?? []
  const summary =
    pages.length > 0 ? pages[0].result.summary : { totalCount: '0', evaluatedCount: '0' }
  const applicants = pages.flatMap((page) => page.result.applicationSummaries)
  const totalCount = summary.totalCount
  const evaluatedCount = summary.evaluatedCount

  useEffect(() => {
    if (selectedUserId || applicants.length === 0) return
    setSelectedUserId(applicants[0].applicationId)
  }, [applicants, selectedUserId, setSelectedUserId])

  useEffect(() => {
    onSummaryChange?.({ totalCount, evaluatedCount })
  }, [onSummaryChange, totalCount, evaluatedCount])

  return (
    <Section variant="solid" padding={'16px'} gap={'12px'}>
      <S.Header>
        <S.SubTitle>지원자 목록</S.SubTitle>
        <S.Info>
          {totalCount}명 중 {evaluatedCount}명 완료
        </S.Info>
      </S.Header>

      <S.FilterWrapper>
        <TextField
          Icon={Search}
          placeholder="닉네임, 이름으로 검색"
          type="text"
          autoComplete="none"
          width={170}
          css={{ maxHeight: '40px', padding: '9px 12px', ...theme.typography.B4.Rg }}
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
        <>{Dropdown}</>
      </S.FilterWrapper>

      <S.ListContainer>
        <S.TableHeader>
          <span>닉네임/이름</span>
          <span>파트</span>
          <span>평가</span>
        </S.TableHeader>

        <S.ScrollArea
          onScroll={(event) => {
            if (!hasNextPage || isFetchingNextPage) return
            const target = event.currentTarget
            const distanceToBottom = target.scrollHeight - target.scrollTop - target.clientHeight
            if (distanceToBottom < 80) {
              fetchNextPage()
            }
          }}
        >
          {isLoading && (
            <S.LoadingOverlay>
              <Loading size={24} label="불러오는 중" labelPlacement="right" />
            </S.LoadingOverlay>
          )}
          {applicants.map((applicant) => {
            const partsLabel = applicant.preferredParts.map((part) => part.label).join(', ')
            return (
              <S.ListItem
                key={applicant.applicationId}
                isSelected={selectedUserId === applicant.applicationId}
                onClick={() => setSelectedUserId(applicant.applicationId)}
              >
                <S.Name>
                  {applicant.applicantNickname}/{applicant.applicantName}
                </S.Name>
                <S.Part>{partsLabel}</S.Part>
                <S.StatusCircle isEvaluated={applicant.isEvaluated}>
                  {applicant.isEvaluated && <CheckIcon width={10} height={10} />}
                </S.StatusCircle>
              </S.ListItem>
            )
          })}
          {applicants.length === 0 && <S.NoApplicants>지원자가 없습니다.</S.NoApplicants>}
          {isFetchingNextPage && (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
              <Loading size={20} label="불러오는 중" labelPlacement="right" />
            </div>
          )}
        </S.ScrollArea>
      </S.ListContainer>
    </Section>
  )
}

const ApplicantList = ({
  selectedUserId,
  setSelectedUserId,
  recruitmentId,
  onSummaryChange,
}: {
  recruitmentId: string
  selectedUserId: string | null
  setSelectedUserId: (selectedUserId: string | null) => void
  onSummaryChange?: (summary: { totalCount: string; evaluatedCount: string }) => void
}) => {
  return (
    <AsyncBoundary fallback={null}>
      <ApplicantListContent
        recruitmentId={recruitmentId}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
        onSummaryChange={onSummaryChange}
      />
    </AsyncBoundary>
  )
}

export default ApplicantList
