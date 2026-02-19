import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { MANAGE_BRANCH_TAB_VALUES } from '@/features/management/domain/constants'
import BranchPage from '@/features/management/pages/BranchPage'
import { parseTabSearch } from '@/shared/router/search'

type BranchTab = (typeof MANAGE_BRANCH_TAB_VALUES)[number]

const RouteComponent = () => {
  const { tab } = Route.useSearch()
  const navigate = useNavigate()
  const activeTab: BranchTab = tab ?? 'add'

  const setTab = (next: BranchTab) => {
    navigate({
      to: Route.to,
      search: (prev) => ({ ...prev, tab: next }),
      replace: true, // 히스토리 쌓기 싫으면
    })
  }

  return <BranchPage activeTab={activeTab} onTabChange={setTab} />
}

export const Route = createFileRoute('/(app)/management/branch/')({
  validateSearch: (search) => parseTabSearch(search, MANAGE_BRANCH_TAB_VALUES),
  component: RouteComponent,
})
