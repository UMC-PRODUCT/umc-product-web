import { useState } from 'react'

type SelectionItem = {
  applicationId: string
  documentResult: { decision: 'PASS' | 'FAIL' | 'WAIT' }
}

export const useDocsPassModalSelection = (items: Array<SelectionItem>, totalCount: number) => {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())

  const selectedCount = selectedIds.size
  const selectedItems = items.filter((item) => selectedIds.has(Number(item.applicationId)))
  const alreadyPassedCount = selectedItems.filter(
    (item) => item.documentResult.decision === 'PASS',
  ).length
  const allSelected = totalCount > 0 && selectedCount === totalCount
  const headerChecked: boolean | 'indeterminate' = allSelected
    ? true
    : selectedCount > 0
      ? 'indeterminate'
      : false

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

  const clearSelection = () => setSelectedIds(new Set())

  return {
    selectedIds,
    setSelectedIds,
    selectedCount,
    selectedItems,
    alreadyPassedCount,
    headerChecked,
    handleToggleAll,
    handleToggleRow,
    clearSelection,
  }
}
