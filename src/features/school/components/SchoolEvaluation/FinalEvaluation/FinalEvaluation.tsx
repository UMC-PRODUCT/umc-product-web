import { useMemo, useState } from 'react'

import type { PartType } from '@/features/auth/domain'
import { useGetFinalSelectionApplications } from '@/features/school/hooks/useRecruitingQueries'
import { PART_TYPE_TO_SMALL_PART } from '@/shared/constants/part'
import { useUserProfileStore } from '@/shared/store/useUserProfileStore'
import * as Shared from '@/shared/styles/shared'
import { theme } from '@/shared/styles/theme'
import type { Option } from '@/shared/types/form'
import type { SelectionsSortType } from '@/shared/types/umc'
import AsyncBoundary from '@/shared/ui/common/AsyncBoundary/AsyncBoundary'
import { Button } from '@/shared/ui/common/Button'
import { Checkbox } from '@/shared/ui/common/Checkbox'
import { Dropdown } from '@/shared/ui/common/Dropdown'
import { Flex } from '@/shared/ui/common/Flex'
import Section from '@/shared/ui/common/Section/Section'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'
import Table from '@/shared/ui/common/Table/Table'
import * as TableStyles from '@/shared/ui/common/Table/Table.style'

import ServerErrorCard from '../../common/ServerErrorCard'
import PassCancleCautionModal from '../../modals/PassCancleCautionModal/PassCancleCautionModal'
import PassInfoModal from '../../modals/PassInfoModal/PassInfoModal'
import { SetPassPartModal } from '../../modals/SetPassPartModal/SetPassPartModal'
import SetPassSuccessModal from '../../modals/SetPassSuccessModal/SetPassSuccessModal'
import FilterBar from '../FilterBar/FilterBar'
import * as S from './FinalEvaluation.style'
import * as RowS from './FinalEvaluationRow.style'

const sortOptions: Array<Option<string>> = [
  { label: '점수 높은 순', id: 'SCORE_DESC' },
  { label: '점수 낮은 순', id: 'SCORE_ASC' },
  { label: '평가 완료 시각 순', id: 'EVALUATED_AT_ASC' },
]

const FinalEvaluation = () => {
  const roleType = useUserProfileStore((state) => state.role?.roleType)
  const canEdit = roleType === 'SCHOOL_PRESIDENT'
  const recruitmentId = '40'

  const [selectedPart, setSelectedPart] = useState<Option<string>>({
    label: '전체 파트',
    id: 'ALL',
  })
  const [sort, setSort] = useState<Option<string>>(sortOptions[0])
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [activeRowId, setActiveRowId] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState<{
    open: boolean
    modalName: 'setPassPart' | 'setPassSuccess' | 'setFail' | 'inform' | null
  }>({
    open: false,
    modalName: null,
  })

  const { data, isLoading, isError, error, refetch } = useGetFinalSelectionApplications(
    recruitmentId,
    {
      part: selectedPart.id as PartType | 'ALL',
      sort: sort.id as SelectionsSortType,
      size: '20',
    },
  )

  const pages = useMemo(() => data?.pages ?? [], [data?.pages])
  const summary = pages[0]?.result.summary ?? {
    totalCount: '0',
    selectedCount: '0',
  }
  const applicants = useMemo(
    () => pages.flatMap((page) => page.result.finalSelectionApplications.content),
    [pages],
  )
  const isInitialLoading = isLoading && pages.length === 0
  const isInitialError = isError && pages.length === 0
  const isEmpty = !isInitialLoading && pages.length === 0
  const errorStatus = (error as { response?: { status?: number } } | null)?.response?.status
  const errorMessage =
    errorStatus === 500
      ? '서버 점검중입니다. 잠시후에 다시 시도해주세요.'
      : error instanceof Error
        ? error.message
        : '데이터를 불러오지 못했어요.'

  const selectedCount = selectedIds.size
  const allSelected = applicants.length > 0 && selectedCount === applicants.length
  const headerChecked = allSelected ? true : selectedCount > 0 ? 'indeterminate' : false

  const handleToggleAll = (checked: boolean | 'indeterminate') => {
    if (checked === true) {
      setSelectedIds(new Set(applicants.map((item) => item.applicationId)))
      return
    }
    setSelectedIds(new Set())
  }

  const handleToggleRow = (id: string) => (checked: boolean | 'indeterminate') => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (checked === true) {
        next.add(id)
      } else {
        next.delete(id)
      }
      return next
    })
  }

  const partOptions = useMemo(() => {
    const base = [{ label: '전체 파트', id: 'ALL' }]
    return base.concat(
      Object.entries(PART_TYPE_TO_SMALL_PART).map(([key, label]) => ({
        label,
        id: key,
      })),
    )
  }, [])

  const handleSortChange = (option: Option<unknown>) => {
    setSort(option as Option<string>)
  }

  return (
    <>
      <Shared.TabHeader alignItems="flex-start">
        <Shared.TabTitle>최종 평가</Shared.TabTitle>
        <Shared.TabSubtitle>서류와 면접 점수를 종합하여 최종 평가를 진행합니다.</Shared.TabSubtitle>
      </Shared.TabHeader>
      <S.Container>
        {/* 1. 상단 필터/컨트롤 바 */}
        <FilterBar
          leftChild={
            <>
              <Dropdown
                options={partOptions}
                value={selectedPart}
                placeholder="전체 파트"
                css={{ width: '200px', height: '36px', ...theme.typography.B4.Rg }}
                onChange={(option) => setSelectedPart(option)}
              />
              <S.SelectionInfo onClick={() => {}}>
                {isEmpty
                  ? '데이터가 없습니다.'
                  : `전체 ${summary.totalCount}명 중 ${summary.selectedCount}명 선발`}
              </S.SelectionInfo>
            </>
          }
          rightChild={
            <>
              <S.SelectBox value={sort} options={sortOptions} onChange={handleSortChange} />
              <S.Notice>* 파트 필터는 1지망 기준입니다.</S.Notice>
            </>
          }
        />

        {/* 2. 테이블 */}
        <AsyncBoundary
          fallback={
            <Section variant="solid" maxHeight={504} gap={0} padding="12px 16px">
              <SuspenseFallback label="최종 선발 대상자를 불러오는 중입니다." />
            </Section>
          }
        >
          {isInitialLoading ? (
            <Section variant="solid" maxHeight={504} gap={0} padding="12px 16px">
              <SuspenseFallback label="최종 선발 대상자를 불러오는 중입니다." />
            </Section>
          ) : isInitialError ? (
            <ServerErrorCard
              errorStatus={errorStatus}
              errorMessage={errorMessage}
              onRetry={() => refetch()}
            />
          ) : isEmpty ? (
            <ServerErrorCard
              errorMessage="최종 선발 대상자가 없습니다."
              message="선발 대상 없음"
              description="조건에 맞는 최종 선발 대상자가 없습니다."
            />
          ) : (
            <Section variant="solid" maxHeight={504} gap={0} padding="12px 16px">
              <Table
                headerLabels={[
                  '번호',
                  '닉네임/이름',
                  '지원 파트',
                  '서류 점수',
                  '면접 점수',
                  '최종 환산 점수',
                  '선발 결과',
                  '작업',
                ]}
                checkbox={{
                  isAllChecked: headerChecked,
                  onToggleAll: handleToggleAll,
                }}
                showFooter={false}
                rows={applicants}
                getRowId={(row) => row.applicationId}
                activeRowId={activeRowId}
                onRowClick={(id) => setActiveRowId(id)}
                renderRow={(item) => (
                  <>
                    <TableStyles.Td>
                      <Checkbox
                        checked={selectedIds.has(item.applicationId)}
                        onCheckedChange={handleToggleRow(item.applicationId)}
                        css={{ borderColor: RowS.colors.checkboxBorder }}
                      />
                    </TableStyles.Td>
                    <TableStyles.Td>{item.applicationId}</TableStyles.Td>
                    <TableStyles.Td>
                      <S.UserInfo>{`${item.applicant.nickname}/${item.applicant.name}`}</S.UserInfo>
                    </TableStyles.Td>
                    <TableStyles.Td>
                      <S.TagGroup>
                        {item.appliedParts.map((p) => (
                          <Button
                            key={`${item.applicationId}-${p.part.key}`}
                            variant="outline"
                            tone="gray"
                            label={p.part.label}
                            typo="B4.Md"
                            css={RowS.tagButtonStyle}
                          />
                        ))}
                      </S.TagGroup>
                    </TableStyles.Td>
                    <TableStyles.Td>{item.documentScore}</TableStyles.Td>
                    <TableStyles.Td>{item.interviewScore}</TableStyles.Td>
                    <TableStyles.Td css={{ color: theme.colors.lime, ...theme.typography.B3.Sb }}>
                      {item.finalScore}
                    </TableStyles.Td>
                    <TableStyles.Td css={RowS.resultTextStyle}>
                      {item.selection.status === 'WAIT' || !item.selection.selectedPart ? (
                        'N/A'
                      ) : (
                        <Button
                          variant="outline"
                          tone="gray"
                          label={item.selection.selectedPart.label}
                          typo="B4.Md"
                          css={RowS.resultButtonStyle}
                        />
                      )}
                    </TableStyles.Td>
                    <TableStyles.Td>
                      {item.selection.status === 'WAIT' ? (
                        <Flex gap={8}>
                          <S.ActionButton variant="outline" tone="gray" label="합격" typo="B4.Sb" />
                          <S.ActionButton
                            variant="outline"
                            tone="gray"
                            label="불합격"
                            typo="B4.Sb"
                          />
                        </Flex>
                      ) : item.selection.status === 'PASS' ? (
                        <Flex gap={8}>
                          <S.ActionButton variant="outline" tone="lime" label="합격" typo="B4.Sb" />
                          <S.ActionButton
                            variant="outline"
                            tone="gray"
                            label="불합격"
                            typo="B4.Sb"
                          />
                        </Flex>
                      ) : null}
                    </TableStyles.Td>
                  </>
                )}
              />
            </Section>
          )}
        </AsyncBoundary>
        {/* 3. 하단 선택 관리 바 */}
        <S.BottomBar variant="solid" padding="14px 18px">
          <div className="left">
            선택된 지원자 <S.CountBadge>{selectedCount}명</S.CountBadge>
          </div>
          <div className="right" css={{ gap: '14px', display: 'flex' }}>
            <Button
              label="선택 해제"
              tone={selectedCount > 0 ? 'gray' : 'darkGray'}
              variant="solid"
              typo="B4.Sb"
              css={{ width: '80px', height: '30px' }}
              disabled={!canEdit}
              onClick={() => setSelectedIds(new Set())}
            />
            <Button
              label={`선택된 ${selectedCount}명 합격 처리`}
              tone={selectedCount > 0 ? 'lime' : 'darkGray'}
              variant="solid"
              typo="B4.Sb"
              css={{ width: '144px', height: '30px' }}
              disabled={!canEdit}
              onClick={() => selectedCount > 0 && setModalOpen({ open: true, modalName: 'inform' })}
            />
          </div>
        </S.BottomBar>
      </S.Container>
      {modalOpen.open && modalOpen.modalName === 'setPassPart' && (
        <SetPassPartModal onClose={() => setModalOpen({ open: false, modalName: null })} />
      )}
      {modalOpen.open && modalOpen.modalName === 'setPassSuccess' && (
        <SetPassSuccessModal onClose={() => setModalOpen({ open: false, modalName: null })} />
      )}
      {modalOpen.open && modalOpen.modalName === 'setFail' && (
        <PassCancleCautionModal onClose={() => setModalOpen({ open: false, modalName: null })} />
      )}
      {modalOpen.open && modalOpen.modalName === 'inform' && (
        <PassInfoModal
          selectedCount={selectedCount}
          alreadyPassedCount={0}
          onConfirm={() => {
            setModalOpen({ open: false, modalName: null })
          }}
          onClose={() => setModalOpen({ open: false, modalName: null })}
        />
      )}
    </>
  )
}

export default FinalEvaluation
