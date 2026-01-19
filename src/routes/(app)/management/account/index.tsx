import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { AccountPage } from '@features/management/pages/AccountPage'

import { MANAGE_ACCOUNT_TAB_VALUES } from '@/features/management/domain/constants'
import type { ManageAccountTabName } from '@/features/management/domain/model'

type AccountTab = (typeof MANAGE_ACCOUNT_TAB_VALUES)[number]

const isAccountTab = (value: string): value is AccountTab =>
  MANAGE_ACCOUNT_TAB_VALUES.includes(value as AccountTab)

const parseAccountSearch = (search: Record<string, unknown>) => {
  const tabValue = typeof search.tab === 'string' ? search.tab : undefined
  const tab = tabValue && isAccountTab(tabValue) ? tabValue : undefined
  const accountId = typeof search.accountId === 'string' ? search.accountId : undefined
  return { tab, accountId }
}

const RouteComponent = () => {
  const { tab } = Route.useSearch()
  const navigate = useNavigate()
  const activeTab: ManageAccountTabName = tab ?? 'add'

  const setTab = (next: ManageAccountTabName) => {
    navigate({
      to: Route.to,
      search: (prev) => ({
        tab: next,
        accountId: prev.accountId ?? undefined,
      }),
      replace: true, // 히스토리 쌓기 싫으면
    })
  }

  return <AccountPage activeTab={activeTab} onTabChange={setTab} />
}

export const Route = createFileRoute('/(app)/management/account/')({
  validateSearch: (search) => parseAccountSearch(search),
  component: RouteComponent,
})
