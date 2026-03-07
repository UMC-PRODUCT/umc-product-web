import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { patchDocumentSelectionStatus } from '@/features/school/domain/api'
import { useCustomMutation } from '@/shared/hooks/customQuery'
import { schoolKeys } from '@/shared/queryKeys'
import type { SelectionDecisionType } from '@/shared/types/umc'

type SelectionItem = {
  applicationId: string
  documentResult: { decision: SelectionDecisionType }
}

type UseDocsPassModalMutationsParams = {
  recruitingId: string
  selectedItems: Array<SelectionItem>
  clearSelection: () => void
  onBulkPassSuccess?: (processedCount: number) => void
}

export const useDocsPassModalMutations = ({
  recruitingId,
  selectedItems,
  clearSelection,
  onBulkPassSuccess,
}: UseDocsPassModalMutationsParams) => {
  const queryClient = useQueryClient()
  const [pendingDecisionById, setPendingDecisionById] = useState<
    Record<string, Exclude<SelectionDecisionType, 'WAIT'> | null>
  >({})

  const { mutate: patchStatus } = useCustomMutation(
    ({
      applicationId,
      decision,
    }: {
      applicationId: string
      decision: Exclude<SelectionDecisionType, 'WAIT'>
    }) => patchDocumentSelectionStatus(recruitingId, applicationId, { decision }),
    {
      onMutate: async ({ applicationId, decision }) => {
        await queryClient.cancelQueries({
          queryKey: schoolKeys.evaluation.document.getSelectionsBase,
          exact: false,
        })
        const previous = queryClient.getQueriesData({
          queryKey: schoolKeys.evaluation.document.getSelectionsBase,
          exact: false,
        })
        queryClient.setQueriesData(
          { queryKey: schoolKeys.evaluation.document.getSelectionsBase, exact: false },
          (oldData) => {
            if (!oldData || typeof oldData !== 'object' || !('pages' in oldData)) return oldData
            const next = structuredClone(oldData)
            const nextPages = (next as { pages: Array<any> }).pages
            nextPages.forEach((page: any) => {
              const nextItems = page?.result.documentSelectionApplications?.content
              nextItems.forEach((item: any) => {
                if (String(item.applicationId) === String(applicationId)) {
                  item.documentResult = { ...(item.documentResult ?? {}), decision }
                }
              })
            })
            return next
          },
        )
        setPendingDecisionById((prev) => ({ ...prev, [applicationId]: decision }))
        return { previous }
      },
      onError: (_error, _variables, context) => {
        context?.previous.forEach(([cacheKey, cachedData]: any) => {
          queryClient.setQueryData(cacheKey, cachedData)
        })
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: schoolKeys.evaluation.document.getSelectionsBase,
          exact: false,
        })
      },
      onSettled: (_data, _error, variables) => {
        setPendingDecisionById((prev) => ({ ...prev, [variables.applicationId]: null }))
      },
    },
  )

  const handlePatchStatus = (
    applicationId: string,
    decision: Exclude<SelectionDecisionType, 'WAIT'>,
  ) => {
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
          queryKey: schoolKeys.evaluation.document.getSelectionsBase,
          exact: false,
        })
        onBulkPassSuccess?.(targetIds.length)
        clearSelection()
      },
    })
  }

  return {
    pendingDecisionById,
    handlePatchStatus,
    handleBulkPass,
  }
}
