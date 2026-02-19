import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { MANAGE_SYSTEM_TAB_VALUES } from '@/features/management/domain/constants'
import { SystemPage } from '@/features/management/pages/SystemPage'
import { parseTabSearch } from '@/shared/router/search'

type SystemTab = (typeof MANAGE_SYSTEM_TAB_VALUES)[number]

const RouteComponent = () => {
  const { tab } = Route.useSearch()
  const navigate = useNavigate()
  const activeTab: SystemTab = tab ?? 'landing'

  const setTab = (next: SystemTab) => {
    navigate({
      to: Route.to,
      search: (prev) => ({ ...prev, tab: next }),
      replace: true, // 히스토리 쌓기 싫으면
    })
  }

  return <SystemPage activeTab={activeTab} onTabChange={setTab} />
}

export const Route = createFileRoute('/(app)/management/system/')({
  validateSearch: (search) => parseTabSearch(search, MANAGE_SYSTEM_TAB_VALUES),
  component: RouteComponent,
})
