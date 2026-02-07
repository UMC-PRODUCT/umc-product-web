import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { MANAGE_SYSTEM_TAB_VALUES } from '@/features/management/domain/constants'
import { SystemPage } from '@/features/management/pages/SystemPage'

type SystemTab = (typeof MANAGE_SYSTEM_TAB_VALUES)[number]

const isSystemTab = (value: string): value is SystemTab => MANAGE_SYSTEM_TAB_VALUES.includes(value)

const parseTabSearch = (search: Record<string, unknown>) => {
  const tabValue = typeof search.tab === 'string' ? search.tab : undefined
  const tab = tabValue && isSystemTab(tabValue) ? tabValue : undefined
  return { tab }
}

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
  validateSearch: (search) => parseTabSearch(search),
  component: RouteComponent,
})
