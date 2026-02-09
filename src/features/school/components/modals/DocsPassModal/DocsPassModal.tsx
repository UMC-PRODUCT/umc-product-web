/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import type { PartType } from '@/features/auth/domain'
import { patchDocumentSelectionStatus } from '@/features/school/domain/api'
import { useGetDocumentSelectedApplicants } from '@/features/school/hooks/useGetRecruitingData'
import Close from '@/shared/assets/icons/close.svg?react'
import { useCustomMutation } from '@/shared/hooks/customQuery'
import { usePartDropdown } from '@/shared/hooks/useManagedDropdown'
import { useUserProfileStore } from '@/shared/store/useUserProfileStore'
import { theme } from '@/shared/styles/theme'
import type { Option } from '@/shared/types/form'
import type { SelectionsSortType } from '@/shared/types/umc'
import AsyncBoundary from '@/shared/ui/common/AsyncBoundary/AsyncBoundary'
import { Button } from '@/shared/ui/common/Button'
import { Checkbox } from '@/shared/ui/common/Checkbox'
// import { Dropdown } from '@/shared/ui/common/Dropdown'
import { Flex } from '@/shared/ui/common/Flex'
import Loading from '@/shared/ui/common/Loading/Loading'
import { Modal } from '@/shared/ui/common/Modal/Modal'
import SuspenseFallback from '@/shared/ui/common/SuspenseFallback/SuspenseFallback'

import FilterBar from '../../SchoolEvaluation/FilterBar/FilterBar'
import PassCancleCautionModal from '../PassCancleCautionModal/PassCancleCautionModal'
import PassInfoModal from '../PassInfoModal/PassInfoModal'
import SetPassSuccessModal from '../SetPassSuccessModal/SetPassSuccessModal'
import DocsEvaluationRow from './DocsEvaluationRow/DocsEvaluationRow'
import * as S from './DocsPassModal.style'

const DocsPassModalContent = ({ recruitingId }: { recruitingId: string }) => {
  const { value: part, Dropdown } = usePartDropdown()
  const queryClient = useQueryClient()
  const roleType = useUserProfileStore((state) => state.role?.roleType)
  const canEdit = roleType === 'SCHOOL_PRESIDENT'
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const [pendingDecisionById, setPendingDecisionById] = useState<
    Record<string, 'PASS' | 'FAIL' | null>
  >({})
  const sortOptions: Array<Option<string>> = [
    { label: '점수 높은 순', id: 'SCORE_DESC' },
    { label: '점수 낮은 순', id: 'SCORE_ASC' },
    { label: '평가 완료 시각 순', id: 'EVALUATED_AT_ASC' },
  ]
  const [sortId, setSortId] = useState<SelectionsSortType>('SCORE_DESC')
  const sortValue = sortOptions.find((option) => option.id === sortId)

  const [modalOpen, setModalOpen] = useState<{
    open: boolean
    modalName: 'setPassPart' | 'setPassSuccess' | 'setFail' | 'inform' | null
  }>({
    open: false,
    modalName: null,
  })
  const handleSortChange = (option: Option<unknown>) => {
    const id = option.id
    if (id === 'SCORE_DESC' || id === 'SCORE_ASC' || id === 'EVALUATED_AT_ASC') {
      setSortId(id)
    }
  }
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetDocumentSelectedApplicants(recruitingId, {
      part: part ? (part.id === '0' ? 'ALL' : (part.id as PartType)) : 'ALL',
      size: '10',
      sort: sortId,
    })

  const pages = data?.pages ?? []
  const summary =
    pages.length > 0 ? pages[0].result.summary : { totalCount: '0', selectedCount: '0' }
  const totalCount = Number(summary.totalCount)
  const items = useMemo(
    () => pages.flatMap((page) => page.result.documentSelectionApplications.content),
    [pages],
  )

  const selectedCount = selectedIds.size
  const selectedItems = items.filter((item) => selectedIds.has(Number(item.applicationId)))
  const alreadyPassedCount = selectedItems.filter(
    (item) => item.documentResult.decision === 'PASS',
  ).length
  const allSelected = totalCount > 0 && selectedCount === totalCount
  const headerChecked = allSelected ? true : selectedCount > 0 ? 'indeterminate' : false

  const handleToggleAll = (checked: boolean | 'indeterminate') => {
    if (checked === true) {
      setSelectedIds(new Set(items.map((item) => Number(item.applicationId))))
      return
    }
    setSelectedIds(new Set())
  }

  const handleToggleRow = (id: number) => (checked: boolean | 'indeterminate') => {
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
  const { mutate: patchStatus } = useCustomMutation(
    ({ applicationId, decision }: { applicationId: string; decision: 'PASS' | 'FAIL' }) =>
      patchDocumentSelectionStatus(recruitingId, applicationId, { decision }),
    {
      onMutate: ({ applicationId, decision }) => {
        setPendingDecisionById((prev) => ({ ...prev, [applicationId]: decision }))
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['documentSelectedApplicants'],
          exact: false,
        })
      },
      onSettled: (_data, _error, variables) => {
        setPendingDecisionById((prev) => ({ ...prev, [variables.applicationId]: null }))
      },
    },
  )
  const handlePatchStatus = (applicationId: string, decision: 'PASS' | 'FAIL') => {
    patchStatus({ applicationId, decision })
  }
  const { mutate: bulkPass } = useCustomMutation((applicationIds: Array<string>) => {
    return Promise.all(
      applicationIds.map((applicationId) =>
        patchDocumentSelectionStatus(recruitingId, applicationId, { decision: 'PASS' }),
      ),
    )
  })
  const handleBulkPass = () => {
    const targetIds = selectedItems
      .filter((item) => item.documentResult.decision !== 'PASS')
      .map((item) => item.applicationId)
    if (targetIds.length === 0) return
    bulkPass(targetIds, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['documentSelectedApplicants'],
          exact: false,
        })
        setSelectedIds(new Set())
      },
    })
  }
  return (
    <Modal.Body className="body">
      <S.Container>
        {isLoading && pages.length === 0 ? (
          <SuspenseFallback label="서류 합격 대상자를 불러오는 중입니다." />
        ) : null}
        {/* 1. 상단 필터/컨트롤 바 */}
        <FilterBar
          leftChild={
            <>
              <Flex css={{ width: '200px', height: '36px' }}>{Dropdown}</Flex>
              <S.SelectionInfo onClick={() => {}}>전체 {totalCount}명 중 1명 선발</S.SelectionInfo>
            </>
          }
          rightChild={
            <>
              <S.SelectBox value={sortValue} options={sortOptions} onChange={handleSortChange} />
              <S.Notice>* 파트 필터는 1지망 기준입니다.</S.Notice>
            </>
          }
        />

        {/* 2. 메인 테이블 */}
        <S.TableContainer variant="solid" padding={'0'}>
          <S.TableScroll
            onScroll={(event) => {
              if (!hasNextPage || isFetchingNextPage) return
              const target = event.currentTarget
              const distanceToBottom = target.scrollHeight - target.scrollTop - target.clientHeight
              if (distanceToBottom < 80) {
                fetchNextPage()
              }
            }}
          >
            <S.Table>
              <S.TableRowHeader>
                <tr>
                  <th>
                    <Checkbox
                      checked={headerChecked}
                      onCheckedChange={handleToggleAll}
                      css={{
                        backgroundColor: theme.colors.gray[600],
                        borderColor: theme.colors.gray[400],
                      }}
                    />
                  </th>
                  <th>번호</th>
                  <th>닉네임/이름</th>
                  <th>지원 파트</th>
                  <th>서류 점수</th>

                  <th>작업</th>
                </tr>
              </S.TableRowHeader>
              <tbody>
                {items.map((item) => {
                  const pendingDecision = pendingDecisionById[item.applicationId] ?? null
                  return (
                    <DocsEvaluationRow
                      key={item.applicationId}
                      item={item}
                      checked={selectedIds.has(Number(item.applicationId))}
                      onToggle={handleToggleRow(Number(item.applicationId))}
                      onPass={() => canEdit && handlePatchStatus(item.applicationId, 'PASS')}
                      onFail={() => canEdit && handlePatchStatus(item.applicationId, 'FAIL')}
                      isPassLoading={pendingDecision === 'PASS'}
                      isFailLoading={pendingDecision === 'FAIL'}
                      isActionDisabled={!canEdit}
                    />
                  )
                })}
              </tbody>
            </S.Table>
            {isFetchingNextPage && (
              <Flex justifyContent="center" css={{ padding: '12px 0' }}>
                <Loading size={20} label="불러오는 중" labelPlacement="right" />
              </Flex>
            )}
          </S.TableScroll>
        </S.TableContainer>

        {/* 3. 하단 선택 관리 바 */}
        <Modal.Footer>
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
                onClick={() => setSelectedIds(new Set())}
              />
              <Button
                label={`선택된 ${selectedCount}명 합격 처리`}
                tone={selectedCount > 0 ? 'lime' : 'darkGray'}
                variant="solid"
                typo="B4.Sb"
                css={{ width: '144px', height: '30px' }}
                disabled={!canEdit}
                onClick={() =>
                  selectedCount > 0 &&
                  (alreadyPassedCount > 0
                    ? setModalOpen({ open: true, modalName: 'inform' })
                    : handleBulkPass())
                }
              />
            </div>
          </S.BottomBar>
        </Modal.Footer>
      </S.Container>
      {modalOpen.open && modalOpen.modalName === 'setPassSuccess' && (
        <SetPassSuccessModal onClose={() => setModalOpen({ open: false, modalName: null })} />
      )}
      {modalOpen.open && modalOpen.modalName === 'setFail' && (
        <PassCancleCautionModal onClose={() => setModalOpen({ open: false, modalName: null })} />
      )}
      {modalOpen.open && modalOpen.modalName === 'inform' && (
        <PassInfoModal
          onClose={() => setModalOpen({ open: false, modalName: null })}
          onConfirm={() => {
            handleBulkPass()
            setModalOpen({ open: false, modalName: null })
          }}
          selectedCount={selectedCount}
          alreadyPassedCount={alreadyPassedCount}
        />
      )}
    </Modal.Body>
  )
}

export const DocsPassModal = ({
  onClose,
  recruitingId,
}: {
  onClose: () => void
  recruitingId: string
}) => {
  return (
    <Modal.Root open={true} onOpenChange={(open) => !open && onClose()}>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content>
          <S.ModalContentWrapper
            css={{
              backgroundColor: theme.colors.gray[700],
              boxShadow: '0 8px 20px 0 rgba(0, 0, 0, 0.70)',
            }}
            flexDirection="column"
            padding={'24px 28px'}
            width={'920px'}
            height={'700px'}
          >
            <Modal.Header>
              <Flex
                justifyContent="space-between"
                alignItems="flex-start"
                width="100%"
                css={{ borderBottom: `1px solid ${theme.colors.gray[600]}`, paddingBottom: '16px' }}
              >
                <Modal.Title asChild>
                  <div>
                    <S.Title>서류 합격 처리</S.Title>
                    <S.SubTitle>서류 점수를 기반으로 서류 합격 처리를 진행합니다.</S.SubTitle>
                  </div>
                </Modal.Title>
                <Modal.Close asChild>
                  <S.ModalButton type="button" aria-label="모달 닫기" onClick={onClose}>
                    <Close color={theme.colors.gray[300]} width={30} />
                  </S.ModalButton>
                </Modal.Close>
              </Flex>
            </Modal.Header>
            <AsyncBoundary
              fallback={
                <S.BodyPlaceholder>
                  <SuspenseFallback label="서류 합격 대상자를 불러오는 중입니다." />
                </S.BodyPlaceholder>
              }
            >
              <DocsPassModalContent recruitingId={recruitingId} />
            </AsyncBoundary>
          </S.ModalContentWrapper>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  )
}
