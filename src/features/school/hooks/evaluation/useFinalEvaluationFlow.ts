import { useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import type { FinalSelectionApplication } from '@/features/school/domain/model'
import { useRecruitingMutation } from '@/features/school/hooks/mutations/useRecruitingMutation'
import { useGetFinalSelectionApplications } from '@/features/school/hooks/queries/useRecruitingQueries'
import { useDocsPassModalUi } from '@/features/school/utils/docsPassModal'
import { schoolKeys } from '@/shared/queryKeys'
import { useUserProfileStore } from '@/shared/store/useUserProfileStore'
import type { PartType } from '@/shared/types/part'
import type { SelectionDecisionType } from '@/shared/types/umc'
import { isSchoolPresidentRole } from '@/shared/utils/role'

type ModalName = 'setPassPart' | 'setPassSuccess' | 'cancelStatus' | 'inform' | null

export const useFinalEvaluationFlow = (recruitmentId: string) => {
  const queryClient = useQueryClient()
  const roleType = useUserProfileStore((state) => state.role?.roleType)
  const canEdit = isSchoolPresidentRole(roleType)
  const { Dropdown, sortOptions, sortValue, handleSortChange, part, sortId } = useDocsPassModalUi()
  const { usePatchFinalSelectionStatus } = useRecruitingMutation()
  const { mutateAsync: patchFinalStatus, isPending: isPassing } =
    usePatchFinalSelectionStatus(recruitmentId)

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [activeRowId, setActiveRowId] = useState<string | null>(null)
  const [processedPassCount, setProcessedPassCount] = useState(0)
  const [partSelectApplicantId, setPartSelectApplicantId] = useState<string | null>(null)
  const [pendingPassFlow, setPendingPassFlow] = useState<{
    queue: Array<string>
    processed: number
    requestedIds: Array<string>
  } | null>(null)
  const [cancelStatus, setCancelStatus] = useState<Exclude<SelectionDecisionType, 'WAIT'> | null>(
    null,
  )
  const [modalOpen, setModalOpen] = useState<{ open: boolean; modalName: ModalName }>({
    open: false,
    modalName: null,
  })

  const { data, isLoading, isError, error, refetch } = useGetFinalSelectionApplications(
    recruitmentId,
    {
      part,
      sort: sortId,
      size: '20',
    },
  )

  const pages = useMemo(() => data?.pages ?? [], [data?.pages])
  const summary = pages[0]?.result.summary ?? { totalCount: '0', selectedCount: '0' }
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
  const headerChecked: boolean | 'indeterminate' = allSelected
    ? true
    : selectedCount > 0
      ? 'indeterminate'
      : false
  const selectedApplicants = useMemo(
    () => applicants.filter((item) => selectedIds.has(item.applicationId)),
    [applicants, selectedIds],
  )
  const alreadyPassedCount = useMemo(
    () => selectedApplicants.filter((item) => item.selection.status === 'PASS').length,
    [selectedApplicants],
  )

  const selectedSortOption = sortValue ?? sortOptions[0]
  const findApplicant = (applicationId: string) =>
    applicants.find((item) => item.applicationId === applicationId) ?? null
  const getSinglePart = (applicant: FinalSelectionApplication): PartType | null => {
    if (applicant.appliedParts.length !== 1) return null
    return applicant.appliedParts[0]?.part.key as PartType
  }

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
      if (checked === true) next.add(id)
      else next.delete(id)
      return next
    })
  }

  const openCancelStatusModal = (
    applicationId: string,
    status: Exclude<SelectionDecisionType, 'WAIT'>,
  ) => {
    setActiveRowId(applicationId)
    setCancelStatus(status)
    setModalOpen({ open: true, modalName: 'cancelStatus' })
  }

  const finalizePassFlow = async (
    requestedIds: Array<string>,
    processedCount: number,
    openSuccessModal: boolean,
  ) => {
    await queryClient.invalidateQueries({ queryKey: schoolKeys.evaluation.finalSelection.getBase })
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
      await queryClient.invalidateQueries({
        queryKey: schoolKeys.evaluation.finalSelection.getBase,
      })
      setSelectedIds((prev) => {
        const next = new Set(prev)
        targetApplicants.forEach((item) => next.delete(item.applicationId))
        return next
      })
    } catch {
      // noop
    }
  }

  return {
    Dropdown,
    sortOptions,
    sortValue,
    handleSortChange,
    canEdit,
    selectedIds,
    setSelectedIds,
    selectedCount,
    headerChecked,
    selectedSortOption,
    alreadyPassedCount,
    applicants,
    activeRowId,
    setActiveRowId,
    isPassing,
    isInitialLoading,
    isInitialError,
    isEmpty,
    summary,
    errorStatus,
    errorMessage,
    refetch,
    modalOpen,
    setModalOpen,
    partSelectApplicant,
    processedPassCount,
    activeApplicant,
    cancelStatus,
    setCancelStatus,
    handleToggleAll,
    handleToggleRow,
    openCancelStatusModal,
    handlePassApplicants,
    handleFailApplicants,
    handleConfirmPassWithSelectedPart,
  }
}
