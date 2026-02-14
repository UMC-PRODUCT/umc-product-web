import { useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import type { FinalSelectionApplication } from '@/features/school/domain/model'
import { useRecruitingMutation } from '@/features/school/hooks/useRecruitingMutation'
import { useGetFinalSelectionApplications } from '@/features/school/hooks/useRecruitingQueries'
import { useDocsPassModalUi } from '@/features/school/utils/docsPassModal'
import { useUserProfileStore } from '@/shared/store/useUserProfileStore'
import * as Shared from '@/shared/styles/shared'
import { theme } from '@/shared/styles/theme'
import type { PartType } from '@/shared/types/part'
import AsyncBoundary from '@/shared/ui/common/AsyncBoundary/AsyncBoundary'
import { Button } from '@/shared/ui/common/Button'
import { Checkbox } from '@/shared/ui/common/Checkbox'
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

const FinalEvaluation = ({ recruitmentId }: { recruitmentId: string }) => {
  const queryClient = useQueryClient()
  const roleType = useUserProfileStore((state) => state.role?.roleType)
  const canEdit = roleType === 'SCHOOL_PRESIDENT'
  const { Dropdown, sortOptions, sortValue, handleSortChange, part, sortId } = useDocsPassModalUi()
  const { usePatchFinalSelectionStatus } = useRecruitingMutation()

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [activeRowId, setActiveRowId] = useState<string | null>(null)
  const [processedPassCount, setProcessedPassCount] = useState(0)
  const [partSelectApplicantId, setPartSelectApplicantId] = useState<string | null>(null)
  const [pendingPassFlow, setPendingPassFlow] = useState<{
    queue: Array<string>
    processed: number
    requestedIds: Array<string>
  } | null>(null)
  const [cancelStatus, setCancelStatus] = useState<'PASS' | 'FAIL' | null>(null)
  const [modalOpen, setModalOpen] = useState<{
    open: boolean
    modalName: 'setPassPart' | 'setPassSuccess' | 'cancelStatus' | 'inform' | null
  }>({
    open: false,
    modalName: null,
  })
  const { mutateAsync: patchFinalStatus, isPending: isPassing } =
    usePatchFinalSelectionStatus(recruitmentId)

  const { data, isLoading, isError, error, refetch } = useGetFinalSelectionApplications(
    recruitmentId,
    {
      part,
      sort: sortId,
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
  const activeApplicant = useMemo(
    () => applicants.find((item) => item.applicationId === activeRowId) ?? null,
    [applicants, activeRowId],
  )
  const partSelectApplicant = useMemo(
    () => applicants.find((item) => item.applicationId === partSelectApplicantId) ?? null,
    [applicants, partSelectApplicantId],
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
  const selectedApplicants = useMemo(
    () => applicants.filter((item) => selectedIds.has(item.applicationId)),
    [applicants, selectedIds],
  )
  const alreadyPassedCount = useMemo(
    () => selectedApplicants.filter((item) => item.selection.status === 'PASS').length,
    [selectedApplicants],
  )

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

  const selectedSortOption = sortValue ?? sortOptions[0]
  const openCancelStatusModal = (applicationId: string, status: 'PASS' | 'FAIL') => {
    setActiveRowId(applicationId)
    setCancelStatus(status)
    setModalOpen({ open: true, modalName: 'cancelStatus' })
  }
  const findApplicant = (applicationId: string) =>
    applicants.find((item) => item.applicationId === applicationId) ?? null
  const getSinglePart = (applicant: FinalSelectionApplication): PartType | null => {
    if (applicant.appliedParts.length !== 1) return null
    return applicant.appliedParts[0]?.part.key as PartType
  }
  const finalizePassFlow = async (
    requestedIds: Array<string>,
    processedCount: number,
    openSuccessModal: boolean,
  ) => {
    await queryClient.invalidateQueries({ queryKey: ['school', 'finalSelections'] })
    setSelectedIds((prev) => {
      const next = new Set(prev)
      requestedIds.forEach((id) => next.delete(id))
      return next
    })
    if (openSuccessModal && processedCount > 1) {
      setProcessedPassCount(processedCount)
      setModalOpen({ open: true, modalName: 'setPassSuccess' })
      return
    }
    setModalOpen({ open: false, modalName: null })
  }
  const handlePassApplicants = async (applicationIds: Array<string>, openSuccessModal = true) => {
    if (!canEdit || applicationIds.length === 0 || isPassing) return
    const uniqueIds = [...new Set(applicationIds)]
    const targetApplicants = uniqueIds
      .map(findApplicant)
      .filter((item): item is FinalSelectionApplication => Boolean(item))
      .filter((item) => item.selection.status !== 'PASS')

    if (targetApplicants.length === 0) return

    const onePartTargets = targetApplicants.filter((item) => item.appliedParts.length === 1)
    const multiPartTargets = targetApplicants.filter((item) => item.appliedParts.length > 1)

    try {
      if (onePartTargets.length > 0) {
        await Promise.all(
          onePartTargets.map(async (item) => {
            const selectedPart = getSinglePart(item)
            if (!selectedPart) return
            await patchFinalStatus({
              applicationId: item.applicationId,
              requestBody: { decision: 'PASS', selectedPart },
            })
          }),
        )
      }

      if (multiPartTargets.length > 0) {
        const queue = multiPartTargets.map((item) => item.applicationId)
        setPendingPassFlow({
          queue,
          processed: onePartTargets.length,
          requestedIds: targetApplicants.map((item) => item.applicationId),
        })
        setPartSelectApplicantId(queue[0] ?? null)
        setModalOpen({ open: true, modalName: 'setPassPart' })
        return
      }

      await finalizePassFlow(
        targetApplicants.map((item) => item.applicationId),
        onePartTargets.length,
        openSuccessModal,
      )
    } catch {
      setModalOpen({ open: false, modalName: null })
      setPendingPassFlow(null)
      setPartSelectApplicantId(null)
    }
  }
  const handleConfirmPassWithSelectedPart = async (selectedPart: PartType) => {
    if (!pendingPassFlow || !partSelectApplicantId || isPassing) return

    try {
      await patchFinalStatus({
        applicationId: partSelectApplicantId,
        requestBody: { decision: 'PASS', selectedPart },
      })

      const nextQueue = pendingPassFlow.queue.filter((id) => id !== partSelectApplicantId)
      const nextProcessed = pendingPassFlow.processed + 1

      if (nextQueue.length > 0) {
        setPendingPassFlow({
          ...pendingPassFlow,
          queue: nextQueue,
          processed: nextProcessed,
        })
        setPartSelectApplicantId(nextQueue[0])
        return
      }

      await finalizePassFlow(pendingPassFlow.requestedIds, nextProcessed, true)
      setPendingPassFlow(null)
      setPartSelectApplicantId(null)
    } catch {
      setModalOpen({ open: false, modalName: null })
      setPendingPassFlow(null)
      setPartSelectApplicantId(null)
    }
  }
  const handleFailApplicants = async (applicationIds: Array<string>) => {
    if (!canEdit || applicationIds.length === 0 || isPassing) return
    const uniqueIds = [...new Set(applicationIds)]
    const targetApplicants = uniqueIds
      .map(findApplicant)
      .filter((item): item is FinalSelectionApplication => Boolean(item))

    if (targetApplicants.length === 0) return

    try {
      await Promise.all(
        targetApplicants.map((item) =>
          patchFinalStatus({
            applicationId: item.applicationId,
            requestBody: { decision: 'FAIL' },
          }),
        ),
      )
      await queryClient.invalidateQueries({ queryKey: ['school', 'finalSelections'] })
      setSelectedIds((prev) => {
        const next = new Set(prev)
        targetApplicants.forEach((item) => next.delete(item.applicationId))
        return next
      })
    } catch {
      // noop
    }
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
            <Flex height={36} gap={8}>
              {Dropdown}
              <S.SelectionInfo>
                {isEmpty
                  ? '데이터가 없습니다.'
                  : `전체 ${summary.totalCount}명 중 ${summary.selectedCount}명 선발`}
              </S.SelectionInfo>
            </Flex>
          }
          rightChild={
            <>
              <S.SelectBox
                value={selectedSortOption}
                options={sortOptions}
                onChange={handleSortChange}
              />
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
                      {(() => {
                        const isPass = item.selection.status === 'PASS'
                        const isFail = item.selection.status === 'FAIL'

                        return (
                          <Flex gap={8}>
                            <S.ActionButton
                              variant="outline"
                              tone={isPass ? 'lime' : 'gray'}
                              label="합격"
                              typo="B4.Sb"
                              disabled={!canEdit || isPassing}
                              onClick={() => {
                                if (isPass) {
                                  openCancelStatusModal(item.applicationId, 'PASS')
                                  return
                                }
                                void handlePassApplicants([item.applicationId])
                              }}
                            />
                            <S.ActionButton
                              variant="outline"
                              tone={isFail ? 'necessary' : 'gray'}
                              label="불합격"
                              typo="B4.Sb"
                              disabled={!canEdit || isPassing}
                              onClick={() => {
                                if (isFail) {
                                  openCancelStatusModal(item.applicationId, 'FAIL')
                                  return
                                }
                                void handleFailApplicants([item.applicationId])
                              }}
                            />
                          </Flex>
                        )
                      })()}
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
              disabled={!canEdit || isPassing}
              onClick={() => {
                if (selectedCount === 0) return
                const ids = [...selectedIds]
                if (alreadyPassedCount > 0) {
                  setModalOpen({ open: true, modalName: 'inform' })
                  return
                }
                void handlePassApplicants(ids)
              }}
            />
          </div>
        </S.BottomBar>
      </S.Container>
      {modalOpen.open && modalOpen.modalName === 'setPassPart' && partSelectApplicant && (
        <SetPassPartModal
          onClose={() => {
            setModalOpen({ open: false, modalName: null })
            setPendingPassFlow(null)
            setPartSelectApplicantId(null)
          }}
          onConfirm={(selectedPart) => void handleConfirmPassWithSelectedPart(selectedPart)}
          applicantName={partSelectApplicant.applicant.name}
          applicantNickname={partSelectApplicant.applicant.nickname}
          documentScore={partSelectApplicant.documentScore}
          interviewScore={partSelectApplicant.interviewScore}
          finalScore={partSelectApplicant.finalScore}
          appliedParts={partSelectApplicant.appliedParts
            .filter(
              (
                item,
              ): item is {
                priority: string
                part: {
                  key: PartType
                  label: string
                }
              } => item.part.key !== 'COMMON',
            )
            .map((item) => ({
              priority: item.priority,
              key: item.part.key,
              label: item.part.label,
            }))}
          isSubmitting={isPassing}
        />
      )}
      {modalOpen.open && modalOpen.modalName === 'setPassSuccess' && (
        <SetPassSuccessModal
          processedCount={processedPassCount}
          onClose={() => setModalOpen({ open: false, modalName: null })}
        />
      )}
      {modalOpen.open &&
        modalOpen.modalName === 'cancelStatus' &&
        activeApplicant &&
        cancelStatus && (
          <PassCancleCautionModal
            applicationId={activeApplicant.applicationId}
            recruitmentId={recruitmentId}
            name={activeApplicant.applicant.name}
            nickname={activeApplicant.applicant.nickname}
            score={activeApplicant.finalScore}
            currentStatus={cancelStatus}
            onClose={() => {
              setModalOpen({ open: false, modalName: null })
              setCancelStatus(null)
            }}
          />
        )}
      {modalOpen.open && modalOpen.modalName === 'inform' && (
        <PassInfoModal
          selectedCount={selectedCount}
          alreadyPassedCount={alreadyPassedCount}
          onConfirm={() => {
            void handlePassApplicants([...selectedIds])
          }}
          onClose={() => setModalOpen({ open: false, modalName: null })}
        />
      )}
    </>
  )
}

export default FinalEvaluation
