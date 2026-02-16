import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { patchDocumentSelectionStatus } from '@/features/school/domain/api'
import { useCustomMutation } from '@/shared/hooks/customQuery'

type SelectionItem = {
  applicationId: string
  documentResult: { decision: 'PASS' | 'FAIL' | 'WAIT' }
}

type UseDocsPassModalMutationsParams = {
  recruitingId: string
  selectedItems: Array<SelectionItem>
  clearSelection: () => void
  onBulkPassSuccess?: () => void
}

export const useDocsPassModalMutations = ({
  recruitingId,
  selectedItems,
  clearSelection,
  onBulkPassSuccess,
}: UseDocsPassModalMutationsParams) => {
  const queryClient = useQueryClient()
  const [pendingDecisionById, setPendingDecisionById] = useState<
    Record<string, 'PASS' | 'FAIL' | null>
  >({})

  const { mutate: patchStatus } = useCustomMutation(
    ({ applicationId, decision }: { applicationId: string; decision: 'PASS' | 'FAIL' }) =>
      patchDocumentSelectionStatus(recruitingId, applicationId, { decision }),
    {
      onMutate: async ({ applicationId, decision }) => {
        await queryClient.cancelQueries({
          queryKey: ['school', 'getDocumentSelectedApplicants'],
          exact: false,
        })
        const previous = queryClient.getQueriesData({
          queryKey: ['school', 'getDocumentSelectedApplicants'],
          exact: false,
        })
        queryClient.setQueriesData(
          { queryKey: ['school', 'getDocumentSelectedApplicants'], exact: false },
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
          queryKey: ['school', 'documents', 'selections', 'applicants'],
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
          queryKey: ['school', 'documents', 'selections', 'applicants'],
          exact: false,
        })
        clearSelection()
        onBulkPassSuccess?.()
      },
    })
  }

  return {
    pendingDecisionById,
    handlePatchStatus,
    handleBulkPass,
  }
}
